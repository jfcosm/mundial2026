// Firebase Configuration and Initialization
(function() {
  const firebaseConfig = {
    apiKey: "AIzaSyDikE3BSEVLgKvlarvDnn_aVsst2uQ3Ork",
    authDomain: "oraculo-mundial-2026-79ab.firebaseapp.com",
    projectId: "oraculo-mundial-2026-79ab",
    storageBucket: "oraculo-mundial-2026-79ab.firebasestorage.app",
    messagingSenderId: "203792948582",
    appId: "1:203792948582:web:f088150c83178bcd247ca7"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Set Firestore and Auth global handles
  window.db = firebase.firestore();
  window.auth = firebase.auth();
})();
