var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request("http://zoomtravel.bg/wat-usa", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);
  //var json = { city : "", state : "", position : "", cash : "", workinghours : "", startdate : "", link : ""};

  $('.view-work-offers').each(function( index ) {
    	var city = $(this).find('.city').text().trim();
       	var state = city.substring(city.indexOf(",")+2, city.length);
       	var city =  city.substring(0, city.indexOf(","));
       	var position = $(this).find('.position').text().trim();
       	var startdate = $(this).find('.date-display-single').text().trim();
       	var workinghours = "";
       	var cash = $(this).find(".paymant span").text().trim();
       	var cash = cash.substring(1,cash.indexOf(" "));
       	var link = $(this).find('.link').attr('href');

    fs.appendFileSync('output.json', '{\n"state": "' + state + '",\n' + '"city": "' +  + city + '",\n' + '"position": "' + position + '",\n'
    + '"cash": "' + cash + '",' + '"workinghours": "' + workinghours + '",\n'+ '"startdate": "' + startdate + '",\n' + '"link": "' + link + '",\n\n},\n');
  });

});