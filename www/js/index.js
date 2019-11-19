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
    $('.bxslider').bxSlider({
        auto: false,
        autoControls: false,
        stopAutoOnClick: true,
        pager: false
        // slideWidth: 600
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
function searchBar(){
    var input, filter, radio, route;
    var host = "https://cors-anywhere.herokuapp.com/http://csusm-cs-441-chc.appspot.com/apiv1";//general host name
    radio = document.getElementsByName('options');
    input = document.getElementById('myinput');
    filter = input.value;
    if(radio[0].checked) {
        console.log(radio[0].value); //name is checked, search by name
        route = "/recipes_drink/search?names=";
        filter = filter.replace(" ", "%20"); // replace whitespace
    }
    else if(radio[1].checked){
        console.log(radio[1].value); //tag is checked, search by tag
        route = "/recipes_drink/search?tags=";
        filter = filter.replace(" ", "%26");
    }
    else {
        console.log(radio[2].value); //ingredients is checked, search by ingredients
        filter = filter.replace(" ", "%26");
        //DOESNT WORK YET
    }
    console.log(filter);
    // $.getJSON(host+route+filter, function(data) {
    //     console.log(data);
    // }).fail(function(){
    //     console.log("failure to load JSON");
    // })
}