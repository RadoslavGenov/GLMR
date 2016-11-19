using DAL;
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
            using(var db = new OffersDataBaseEntities())
            {
                db.Offers.Add(offer);
                db.SaveChanges();
                return this.Ok();
            }
        }
    }
}
