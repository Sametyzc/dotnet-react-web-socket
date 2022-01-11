using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FactoryControl.Dto
{
    public class FactoryDto
    {
        public class Update
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public bool Status { get; set; }
            public string Message { get; set; }
        }
    }
}
