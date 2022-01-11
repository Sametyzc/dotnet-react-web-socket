using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using FactoryControl.Data;
using Newtonsoft.Json;

namespace FactoryControl.Hub
{
    public class WebSocketHub
    {
        // we will store all web sockets in this list
        private List<WebSocket> _webSocketList = new List<WebSocket>();

        // add a socket to list
        public void AddSocket(WebSocket webSocket)
        {
            try
            {
                if (webSocket == null) return;
                // _webSocketList this list is used asynchronously so when we want to use it we need to use lock
                lock (_webSocketList) _webSocketList.Add(webSocket);

                // if socket open send initial message
                if (webSocket.State == WebSocketState.Open)
                {
                    byte[] messageBuffer = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(SampleData.FactoryList));
                    _ = webSocket.SendAsync(new ArraySegment<byte>(messageBuffer), WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
            catch (Exception exp)
            {
                //log 
            }
        }

        // remove a socket from list
        public void RemoveSocket(WebSocket webSocket)
        {
            lock (_webSocketList) _webSocketList.Remove(webSocket);
        }

        // send a message to all open sockets
        public async Task SendAll(string message)
        {
            try
            {
                List<WebSocket> webSocketList;
                lock (_webSocketList) webSocketList = _webSocketList;

                byte[] byteMessage = Encoding.UTF8.GetBytes(message);

                webSocketList.ForEach(f =>
                {
                    if (f.State == WebSocketState.Open)
                    {
                        f.SendAsync(new ArraySegment<byte>(byteMessage), WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                });
            }
            catch (Exception)
            {
                // log exp
            }
        }
    }
}
