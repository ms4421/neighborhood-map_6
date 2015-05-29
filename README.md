5/29/2015
Used flickr api using ajax call and json return value. parsed the json to get images for salons/nails/hair based on current location of the user. here are steps on how to view them:
1. there is an icon on top right corner of the page for flickr
2. after the page loads, click that icon and it will open a modal
3. used bootstrap icons inside modal for arrows and exit.
4. you can view next/prev and exit the modal.

5/13/2015
I made all changes based on evaluations.Now the list shows as the page loads. the search is working. when search a salon name only that will show on list and map marker. when backspace the search input all the markers will show again. I added a check for streetview image, but I did not get any point without image to test that. The streetview is only an additional functionality that was added besides google map and nearby api.
	

5/12/2015
all fixes after evaluation:
I made all corrections in index.html as well as my main.js file. I moved the code from koRelated to main.js and the section related to ko is at the bottom of the page. instead of seperate infowindows I have only one which is used by all. I included all testing images in this folder.
	step1.png: when page loads first
	step2.png: when I type salon in my search input box and list view shows
	step3.png: when I type the name of a salon and that is the only one showing on list and marker
	step4.png: when rating is not avalable from nearby response I change it to not available
	step5.png: when streetview has the image, nearby has rating and name in response and all are good.

5/11/2015
This section is what all changes I made after the second evaluation came back.
After the feedback I made major changes to the page. I used places nearby search api results instead of hardcoding any array. I used results from the palces api to show markers on the page. Seperated the code that is related to the map only and knockoutJS part in diff js files. organized all my code better. made my search list div fluid so that it will resize based on results from search


Steps to run the app:
	1. open index.html on any modern browser
	2. it should showup a map and a search input bar
	3. click any of the markers on the map and will open a salon near you
	4. in input bar try to search for Salon (it will show all salons in our ko list)
	5. in input bar search for a salon name and it will show that salon marker only on the map and the list
	6. to see all markers on the page just refresh the page


Sites used:
	stackoverflow.com
	knockoutjs.com/documentation
	jquery.com

APIs used:
	1. google Map API
	2. google map places nearby API
	3. google streetview API

format:
	Used bootstrap to format the divs of my page 

Steps for development:
	1. included google map in our page
	2. used geolocation of html5 to get the location of the user and mark it on the page
	3. used places api to find all salons in current location of user and bound to the wind of map
	4. got result from places and saved the points in an arra
	5. showed markers for those points
	6. sued streetview to assign to image of each location 
	7. added infowindows for all points icluding the image of the lcations got from streetview
	8. added a search navigation in our page 






