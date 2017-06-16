// var user1 = {
// 	age1: 18,
// 	age2: 25,
// 	gender: "mf",
// 	distance: 5,
// 	interests: {
// 		film: true,
// 		sports: false,
// 		arts: false,
// 		gaming: false,
// 		dining: false,
// 		travel: false,
// 		outdoors: false,
// 		music: false
// 	}
// }
//
// var user2 = {
// 	age1: 18,
// 	age2: 25,
// 	gender: "mf",
// 	distance: 5,
// 	interests: {
// 		film: true,
// 		sports: false,
// 		arts: false,
// 		gaming: false,
// 		dining: false,
// 		travel: false,
// 		outdoors: false,
// 		music: false
// 	}
// }
// var user3 = {
// 	age1: 18,
// 	age2: 25,
// 	gender: "mf",
// 	distance: 5,
// 	interests: {
// 		film: true,
// 		sports: false,
// 		arts: false,
// 		gaming: false,
// 		dining: false,
// 		travel: false,
// 		outdoors: false,
// 		music: false
// 	}
// }
//
// var user4 = {
// 	age1: 18,
// 	age2: 25,
// 	gender: "mf",
// 	distance: 5,
// 	interests: {
// 		film: true,
// 		sports: false,
// 		arts: false,
// 		gaming: false,
// 		dining: false,
// 		travel: false,
// 		outdoors: false,
// 		music: false
// 	}
// }
//
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
	var database = firebase.database();


// database.ref("users").push(user1);
// database.ref("users").push(user2);
// database.ref("users").push(user3);
// database.ref("users").push(user4);



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
}

function collectUser(criteria){
	database.ref("users").once("value", function(snapshot){
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

collectUser(userCriteria);

// match (userCriteria, user4)
