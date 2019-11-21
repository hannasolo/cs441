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
    // Get a reference to the placeholder:
    var host = "https://cors-anywhere.herokuapp.com/http://csusm-cs-441-chc.appspot.com/apiv1";//general host name
    var route = "/recipes_drink/search?names="
    var placeholder1 = document.getElementById("placeholder1");
    // var placeholder2 = document.getElementById("placeholder2");
    // var placeholder3 = document.getElementById("placeholder3");
    var placeholder4 = document.getElementById("placeholder4");
    // var placeholder5 = document.getElementById("placeholder5");
    // var placeholder6 = document.getElementById("placeholder6");
    var placeholder7 = document.getElementById("placeholder7");
    // var placeholder8 = document.getElementById("placeholder8");
    // var placeholder9 = document.getElementById("placeholder9");
    // Dynamically create and configure the new image and text
    //1
    var img1 = document.createElement("img");
    // var text1 = document.createTextNode("404");
    // var tag1 = document.createTextNode("404");
    //2
    var img2 = document.createElement("img");
    // var text2 = document.createTextNode("404");
    // var tag2 = document.createTextNode("404");
    //3
    var img3 = document.createElement("img");
    // var text3 = document.createTextNode("404");
    // var tag3 = document.createTextNode("404");
    //1
    img1.classList.add("hidden");
    // placeholder2.appendChild(text1);
    // placeholder3.appendChild(tag1);
    // 2
    img2.classList.add("hidden");
    // placeholder5.appendChild(text2);
    // placeholder6.appendChild(tag2);
    //3
    img3.classList.add("hidden");

    // Set up a load event handler that will unhide the image once its loaded
    img1.addEventListener("load", function(){
        this.classList.remove("hidden");
        this.classList.add("cardimg");
    });
    img2.addEventListener("load", function(){
        this.classList.remove("hidden");
        this.classList.add("cardimg");
    });
    img3.addEventListener("load", function(){
        this.classList.remove("hidden");
        this.classList.add("cardimg");
    });
    //GET JSON
    $.getJSON(host+route, function(data) {
        var one, two, three, randnum;
        var array
        randnum = data.results - 1;
        one = Math.floor(Math.random() * randnum);
        two = Math.floor(Math.random() * randnum);
        three = Math.floor(Math.random() * randnum);
        while(one == two){
            one = Math.floor(Math.random() * randnum);
        }
        while(three == two || three == one){
             three = Math.floor(Math.random() * randnum);
        }
        //one
        var src1 = data.recipes[one].image_url;
        // src1 = src1.replace("https://storage.cloud.google.com/", "https://storage.googleapis.com/");
        img1.src = src1;
        // text1.data =  data.recipes[one].name;
        // var temptag1 =  data.recipes[one].tags.toString();
        // tag1.data = temptag1;
        // two
        var src2 = data.recipes[two].image_url;
        // src2 = src2.replace("https://storage.cloud.google.com/", "https://storage.googleapis.com/");
        img2.src = src2;
        // text2.data =  data.recipes[two].name;
        // var temptag2 =  data.recipes[two].tags.toString();
        // tag2.data = temptag2;
        //three
        var src3 = data.recipes[three].image_url;
        // src3 = src3.replace("https://storage.cloud.google.com/", "https://storage.googleapis.com/");
        img3.src = src3;
        // text3.data =  data.recipes[three].name;
        // var temptag3 =  data.recipes[three].tags.toString();
        // tag3.data = temptag3;
    }
    ).fail(function(){
        console.log("failure to load JSON");
    });
    // Inject the image into the document
    placeholder1.appendChild(img1);
    placeholder4.appendChild(img2);
    placeholder7.appendChild(img3);
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