// Initialize Firebase
// var config = {
// 	apiKey: "AIzaSyD8rUvWOtA4Zfr0LjKe-ICppOrwILQ-l6w",
// 	authDomain: "couplette-test.firebaseapp.com",
// 	databaseURL: "https://couplette-test.firebaseio.com",
// 	projectId: "couplette-test",
// 	storageBucket: "couplette-test.appspot.com",
// 	messagingSenderId: "686070390184"
// };

	var config = {
		apiKey: "AIzaSyDA-yVtB_lDDz6BiVDmC7Dm1BMACJdWFXQ",
		authDomain: "berrytendo.firebaseapp.com",
		databaseURL: "https://berrytendo.firebaseio.com",
		projectId: "berrytendo",
		storageBucket: "berrytendo.appspot.com",
		messagingSenderId: "328422244178"
	};
firebase.initializeApp(config);
dataRef = firebase.database();

// var firstName1 = $("#partner1-first").val().trim();
// var firstName2 = $("#partner2-first").val().trim();
// var lastName1 = $("#partner1-last").val().trim();
// var lastName2 = $("#partner2-last").val().trim();
var email = $("#email-address").val().trim();
var password = $("#pass").val().trim();
var confirmPassword = $("#confirmpass").val().trim();
// var zipcode: $("#zipcode").text();
// var city = $("#city-input").val().trim();
// var state = $("#state-input").val().trim();
// var arts = $("#artBox").val().trim();
// var dining = $("#diningBox").val().trim();
// var films = $("#filmBox").val().trim();
// var music = $("#musicBox").val().trim();
// var gaming = $("#gamingBox").val().trim();
// var outdoor = $("#outdoorBox").val().trim();
// var travel = $("#travelBox").val().trim();
// var other = $("#otherBox").val().trim();
var age1 = $("#partner1-age-input").text();
var age2 = $("#partner2-age-input").text();
// var description = $("#comment-input").text();
var coupleUsername = $("#username").text();

//Make sure the passwords match//
$('#pass, #confirmpass').on('keyup', function () {
	if ($('#pass').val() == "") {
  	$('#message').html("Field Must Be Filled").css('color', 'green');
  } else if ($('#pass').val() == $('#confirmpass').val()) {
	$('#message').html('Password Matches!').css('color', 'green');
  }else
    $('#message').html("Password Doesn't Match").css('color', 'red');
});

//Prompts users to fields that are required to be filled//
$('#username, #email-address').on('keyup', function () {
	if ($('#username, #email-address').val() == "") {
		$('#message').html("Field Must Be Filled").css('color', 'green');
		return false;
	}
});

    function IsValidZipCode(zipcode) {
        var isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipcode);
        if (!isValid){
       $('#message2').html('Invalid ZipCode').css('color', 'red');
      document.getElementById("zipcode").value = ""
    }
    }

$("#btnSubmit").on("click", function(event) {
		event.preventDefault();
		// Code in the logic for storing and retrieving the most recent user.
		// var firstName1 = $("#partner1-first").val().trim();
		// var firstName2 = $("#partner2-first").val().trim();
		// var lastName1 = $("#partner1-last").val().trim();
		// var lastName2 = $("#partner2-last").val().trim();
		var email = $("#email-address").val().trim();
		var password = $("#pass").val().trim();
		// var confirmPassword = $("#confirmpass").val().trim();
		// var city = $("#city-input").val().trim();
		// var state = $("#state-input").val().trim();
		// var arts = $("#artBox").val().trim();
		// var dining = $("#diningBox").val().trim();
		// var films = $("#filmBox").val().trim();
		// var music = $("#musicBox").val().trim();
		// var gaming = $("#gamingBox").val().trim();
		// var outdoor = $("#outdoorBox").val().trim();
		// var travel = $("#travelBox").val().trim();
		// var other = $("#otherBox").val().trim();
		// var age = $("#age-input").val().trim();
		var description = $("#comment-input").text();
		// var coupleUsername = $("#username").val().trim();
		// Code for the push
		firebase.auth().createUserWithEmailAndPassword(email, password);
		setTimeout(function(){
		firebase.auth().signInWithEmailAndPassword(email, password);
		}, 2000);
	});

		firebase.auth().onAuthStateChanged(user => {
			if(user) {

				dataRef.ref("Users/" + user.uid).set({
						coupleUsername: $("#username").val(),
						firstName1: $("#partner1-first").val(),
						firstName2: $("#partner2-first").val(),
						lastName1: $("#partner1-last").val(),
						lastName2: $("#partner2-last").val(),
						email: $("#email-address").val(),
						age1: $("#partner1-age-inputOne").val(),
						age2: $("#partner2-age-input").val(),
						zipcode: $("#zipcode").val(),
						gender: $(".genderSelect").val(),
						imgURL: $(".signupProfileURL").val(),

						// password: $("#pass").val().trim(),
						// confirmPassword: $("#confirmpass").val().trim(),
						// city: $("#city-input").val().trim(),
						// state: $("#state-input").val().trim(),
						description: $(".comment-input").val(),
						interests: {
								arts: $("#artBox").val(),
								dining: $("#diningBox").val(),
								films: $("#filmBox").val(),
								music: $("#musicBox").val(),
								gaming: $("#gamingBox").val(),
								outdoors: $("#outdoorBox").val(),
								travel: $("#travelBox").val(),
								sports: $("#otherBox").val(),
						},

						// age: age,
						// coupleUsername: coupleUsername,
						// description: description,
						dateAdded: firebase.database.ServerValue.TIMESTAMP
					})
				// User is signed in.
				window.location = "dashboardMega.html";
			}
		});

		$('#checkbox-inline').text($('#artBox').val());
		$("#artBox").on('change', function() {
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
			} else {
				$(this).attr('value', 'false');
			}
		});
		$('#checkbox-inline').text($('#diningBox').val());
		$("#diningBox").on('change', function() {
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
			} else {
				$(this).attr('value', 'false');
			}
		});
		$('#checkbox-inline').text($('#filmBox').val());
		$("#filmBox").on('change', function() {
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
			} else {
				$(this).attr('value', 'false');
			}
		});
		$('#checkbox-inline').text($('#musicBox').val());
		$("#musicBox").on('change', function() {
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
			} else {
				$(this).attr('value', 'false');
			}
		});
		$('#checkbox-inline').text($('#gamingBox').val());
		$("#gamingBox").on('change', function() {
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
			} else {
				$(this).attr('value', 'false');
			}
		});
		$('#checkbox-inline').text($('#outdoorbox').val());
		$("#outdoorbox").on('change', function() {
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
			} else {
				$(this).attr('value', 'false');
			}
		});
		$('#checkbox-inline').text($('#travelBox').val());
		$("#travelBox").on('change', function() {
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
			} else {
				$(this).attr('value', 'false');
			}
		});
		$('#checkbox-inline').text($('#otherBox').val());
		$("#otherBox").on('change', function() {
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
			} else {
				$(this).attr('value', 'false');
			}
	});



//createUserWithEmailAndPassword
//Login-2 (using what I already have)
//listener return UI
//Push to user info to db
//database.ref('users/' + uid).set('info-object');





//
$(".logInPage").on("click", function(event){
	event.preventDefault();
	var uEmail = $("#username").val();
	var uPass = $("#pass").val();
	firebase.auth().signInWithEmailAndPassword(uEmail, uPass);

})
