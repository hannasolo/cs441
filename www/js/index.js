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
    var googleButton = $(".g-signin2");
    // var gSignOutButton = $("#");

    function onSignIn(googleUser) {
        $("#index").hide();
        $("#google-welcome").show();
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
    }

    // Controls the Slider for food/drink items
    var slider = $('.slider8').bxSlider({
        mode: 'vertical',
        slideWidth: 300,
        minSlides: 3,
        moveSlides: 1,
        slideMargin: 10,
        onSliderLoad: function () {
            $('.slider8>div:not(.bx-clone)').eq(1).addClass('active-slide');
        },
        onSlideAfter: function ($slideElement, oldIndex, newIndex) {
            $('.slide').removeClass('active-slide');
            $($slideElement).next().addClass('active-slide');
        }
    });

    // Check if the user is already logged in
    function checkIfLoggedIn()
    {
        // If they are not logged in, then log the user in
        if(sessionStorage.getItem('myUserEntity') == null){
            //Redirect to login page, no user entity available in sessionStorage
            window.location.href='Login.html';
        } else {
            //User already logged in, redirect to index.
            var userEntity = {};
            userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
            showPage("#index");
        }
    }

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();

        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    function showPage(page) {
        $("#").hide();
        page.show();
    }
});
