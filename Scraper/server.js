var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var domainLink = "http://zoomtravel.bg/wat-usa";

for(var i = 0; i <=3; i++){
request(domainLink + "?page="+ i, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);
  //var json = { city : "", state : "", position : "", wage : "", workinghours : "", startdate : "", link : ""};

  $('.view-work-offers .work-offer').each(function( index ) {
  		var id = new Date().valueOf();
    	var temp = $(this).find('.city').text().trim();
		temp = temp.replace(", ", ",");

       	var state = temp.substring(temp.indexOf(",")+1, temp.length);
       	var city =  temp.substring(0, temp.indexOf(","));

       	var position = $(this).find('.position').text().trim();
       	var wage = $(this).find(".paymant span").text().trim();
       	wage = wage.substring(1,wage.indexOf(" "));

       	var startdate = $(this).find('.date-display-single').text().trim();
       	var enddate = "01.09.2017";

       	var workinghours = $(this).find('p.others').text().trim();
       	workinghours = workinghours.replace("h", "");
       	workinghours = workinghours.substring(workinghours.lastIndexOf(" ")+1, workinghours.length);
      	var overtime;
      	if(workinghours.includes("+") === true){
      		workinghours = workinghours.substring(0,workinghours.indexOf("+"));
      		overtime = true;
      	}
      	else if(workinghours.includes("-")){
      		overtime = false;
      		var temp2 = workinghours.substring(0, workinghours.indexOf("-"));
      		workinghours = workinghours.substring(workinghours.indexOf("-")+1, workinghours.length);
      		workinghours = (parseInt(temp2) + parseInt(workinghours)) /2;

      	}
       	
       	var link = $(this).find('a').attr('href');
       	link = domainLink + link;

    fs.appendFileSync('output.json',
    	'{\n\t"id": ' + parseInt(id) + ',\n' + '\t"city": "' +  city + '",\n' + '\t"state": "' +  state + '",\n'
    	+ '\t"position": "' + position + '",\n' + '\t"wage": ' + parseInt(wage) + ',\n'
    	+ '\t"workinghours": ' + parseInt(workinghours) + ',\n'+ '\t"overtime": "' + overtime + '",\n'
    	+ '\t"startdate": "' + startdate + '",\n'+ '\t"enddate": "' + enddate + '",\n'
    	 + '\t"link": "' + link + '",\n},\n');

  });
});
}