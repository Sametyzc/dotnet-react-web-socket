using FactoryControl.Data;
using FactoryControl.Dto;
using FactoryControl.Hub;
using Newtonsoft.Json;
using System;
using System.Linq;

namespace FactoryControl.Services
{
    public interface IFactoryService
    {
        void UpdateFactory(FactoryDto.Update update);
    }

    public class FactoryService : IFactoryService
    {

        WebSocketHub _webSocketHub;
        public FactoryService(WebSocketHub webSocketHub)
        {
            _webSocketHub = webSocketHub;
        }

        public void UpdateFactory(FactoryDto.Update update)
        {
            try
            {
                SampleData.Factory factory = SampleData.FactoryList.FirstOrDefault(w => w.Id == update.Id);
                if (factory == null) throw new ArgumentNullException();

                factory.Name = update.Name;
                factory.Status = update.Status;
                factory.Message = update.Message;

                var x = SampleData.FactoryList;

                // if a factory updated, send new data to all sockets
                _ = _webSocketHub.SendAll(JsonConvert.SerializeObject(SampleData.FactoryList));
            }
            catch (Exception exp)
            {
                //log exp
            }
        }
    }
}
