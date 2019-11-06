/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
$(document).ready(function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.initializeApp('1:667199072525:web:b5c315c475df7766c26844');
    console.log(firebase.app().name);
    // const auth  = firebase.auth();
    var guestButton = $("#guest-button");
    var googleButton = $("#google-button");

   guestButton.click(function () {
        $("#index").hide();
        $("#guest-welcome").show();
   });

    googleButton.click( function () {
        firebase.auth().signInWithEmailAndPassword;
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
            }
            // The signed-in user info.
            var user = result.user;
            showGoogleHome();
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
    });

    function showGoogleHome() {
        $("#index").hide();
        $("#google-welcome").show();
    }

   function signOut()
    {
        var auth2 = gapi.auth2.getAuthInstance();

        auth2.signOut().then(function ()
        {
            console.log('User signed out.');
        });
    }
});
