

var myLatLng = {lat: 40.785794, lng: -73.978329};

var mapOptions = {
    zoom: 15, 
    mapTypeId: google.maps.MapTypeId.ROADMAP, 
    center: myLatLng,
    zoomControl: false,
    streetViewControl: false,
    mapId: '6ef7a08d56eadd75',
};

var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

var image_me = "./static/images/marker_me.png";
var marker_me = new google.maps.Marker({
    position: myLatLng, 
    map,
    icon: image_me,
});

// const contentString =
//     '<div id="content">' +
//     '<h1>TEST</h1>' +
//     "</div>";
// const infowindow_me = new google.maps.InfoWindow({
//     content: popup, minWidth: 255
// });

// marker_me.addListener("click", () => {
//     popup.style.display="block";
//     infowindow_me.open({
//         anchor: marker_me,
//         map,
//         shouldFocus: false,
//     });
// });


var mydata
var locations_restroom
var locations_water
var locations_indoor
var locations_outdoor

var restroom = 1;
var water = 1;
var indoor = 1;
var outdoor = 1;

var markers_restroom = [];
var markers_water = [];
var markers_indoor = [];
var markers_outdoor = [];

var image_restroom = "./static/images/marker_restroom.png";
var image_water = "./static/images/marker_water.png";
var image_indoor = "./static/images/marker_indoor.png";
var image_outdoor = "./static/images/marker_outdoor.png";
var location_latlng;
var content;
var lat;
var lng;

$.getJSON("./static/map_location_data.json", function(data) {
    const popup1 = document.getElementById("popup1");
    const popup2 = document.getElementById("popup2");
    mydata = data;
    locations_restroom = mydata[0].locations;
    locations_water = mydata[1].locations;
    locations_indoor = mydata[2].locations;
    locations_outdoor = mydata[3].locations;
    for (let i = 0; i < 3; i++){
        lat = locations_restroom[i].lat;
        lng = locations_restroom[i].lng;
        // content = locations_restroom[i].details;
        if (i == 2) {
            content = popup1;
        }
        else
        {
            content = locations_restroom[i].details;
        }
        location_latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
        eval('var ' + 'marker_restroom' + i + '= new google.maps.Marker({position: location_latlng, map,icon: image_restroom,});');
        eval('infowindow_restroom'+i+'= new google.maps.InfoWindow({content: content, minWidth: 255});');
        eval('marker_restroom' + i+'.addListener("click", () => {popup1.style.display = "block"; infowindow_restroom'+i+'.open({anchor: '+'marker_restroom' + i+',map,shouldFocus: false,});});');

        eval('markers_restroom.push('+'marker_restroom' + i+');');
    }
    for (let i = 0; i < 3; i++){
        lat = locations_water[i].lat;
        lng = locations_water[i].lng;
        if (i == 2) {
            content = popup2;
        }
        else
        {
            content = locations_water[i].details;
        }
        location_latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
        eval('var ' + 'marker_water' + i + '= new google.maps.Marker({position: location_latlng, map,icon: image_water,});');
        eval('infowindow_water'+i+'= new google.maps.InfoWindow({content: content, minWidth: 255});');
        eval('marker_water' + i+'.addListener("click", () => {popup2.style.display = "block"; infowindow_water'+i+'.open({anchor: '+'marker_water' + i+',map,shouldFocus: false,});});');
        eval('markers_water.push('+'marker_water' + i+');');
    }
    for (let i = 0; i < 3; i++){
        lat = locations_indoor[i].lat;
        lng = locations_indoor[i].lng;
        content = locations_indoor[i].details;
        location_latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
        eval('var ' + 'marker_indoor' + i + '= new google.maps.Marker({position: location_latlng, map,icon: image_indoor,});');
        eval('var infowindow_indoor'+i+'= new google.maps.InfoWindow({content: content,});');
        eval('marker_indoor' + i+'.addListener("click", () => {infowindow_indoor'+i+'.open({anchor: '+'marker_indoor' + i+',map,shouldFocus: false,});});');
        eval('markers_indoor.push('+'marker_indoor' + i+');');
    }
    for (let i = 0; i < 3; i++){
        lat = locations_outdoor[i].lat;
        lng = locations_outdoor[i].lng;
        content = locations_outdoor[i].details;
        location_latlng = {lat: parseFloat(lat), lng: parseFloat(lng)};
        eval('var ' + 'marker_outdoor' + i + '= new google.maps.Marker({position: location_latlng, map,icon: image_outdoor,});');
        eval('var infowindow_outdoor'+i+'= new google.maps.InfoWindow({content: content,});');
        eval('marker_outdoor' + i+'.addListener("click", () => {infowindow_outdoor'+i+'.open({anchor: '+'marker_outdoor' + i+',map,shouldFocus: false,});});');
        eval('markers_outdoor.push('+'marker_outdoor' + i+');');
    }
});


function setMapOnAll_restroom(map) {
    for (let i = 0; i < markers_restroom.length; i++) {
        markers_restroom[i].setMap(map);
    }
}
function setMapOnAll_water(map) {
    for (let i = 0; i < markers_water.length; i++) {
        markers_water[i].setMap(map);
    }
}
function setMapOnAll_indoor(map) {
    for (let i = 0; i < markers_indoor.length; i++) {
        markers_indoor[i].setMap(map);
    }
}
function setMapOnAll_outdoor(map) {
    for (let i = 0; i < markers_outdoor.length; i++) {
        markers_outdoor[i].setMap(map);
    }
}

var customize = document.getElementById("bottom_bar_customize");
var timer = 0;
var timerInterval;

function customize_close(){
    customize.style.visibility ='hidden';
}

var button1 = document.getElementById("bottom_button_restroom");
button1.addEventListener("mousedown", function() {
    timerInterval = setInterval(function(){
        timer += 1;
    }, 200);
});
button1.addEventListener("mouseup", function() {
    if (timer>1){
        console.log("long");
        customize.style.visibility ='visible';
    }else{
        console.log("short");
        restroom++;
        if (restroom % 2 == 0){
            document.getElementById("bottom_button_restroom").style.backgroundColor = '#A1A1A1';
            document.getElementById("bottom_button_restroom").style.border = '4px solid #797979';
            setMapOnAll_restroom(null);
        }else{
            document.getElementById("bottom_button_restroom").style.backgroundColor = '#FF6060';
            document.getElementById("bottom_button_restroom").style.border = '4px solid #FF0000';
            setMapOnAll_restroom(map);
        } 
    }
    clearInterval(timerInterval);
    timer = 0;
});

var button2 = document.getElementById("bottom_button_water");
button2.addEventListener("mousedown", function() {
    timerInterval = setInterval(function(){
        timer += 1;
    }, 200);
});
button2.addEventListener("mouseup", function() {
    if (timer>1){
        console.log("long");
        customize.style.visibility ='visible';
    }else{
        console.log("short");
        water++;
        if (water % 2 == 0){
            document.getElementById("bottom_button_water").style.backgroundColor = '#A1A1A1';
            document.getElementById("bottom_button_water").style.border = '4px solid #797979';
            setMapOnAll_water(null);
        }else{
            document.getElementById("bottom_button_water").style.backgroundColor = '#4563FF';
            document.getElementById("bottom_button_water").style.border = '4px solid #0029FF';
            setMapOnAll_water(map);
        } 
    }
    clearInterval(timerInterval);
    timer = 0;
});

var button3 = document.getElementById("bottom_button_indoor");
button3.addEventListener("mousedown", function() {
    timerInterval = setInterval(function(){
        timer += 1;
    }, 200);
});
button3.addEventListener("mouseup", function() {
    if (timer>1){
        console.log("long");
        customize.style.visibility ='visible';
    }else{
        console.log("short");
        indoor++;
        if (indoor % 2 == 0){
            document.getElementById("bottom_button_indoor").style.backgroundColor = '#A1A1A1';
            document.getElementById("bottom_button_indoor").style.border = '4px solid #797979';
            setMapOnAll_indoor(null);
        }else{
            document.getElementById("bottom_button_indoor").style.backgroundColor = '#CC00FF';
            document.getElementById("bottom_button_indoor").style.border = '4px solid #8A01AC';
            setMapOnAll_indoor(map);
        } 
    }
    clearInterval(timerInterval);
    timer = 0;
});


var button4 = document.getElementById("bottom_button_outdoor");
button4.addEventListener("mousedown", function() {
    timerInterval = setInterval(function(){
        timer += 1;
    }, 200);
});
button4.addEventListener("mouseup", function() {
    if (timer>1){
        console.log("long");
        customize.style.visibility ='visible';
    }else{
        console.log("short");
        outdoor++;
        if (outdoor % 2 == 0){
            document.getElementById("bottom_button_outdoor").style.backgroundColor = '#A1A1A1';
            document.getElementById("bottom_button_outdoor").style.border = '4px solid #797979';
            setMapOnAll_outdoor(null);
        }else{
            document.getElementById("bottom_button_outdoor").style.backgroundColor = '#0FBC00';
            document.getElementById("bottom_button_outdoor").style.border = '4px solid #0B8D00';
            setMapOnAll_outdoor(map);
        } 
    }
    clearInterval(timerInterval);
    timer = 0;
});