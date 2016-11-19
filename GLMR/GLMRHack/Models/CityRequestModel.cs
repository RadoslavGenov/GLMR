using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GLMRHack.Models
{
    public class CityRequestModel
    {
        public int Id { get; set; }
        public string CityName { get; set; }
        public string StateName { get; set; }
        public int Housing { get; set; }
        public int Living { get; set; }
    }
}