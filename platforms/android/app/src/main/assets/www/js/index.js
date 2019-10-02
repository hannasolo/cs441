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
    const auth  = firebase.auth();
    var guestButton = $("#guest-button");
    var googleButton = $("#google-button");
    var provider = new firebase.auth.GoogleAuthProvider();
    var firebase = require("firebase/app");
    require("firebase/auth");
    require("firebase/firestore");


   guestButton.click(function () {
        $("#index").hide();
        $("#guest-welcome").show();
   });

    googleButton.click( function () {
        firebase.auth().signInWithEmailAndPassword;
        showGoogleHome();
        // firebase.auth().signInWithRedirect(provider).then(function () {
        //     return firebase.auth().getRedirectResult();
        // }).then(function (result) {
        //     // This gives you a Google Access Token.
        //     // You can use it to access the Google API.
        //     var token = result.credential.accessToken;
        //     // The signed-in user info.
        //     var user = result.user;
        //     showGoogleHome();
        // }).catch(function (error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        // });
        //
        // firebase.auth().getRedirectResult().then(function (result) {
        //     if (result.credential) {
        //         // This gives you a Google Access Token.
        //         // You can use it to access the Google API.
        //         var token = result.credential.accessToken;
        //         // The signed-in user info.
        //         var user = result.user;
        //         // ...
        //     }
        // }).catch(function (error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        // });
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
