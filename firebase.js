 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA8k2swgRdJiOIh8T7k7_RL0h4XVc_zvmE",
    authDomain: "magento-blocks.firebaseapp.com",
    databaseURL: "https://magento-blocks.firebaseio.com",
    projectId: "magento-blocks",
    storageBucket: "magento-blocks.appspot.com",
    messagingSenderId: "82992032609",
    appId: "1:82992032609:web:5b071224cb44d7e3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


function saveToFirebase(info) {
    var blockObject = {
        block: info
    };

    firebase.database().ref('block-info').push().set(blockObject)
        .then(function(snapshot) {
            success(); // some success method
        }, function(error) {
            console.log('error' + error);
            error(); // some error method
        });
}

function success() {
  console.log("success");
}

function error() {
  console.log("error");
}

saveToFirebase({data:'test1', dataTwo: 'testTwo'});

// This should go on the index html page right before the call for this js file
  <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.2.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->


<script src="https://www.gstatic.com/firebasejs/3.1.0/firebase-database.js"></script>