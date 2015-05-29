var map;
var service;
var points = [];
var points2 = ko.observableArray();

var lat, lng;
//serachplaces function which finds salons in current bound of the map
function searchPlaces() {
	var request = {
		//rect object of how the map window is bound of the map
		bounds: map.getBounds(),
		name: "salon"
	};
	
	//places nearby search
	service.nearbySearch(request, processSearchResults);
}
//this will process results and add them to points array
function processSearchResults(results, status) {
	var obj, marker,
		info = new google.maps.InfoWindow({
            content: ""
        });
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++){
			//save the results in points array
			obj = {
				name: results[i].name,
				rating: results[i].rating,
				lat: results[i].geometry.location.lat(),
				lng: results[i].geometry.location.lng(),
				streetImg: "https://maps.googleapis.com/maps/api/streetview?size=180x90&location="
							+results[i].geometry.location.lat() + "," 
							+ results[i].geometry.location.lng(),
				showFlag: ko.observable(true),
				flag: true
			};
			//adding this just to check if the mapview is not ok will just set a default image
			// I was not able to test this case did not get any location withour the image
			if(status != google.maps.StreetViewStatus.OK){
				obj.streetImg= "../home2.png";
			}
			points.push(obj);
			points2.push(obj);
			setLocations(obj,info);
		}		
	}
}
//this function will set the location of pointers
function setLocations(location,info) {
    
    
        location.currentMarker = new google.maps.Marker({
			position: new google.maps.LatLng(location.lat, location.lng),
			map: map,
			title: location.name
        });
		//used stackoverflow example for this part to click a marker and see the infowindow
        new google.maps.event.addListener(location.currentMarker, 'click', (function (marker) {
			return function () {
				var cont = '<strong> Salon Name: ' + location.name;
				if(typeof location.rating == 'undefined'){
					cont += '<p style="font-size: 20px ; color: red">Rating Not Available';
					
				}else{
					cont += '<p style="font-size: 20px ; color: red">Rating: ' + location.rating;
				}
				cont += '</p><hr></strong><img src="' +
					location.streetImg + '">';
				
				info.setContent(cont);
				info.open(map, this);
			};
        })(location.currentMarker));
	
}

//check for the marker visiblity which should be passed to viewModel
function createAllMapLocations() {
	for (var i = 0; i < points.length; i++) {
		if(points[i].flag === true) {
			points[i].currentMarker.setMap(map);
		}else {
			points[i].currentMarker.setMap(null);
		}
	}
}

//init function will be called at the document ready loading
function init(location){
	console.log(location);
	//these will be used for flickr
	lat=location.coords.latitude;
	lng=location.coords.longitude;
	console.log("init: lat: lat "+lat +" "+lng);
	
	var currentPoint = new google.maps.LatLng(location.coords.latitude, location.coords.longitude) ;
	//these options tells how to display the map
	//use the lng and ltd of geolocation returned 
	var mapOptions = {
		zoom: 12,
		center: currentPoint
  	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	//add a marker for the loation from under overlays in documentations
	//this will set the icon for location of the user to a home icon
	var marker = new google.maps.Marker({
		position: currentPoint,
		map: map,
		icon: "../img/home2.png"
	});
	
	//google places nearby search api initialize service 
	service = new google.maps.places.PlacesService(map);
	//call the performSearch method here
	//calling this way makes sure all the page is loaded
	google.maps.event.addListenerOnce(map,'bounds_changed',searchPlaces);
	createAllMapLocations();
	$('#search-nav').show();
	$("#flickr").show();
	getImagesFromFlckrAPI(lat,lng);
}

//will also use html5 geolocation to find current location of user
$(document).ready(function(){
	//get current location of the user
	navigator.geolocation.getCurrentPosition(init);
});

$( "#input" ).click(function() {
  	$('#search-nav2').hide();
});

///KO
//this is where I use KOJS MVVM 
//this script will run after main.js script which loads the map
//will use points from main to assign it to markers
var MapView = function () {
	this.markers = points;
	this.observableMarkers;
	
};
//Search throught the markers and only show the one that matches
var ViewModel = function () {
	this.newMap = ko.observable(new MapView());
	var self = this;
	self.observableMarkers =points2;
	self.searchString = ko.observable('');
	this.markers = ko.dependentObservable(function () {
		var search = self.searchString().toUpperCase();
		//using the arrayFilter of knockout here   
		return ko.utils.arrayFilter(self.newMap().markers, function (marker) {
			if (marker.name.toUpperCase().indexOf(search) >= 0) {
				marker.flag = true;
				createAllMapLocations();
				return marker.showFlag(true);
			}			
			else {
				marker.flag = false;
				return marker.showFlag(false);
			} 
		});
	});
};
//apply bindings to the view model
ko.applyBindings(ViewModel());

