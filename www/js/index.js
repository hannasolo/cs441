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
    //** ON PAGE LOAD LOAD JSON AND IMAGES AND STORE URLS LOCALLY **//
    var arr=[], placeholder=[], image=[];
    var host = "https://cors-anywhere.herokuapp.com/http://csusm-cs-441-chc.appspot.com/apiv1";//general host name
    var route = "/recipes_drink/search?names=";
    for(i = 0; i < 3; i++){
        placeholder[i] = document.getElementById("placeholder"+i);
        image[i] = document.createElement("img");
        image[i].classList.add("hidden");
        image[i].addEventListener("load", function(){
            this.classList.remove("hidden");
            this.classList.add("cardimg");
        });}
    $.getJSON(host+route, function(data) {
        var random = data.results-1;
        for (i = 0; i < data.results-1; i++){
            x = Math.floor(Math.random() * random);
            while(arr.includes(x)){
                x = Math.floor(Math.random() * random);
            }
            arr[i] = x;
            var name = data.recipes[arr[i]].name;
            var name_ID = "name" + arr[i];
            localStorage.setItem(name_ID,name);
            img = data.recipes[arr[i]].image_url;
            img_ID = "img" + arr[i];
            localStorage.setItem(img_ID, img);
        }
        image[0].src = data.recipes[arr[0]].image_url;
        image[1].src = data.recipes[arr[1]].image_url;
        image[2].src = data.recipes[arr[2]].image_url;
    }).fail(function(){console.log("failure to load JSON");});
    placeholder[0].appendChild(image[0]);
    placeholder[1].appendChild(image[1]);
    placeholder[2].appendChild(image[2]);
    //** ON PAGE LOAD LOAD JSON AND IMAGES AND STORE URLS LOCALLY **//
});
function searchBar(){
    var input, filter, radio, route;
    var host = "https://cors-anywhere.herokuapp.com/http://csusm-cs-441-chc.appspot.com/apiv1";//general host name
    // var temp = localStorage.getItem('card1')
    console.log(temp);
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
    $.getJSON(host+route+filter, function(data) {
        console.log(data);
    }).fail(function(){
        console.log("failure to load JSON");
    })
}
function selectCard(){
    console.log(filter);
    $.getJSON(host+route+filter, function(data) {
        console.log(data);
    }).fail(function(){
        console.log("failure to load JSON");
    })
}

function nextPage() { $(document).ready(function () {
    console.log("next page button pressed");
    placeholder1 = document.getElementById("placeholder1");
    img = document.createElement("img");
    img.classList.add("hidden");
    img.addEventListener("load", function(){
        this.classList.remove("hidden");
        this.classList.add("cardimg");
    });
    img.src = "https://storage.googleapis.com/drungry_images/drinks/3_earthquake.png"

    placeholder1.replaceChild(img,placeholder1.childNodes[0]);
});
}