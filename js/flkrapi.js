var len = 0, flkrImgArray = [], imgIndex = 0, flkrData, imgFlag = false;
//get the json data from flickr api 
//if getting error display a message saying there was some error
function getImagesFromFlckrAPI(lat, lng) {
	var jsonUrl = 'https://api.flickr.com/services/rest/?' +
		'method=flickr.photos.search&api_key=ab2be4f78cbc26981e3fe484038ad122&' +
		'text=hair&nail&salon&accuracy=16&lat=' + lat + '&lon=' + lng + '&format=json';
	$.ajax({
		url: jsonUrl,
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		success: function (data) {
			var photo = data.photos.photo;
			flkrData = photo;
			len = data.photos.total;
		},
		error: function () {
			$('.flckrContainer').append('<h3>Error Loading Flickr Images</h3>');
			$("#rArrow").hide();
			$("#lArrow").hide();
		}
	});
}

// push the images from flickr to an array
function createFlickrImagesArray() {
	if (imgFlag === false) {
		for (var i=0; i < len; i++) {
			var photo = 'https://farm' + flkrData[i].farm + '.staticflickr.com/' + flkrData[i].server + '/' + flkrData[i].id + '_' + flkrData[i].secret + '.jpg';
			flkrImgArray.push(photo);
			$('.flckrContainer').append('<img  class="img-responsive"  id="flickr-image' + i + '" src="' + photo + '" alt="' + flkrData[i].title + ' Flickr Image">');
			$("#flickr-image" + i).hide();	
			if(i < 1) {
				$("#flickr-image" + i).show();
			}
		}
	} else {
		$("#flickr-image" + imgIndex).show();
	}
}

//View next image when clickeck 
function showNext() {
	$('#flickr-image' + imgIndex).hide();
	imgIndex += 1;
	if(imgIndex >= len) {
		imgIndex = 0;
	}
	$('#flickr-image' + imgIndex).fadeIn(300);	
}

//Bind click handler to arrow button to view previous image
function showPrev() {
	$('#flickr-image' + imgIndex).hide();
	imgIndex -= 1;
	if(imgIndex < 0) {
		imgIndex = len;
	}
	$('#flickr-image' + imgIndex).fadeIn(300);	
}

$("#rArrow").click(showNext);
$("#lArrow").click(showPrev);

//open the modal when flickr icon is clicked
$("#flkr-icon").click(function() {
    $(".modal").css("z-index", "10");
    $(".modal").show();
});
$("#flkr-icon").click(createFlickrImagesArray);

//hide the modal when exit is clicked
$("#exit").click(function() {
    $(".modal").css("z-index", "0");
    $(".modal").hide();
    $('.flckrContainer img').hide();
    imgFlag = true;
});




        







////////////////////////////////////////////////////