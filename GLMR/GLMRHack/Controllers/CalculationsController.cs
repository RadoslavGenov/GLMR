using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using DAL;

namespace GLMRHack.Controllers
{
    public class CalculationsController : ApiController
    {
        public void Calcs(Calculation calc)
        {
            using (var db = new OfferDBEntities())
            {
            }
        }


    }
}