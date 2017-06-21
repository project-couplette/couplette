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
		const txtCoupleEmail = document.getElementById('username');
		const txtPassword = document.getElementById('pass');
		const btnLogin = document.getElementById('btnLogin');

		//Add login event
		btnLogin.addEventListener('click', e => {
			//Get email and password
			const email = txtCoupleEmail.value;
			const pass = txtPassword.value;
			const auth = firebase.auth();
			//Sign in
			const promise = auth.signInWithEmailAndPassword(email, pass);
			promise.catch(e => console.log(e.message));
		});

		// Add realtime listener
		firebase.auth().onAuthStateChanged(user => {
			if(user) {
				console.log(user.uid);
			} else {
				console.log('not logged in');
			}
		});
		// //Get elements
		// const preObject = document.getElementById('users');
		//
		// //Create references
		// const dbRefObject = firebase.database().ref().child('users');
		//
		// //Sync object changes
		// // dbRefObject.on('value', snap => console.log(snap.val()));
		//
		// firebase.auth().onAuthStateChanged((user) => {
		// 	// console.log(user.uid);
		// });

		// //Add signup event
		// btnSubmit.addEventListener('click', e => {
		// 	//Get email and password
		// 	//Sign Up
		// 	const txtFirstName1 = document.getElementById('partner1-first');
		// 	const txtLastName1 = document.getElementById('lastName1');
		// 	const txtCoupleEmail = document.getElementById('email-address');
		// 	const txtPassword = document.getElementById('pass');
		// 	const txtConfirmPassword = document.getElementById('confirmpass');
		// 	const txtCity = document.getElementById('city-input');
		// 	const txtState = document.getElementById('state-input');
		// 	//Spouse
		// 	const txtFirstName2 = document.getElementById('partner2-first');
		// 	const txtLastName2 = document.getElementById('partner2-last');
		// 	const photoURL = document.getElementById('pic-file1')
		// 	//Interests
		//
		// 	const btnSubmit = document.getElementById('btnSubmit');
		// 	const auth = firebase.auth();
		//
		// 	const promise = auth.createUserWithEmailAndPassword(email, pass);
		// 	promise.catch(e => console.log(userCriteria));
		// });
