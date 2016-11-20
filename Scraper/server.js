var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var domainLink1 = "http://zoomtravel.bg";
var nRequests = 0;

	function handleRequests(error, response, body){
			  if(error) {
			    console.log("Error: " + error);
			  }
			  console.log("Status code: " + response.statusCode);

			  var $ = cheerio.load(body);
			  $('.view-work-offers .work-offer').each(function( index ) {
			    	var temp = $(this).find('.city').text().trim();
					temp = temp.replace(", ", ",");

			       	var state = temp.substring(temp.indexOf(",")+1, temp.length);
			       	var city =  temp.substring(0, temp.indexOf(","));

			       	var position = $(this).find('.position').text().trim();
			       	var wage = $(this).find(".paymant span").text().trim();
			       	wage = wage.substring(1,wage.indexOf(" "));

			       	var startdate = $(this).find('.date-display-single').text().trim();
			       	if(startdate.includes(",")) startdate = startdate.substring(0, startdate.indexOf(","));
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
			       	link = domainLink1 + link;

				    fs.appendFileSync('output.json',
				    	'{\n\t"CityName": "' + city + '",\n' + '\t"StateName": "' +  state + '",\n'
				    	+ '\t"Position": "' + position + '",\n' + '\t"Wage": ' + parseInt(wage) + ',\n'
				    	+ '\t"WorkingHours": ' + parseInt(workinghours) + ',\n'+ '\t"Overtime": "' + overtime + '",\n'
				    	+ '\t"StartDate": "' + startdate + '",\n'+ '\t"EndDate": "' + enddate + '",\n'
				    	 + '\t"Link": "' + link + '",\n},\n');
					
				    fs.appendFileSync('output.txt', city + "\n");
					fs.appendFileSync('output1.txt', state + "\n");
					});

					
					

				++nRequests;
		  		if(nRequests>2) return;
			    request(domainLink1 + "/wat-usa/?page=" + nRequests, handleRequests);
		  }
		  request(domainLink1 + "/wat-usa/?page=" + nRequests, handleRequests);





var domainLink = "http://watabroad.com/job-offers-USA?product_id=";
var nRequest = 107;

		function handleRequest(error, response, body){
			 if(error) {
			    console.log("Error: " + error + " Request # " + (nRequest-106));
			  }
			  console.log("Status code: " + response.statusCode + " Request # " + (nRequest-106));

			  var $ = cheerio.load(body);
			  if($('#offer-table').length == 1){

				var state = $('#offer-table tr:nth-child(1) td:nth-child(1) span:nth-child(2)').text().trim();
			   	var city =  $('#offer-table tr:nth-child(1) td:nth-child(2) span:nth-child(2)').text().trim();
			   	if(city.includes(", ") == true){
			   		city.substring(0, city.indexOf(", "));
			   	}
			   	if(state.includes("(")) state = state.substring(state.indexOf("(")+1, state.indexOf(")"));
			   	var position = $('#offer-table tr:nth-child(2) td:nth-child(1) span:nth-child(2)').text().trim();
			   	if(position.includes(","))	position = position.substring(0, position.indexOf(","));
			   	
			   	var wage = $('#offer-table tr:nth-child(3) td:nth-child(1) span:nth-child(2)').text().trim();
			   	wage = wage.replace('$ ', '');
			   	wage = wage.replace('$' , '');
			   	wage = wage.replace('+', '');
			   	wage = wage.replace('tips', '');
			   	wage = wage.replace('tip', '');
			   	wage = wage.replace(',', '.');
			   	if(wage.includes(';')) wage.substring(wage.lastIndexOf(" ")+1, wage.length);
			   	else if(wage.includes(' ')) wage = wage = wage.substring(0, wage.indexOf(" "));

			   	var startdate = "20.05.2017";
			   	var enddate = "15.09.2017";

			   	var workinghours = $('#offer-table tr:nth-child(3) td:nth-child(2) span:nth-child(2)').text().trim();

			   	workinghours = workinghours.replace("h", "");
			   	workinghours = workinghours.replace(" ", "");

			  	var overtime;
			  	if(workinghours.length == 2) overtime = false;
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
			    var link = domainLink + nRequest;
			    

			    fs.appendFileSync('output.json',
			    	'{\n\t"CityName": "' + city + '",\n' + '\t"StateName": "' +  state + '",\n'
			    	+ '\t"Position": "' + position + '",\n' + '\t"Wage": ' + parseInt(wage) + ',\n'
			    	+ '\t"WorkingHours": ' + parseInt(workinghours) + ',\n'+ '\t"Overtime": "' + overtime + '",\n'
			    	+ '\t"StartDate": "' + startdate + '",\n'+ '\t"EndDate": "' + enddate + '",\n'
			    	 + '\t"Link": "' + link + '",\n},\n');
			    	 fs.appendFileSync('output.txt', city + "\n");
					fs.appendFileSync('output1.txt', state + "\n");
			}
				++nRequest;
		  		if(nRequest>520) return;
			    request(domainLink + nRequest, handleRequest);
		  }
		  request(domainLink + 107, handleRequest);