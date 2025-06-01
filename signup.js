//import necessary libraries if needed, e.g., Firebase or Google API
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDT2C7sumrDHanffOHXRsP2JKxQMgsfwcc",
    authDomain: "edulearn-44982.firebaseapp.com",
    projectId: "edulearn-44982",
    storageBucket: "edulearn-44982.firebasestorage.app",
    messagingSenderId: "926084117435",
    appId: "1:926084117435:web:75a3f8e86dc7e919c9ca9e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const googleBtn = document.getElementById("google-signup");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value.trim();
  
      if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
      }
  
      // Replace with actual signup logic
      //Firebase Signup Logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          alert("User created successfully!");
          console.log("User created:", user);
        form.reset();
          // Redirect to login or home page
          window.location.href = "login.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("Error: " + errorMessage);
        });

    });
    googleBtn.addEventListener("click", function () {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access Google APIs.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          alert("Google Sign Up successful!");
          console.log("User signed in with Google:", user);
          // Redirect to login or home page
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          alert("Error: " + errorMessage);
        });
    });
});
      
   