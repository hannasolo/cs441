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
    var guestButton = $("#guest-button");
    var googleButton = $("#g-signin2");

    // $("#guest-welcome").hide();
    // $("#google-welcome").hide();

    if (guestButton.click())
    {
        function showGuest() {
            $("#index").hide();
            $("#guest-welcome").show();
        }
    }
    else if(googleButton.click())
    {
        function onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile();

            $("#index").hide();
            $("#google-welcome").show();

            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        }
    }


});
// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },
//
//     // deviceready Event Handler
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//
//     onDeviceReady: function() {
//         this.receivedEvent('deviceready');
//     },
//
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');
//
//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');
//
//         console.log('Received Event: ' + id);
//     }
// };
//
// app.initialize();