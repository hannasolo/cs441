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
    var googleButton = $(".g-signin2");
    // var gSignOutButton = $("#");

    guestButton.click(function () {
        $("#index").hide();
        $("#guest-welcome").show();
    });

    googleButton.click(function (googleUser) {
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
    });

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();

        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    function showPage() {

    }

    angular.module('starter', ['ionic', 'ionic.contrib.ui.tinderCards'])

    .directive('noScroll', function () {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                $element.on('touchmove', function (e) {
                    e.preventDefault();
                });
            }
        }
    })

    .controller('CardsCtrl', function($scope) {
        var cardTypes = [
            { image: 'img/pic2.png', title: 'So much grass #hippster'},
            { image: 'img/pic3.png', title: 'Way too much Sand, right?'},
            { image: 'img/pic4.png', title: 'Beautiful sky from wherever'},
        ];

        $scope.cards = [];

        $scope.addCard = function(i) {
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
        };

        for(var i = 0; i < 3; i++) $scope.addCard();

        $scope.cardSwipedLeft = function(index) {
            console.log('Left swipe');
        };

        $scope.cardSwipedRight = function(index) {
            console.log('Right swipe');
        };

        $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
            console.log('Card removed');
        }
    });
});
