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


	//When the user logs in, handles updating the page with events, friends, event requests, and friend requests.
	firebase.auth().onAuthStateChanged((user) => {
	  if (user) {
	    myUserID = user.uid;

    	dataRef.ref("Users/" + myUserID + "/friendRequests").on("child_added", function(snapshot){
		// console.log(snapshot.val());
			dataRef.ref("Users/" + snapshot.val().inviter).once("value").then(function(snapshot1){
				var friendDiv = $("<div>").append("<h3 class='requestDiv'>" + snapshot1.val().coupleUsername + "</h3>")
				.attr("data-key", snapshot.val().inviter)
				.appendTo(".friendRequestsDiv");
			})

		})

	   	dataRef.ref("Users/" + myUserID + "/eventRequests").on("child_added", function(snapshot){
			var eventDiv = $("<div>").attr("data-key", snapshot.val().inviter)
	    	.attr("data-name", snapshot.val().eventName)
	    	.attr("data-date", snapshot.val().eventDate)
	    	.attr("data-time", snapshot.val().eventTime)
	    	.attr("data-UID", snapshot.key)
	    	.attr("data-address", snapshot.val().eventAddress).append("<h3 class='RequestEventDiv'>" + snapshot.val().eventName + " at " + snapshot.val().eventAddress + 
			" on " + snapshot.val().eventDate + "</h3>")
	
			.appendTo(".eventRequestsDiv");
		})

		dataRef.ref("Users/" + myUserID + "/friendRequests").on("value", function(snap2){
			if (snap2.val() !== null){
				var numOfRequests = Object.keys(snap2.val());
				if (numOfRequests.length === 1){
					$(".glyphicon-envelope").css("color", "#ffb880");
					ohSnap("You have a new request!", {color: "red", duration: 2500});
				}

				else if (numOfRequests.length >= 1) {
					$(".glyphicon-envelope").css("color", "#ffb880");
				}

				else {
					$(".glyphicon-envelope").css("color", "white");
				}
			}

			else {
				$(".glyphicon-envelope").css("color", "white");
			}

		})

		dataRef.ref("Users/" + myUserID + "/eventRequests").on("value", function(snap2){
			if (snap2.val() !== null){
				var numOfRequests = Object.keys(snap2.val());
				if (numOfRequests.length === 1){
					$(".glyphicon-envelope").css("color", "#ffb880");
					ohSnap("You have a new request!", {color: "red", duration: 2500});
				}

				else if (numOfRequests.length >= 1) {
					$(".glyphicon-envelope").css("color", "#ffb880");
				}

				else {
					$(".glyphicon-envelope").css("color", "white");
				}
			}

			else {
				$(".glyphicon-envelope").css("color", "white");
			}
				
		})

	    dataRef.ref("Users/" + myUserID + "/events").on("child_added", function(snapshot){
	    	//adds events to user's dashboard
	    	var eventDiv = $("<div>").addClass("eventSection")
	    	.append("<h3>" + snapshot.val().eventName + "</h3>")
	    	.append("<h4>" + snapshot.val().eventDate + "</h4>")
	    	.append("<h4>" + snapshot.val().eventTime + "</h4>")
	    	.append("<h4>" + snapshot.val().eventAddress + "</h4>")
	    	.attr("data-UID", snapshot.key)
	    	$(".upcomingEventSection").append(eventDiv);
	    })

	    dataRef.ref("Users/" + myUserID).once("value").then(function(snapshot){
	    	//adds events to user's dashboard
	    	ohSnap('Welcome back, ' + snapshot.val().coupleUsername, {color: 'red', duration: 2500});
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

    	dataRef.ref('Users/' + myUserID + "/friends").on("value", function(snapshot){
			if (snapshot.val() !== null){
				$(".friendModalContent").empty().append("<span class='close friendClose'>&times;</span>")
				.append("<h2>Friend List</h2>")
				var names = Object.keys(snapshot.val());

				dataRef.ref("Users").once("value").then(function(snap1){
					for (var i = 0; i < names.length; i++){
						var friendDiv = $("<div>").addClass("friendDiv")
						.append("<img src=" + snap1.val()[names[i]].imgURL + " class='smallProfile'>")
						.append("<h3 class='friendUN'>"+ snap1.val()[names[i]].coupleUsername + "</h3>")
						.attr("data-uid", names[i])
						.appendTo($(".friendModalContent"))
					}
				})
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
		ohSnap('This event has been deleted!', {color: "red", duration: 2500});
		$(this).closest(".modalContent").hide("clip", "fast", function(){
			$(this).closest(".modals").fadeOut("fast", function(){
				$(this).closest(".modals").remove();
			})
		});
	})



	// // Initial Values
	// var firstName1 = "";
	// var firstName2 = "";
	// var lastName1 = "";
	// var lastName2 = "";
	// var coupleEmail = "";
	// var password = "";
	// var confirmPassword = "";
	// var zipcode = "";
	// var picture = "";
	// var description = "";
	// var arts = ""
	// var dining = "";
	// var films = "";
	// var music = "";
	// var gaming = "";
	// var outdoor = "";
	// var travel = "";
	// var other = "";
	// var age = 0;
	// var comment = "";
	// var coupleUsername = "";
	// var cityArray = [];
	// var stateArray = [];
	// var latArray = [];
	// var lngarray = [];
	// var distanceArray = [];
	// var potentialMatch = [];

	// $("#button").on("click", function(event) {
	// 	event.preventDefault();
	// 	// Code in the logic for storing and retrieving the most recent user.
	// 	firstName1 = $("#name-input").val().trim();
	// 	firstName2 = $("#name-input2").val().trim();
	// 	lastName1 = $("#last-input").val().trim();
	// 	lastName2 = $("#last-input2").val().trim();
	// 	coupleEmail = $("#email-address").val().trim();
	// 	password = $("#pass").val().trim();
	// 	confirmPassword = $("#confirm-pass").val().trim();
	// 	zipcode = $("#zipcode").val().trim();
	// 	description = $("#textarea").val().trim();
	// 	arts = $("#artsbox").val().trim();
	// 	dining = $("#diningbox").val().trim();
	// 	films = $("#filmsbox").val().trim();
	// 	music = $("#musicbox").val().trim();
	// 	gaming = $("#gamingbox").val().trim();
	// 	outdoor = $("#outdoorbox").val().trim();
	// 	travel = $("#travelbox").val().trim();
	// 	other = $("#otherbox").val().trim();
	// 	age = $("#age-input").val().trim();
	// 	comment = $("#comment-input").val().trim();
	// 	coupleUsername = $("#couple-username").val().trim();
	// 	// Code for the push
	// 	dataRef.ref().push({
	// 		firstName1: firstName1,
	// 		firstName2: firstName2,
	// 		lastName1: lastName1,
	// 		lastName2: lastName2,
	// 		coupleEmail: coupleEmail,
	// 		password: password,
	// 		confirmPassword: confirmPassword,
	// 		zipcode: zipcode,
	// 		description: description,
	// 		Interests: {
	// 			Arts: arts,
	// 			Dining: dining,
	// 			Films: films,
	// 			Music: music,
	// 			Gaming: gaming,
	// 			Outdoors: outdoor,
	// 			Travel: travel,
	// 			other: other,
	// 		},
	// 		age: age,
	// 		coupleUsername: coupleUsername,
	// 		comment: comment,
	// 		// dateAdded: firebase.database.ServerValue.TIMESTAMP
	// 	});
	// });

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

	function matchUser (criteria, userToComp, userkey){
	    var match = false;
	    var tempArray = Object.keys(criteria.interests);
	    for (var i = 0; i < tempArray.length; i++){
	        if (userToComp.interests[tempArray[i]].toString() == criteria.interests[tempArray[i]].toString() && criteria.interests[tempArray[i]].toString() === "true"){
	            match = true;
	        }
	    }

	    if (!match){

	    }

	    //check for age

	    if (criteria.ageLow !== "No"){
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
	    if (criteria.gender !== "nocare"){
	        if (criteria.gender !== userToComp.gender){
	            match = false;
	        }
	    }
	    //toCompareDistances
		var googleQueryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + myZipCode + "&key=AIzaSyBh0G9RiMPn-rZTMnKHh5i8aPNGMrVHifE";
		// console.log(googleQueryURL);

		$.ajax({
			url: "https://www.zipcodeapi.com/rest/js-yRVPK4c0dFARFe2ZU0sFK0ClegRY8m8He4wZ8J0moBd4Pg3Jhwp2x1nLieJqBS8Q/distance.json/" + myZipCode + "/" + userToComp.zipcode +"/miles",
			dataType: "json"
		}).done(function(response){
			// console.log(response);
			if (response.distance > criteria.distance && criteria.distance !== "NoCare" && criteria.distance !== null){
		   		match = false;
		   	}

		    if (match){
		    	var div = $("<div>").append("<img src=" + userToComp.imgURL + " class='smallProfile'>")
		    	.append("<h3>" + userToComp.coupleUsername + "</h3>")
		    	.addClass("userSearchDiv")
		    	.attr("data-key", userkey)
		    	.appendTo(".couplesFoundModalContent")

		    	setTimeout(function(){
					$(".couplesFound").show("fade")	
			        $(".couplesFoundModal").show("clip")	
		    	}, 500)
				}
		})

		
	}

	$("body").on("click", ".userSearchDiv", function(){
		var key = $(this).attr("data-key")
		dataRef.ref("Users/" + key).once("value").then(function(snap1){
			$(".friendFProfilePic").attr("src", snap1.val().imgURL);
			$(".friendRUsername").text(snap1.val().coupleUsername);
			$(".Fp1Name").text(snap1.val().firstName1 + " " + snap1.val().lastName1);
			$(".Fp2Name").text(snap1.val().firstName2 + " " + snap1.val().lastName2);
			$(".FcoupleRDescription").text(snap1.val().description);
			$(".addFriend").attr("data-keyToInvite", key)
			.attr("data-keyInviter", myUserID);
			$(".couplesFoundModal").hide("clip", function(){
				$(".searchProfileModal").show("clip");
			})
		})
	})

	$("body").on("click", ".addFriend", function(){
		dataRef.ref("Users/" + $(this).attr("data-keyToInvite") + "/friendRequests").push({
			inviter: $(this).attr("data-keyInviter")
		})

		ohSnap("Friend request sent!", {color: "red", duration: 2500});
	})

	$("body").on("click", ".searchBack", function(){
		$(".searchProfileModal").hide("clip", function(){
			$(".couplesFoundModal").show("clip")
		})
	})

	$("body").on("click", ".RequestEventDiv", function(){
		$(".eventName").text($(this).parent().attr("data-name"));
		$(".eventDate").text($(this).parent().attr("data-date"));
		$(".eventTime").text($(this).parent().attr("data-time"));
		$(".eventAddress").text($(this).parent().attr("data-address"));

		$(".eventAdd").attr("data-key", $(this).parent().attr("data-uid"));
		$(".eventAdd").attr("data-date", $(this).parent().attr("data-date"));
		$(".eventAdd").attr("data-time", $(this).parent().attr("data-time"));
		$(".eventAdd").attr("data-name", $(this).parent().attr("data-name"));
		$(".eventAdd").attr("data-address", $(this).parent().attr("data-address"));

		
		$(".friendRequestsModalContent").hide("clip", function(){
			$(".eventProfile").show("clip")
		})
	})

	$("body").on("click", ".eventAdd", function(){
		var time = $(this).attr("data-time");
		var key = $(this).attr("data-key");
		console.log(key);
		var name = $(this).attr("data-name");
		var date = $(this).attr("data-date");
		var address = $(this).attr("data-address");
		dataRef.ref("Users/" + myUserID + "/eventRequests/" + key).remove();

		dataRef.ref("Users/" + myUserID + "/events").push({
			eventTime: time,
			eventDate: date,
			eventAddress: address,
			eventName: name
		});

		ohSnap("Event Added!", {color: "red", duration: 2500})
		$(".friendRequestsModalContent").hide("clip", function(){
		})
		$(".friendRequests").hide("fade")
	})

	function collectUser(criteria){
		$(".couplesFoundModalContent").empty();
	    dataRef.ref("Users").once("value", function(snapshot){
	        var users = snapshot.val();
	        var userNameArray = Object.keys(users);
	        for (var i = 0; i < userNameArray.length; i++){
	        	if (myUserID !== userNameArray[i]){
	        		// console.log("testing " + users[userNameArray[i]].coupleUsername)
	        		var key = userNameArray[i];
	        		var userToCheck = users[userNameArray[i]]
		            matchUser(criteria, userToCheck, userNameArray[i]);
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
			$(".diningType").slideUp("fast");
			$(".eventSubmit").slideUp("fast");
			$(".eventName").slideUp("fast");
		}
	})



	//adding dynamic page updates based on event select dropdown option
	$(".eventType").on("change", function(){
		$(".filmEvent").slideUp("fast");
		$(".meetingTimes").slideUp("fast");
		$(".diningType").slideUp("fast");
		$(".eventSubmit").slideUp("fast");
		$(".eventName").slideUp("fast");

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
			$(".eventName").slideDown();
		}

		else {
			$(".eventName").slideUp();
		}
	});

	$(".eventNameInput").on("keyup", function(){
		if ($(this).val() !== ""){
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
		var name = $(".eventNameInput").val()
		if ($(".eventType").val() === "Film"){
			address = $(".theaterDrop").val();
		}

		else {
			address = $(".diningOptionsDrop").val();
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

		ohSnap("Event Added!", {color: "red", duration: 2500});
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
		$(".eventName").hide()
	}

	$("body").on("click", ".eventButton", function(){
		$(".dashboardBlock").hide("clip", 400, function(){
			$(".planEventBlock").show("drop", {direction: "left"}, 500);
			currentPage = "event";
		});
	})

	$("body").on("click", ".requestDiv", function(){
		var key = $(this).parent().attr("data-key");
		dataRef.ref("Users/" + key).once("value").then(function(snap1){
			$(".friendRUsername").text(snap1.val().coupleUsername);
			$(".friendRProfilePic").attr("src", snap1.val().imgURL);
			$(".p1Name").text(snap1.val().firstName1 + " " + snap1.val().lastName1);
			$(".p2Name").text(snap1.val().firstName2 + " " + snap1.val().lastName2);
			$(".coupleRDescription").text(snap1.val().description);
			$(".friendRequestsModalContent").hide("clip", function(){
			$(".friendRProfile").show("clip")
			$(".coupleAdd").attr("data-key", key);
		})
		})
	})

	$("body").on("click", ".eventRequestDiv", function(){
		var key = $(this).parent().attr("data-key");
		dataRef.ref("Users/" + key).once("value").then(function(snap1){
			$(".friendRUsername").text(snap1.val().username)
			$(".friendRProfilePic").attr("src", snap1.val().imgURL)
			$(".friendRequestsModalContent").hide("clip", function(){
			$(".friendRProfile").show("clip")
			$(".coupleAdd").attr("data-key", key);
		})
		})
	})

	$(".coupleAdd").on("click", function(){
		var key = $(this).attr("data-key");
		dataRef.ref("Users/" + myUserID + "/friends/" + key).set(true);
		dataRef.ref("Users/" + key + "/friends/" + myUserID).set(true);
		$(".friendRProfile").hide("clip");
		$(".friendRequests").hide("fade");

		dataRef.ref('Users/' + myUserID + "/friendRequests").once("child_added").then(function(snap1){
			if (key == snap1.val().inviter){
				dataRef.ref('Users/' + myUserID + "/friendRequests/" + snap1.key).remove();
			}
		})
	})

	$("body").on("click", ".friendRBack", function(){
		$(".friendRProfile").hide("clip", "fast", function(){
			$(".friendRequestsModalContent").show("clip") 
		});
		$(".eventProfile").hide("clip", "fast", function(){
			$(".friendRequestsModalContent").show("clip") 
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
		$(".friendRequests").fadeIn("fast", function(){
			$(".friendRequestsModalContent").show("clip", "fast");
		})
	});


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

	$("body").on("click", ".searchCLose", function(){
		$(this).closest(".modalContent").hide("clip", "fast", function(){
			$(this).closest(".modals").fadeOut("fast", function(){
			})
		});
	})

	dataRef.ref("Users/" + myUserID)

	$("body").on("click", ".friendDiv", function(){
		var uid = $(this).attr("data-uid");
		if (status === "eventInvite"){
			ohSnap("Your friend is invited!", {color: "red", duration: 2500});
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
			$(".friendUsername").text(snapshot.val().coupleUsername);
			$(".p1Name").text(snapshot.val().firstName1 + " " + snapshot.val().lastName1);
			$(".p2Name").text(snapshot.val().firstName2 + " " + snapshot.val().lastName2);
			$(".coupleRDescription").text(snapshot.val().description);
			$(".friendProfilePic").attr("src", snapshot.val().imgURL)
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

		collectUser(searchCriteria)
		
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
		ohSnap('Profile Updated!', {color: "red", duration: 2500});
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



