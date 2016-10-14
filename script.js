function showHome(){
	document.getElementById("home").style.display="block";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="none";
	document.getElementById("news").style.display="none";
	document.getElementById("notices").style.display="none";
	document.getElementById("guest-book").style.display="none";
}

function showCourses(){
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="block";
	document.getElementById("people").style.display="none";
	document.getElementById("news").style.display="none";
	document.getElementById("notices").style.display="none";
	document.getElementById("guest-book").style.display="none";
	var xhr = new XMLHttpRequest(); 
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses"; 
	xhr.open("GET", uri, true); 
	xhr.onload = function () { 
		var myJSONObj = JSON.parse(xhr.responseText); 
		for (var i=0; i < myJSONObj.courses.coursePaperSection.length-1 ; i++){
			var currentCourse = myJSONObj.courses.coursePaperSection[i];
			var courseBlock = document.createElement('div');
			courseBlock.className = "courseBlock";
			
			var courseCode = document.createElement('p');
			courseBlock.appendChild(courseCode);
			courseCode.innerHTML = currentCourse.subject.courseA;
			courseCode.className = "courseCode";
			
			var coursePoints = document.createElement('span');
			courseCode.appendChild(coursePoints);
			coursePoints.innerHTML=currentCourse.subject.points;
			coursePoints.className = "coursePoints";
			
			var courseTitle = document.createElement('p');
			courseBlock.appendChild(courseTitle);
			courseTitle.innerHTML=currentCourse.title;
			courseTitle.className = "courseTitle";
			
			var courseDescription = document.createElement('p');
			courseBlock.appendChild(courseDescription);
			courseDescription.innerHTML=currentCourse.description;
			courseDescription.className = "courseDescription";
			
			var courseRestrictions = document.createElement('p');
			courseBlock.appendChild(courseRestrictions);
			if (typeof currentCourse.prerequisite != "undefined"){
				courseRestrictions.innerHTML=currentCourse.prerequisite;
			}
			courseRestrictions.className = "courseRestrictions";
			
			courseBlock.appendChild(document.createElement('hr'));
			document.getElementById("courses").appendChild(courseBlock);
		}
	}
	xhr.send(null);
}

function showPeople(){
	var profileUrlArray = []
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="block";
	document.getElementById("news").style.display="none";
	document.getElementById("notices").style.display="none";
	document.getElementById("guest-book").style.display="none";
	profileUrlArray = getProfileUrl();
}

function showNews(){
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="none";
	document.getElementById("news").style.display="block";
	document.getElementById("notices").style.display="none";
	document.getElementById("guest-book").style.display="none";
	var xhr = new XMLHttpRequest(); 
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/news"; 
	xhr.open("GET", uri, true); 
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function () { 
		var newsJSON = JSON.parse(xhr.responseText);
		for (var i = 0; i < newsJSON.length-1; i++){
			var newsBlock = document.createElement('div');
			newsBlock.className = "newsBlock";
			
			var newsLink = document.createElement('a');
			newsLink.setAttribute('href', newsJSON[i].linkField);
			newsLink.setAttribute('target', "_blank");
			var newsTitle = document.createElement('span');
			newsLink.appendChild(newsTitle);
			newsBlock.appendChild(newsLink);
			newsTitle.innerHTML = newsJSON[i].titleField;
			newsBlock.appendChild(document.createElement('br'));
			
			var newsDate = document.createElement('span');
			newsDate.innerHTML = newsJSON[i].pubDateField + "<br><br>";
			newsBlock.appendChild(newsDate);
			
			var newsDetails = document.createElement('span');
			newsDetails.innerHTML = newsJSON[i].descriptionField + "<br><br>";
			newsBlock.appendChild(newsDetails);
			
			newsBlock.appendChild(document.createElement('hr'));
			document.getElementById("news").appendChild(newsBlock);
		}
	}
	xhr.send(null);
}
function showNotices(){
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="none";
	document.getElementById("news").style.display="none";
	document.getElementById("notices").style.display="block";
	document.getElementById("guest-book").style.display="none";
	var xhr = new XMLHttpRequest(); 
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/notices"; 
	xhr.open("GET", uri, true); 
	xhr.setRequestHeader("Accept", "application/json");
	xhr.onload = function () { 
		var noticesJSON = JSON.parse(xhr.responseText);
		for (var i = 0; i < noticesJSON.length; i++){
			var noticesBlock = document.createElement('div');
			noticesBlock.className = "notciesBlock";
			
			var noticesLink = document.createElement('a');
			noticesLink.setAttribute('href', noticesJSON[i].linkField);
			noticesLink.setAttribute("target", "_blank");
			var noticesTitle = document.createElement('span');
			noticesLink.appendChild(noticesTitle);
			noticesTitle.innerHTML = noticesJSON[i].titleField;
			noticesBlock.appendChild(noticesLink);
			noticesBlock.appendChild(document.createElement('br'));
			
			var noticesDate = document.createElement('span');
			noticesDate.innerHTML = noticesJSON[i].pubDateField + "<br><br>";
			noticesBlock.appendChild(noticesDate);
			
			var noticesDetails = document.createElement('span');
			noticesDetails.innerHTML = noticesJSON[i].descriptionField + "<br><br>";
			noticesBlock.appendChild(noticesDetails);
			noticesBlock.appendChild(document.createElement('hr'));
			
			document.getElementById("notices").appendChild(noticesBlock);
		}
	}
	xhr.send(null);
}

function showGuestBook(){
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="none";
	document.getElementById("news").style.display="none";
	document.getElementById("notices").style.display="none";
	document.getElementById("guest-book").style.display="block";
}


function getProfileUrl(){
	var profileUrlArray = [];
	var xhr = new XMLHttpRequest(); 
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/people"; 
	xhr.open("GET", uri, true);
	xhr.onload = function () {
		var peopleJSON = JSON.parse(xhr.responseText);
		for (var i=0; i < peopleJSON.list.length-1; i++){
			profileUrlArray.push(peopleJSON.list[i].profileUrl[1]);
		}
		displayPersonPictures(profileUrlArray);
	}
	xhr.send(null);
}

function displayPersonPictures(profileUrlArray){
	for (var i=0; i < profileUrlArray.length -1; i++){
		xhr = new XMLHttpRequest();
		var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/person?u=" + profileUrlArray[i];
		xhr.open("GET", uri, true);
		xhr.onload = function () {
			if (this.readyState == 4 && this.status == 200){
				var personResponse = JSON.parse(this.responseText);
				var personBlock = document.createElement('div');
				personBlock.className = "personBlock";
				var imageUri = "https://www.cs.auckland.ac.nz" + personResponse.image;
				
				var personPicture = document.createElement('img');
				personBlock.appendChild(personPicture);
				personPicture.setAttribute('src',imageUri);
				personPicture.class = "personPicture";
				
				var personDetails = document.createElement('span');
				personBlock.appendChild(personDetails);
				personDetails.innerHTML = personResponse.fullName + "\n";
				personDetails.className = "top";
				
				var personPosition = document.createElement('span');
				personDetails.appendChild(document.createElement('br'));
				personDetails.appendChild(personPosition);
				personPosition.innerHTML = personResponse.positions[0].position;
				personDetails.appendChild(document.createElement('br'));
				
				if (typeof personResponse.phoneNumbers[0].phone != "undefined"){
					var num = document.createElement('a');
					num.setAttribute('href', "tel:" + personResponse.phoneNumbers[0].phone);
					phoneNumber = document.createElement('span');
					phoneNumber.innerHTML = '&#9743 ' + personResponse.phoneNumbers[0].phone;
					num.appendChild(phoneNumber);
					personDetails.appendChild(num);
					personDetails.appendChild(document.createElement('br'));
				}
				
				if (typeof personResponse.emailAddresses != "undefined"){
					var personEmail = document.createElement('a');
					personEmail.setAttribute('href', "mailto:" + personResponse.emailAddresses);
					emailLink = document.createElement('span');
					emailLink.innerHTML = "&#9993 " + personResponse.emailAddresses;
					personEmail.appendChild(emailLink);
					personDetails.appendChild(personEmail);
					personDetails.appendChild(document.createElement('br'));
				}
				
				var vCardLink = document.createElement('a');
				vCardLink.setAttribute('href', "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/vcard?u=" + profileUrlArray[i]);
				vCardDownload = document.createElement('span');
				vCardDownload.innerHTML = '&#9786 ' + "Add to contacts";
				vCardLink.appendChild(vCardDownload);
				personDetails.appendChild(vCardLink);
				
				document.getElementById("people").appendChild(personBlock);
			}
		}
		xhr.send(null);
	}
}

function postComment(){
	xhr = new XMLHttpRequest();
	var name = document.getElementById("commentName").value;
	var uri = "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/comment?name=" + name;
	var comment = document.getElementById("commentDetails").value;
	var params = '"/comment?name=sad"';
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onload = function () {
		document.getElementById("commentName").value = "";
		document.getElementById("commentDetails").value = "";
	}
	xhr.send("\"" +comment+ "\""); 
}
