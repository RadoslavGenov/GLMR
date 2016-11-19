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
using GLMRApp;
using DAL;

namespace GLMRApp.Controllers
{
    public class OfferController : ApiController
    {

        public IHttpActionResult AddOffer(Offer offer)
        {
            using(var db = new OffersDataBaseEntities())
            {
                db.Offers.Add(offer);
                db.SaveChanges();
                return this.Ok();
            }
        }

        
    }
}