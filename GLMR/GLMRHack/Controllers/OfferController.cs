using DAL;
using GLMRHack.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GLMRHack.Controllers
{
    public class OfferController : ApiController
    {
        public IHttpActionResult InputOffers(Offer offer)
        {
            using(var db = new OfferDBEntities())
            {
                db.Offers.Add(offer);
               // var city = new City(offer.CityId, offer.CityName, offer.StateName, 100, 200);
               // db.Cities.Add(city);
                db.Cities.Where(c => c.Id == offer.CityId).SingleOrDefault();
                db.SaveChanges();
                return this.Ok();
            }
        }
    }
}
