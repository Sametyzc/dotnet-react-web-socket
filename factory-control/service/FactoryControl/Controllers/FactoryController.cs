using FactoryControl.Dto;
using FactoryControl.Services;
using Microsoft.AspNetCore.Mvc;
using System;

namespace FactoryControl.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FactoryController : ControllerBase
    {
        private IFactoryService _factoryService;

        public FactoryController(IFactoryService factoryService)
        {
            _factoryService = factoryService;
        }

        [HttpPost("Update")]
        public IActionResult Update(FactoryDto.Update update)
        {
            try
            {
                _factoryService.UpdateFactory(update);
                return Ok();
            }
            catch (Exception exp)
            {
                return BadRequest();
            }
        }
    }
}
