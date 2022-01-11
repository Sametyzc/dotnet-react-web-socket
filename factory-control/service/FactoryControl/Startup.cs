using FactoryControl.Hub;
using FactoryControl.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace FactoryControl
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // We have to add WebSocketHub as Singleton because it needs to live until program closes
            services.AddSingleton(typeof(WebSocketHub), new WebSocketHub());

            services.AddScoped<IFactoryService, FactoryService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(x => x
              .AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            // we have to add this. If you do not context.WebSockets.IsWebSocketRequest is always false
            app.UseWebSockets(new WebSocketOptions
            {
                KeepAliveInterval = TimeSpan.FromSeconds(120), // you cna set ping-pong time period in here
                ReceiveBufferSize = 4 * 1024 // you can specify buffer size here (default is 4kb)
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            #region WebSocket
            // We need WebSocketHub for socket operations so we get it with GetService
            WebSocketHub _webSocketHub = (WebSocketHub)app.ApplicationServices.GetService(typeof(WebSocketHub));

            // If a request does not match any of the endpoints it will drop here 
            app.Use(async (context, next) =>
            {
                try
                {
                    // You can check header and request in here. For example
                    // if(context.Response.Headers...)
                    // if(context.Request.Query...)

                    // We just check IsWebSocketRequest
                    if (context.WebSockets.IsWebSocketRequest)
                    {
                        // We accept the socket connection
                        WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();

                        // we use underscore to discard return here because we do not have to waite return
                        _webSocketHub.AddSocket(webSocket);

                        // We have to hold the context here if we release it, server will close it
                        while (webSocket.State == WebSocketState.Open)
                        {
                            await Task.Delay(TimeSpan.FromMinutes(1));
                        }

                        // if socket status is not open ,remove it
                        _webSocketHub.RemoveSocket(webSocket);

                        // check socket state if it is not closed, close it
                        if (webSocket.State != WebSocketState.Closed && webSocket.State != WebSocketState.Aborted)
                        {
                            await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection End", CancellationToken.None);
                        }
                    }
                    else
                    {
                        await next();
                    }
                }
                catch (Exception exp)
                {
                    //log ws connection error
                }
            });

            #endregion
        }
    }
}
