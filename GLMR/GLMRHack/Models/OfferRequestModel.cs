using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GLMRHack.Models
{
    public class OfferRequestModel
    {
        public int Id { get; set; }
        public string CityId { get; set; }
        public string StateName { get; set; }
        public string Position { get; set; }
        public int Wage { get; set; }
        public int WorkingHours { get; set; }
        public bool Overtime { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Link { get; set; }

        public virtual CityRequestModel City { get; set; }
    }
}