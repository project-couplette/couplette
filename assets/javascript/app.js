$(function(){
	// Initialize Firebase
	var config = {
		// apiKey: "AIzaSyD1UCXTw5xWE5WehTfqh0AK-K2asMyf4S4",
	 //    authDomain: "couplette-b67ce.firebaseapp.com",
	 //    databaseURL: "https://couplette-b67ce.firebaseio.com",
	 //    projectId: "couplette-b67ce",
	 //    storageBucket: "couplette-b67ce.appspot.com",
	 //    messagingSenderId: "934836634497"
	};


	// Jberry testing firebase
	var config = {
		apiKey: "AIzaSyDA-yVtB_lDDz6BiVDmC7Dm1BMACJdWFXQ",
		authDomain: "berrytendo.firebaseapp.com",
		databaseURL: "https://berrytendo.firebaseio.com",
		projectId: "berrytendo",
		storageBucket: "berrytendo.appspot.com",
		messagingSenderId: "328422244178"
	};


	firebase.initializeApp(config);

	var dataRef = firebase.database();

	var myUserID;
	var myZipCode;
	var status = "dashboard";

	var eventInvite = {};
	var distanceOfUsers = "";

	firebase.auth().onAuthStateChanged((user) => {
	  if (user) {
	    myUserID = user.uid;

	    	dataRef.ref('Users/' + myUserID + '/interests/film').remove();
			dataRef.ref('Users/' + myUserID + '/interests/').update({films: true});
			dataRef.ref('Users/' + myUserID).update({username: "theBerrys"});

	    dataRef.ref("Users/" + myUserID + "/events").on("child_added", function(snapshot){
	    	//adds events to user's dashboard
	    	var eventDiv = $("<div>").addClass("eventSection")
	    	.append("<h3>" + snapshot.val().eventName + "</h3>")
	    	.append("<h4>" + snapshot.val().eventDate + "</h4>")
	    	.append("<h4>" + snapshot.val().eventTime + "</h4>")
	    	.append("<h4>" + snapshot.val().eventAddress + "</h4>")
	    	.attr("data-UID", snapshot.key);
	    	$(".upcomingEventSection").append(eventDiv);
	    })

	    dataRef.ref("Users/" + myUserID).once("value").then(function(snapshot){
	    	//adds events to user's dashboard
	    	ohSnap('Welcome back, ' + snapshot.val().coupleUsername, {color: 'red'});
	    	myZipCode = snapshot.val().zipcode;

	    	//update profile page to latest version of profile
	    	$(".myUsername").text(snapshot.val().coupleUsername);
	    	$(".myEmail").text(snapshot.val().coupleEmail);
	    	$(".myZip").val(snapshot.val().zipcode);
	    	$(".profilePic").attr("src", snapshot.val().imgURL);
	    	$(".profileIMGURL").val(snapshot.val().imgURL);
	    	$(".partner1FName").val(snapshot.val().firstName1);
	    	$(".partner1LName").val(snapshot.val().lastName1);
	    	$(".partner1Age").val(snapshot.val().age1);
	    	$(".partner2FName").val(snapshot.val().firstName2);
	    	$(".partner2LName").val(snapshot.val().lastName2);
	    	$(".partner2Age").val(snapshot.val().age2);
	    	$(".coupleDescription").text(snapshot.val().description);

	    	var interestsKeys = Object.keys(snapshot.val().interests)

	    	for (var i = 0; i < interestsKeys.length; i++){
	    		$("#profile" + interestsKeys[i]).attr("data-selected", snapshot.val().interests[interestsKeys[i]])
	    		if ($("#profile" + interestsKeys[i]).attr("data-selected") === "true"){
		  			$("#profile" + interestsKeys[i]).css("background", "#ffa9be")
					.css("border", "1px solid #c4536f")
	    		}
	    	}
	    })

	  }
	});

	$("body").on("click", ".eventSection", function(){
		var eventModal = $("<div>").addClass("modals");
		var modalContent = $("<div>").addClass("modalContent").append("<span class='close eventmodalClose'>&times;</span>")
		var uid = $(this).attr("data-uid");

		dataRef.ref("Users/" + myUserID + "/events/" + uid).once("value").then(function(snapshot){
			eventInvite = {
				eventName: snapshot.val().eventName,
				eventDate: snapshot.val().eventDate,
				eventTime: snapshot.val().eventTime,
				eventAddress: snapshot.val().eventAddress
			}
			modalContent.append("<h3>"+ snapshot.val().eventName + "</h3>")
			.append("<button class='buttonStyle removeButton' data-eventID='" + uid + "'>Remove Event</button>")
			.append("<button class='buttonStyle inviteButton' data-eventID='" + uid + "'>Invite Couple</button>")
			.appendTo(eventModal);
			eventModal.appendTo("body");
			eventModal.fadeIn("fast", function(){
				modalContent.show("clip", "fast");
			})
		})
	})

	$("body").on("click", ".inviteButton", function(){
		$(this).closest(".modalContent").hide("clip", "fast", function(){
			$(this).closest(".modals").fadeOut("fast", function(){
				$(this).closest(".modals").remove();
				$(".friendList").fadeIn("fast", function(){
					$(".friendModalContent").show("clip", "fast");
				})
			})
		});

		status = "eventInvite";
		
	})



	$("body").on("click", ".eventmodalClose", function(){
		$(this).closest(".modalContent").hide("clip", "fast", function(){
			$(this).closest(".modals").fadeOut("fast", function(){
				$(this).closest(".modals").remove();
			})
		});
	})

	$("body").on("click", ".removeButton", function(){
		dataRef.ref("Users/" + myUserID + "/events/" + $(this).attr("data-eventID")).remove();
		$(".upcomingEventSection").find("[data-uid='" +  $(this).attr("data-eventID") + "']").remove()
		ohSnap('This event has been deleted!', {color: 'red'});
		$(this).closest(".modalContent").hide("clip", "fast", function(){
			$(this).closest(".modals").fadeOut("fast", function(){
				$(this).closest(".modals").remove();
			})
		});
	})


 	// dataRef.ref("Users/8hzc7ctaLHf4g6tvYXT6aprss2K2").set({
		// 	firstName1: "Jib",
		// 	firstName2: "Val",
		// 	lastName1: "B",
		// 	lastName2: "B",
		// 	coupleEmail: "jonpber@gmail.com",
		// 	zipcode: 94612,
		// 	description: "blah blah blah",
		// 	Interests: {
		// 		Arts: true,
		// 		Dining: true,
		// 		Films: true,
		// 		Music: true,
		// 		Gaming: true,
		// 		Outdoors: false,
		// 		Travel: true,
		// 		sports: false,
		// 	},
		// 	age1: 29,
		// 	age2: 30,
		// 	coupleUsername: "theBerrys",
		// 	comment: "comment",
		// 	// dateAdded: firebase.database.ServerValue.TIMESTAMP
		// });



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
		dataRef.ref().push({
			firstName1: firstName1,
			firstName2: firstName2,
			lastName1: lastName1,
			lastName2: lastName2,
			coupleEmail: coupleEmail,
			password: password,
			confirmPassword: confirmPassword,
			zipcode: zipcode,
			description: description,
			Interests: {
				Arts: arts,
				Dining: dining,
				Films: films,
				Music: music,
				Gaming: gaming,
				Outdoors: outdoor,
				Travel: travel,
				other: other,
			},
			age: age,
			coupleUsername: coupleUsername,
			comment: comment,
			// dateAdded: firebase.database.ServerValue.TIMESTAMP
		});
	});

	//Google Maps API Call
	function distanceMatrixCall(zipcode2) {
		var googleQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + myZipCode + "&key=AIzaSyBh0G9RiMPn-rZTMnKHh5i8aPNGMrVHifE";
		// console.log(googleQueryURL);
		var zipcode2city = "";
		var zipcode2state = "";
		var zipcode2lat = [];
		var zipcode2long = [];
		console.log(zipcode2);
		$.ajax({
		  crossDomain: true,
		  url: googleQueryURL,
		  method: "GET"
		}).done(function(response) {
			// console.log('working');
			var zipcode1city = response.results[0].address_components[1].long_name;
			var zipcode1state = response.results[0].address_components[2].long_name;
			var zipcode1lat = parseInt(response.results[0].geometry.location.lat);
			var zipcode1long = parseInt(response.results[0].geometry.location.lng);
			zipCodeConverter(zipcode2)
			  .then(function() {
				// zipCodeMatcher();
				// function zipCodeMatcher()
				// for (var j=0; j < cityArray.length; j++) {
				// console.log(cityArray[j]);
				// console.log("working");
				var origin1 = new google.maps.LatLng(zipcode1lat, zipcode1long);
				var origin2 = "" + zipcode1city + "," + "" + zipcode1state;
				var destinationA = zip.responseJSON.results[0].address_components[1].short_name + "," + zip.responseJSON.results[0].address_components[3].short_name;
				var destinationB = new google.maps.LatLng(zip.responseJSON.results[0].geometry.location.lat, zip.responseJSON.results[0].geometry.location.lng);
				var service = new google.maps.DistanceMatrixService();
				// console.log(origin1, origin2, destinationB, destinationA);
				service.getDistanceMatrix(
				  {
				  	origins: [origin1, origin2],
	    			destinations: [destinationA, destinationB],
				    travelMode: 'DRIVING',
				  }, callback);

				function callback(response, status) {
					// console.log(response.rows[0].elements[0]);
					var num = response.rows[0].elements[0].distance.text.replace(/[^0-9]/g,'');
					var milesConverted = (parseInt(num)*0.621371);
					distanceOfUsers = milesConverted;
					console.log(distanceOfUsers);
					return milesConverted;
					// console.log(distanceArray);
				};
			});
		});
	};

	function zipCodeConverter(zipcode2) {
		// getFirebaseData();
		// var testZipCodeArray = [95050, 91350, 94110];
		var zipPromises = [];
		// for (var i=0; i<testZipCodeArray.length; i++) {
		// var googleQueryURLLoop = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + testZipCodeArray[i] + "&key=AIzaSyBh0G9RiMPn-rZTMnKHh5i8aPNGMrVHifE";
		var googleQueryURLLoop = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipcode2 + "&key=AIzaSyBh0G9RiMPn-rZTMnKHh5i8aPNGMrVHifE";
		//Google Maps API Call
			zip = $.ajax({
			  crossDomain: true,
			  url: googleQueryURLLoop,
			  method: "GET"
			}).done(function(response) {
				var zipcode2city = response.results[0].address_components[1].long_name;
				var zipcode2state = response.results[0].address_components[2].long_name;
				var zipcode2lat = parseFloat(response.results[0].geometry.location.lat);
				var zipcode2long = parseFloat(response.results[0].geometry.location.lng);
				// cityArray.push(cityConverted);
				// stateArray.push(stateConverted);
				// latArray.push(latitude);
				// lngarray.push(longitude);
			});
			zipPromises.push(zip);

			return Promise.all(zipPromises);
		};

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
	        if (userToComp.interests[tempArray[i]].toString() == criteria.interests[tempArray[i]].toString() && criteria.interests[tempArray[i]].toString() === "true"){
	            match = true;

	        }
	    }

	    //check for age

	    if (criteria.ageLow !== "No"){
	        if (criteria.ageLow === 55){
	            if (!(criteria.ageLow <= userToComp.age1)){
	            	console.log("age is not match")
	                match = false;
	            }
	            if (!(criteria.ageLow <= userToComp.age2)){
	            	console.log("age is not match")
	                match = false;
	            }
	        }
	        else {
	            // console.log(((criteria.ageLow <= userToComp.Age2 <= criteria.ageHigh)));
	            if (!(criteria.ageLow <= userToComp.age1 && userToComp.age1 <= criteria.ageHigh)){
	            	console.log("age is not match")
	            match = false
	            }
	            if (!(criteria.ageLow <= userToComp.age2 && userToComp.age2 <=criteria.ageHigh)){
	            	console.log("age is not match")
	            match = false
	            }
	        }
	    }
	    if (criteria.gender !== "nocare"){
	        if (criteria.gender !== userToComp.gender){
	        	console.log("gender is not match")
	            match = false;
	        }
	    }
	    //toCompareDistances
		var googleQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + myZipCode + "&key=AIzaSyBh0G9RiMPn-rZTMnKHh5i8aPNGMrVHifE";
		// console.log(googleQueryURL);

		// $.ajax({
		// 	url: "https://www.zipcodeapi.com/rest/aGAWdlBPe49SCqrwuJqnsNFxLWCKtRaDyKAM6cBlgLdScFpGpP3RDJooG199TjNr/distance.json/94612/90210/miles.",
		// 	dataType: "json"
		// }).done(function(response){
		// 	console.log(response);
		// })

		$.ajax({
		  crossDomain: true,
		  url: googleQueryURL,
		  method: "GET"
		}).done(function(response) {
			// console.log('working');
			var zipcode1city = response.results[0].address_components[1].long_name;
			var zipcode1state = response.results[0].address_components[2].long_name;
			var zipcode1lat = parseInt(response.results[0].geometry.location.lat);
			var zipcode1long = parseInt(response.results[0].geometry.location.lng);
			zipCodeConverter(userToComp.zipcode)
			  .then(function() {
				var origin1 = new google.maps.LatLng(zipcode1lat, zipcode1long);
				var origin2 = "" + zipcode1city + "," + "" + zipcode1state;
				var destinationA = zip.responseJSON.results[0].address_components[1].short_name + "," + zip.responseJSON.results[0].address_components[3].short_name;
				var destinationB = new google.maps.LatLng(zip.responseJSON.results[0].geometry.location.lat, zip.responseJSON.results[0].geometry.location.lng);
				var service = new google.maps.DistanceMatrixService();
				// console.log(origin1, origin2, destinationB, destinationA);
				service.getDistanceMatrix(
				  {
				  	origins: [origin1, origin2],
	    			destinations: [destinationA, destinationB],
				    travelMode: 'DRIVING',
				  }, callback);

				function callback(response, status) {
					// console.log(response.rows[0].elements[0]);
					var num = response.rows[0].elements[0].distance.text.replace(/[^0-9]/g,'');
					var milesConverted = (parseInt(num)*0.621371);
					console.log(userToComp.zipcode)
					console.log(milesConverted);

					if (milesConverted > criteria.distance && criteria.distance !== "NoCare" && criteria.distance !== null){
				   		match = false;
				   	}

				    if (match){
				        $(".friendsFound").append("<h2>" + userToComp.coupleUsername + "</h2>");
				        console.log("adding " + userToComp.coupleUsername)

								// console.log(distanceArray);
							};
						};
		});

	})
}



	function collectUser(criteria){
	    dataRef.ref("Users").once("value", function(snapshot){
	        var users = snapshot.val();
	        var userNameArray = Object.keys(users);
	        for (var i = 0; i < userNameArray.length; i++){
	        	if (myUserID !== userNameArray[i]){
	        		// console.log("testing " + users[userNameArray[i]].coupleUsername)
	        		var key = userNameArray[i];
	        		console.log(users[key])
	        		var userToCheck = users[userNameArray[i]]
	        		console.log("testing " + userToCheck.coupleUsername)
		            matchUser(criteria, userToCheck);
	       		}
	        }
	       
	    })
	};
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
		$(".filmEvent").slideUp("fast");
		$(".meetingTimes").slideUp("fast");
		$(".diningType").slideUp("fast");
		$(".eventSubmit").slideUp();
		if ($(this).val() === "EventDefault"){
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

	$(".theaterDrop").on("change", function(){
		if ($(this).val() === "EventDefault"){
			$(".meetingTimes").slideUp("fast");
		}

		else {
			$(".meetingTimes").slideDown("normal");
		}

	});

	$(".diningOptionsDrop").on("change", function(){
		if ($(this).val() === "EventDefault"){
			$(".meetingTimes").slideUp("fast");
		}

		else {
			$(".meetingTimes").slideDown("normal");
		}

	});

	$(".meetingTimeInput").on("keyup", function(){
		var timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

		if (timeRegex.test($(this).val())){
			$(".eventSubmit").slideDown();
		}

		else {
			$(".eventSubmit").slideUp();
		}
	})


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

	$("body").on("click", ".eventSubmit", function(){
		var time = $(".meetingTimeInput").val();
		var address;
		var date = $("#dateEvent").val();
		var name;
		if ($(".eventType").val() === "Film"){
			address = $(".theaterDrop").val();
			name = "Film night!";
		}

		else {
			address = $(".diningOptionsDrop").val();
			name = "Dining out!";
		}

		dataRef.ref("Users/" + myUserID + "/events").push({
			eventTime: time,
			eventDate: date,
			eventAddress: address,
			eventName: name
		});

		$(".findCoupleBlock").hide("clip", 400);
		$(".planEventBlock").hide("clip", 400);
		$(".profileBlock").hide("clip", 400);
		$(".chatBlock").hide("clip", 400);
		resetFields();

		setTimeout(function(){
			$(".dashboardBlock").show("drop", {direction: "down"}, 400);
			currentPage = "dashboard";
		}, 500);

		ohSnap("Event Added!", {color: 'red'});
	})

	function resetFields(){
		$("input").val("");
		$(".eventTypeBlock").hide();
		$(".eventZipcode").hide();
		$(".filmEvent").hide();
		$(".diningEvent").hide();
		$(".diningType").hide();
		$(".meetingTimes").hide();
		$(".eventSubmit").hide()
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

		setTimeout(function(){
			$(".profileBlock").show("drop", {direction: "down"}, 400 );
			currentPage = "profile";
		}, 500);
	});

	$("body").on("click", ".mailButton", function(){
		// $(".findCoupleBlock").hide("clip", 400);
		// $(".planEventBlock").hide("clip", 400);
		// $(".dashboardBlock").hide("clip", 400);
		// $(".profileBlock").hide("clip", 400);
		// resetFields();

		// setTimeout(function(){
		// 	$(".chatBlock").show("drop", {direction: "down"}, 400 );
		// 	currentPage = "mail";
		// }, 500);
	});

	dataRef.ref('Users/' + myUserID + "/friends").on("value", function(snapshot){
		if (snapshot.val() !== null){
			$(".friendModalContent").empty().append("<span class='close friendClose'>&times;</span>")
			.append("<h2>Friend List</h2>")
			var names = Object.keys(snapshot.val());

			dataRef.ref("Users").once("value").then(function(snap1){
				for (var i = 0; i < names.length; i++){
					var friendDiv = $("<div>").addClass("friendDiv")
					.append("<img src=" + snap1.val()[names[i]].profile + " class='smallProfile'>")
					.append("<h3 class='friendUN'>"+ snap1.val()[names[i]].username + "</h3>")
					.attr("data-uid", names[i])
					.appendTo($(".friendModalContent"))
				}
			})
		}
	})

	$("body").on("click", ".friendsNavButton", function(){
		$(".friendList").fadeIn("fast", function(){
			$(".friendModalContent").show("clip", "fast");
		})
	});

	$("body").on("click", ".friendClose", function(){
		$(this).closest(".modalContent").hide("clip", "fast", function(){
			$(this).closest(".modals").fadeOut("fast", function(){
			})
		});
	})

	dataRef.ref("Users/" + myUserID)

	$("body").on("click", ".friendDiv", function(){
		var uid = $(this).attr("data-uid");
		if (status === "eventInvite"){
			ohSnap("Your friend is invited!", {color: "red"})
			dataRef.ref("Users/" + uid + "/eventRequests").push(eventInvite);
			$(this).closest(".modalContent").hide("clip", "fast", function(){
				$(this).closest(".modals").fadeOut("fast", function(){
			})

			status = "dashboard";
		});
		}

		else {
		$(this).closest(".friendModalContent").hide("clip", "fast", function(){
			dataRef.ref("Users/" + uid).once("value").then(function(snapshot){
			$(".friendUsername").text(snapshot.val().username);
			$(".friendProfilePic").attr("src", snapshot.val().profile)
			$(".friendProfile").show("clip", "fast")
			})
		});
		}
	})

	$("body").on("click", ".friendBack", function(){
		$(this).closest(".friendProfile").hide("clip", "fast", function(){
			$(".friendModalContent").show("clip", "fast")
		});
	})

	$(".friendFindSubmit").on("click", function(){
		// console.log(distanceMatrixCall(94612, 91384));

		var distance = $(".distanceCriteriaSelect").val();
		var age = $(".ageCriteriaSelect").val();
		var gender = $(".genderCriteriaSelect").val().toLowerCase();
		var interests = $(".interestsSelect").children().children();
		var interestsObj = {}

		for (var i = 0; i < interests.length; i++){
			interestsObj[$(interests[i]).text().toLowerCase()] = $(interests[i]).attr("data-selected");
		}

		var searchCriteria = {
			ageLow: age[0] + age[1],
			ageHigh: age[2] + age[3],
			gender: gender,
			distance: distance,
			interests: interestsObj
		}

		dataRef.ref("Users/" + myUserID).once("value").then(function(snapshot){
			dataRef.ref("Users/fhdjksfhdls").once("value").then(function(snapshot1){
				// console.log(snapshot1.val())
				collectUser(searchCriteria)
			})
		})
		
	})

	$("body").on("click", ".saveChanges", function(){
		dataRef.ref("Users/" + myUserID).once("value").then(function(snapshot){

			var interests = $(".profileInterests").children().children();
			var interestsObj = {}

			for (var i = 0; i < interests.length; i++){
				interestsObj[$(interests[i]).text().toLowerCase()] = $(interests[i]).attr("data-selected");
			}

			var updateProfileInfo = {
				coupleUsername: snapshot.val().coupleUsername,
				coupleEmail: snapshot.val().coupleEmail,
				age1: $(".partner1Age").val(),
				age2: $(".partner2Age").val(),
				description: $(".coupleDescription").val(),
				firstName1: $(".partner1FName").val(),
				lastName1: $(".partner1LName").val(),
				firstName2: $(".partner2FName").val(),
				lastName2: $(".partner2LName").val(),
				interests: interestsObj,
				zipcode: $(".myZip").val(),
				imgURL: $(".profileIMGURL").val()
			}
			dataRef.ref("Users/" + myUserID).update(updateProfileInfo);
			$(".profilePic").attr("src", $(".profileIMGURL").val());
			myZipCode = $(".myZip").val();
		})
		ohSnap('Profile Updated!', {color: 'red'});
	})

	$(".signUpButton").on("click", function(event){
		event.preventDefault();

		dataRef.ref("Users/" + myUserID).update({
			imgURL: $(".inputField").val()
		})
	})

	$(".logOut").on("click", function(event){
		console.log("click")

		firebase.auth().signOut().then(function() {
			window.location = "index.html"
		}, function(error) {
		});
	})

})



