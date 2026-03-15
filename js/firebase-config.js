/*  ── Firebase Configuration ──
 *  
 *  SETUP INSTRUCTIONS:
 *  1. Go to https://console.firebase.google.com
 *  2. Click "Create a project" → name it "crossfit-prior-lake"
 *  3. Disable Google Analytics (not needed) → Create Project
 *  4. Click the web icon (</>) to add a web app → nickname "CFPL Web"
 *  5. Copy the firebaseConfig values below
 *  6. Go to Authentication → Sign-in method → Enable "Email/Password"
 *  7. Go to Firestore Database → Create database → Start in production mode
 *  8. Go to Firestore → Rules tab → paste the rules from firestore-rules.txt
 */

var firebaseConfig = {
  apiKey: "AIzaSyAkSuh9WX5d17euZy-V_aA2QFjWOpBaNXs",
  authDomain: "crossfit-prior-lake-89f2c.firebaseapp.com",
  projectId: "crossfit-prior-lake-89f2c",
  storageBucket: "crossfit-prior-lake-89f2c.firebasestorage.app",
  messagingSenderId: "378638799222",
  appId: "1:378638799222:web:6aa0f03a3a13410779aa57"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

// Auth state helper — redirects to login if not signed in
function requireAuth(callback) {
  auth.onAuthStateChanged(function(user) {
    if (!user) {
      window.location.href = 'members.html';
    } else if (callback) {
      callback(user);
    }
  });
}
