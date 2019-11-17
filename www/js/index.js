$(document).ready(function () {
    // checkIfLoggedIn();
    // var googleButton = $("#my-signin2");

    // Check if the user is already logged in
    // function checkIfLoggedIn()
    // {
    //     // If they are not logged in, then log the user in
    //     if(sessionStorage.getItem('myUserEntity') === null){
    //         //Redirect to login page, no user entity available in sessionStorage
    //         signIn();
    //     } else {
    //         showPage("home");
    //         //User already logged in, direct to index
    //         var userEntity = {};
    //         userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
    //     }
    // }

    // The ID token you need to pass to your backend:
    // var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);
    //
    // function onSuccess(googleUser) {
    //     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    //     showPage("home");
    // }
    // function onFailure(error) {
    //     console.log(error);
    // }
    // function renderButton() {
    //     gapi.signin2.render(googleButton, {
    //         'scope': 'profile email',
    //         'width': 240,
    //         'height': 50,
    //         'longtitle': true,
    //         'theme': 'dark',
    //         'onsuccess': onSuccess,
    //         'onfailure': onFailure
    //     });
    // }

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

    // function signOut() {
    //     var auth2 = gapi.auth2.getAuthInstance();
    //
    //     auth2.signOut().then(function () {
    //         console.log('User signed out.');
    //     });
    // }

    function showPage(page) {
        $(".page").hide();
        $("#page-" + page).show();

        if (page !== "index") {
            $(".navbar").show();
        }
    }
});
