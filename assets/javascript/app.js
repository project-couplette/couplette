






// $(function(){
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
	$.ajax({
	  crossDomain: true,
	  url: googleQueryURL,
	  method: "GET"
	}).done(function(response) {
		console.log(response.results[0].address_components[1].long_name);
		var city = response.results[0].address_components[1].long_name;
		var state = response.results[0].address_components[2].long_name;
		var testLatitude = parseInt(response.results[0].geometry.location.lat);
		var testLongitude = parseInt(response.results[0].geometry.location.lng);
		console.log(city,state,testLongitude,testLatitude)
		// function zipCodeMatcher(){
			// var testZipCodeArray = [95050, 91350, 91390];
			console.log("working");
			// for (var i=0; i<testZipCodeArray.length; i++) {
			var origin1 = new google.maps.LatLng(testLatitude, testLongitude);
			var origin2 = "" + city + "," + "" + state;
			var destinationA = 'Santa Clara, California';
			var destinationB = new google.maps.LatLng(37.3541, 121.9552);
			var service = new google.maps.DistanceMatrixService();
			service.getDistanceMatrix(
			  {
			  	origins: [origin1, origin2],
    			destinations: [destinationA, destinationB],
			    travelMode: 'DRIVING',
			    // s
			  }, callback);

			function callback(response, status) {
				console.log(response, status);
				// distance.push(response);
			// }
			}
		// });
		// zipCodeMatcher();
	});

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
		}
	})

	//adding dynamic page updates based on event select dropdown option
	$(".eventType").on("change", function(){

		if ($(this).val() === "EventDefault"){
			$(".filmEvent").slideUp("fast");
		}

		else if ($(this).val() === "Film"){
			$(".diningEvent").slideUp("fast", function(){
				$(".filmEvent").slideDown();
			});
			
		}

		else if ($(this).val() === "Dining"){
			$(".filmEvent").slideUp("fast", function(){
				$(".diningEvent").slideDown();
			});
		}
	})
// })



