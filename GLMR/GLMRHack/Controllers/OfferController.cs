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
                if (!db.Cities.Any(x => x.CityName == offer.CityName))
                {
                    var city = new City
                    {
                        CityName = offer.CityName,
                        StateName = offer.StateName,
                        Housing = new Random().Next(80, 160),
                        Living = new Random().Next(80, 160)
                    };

                    db.Cities.Add(city);

                    offer.CityId = city.Id;
                    
                    db.Offers.Add(offer);

                } else {
                    var city = (from x in db.Cities
                                where x.CityName == offer.CityName
                                select x).First();

                    offer.CityId = city.Id;

                    db.Offers.Add(offer);
                }
                
                db.SaveChanges();
                return this.Ok();
            }
        }
    }
}
