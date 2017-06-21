	  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyD8rUvWOtA4Zfr0LjKe-ICppOrwILQ-l6w",
	    authDomain: "couplette-test.firebaseapp.com",
	    databaseURL: "https://couplette-test.firebaseio.com",
	    projectId: "couplette-test",
	    storageBucket: "couplette-test.appspot.com",
	    messagingSenderId: "686070390184"
	  };
	  firebase.initializeApp(config);

		//Get elements
		const txtEmail = document.getElementById('txtEmail');
		const txtPassword = document.getElementById('txtPassword');
		const btnLogin = document.getElementById('btnLogin');
		const btnSignUp = document.getElementById('btnSignUp');
		const btnLogout = document.getElementById('btnLogout');

		//Add login event
		btnLogin.addEventListener('click', e => {
			//Get email and password
			const email = txtEmail.value;
			const pass = txtPassword.value;
			const auth = firebase.auth();
			//Sign in
			const promise = auth.signInWithEmailAndPassword(email, pass);
			promise.catch(e => console.log(e.message));
		});

		//Add signup event
		btnSignUp.addEventListener('click', e => {
			//Get email and password
			//TODO: check for real emal addresses
			const email = txtEmail.value;
			const pass = txtPassword.value;
			const auth = firebase.auth();
			//Sign in
			const promise = auth.createUserWithEmailAndPassword(email, pass);
			promise
			.catch(e => console.log(e.message));
		});

		btnLogout.addEventListener('click', e => {
			firebase.auth().signOut();
		})

		//Add realtime listener
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if(firebaseUser) {
				console.log(firebaseUser);
				btnLogout.classList.remove('hide');
			} else {
				console.log('not logged in');
				btnLogout.classList.add('hide');
			}
		});
		//Get elements
		const preObject = document.getElementById('users');

		//Create references
		const dbRefObject = firebase.database().ref().child('users');

		//Sync object changes
		dbRefObject.on('value', snap => console.log(snap.val()));

	// firebase.auth().signInWithEmailAndPassword(provider).then(function(result) {
	//
	//         // This gives you a Google Access Token. You can use it to access the Google API.
	//         var token = result.credential.accessToken;
	//         // The signed-in user info.
	//         coupleUsername = result.coupleUsername;
	//         coupleNames = user.firstName1, user.firstName2;
	//         coupleEmail = user.coupleEmail;
	//         photo = user.photoURL;
	//         uid = user.uid;
	//         $('#pic').attr("src", user.photoURL);
	//         $('#couple-username').text(user.coupleUsername);
	//         $("#name-input, #name-input2, #couple-username, #confirm-pass").show();
	//         $("#login").hide();
	//         console.log("logged in");
	//         // ...
	//       }).catch(function(error) {
	//         // Handle Errors here.
	//         var errorCode = error.code;
	//         var errorMessage = error.message;
	//         // The email of the user's account used.
	//         var email = error.email;
	//         // The firebase.auth.AuthCredential type that was used.
	//         var credential = error.credential;
	//         // ...
	//       });


// 	var dataRef = firebase.database();
// 	// Initial Values
// 	var firstName1 = "";
// 	var firstName2 = "";
// 	var lastName1 = "";
// 	var lastName2 = "";
// 	var coupleEmail = "";
// 	var password = "";
// 	var confirmPassword = "";
// 	var zipcode = "";
// 	var picture = "";
// 	var description = "";
// 	var arts = ""
// 	var dining = "";
// 	var films = "";
// 	var music = "";
// 	var gaming = "";
// 	var outdoor = "";
// 	var travel = "";
// 	var other = "";
// 	var age = 0;
// 	var comment = "";
// 	var coupleUsername = "";
//
// 	$("#button").on("click", function(event) {
// 		event.preventDefault();
// 		// Code in the logic for storing and retrieving the most recent user.
// 		firstName1 = $("#name-input").val().trim();
// 		firstName2 = $("#name-input2").val().trim();
// 		lastName1 = $("#last-input").val().trim();
// 		lastName2 = $("#last-input2").val().trim();
// 		coupleEmail = $("#email-address").val().trim();
// 		password = $("#pass").val().trim();
// 		confirmPassword = $("#confirm-pass").val().trim();
// 		zipcode = $("#zipcode").val().trim();
// 		description = $("#textarea").val().trim();
// 		arts = $("#artsbox").val().trim();
// 		dining = $("#diningbox").val().trim();
// 		films = $("#filmsbox").val().trim();
// 		music = $("#musicbox").val().trim();
// 		gaming = $("#gamingbox").val().trim();
// 		outdoor = $("#outdoorbox").val().trim();
// 		travel = $("#travelbox").val().trim();
// 		other = $("#otherbox").val().trim();
// 		age = $("#age-input").val().trim();
// 		comment = $("#comment-input").val().trim();
// 		coupleUsername = $("#couple-username").val().trim();
// 		// Code for the push
// 		dataRef.ref().push({
// 			firstName1: firstName1,
// 			firstName2: firstName2,
// 			lastName1: lastName1,
// 			lastName2: lastName2,
// 			coupleEmail: coupleEmail,
// 			password: password,
// 			confirmPassword: confirmPassword,
// 			zipcode: zipcode,
// 			description: description,
// 			Interests: {
// 				Arts: arts,
// 				Dining: dining,
// 				Films: films,
// 				Music: music,
// 				Gaming: gaming,
// 				Outdoors: outdoor,
// 				Travel: travel,
// 				other: other,
// 			},
// 			age: age,
// 			coupleUsername: coupleUsername,
// 			comment: comment,
// 			// dateAdded: firebase.database.ServerValue.TIMESTAMP
// 		});
// 	});
// 	function testData(){
//         dataRef.ref().push({
//             zip: 94610
//         })
//     }
//
// 		var googleQueryURL = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=91384&destinations=95050&key=AIzaSyBh0G9RiMPn-rZTMnKHh5i8aPNGMrVHifE";
//
//     //Google Maps API Call
//     $.ajax({
//       url: googleQueryURL,
//       method: "GET"
//     }).done(function(response) {
//         console.log(response);
//     })
//     function getFirebaseData() {
//         console.log("working");
//         dataRef.ref().on("value", function(childSnapshot) {
//       // Log everything that's coming out of snapshot
//           console.log(childSnapshot.val().zipcode);
//       });
//     }
//
//     testData();
// 	//Sample User Criteria
// 	var userCriteria = {
// 	    ageLow: 18,
// 	    ageHigh: 25,
// 	    gender: "mf",
// 	    distance: 5,
// 	    interests: {
// 	        film: true,
// 	        sports: true,
// 	        arts: true,
// 	        gaming: true,
// 	        dining: true,
// 	        travel: true,
// 	        outdoors: true,
// 	        music: true
// 	    }
// 	}
//
// 	function matchUser (criteria, userToComp){
// 	    var match = false;
// 	    var tempArray = Object.keys(criteria.interests);
// 	    for (var i = 0; i < tempArray.length; i++){
// 	        if (userToComp.interests[tempArray[i]] === criteria.interests[tempArray[i]]){
// 	            match = true;
// 	        }
// 	    }
// 	    //check for age
// 	    if (criteria.ageLow !== null){
// 	        if (criteria.ageLow === 55){
// 	            if (!(criteria.ageLow <= userToComp.age1)){
// 	                match = false;
// 	            }
// 	            if (!(criteria.ageLow <= userToComp.age2)){
// 	                match = false;
// 	            }
// 	        }
// 	        else {
// 	            // console.log(((criteria.ageLow <= userToComp.Age2 <= criteria.ageHigh)));
// 	            if (!(criteria.ageLow <= userToComp.age1 && userToComp.age1 <= criteria.ageHigh)){
// 	            match = false
// 	            }
// 	            if (!(criteria.ageLow <= userToComp.age2 && userToComp.age2 <=criteria.ageHigh)){
// 	            match = false
// 	            }
// 	        }
// 	    }
// 	    if (criteria.gender !== null){
// 	        if (criteria.gender !== userToComp.gender){
// 	            match = false;
// 	        }
// 	    }
// 	    if (match){
// 	        return true;
// 	    }
// 	    else {
// 	        return false;
// 	    };
// 	}
// 	function collectUser(criteria){
// 	    dataRef.ref("users").once("value", function(snapshot){
// 	        var users = snapshot.val();
// 	        var userNameArray = Object.keys(users);
// 	        var namesThatMatch = []
// 	        for (var i = 0; i < userNameArray.length; i++){
// 	            if (matchUser(criteria, users[userNameArray[i]])){
// 	                namesThatMatch.push(users[userNameArray[i]].username);
// 	            }
// 	        }
// 	        console.log(namesThatMatch);
// 	    })
// 	}
// 	collectUser(userCriteria);
//
// 	//add calendar date pick functionality to event page date input field
// 	$("#dateEvent").datepicker({minDate: 0});
//
// 	$("#dateEvent").on("change", function(){
// 		if ($(this).val() !== undefined){
// 			$(".eventZipcode").slideDown();
// 		}
// 	});
//
// 	$(".zipInp").on("keyup", function(){
// 		var zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
//
// 		if (zipRegex.test($(this).val())){
// 			$(".eventTypeBlock").slideDown();
// 		}
//
// 		else {
// 			$(".eventTypeBlock").slideUp();
// 			$(".diningEvent").slideUp();
// 			$(".filmEvent").slideUp();
// 			$(".eventType").val(0);
// 		}
// 	})
//
// 	//adding dynamic page updates based on event select dropdown option
// 	$(".eventType").on("change", function(){
//
// 		if ($(this).val() === "EventDefault"){
// 			$(".filmEvent").slideUp("fast");
// 		}
//
// 		else if ($(this).val() === "Film"){
// 			$(".diningEvent").slideUp("fast", function(){
// 				$(".filmEvent").slideDown();
// 			});
//
// 		}
//
// 		else if ($(this).val() === "Dining"){
// 			$(".filmEvent").slideUp("fast", function(){
// 				$(".diningEvent").slideDown();
// 			});
//
// 		}
// 	})
//
// })
