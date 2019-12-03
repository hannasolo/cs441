$(document).ready(function () {
    // checkIfLoggedIn();
    // var googleButton = $('#my-signin2');

    // Check if the user is already logged in
    // function checkIfLoggedIn()
    // {
    //     // If they are not logged in, then log the user in
    //     if(sessionStorage.getItem('myUserEntity') === null){
    //         //Redirect to login page, no user entity available in sessionStorage
    //         signIn();
    //     } else {
    //         showPage('home');
    //         //User already logged in, direct to index
    //         var userEntity = {};
    //         userEntity = JSON.parse(sessionStorage.getItem('myUserEntity'));
    //     }
    // }

    // The ID token you need to pass to your backend:
    // var id_token = googleUser.getAuthResponse().id_token;
    // console.log('ID Token: ' + id_token);
    //
    // function onSuccess(googleUser) {
    //     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    //     showPage('home');
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
    startIndex = 1;
    function save($slideElm, oldIndex, newIndex) {
        console.log(oldIndex + ' ' + newIndex);
        localStorage.setItem('currentIndex', newIndex);
    }
    var slider = $('.bxslider').bxSlider({
        nextSelector: '#0',
        startSlide: startIndex,
        mode: 'horizontal',
        infiniteLoop: false,
        auto: false,
        pause: 3000,
        autoControls: false,
        pager: true,
        pagerType: 'full',
        controls: true,
        captions: true,
        speed: 500,
        onSlideAfter: function($slideElm, oldIndex, newIndex) { save($slideElm, oldIndex, newIndex);}
    });
    window.gotoButton = function(pg){
        slider.goToSlide(pg);
    };
    // function signOut() {
    //     var auth2 = gapi.auth2.getAuthInstance();
    //
    //     auth2.signOut().then(function () {
    //         console.log('User signed out.');
    //     });
    // }

    //Placeholder for page 4
    page4PH = document.getElementById('placeholder3');
    page4img = document.createElement('img');
    page4img.src = 'img/white.png';
    page4PH.appendChild(page4img);

    //** ON PAGE LOAD LOAD JSON AND IMAGES AND STORE URLS LOCALLY **//
    var arr=[], placeholder=[], image=[];
    var host = 'http://csusm-cs-441-chc.appspot.com/apiv1';//general host name
    var route = '/recipes_drink/search?names=&results=15';
    for(i = 0; i < 3; i++){
        placeholder[i] = document.getElementById('placeholder'+i);
        image[i] = document.createElement('img');
        image[i].classList.add('hidden');
        image[i].addEventListener('load', function(){
            this.classList.remove('hidden');
            this.classList.add('cardimg');
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
            var name_ID = 'name' + i;
            localStorage.setItem(name_ID,name);
            img = data.recipes[arr[i]].image_url;
            img_ID = 'img' + i;
            localStorage.setItem(img_ID, img);
        }
        for(i = 0; i < 3; i++) {
            image[i].src = data.recipes[arr[i]].image_url;
            placeholder[i].appendChild(image[i]);
        }
        localStorage.setItem('drink_count', data.results);
        localStorage.setItem('page_index', 1);
    }).fail(function(){console.log('failure to load JSON');});
    //** ON PAGE LOAD LOAD JSON AND IMAGES AND STORE URLS LOCALLY **//
});
function gotopage(clicked) {
    if(clicked === 'back_to_drinks1' || clicked === 'back_to_drinks2') {
        gotoButton(2);
    }
}
//SEARCH BAR FUNCTION
function searchBar(){
    var input, filter, radio, route;
    var host = 'http://csusm-cs-441-chc.appspot.com/apiv1';//general host name
    // var temp = localStorage.getItem('card1')
    radio = document.getElementsByName('options');
    input = document.getElementById('myinput');
    filter = input.value;
    if(radio[0].checked) {
        console.log(radio[0].value); //name is checked, search by name
        route = '/recipes_drink/search?names=';
        filter = filter.replace(/\s/g, '%20'); // replace whitespace
    }
    else if(radio[1].checked){
        console.log(radio[1].value); //tag is checked, search by tag
        route = '/recipes_drink/search?tags=';
        filter = filter.replace(/\s/g, '%26');
    }
    else {
        console.log(radio[2].value); //ingredients is checked, search by ingredients
        filter = filter.replace(/\s/g, '%26');
        //DOESNT WORK YET
    }
    console.log(filter);
    $.getJSON(host+route+filter, function(data) {
        console.log(data);
        drink_search_page = document.getElementById('drink_search_page');
        var children = [], t = [], text;
        for(i=0; i< data.results; i++){
            children[i] = document.createElement("H1");
            text = data.recipes[i].name;
            t[i] = document.createTextNode(text);
            children[i].appendChild(t[i]);
            children[i].style = "margin:40px 5px;color:blue;";
            drink_search_page.appendChild(children[i]);
        }
    }).fail(function(){
        console.log('failure to load JSON');
    }); setTimeout(function(){  gotoButton(4); }, 1000);//go to next slide
}

//CLEAR FUNCTION
function clearFunction(clicked){
    parent = document.getElementById('drink_search_page');
    console.log("clear button");
    console.log(parent.childElementCount);
    for(i=parent.childElementCount-1; i>=0; i--) {
        parent.removeChild(parent.childNodes[i]);
    }
}
//SELECT CARD
function selectCard(pressed){
    var page_index, button_num, drink_number, host, route, filter, image;
    host = 'http://csusm-cs-441-chc.appspot.com/apiv1';//general host name
    route = '/recipes_drink/search?names=';
    page_index = parseInt(localStorage.getItem('page_index'));
    button_num = parseInt(pressed);
    console.log('button' + button_num + ' pressed');
    console.log('page index: ' + page_index);
    drink_number = 'name' + ((page_index*3)-3+button_num);
    console.log(drink_number);
    filter = localStorage.getItem(drink_number); // get the drink name from storage
    console.log(filter);
    filter = filter.replace(/\s/g, '%20');
    filter = filter + '&results=1';
    //init stuff
    placeholder3 = document.getElementById('placeholder3');
    image = document.createElement('img');
    image.classList.add('hidden');
    image.addEventListener('load', function() {
        this.classList.remove('hidden');
        this.classList.add('cardimg');
    });
    // end init stuff
    $.getJSON(host+route+filter, function(data) {
        console.log(data);
        image.src = data.recipes[0].image_url;
        tags = 'Tags: ' + data.recipes[0].tags.join(' ');
        placeholder3.replaceChild(image,placeholder3.childNodes[0]);
        document.getElementById('name4').innerText = data.recipes[0].name;
        document.getElementById('tags4').innerText = tags;
        $.getJSON(data.recipes[0].steps_url, function(data1){
            console.log(data1);
            length = data1.steps.length;
            steps = '';
            for(i = 0; i < length; i++){
                steps += '- ' + data1.steps[i] + '\n';
            }
            document.getElementById('steps4').innerText = steps;
        }).fail(function(){console.log('failure to load JSON');})
    }).fail(function(){
        console.log('failure to load JSON');
    });
    setTimeout(function(){  gotoButton(3); }, 1000);//go to next slide
}
//DRINK PAGE FOR NAVAGATION
function navigate_drinks(clicked) { $(document).ready(function () {
    console.log('clicked the ' + clicked + ' button');
    var img = [], placeholder = [], page_index, drink_count, count, direction;
    if(clicked === 'next'){direction = 1;}
    else{direction = -1;}
    page_index = parseInt(localStorage.getItem('page_index'));
    drink_count = parseInt(localStorage.getItem('drink_count'));
    count = ((page_index+direction) *3) -3;
    if(count < 0 || count > drink_count){ return; } //maybe grey out the button or something Idk
    console.log('page_index = ' + page_index + ' drink_count = ' + drink_count + ' count = ' + count);
    for(i = 0; i < 3; i++){
        if((count + i) < drink_count){
            placeholder[i] = document.getElementById('placeholder'+i);
            placeholder[i].childNodes[1].classList.add('hidden');
            img[i] = document.createElement('img');
            img[i].classList.add('cardimg');
            img[i].classList.add('hidden');
            img[i].addEventListener('load', function(){
                this.classList.replace('hidden', 'visible');
            });
            var img_key = 'img' + (count+i);
            var img_url = localStorage.getItem(img_key);
            console.log(img_url);
            img[i].src = img_url;
            placeholder[i].replaceChild(img[i],placeholder[i].childNodes[1]);
        }
    }
    if((count + (direction * 2))<drink_count) { //
        localStorage.removeItem('page_index');
        localStorage.setItem('page_index', (page_index + direction));
    }
});}