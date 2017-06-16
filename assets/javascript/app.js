
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
		}
		age: age,
		coupleUsername: coupleUsername,
		comment: comment,
		// dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});
