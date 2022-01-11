using System.Collections.Generic;

namespace FactoryControl.Data
{
    public static class SampleData
    {
        // Mock data
        public static List<Factory> FactoryList = new List<Factory>
        {
            new Factory()
            {
                Id = 1,
                Name = "Factory 1",
                Status = true,
                Message = "",
            },
            new Factory()
            {
                Id = 2,
                Name = "Factory 2",
                Status = false,
                Message = "An error occurred!",
            },
            new Factory()
            {
                Id = 3,
                Name = "Factory 3",
                Status = true,
                Message = "",
            },
            new Factory()
            {
                Id = 4,
                Name = "Factory 4",
                Status = true,
                Message = "",
            },
            new Factory()
            {
                Id = 5,
                Name = "Factory 5",
                Status = true,
                Message = "Burada hayat zor!",
            },
            new Factory()
            {
                Id = 6,
                Name = "Factory 6",
                Status = true,
                Message = "",
            },
        };

        public class Factory
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public bool Status { get; set; }
            public string Message { get; set; }
        }
    }
}
