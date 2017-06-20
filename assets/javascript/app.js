
$(function(){
	var currentPage = "dashboard";

	// Initialize Firebase


	var config = {
		apiKey: "AIzaSyD1UCXTw5xWE5WehTfqh0AK-K2asMyf4S4",
	    authDomain: "couplette-b67ce.firebaseapp.com",
	    databaseURL: "https://couplette-b67ce.firebaseio.com",
	    projectId: "couplette-b67ce",
	    storageBucket: "couplette-b67ce.appspot.com",
	    messagingSenderId: "934836634497"
	};

	firebase.initializeApp(config);

	var dataRef = firebase.database();
	// Initial Values
	var firstName1 = "";
	var firstName2 = "";
	var lastName1 = "";
	var lastName2 = "";
	var coupleEmail = "";
	var password = "";
	var confirmPassword = "";
	var zipcode = "";
	var picture = "";
	var description = "";
	var arts = ""
	var dining = "";
	var films = "";
	var music = "";
	var gaming = "";
	var outdoor = "";
	var travel = "";
	var other = "";
	var age = 0;
	var comment = "";
	var coupleUsername = "";
	var cityArray = [];
	var stateArray = [];
	var latArray = [];
	var lngarray = [];
	var distanceArray = [];
	var potentialMatch = [];

	$("#button").on("click", function(event) {
		event.preventDefault();
		// Code in the logic for storing and retrieving the most recent user.
		firstName1 = $("#name-input").val().trim();
		firstName2 = $("#name-input2").val().trim();
		lastName1 = $("#last-input").val().trim();
		lastName2 = $("#last-input2").val().trim();
		coupleEmail = $("#email-address").val().trim();
		password = $("#pass").val().trim();
		confirmPassword = $("#confirm-pass").val().trim();
		zipcode = $("#zipcode").val().trim();
		description = $("#textarea").val().trim();
		arts = $("#artsbox").val().trim();
		dining = $("#diningbox").val().trim();
		films = $("#filmsbox").val().trim();
		music = $("#musicbox").val().trim();
		gaming = $("#gamingbox").val().trim();
		outdoor = $("#outdoorbox").val().trim();
		travel = $("#travelbox").val().trim();
		other = $("#otherbox").val().trim();
		age = $("#age-input").val().trim();
		comment = $("#comment-input").val().trim();
		coupleUsername = $("#couple-username").val().trim();
		// Code for the push
		// dataRef.ref().push({
		// 	firstName1: firstName1,
		// 	firstName2: firstName2,
		// 	lastName1: lastName1,
		// 	lastName2: lastName2,
		// 	coupleEmail: coupleEmail,
		// 	password: password,
		// 	confirmPassword: confirmPassword,
		// 	zipcode: 91384,
		// 	description: description,
		// 	Interests: {
		// 		Arts: arts,
		// 		Dining: dining,
		// 		Films: films,
		// 		Music: music,
		// 		Gaming: gaming,
		// 		Outdoors: outdoor,
		// 		Travel: travel,
		// 		other: other,
		// 	},
		// 	age: age,
		// 	coupleUsername: coupleUsername,
		// 	comment: comment,
		// 	// dateAdded: firebase.database.ServerValue.TIMESTAMP
		// });
	});

	var testZip1 = 91384;
	
	var googleQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + testZip1 + "&key=AIzaSyBh0G9RiMPn-rZTMnKHh5i8aPNGMrVHifE";

	//Google Maps API Call
	function distanceMatrixCall() {
		
		$.ajax({
		  crossDomain: true,
		  url: googleQueryURL,
		  method: "GET"
		}).done(function(response) {
			var city = response.results[0].address_components[1].long_name;
			var state = response.results[0].address_components[2].long_name;
			var testLatitude = parseInt(response.results[0].geometry.location.lat);
			var testLongitude = parseInt(response.results[0].geometry.location.lng);
			console.log(cityArray);
			
			zipCodeConverter()
			  .then(function() {
				// zipCodeMatcher();
				// function zipCodeMatcher()
				for (var j=0; j < cityArray.length; j++) {
					console.log(cityArray[j]);
					console.log("working");
					var origin1 = new google.maps.LatLng(testLatitude, testLongitude);
					var origin2 = "" + city + "," + "" + state;
					var destinationA = "" + cityArray[j] + "," + "" + stateArray[j];
					var destinationB = new google.maps.LatLng(lngarray[j], latArray[j]);
					var service = new google.maps.DistanceMatrixService();
					console.log(origin1, origin2, destinationB, destinationA);
					service.getDistanceMatrix(
					  {
					  	origins: [origin1, origin2],
		    			destinations: [destinationA, destinationB],
					    travelMode: 'DRIVING',
					    // s
					  }, callback);

					function callback(response, status) {
						console.log(response, status);
						var num = response.rows[0].elements[0].distance.text.replace(/[^0-9]/g,'');
						distance.push(parseInt(num));
					};
				}
			});
				
		});
	};

	distanceMatrixCall();

	function isDistanceMatch(){
		for (var i=0; i<distanceArray.length; i++) {
			if distanceArray[i] > searchCriteria.distance {
				match = false;
			} else {
				match= true;
			}
		}
	};

	isDistanceMatch();

	function zipCodeConverter() {
		// getFirebaseData();
		var testZipCodeArray = [95050, 91350, 94110];
		var zipPromises = [];
		
		for (var i=0; i<testZipCodeArray.length; i++) {
			var googleQueryURLLoop = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + testZipCodeArray[i] + "&key=AIzaSyBh0G9RiMPn-rZTMnKHh5i8aPNGMrVHifE";
		// sconsole.log(googleQueryURLLoop)
		//Google Maps API Call
			zip = $.ajax({
			  crossDomain: true,
			  url: googleQueryURLLoop,
			  method: "GET"
			}).done(function(response) {
				var cityConverted = response.results[0].address_components[1].long_name;
				var stateConverted = response.results[0].address_components[2].long_name;
				var testLatitudeConverted = parseInt(response.results[0].geometry.location.lat);
				var testLongitudeConverted = parseInt(response.results[0].geometry.location.lng);
				cityArray.push(cityConverted);
				stateArray.push(stateConverted);
				latArray.push(testLatitudeConverted);
				lngarray.push(testLongitudeConverted);
			});
			zipPromises.push(zip);
		};

		return Promise.all(zipPromises);

	};

	zipCodeConverter();

	function getFirebaseData() {
		var fireBaseZipCodes = [];
		dataRef.ref().on("value", function(childSnapshot) {	
	      	// Log everything that's coming out of snapshot
	      	fireBaseZipCodes.push(childSnapshot.val().zipCode);
	      });
		}

	//Sample User Criteria
	var userCriteria = {
	    ageLow: 18,
	    ageHigh: 25,
	    gender: "mf",
	    distance: 5,
	    interests: {
	        film: true,
	        sports: true,
	        arts: true,
	        gaming: true,
	        dining: true,
	        travel: true,
	        outdoors: true,
	        music: true
	    }
	}

	function matchUser (criteria, userToComp){
	    var match = false;
	    var tempArray = Object.keys(criteria.interests);
	    for (var i = 0; i < tempArray.length; i++){
	        if (userToComp.interests[tempArray[i]] === criteria.interests[tempArray[i]]){
	            match = true;
	        }
	    }
	    //check for age
	    if (criteria.ageLow !== null){
	        if (criteria.ageLow === 55){
	            if (!(criteria.ageLow <= userToComp.age1)){
	                match = false;
	            }
	            if (!(criteria.ageLow <= userToComp.age2)){
	                match = false;
	            }
	        }
	        else {
	            if (!(criteria.ageLow <= userToComp.age1 && userToComp.age1 <= criteria.ageHigh)){
	            match = false
	            }
	            if (!(criteria.ageLow <= userToComp.age2 && userToComp.age2 <=criteria.ageHigh)){
	            match = false
	            }
	        }
	    }
	    if (criteria.gender !== null){
	        if (criteria.gender !== userToComp.gender){
	            match = false;
	        }
	    }

	    // var = codeformyzyip;

	    // Var distance = 

	    // if (distance > criteria.distance){
	    // 	match = false;
	    // }

	    if (match){
	        return true;
	    }
	    else {
	        return false;
	    };
	}
	function collectUser(criteria){
	    dataRef.ref("users").once("value", function(snapshot){
	        var users = snapshot.val();
	        var userNameArray = Object.keys(users);
	        var namesThatMatch = []
	        for (var i = 0; i < userNameArray.length; i++){
	            if (matchUser(criteria, users[userNameArray[i]])){
	                namesThatMatch.push(users[userNameArray[i]].username);
	            }
	        }
	        console.log(namesThatMatch);
	    })
	}
	// collectUser(userCriteria);

	//add calendar date pick functionality to event page date input field
	$("#dateEvent").datepicker({minDate: 0});

	$("#dateEvent").on("change", function(){
		if ($(this).val() !== undefined){
			$(".eventZipcode").slideDown();
		}
	});

	$(".zipInp").on("keyup", function(){
		var zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

		if (zipRegex.test($(this).val())){
			$(".eventTypeBlock").slideDown();
		}

		else {
			$(".eventTypeBlock").slideUp();
			$(".diningEvent").slideUp();
			$(".filmEvent").slideUp();
			$(".eventType").val(0);
			$(".filmTimes").slideUp("fast");
			$(".films").slideUp("fast");

		}
	})

	//adding dynamic page updates based on event select dropdown option
	$(".eventType").on("change", function(){
		if ($(this).val() === "EventDefault"){
			$(".filmEvent").slideUp("fast");
			$(".cuisine").slideUp("fast");
		}

		else if ($(this).val() === "Film"){
			var longitudeOfZip, latOfZip;
			function initialize() {
			var queryURLLongLat = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $(".zipInp").val() + "&key=AIzaSyA52ADkbHa1-oZzlIZuCk6PAACaPFOFe2A";

			$.ajax({
				url: queryURLLongLat,
				method: "GET"
			}).done(function(response){
				longitudeOfZip = parseFloat(response["results"][0]["geometry"]["location"]["lat"]);
				latOfZip = parseFloat(response["results"][0]["geometry"]["location"]["lng"]);

				var location = new google.maps.LatLng(longitudeOfZip, latOfZip);

				var request = {
					location: location,
					radius: '1000',
					query: 'cinema',
				};

				var service = new google.maps.places.PlacesService(document.createElement('div'));
				service.textSearch(request, callback);

				function callback(results, status) {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						$(".theaterDrop").empty().append("<option  value='Default'>")
						for (var i = 0; i < results.length; i++) {
							$(".theaterDrop").append("<option value=" + results[i].name + ">" + results[i].name + "</option");

						}
						$(".diningEvent").slideUp("fast", function(){
						$(".filmEvent").slideDown("normal");
					});
					}
				}
			});
	
		}
		initialize();
	}
		else if ($(this).val() === "Dining"){

			$(".filmEvent").slideUp("fast", function(){
				$(".diningType").slideDown("normal");
				});
		}
	});

	$(".cuisine").on("change", function(){
		if ($(this).val() === "EventDefault"){

		}
		var longitudeOfZip, latOfZip;
		function initialize() {
		var queryURLLongLat = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $(".zipInp").val() + "&key=AIzaSyA52ADkbHa1-oZzlIZuCk6PAACaPFOFe2A";

		$.ajax({
			url: queryURLLongLat,
			method: "GET"
		}).done(function(response){
			longitudeOfZip = parseFloat(response["results"][0]["geometry"]["location"]["lat"]);
			latOfZip = parseFloat(response["results"][0]["geometry"]["location"]["lng"]);

			var location = new google.maps.LatLng(longitudeOfZip, latOfZip);

			var request = {
				location: location,
				radius: '1000',
				query: $(".cuisine").val() +  ' restaurant',
			};

			var service = new google.maps.places.PlacesService(document.createElement('div'));
			service.textSearch(request, callback);

			function callback(results, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					$(".diningOptionsDrop").empty().append("<option  value='Default'>")
					for (var i = 0; i < results.length; i++) {
						var diningOption = $("<option>").attr("value", results[i].name).text(results[i].name);
						$(".diningOptionsDrop").append(diningOption);
						$(".diningEvent").slideDown("normal");
					}					
				}
			}
		});

		}

		initialize();
	});

	$(".filmEvent").on("change", function(){
		if ($(this).val() === "EventDefault"){
			$(".films").slideUp("fast");
		}

		else {
			$(".films").slideDown("normal");
		}

	});

	$(".films").on("change", function(){
		if ($(this).val() === "EventDefault"){
			$(".filmTimes").slideUp("fast");
		}

		else {
			$(".filmTimes").slideDown("normal");
		}

	});

	$(".filmTimes").on("change", function(){
		if ($(this).val() === "EventDefault"){
			$(".friendFindSubmit").slideUp("fast");
		}

		else {
			$(".friendFindSubmit").slideDown("normal");
			
		}

	});

	$(".interest").on("click", function(){
		if ($(this).attr("data-selected") === "false"){
			$(this).css("background", "#ffa9be");
			$(this).css("border", "1px solid #c4536f");
			$(this).attr("data-selected", "true");
		}

		else {
			$(this).css("background", "white");
			$(this).css("border", "1px solid darkgrey");
			$(this).attr("data-selected", "false");
		}
	})

	function resetFields(){
		$("input").val("");
		$(".eventTypeBlock").hide();
		$(".eventZipcode").hide();
		$(".filmEvent").hide();
		$(".films").hide();
		$(".filmTimes").hide();
		$(".diningEvent").hide();
		$(".diningType").hide();
	}

	$("body").on("click", ".eventButton", function(){
		$(".dashboardBlock").hide("clip", 400, function(){
			$(".planEventBlock").show("drop", {direction: "left"}, 500);
			currentPage = "event";
		});
	})

	$("body").on("click", ".findCoupleButton", function(){
		$(".dashboardBlock").hide("clip", 400, function(){
			$(".findCoupleBlock").show("drop", {direction: "right"}, 500);
			currentPage = "couple";
		});
	})

	$("body").on("click", ".navbar-brand", function(){
		if ("currentPage" !== "dashboard"){
			$(".findCoupleBlock").hide("clip", 400);
			$(".planEventBlock").hide("clip", 400);
			$(".profileBlock").hide("clip", 400);
			$(".chatBlock").hide("clip", 400);
			resetFields();

			setTimeout(function(){
				$(".dashboardBlock").show("drop", {direction: "down"}, 400);
				currentPage = "dashboard";
			}, 500);
		}

	});

	$("body").on("click", ".profileNavButton", function(){
		$(".findCoupleBlock").hide("clip", 400);
		$(".planEventBlock").hide("clip", 400);
		$(".dashboardBlock").hide("clip", 400);
		$(".chatBlock").hide("clip", 400);
		resetFields();

		setTimeout(function(){
			$(".profileBlock").show("drop", {direction: "down"}, 400 );
			currentPage = "profile";
		}, 500);
	});

	$("body").on("click", ".mailButton", function(){
		$(".findCoupleBlock").hide("clip", 400);
		$(".planEventBlock").hide("clip", 400);
		$(".dashboardBlock").hide("clip", 400);
		$(".profileBlock").hide("clip", 400);
		resetFields();

		setTimeout(function(){
			$(".chatBlock").show("drop", {direction: "down"}, 400 );
			currentPage = "mail";
		}, 500);
	});
})



