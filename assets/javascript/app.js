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

	var dataRef = firebase.database(event);


	// var myUserID;

	firebase.auth().onAuthStateChanged((user) => {
	  if (user) {
	    myUserID = user.uid;

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

	    	//update profile page to latest version of profile
	    	$(".myUsername").text(snapshot.val().coupleUsername);
	    	$(".myEmail").text(snapshot.val().coupleEmail);
	    	$(".myZip").val(snapshot.val().zipcode);
	    	$(".profilePic").attr("src", snapshot.val().imgURL);
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
		var modalContent = $("<div>").addClass("modalContent").append("<span class='close'>&times;</span>")
		var uid = $(this).attr("data-uid");
		dataRef.ref("Users/" + myUserID + "/events/" + uid).once("value").then(function(snapshot){
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

	$("body").on("click", ".close", function(){
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


	distanceMatrixCall();

	function isDistanceMatch(){
		for (var i=0; i<distanceArray.length; i++) {
			if (distanceArray[i] > searchCriteria.distance) {
				match = false;
			} else {
				match= true;
			}
		}

	};

	isDistanceMatch();

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


	// 	return Promise.all(zipPromises);

	// };


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
	            // console.log(((criteria.ageLow <= userToComp.Age2 <= criteria.ageHigh)));
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

	    if (match){
	        return true;
	    }
	    else {
	        return false;
	    };
	};

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

				// console.log(latOfZip + "," + longitudeOfZip);

				// $.ajax({
				// 	url: "https://api.cinepass.de/v4/cinemas/",
				// 	type: "GET",
				// 	data: {
				// 	// "location": latOfZip + "," + longitudeOfZip,
				// 	"location": "-122.26,37.81",
				// 	"distance": "500"
				// 	},
				// 	headers: {
				// 	"X-API-Key": "cZXFWHhuyCzLTfxJmLt5BHpNNNwXDdYW",
				// 	},
				// })
				// .done(function(data, textStatus, jqXHR) {
				// 	console.log("HTTP Request Succeeded: " + jqXHR.status);
				// 	console.log(data);
				// })
				// .fail(function(jqXHR, textStatus, errorThrown) {
				// console.log("HTTP Request Failed" + errorThrown);
				// })
				// .always(function() {
				// /* ... */
				// });

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

	$(".friendFindSubmit").on("click", function(){
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
			interest: interestsObj
		}

		console.log(searchCriteria);
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
		})
		ohSnap('Profile Updated!', {color: 'red'});
		
	})

	$(".signUpButton").on("click", function(event){
		event.preventDefault();

		dataRef.ref("Users/" + myUserID).update({
			imgURL: $(".inputField").val()
		})

		
	})

})



