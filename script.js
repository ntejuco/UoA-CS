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
		for (i=0; i < myJSONObj.courses.coursePaperSection.length-1 ; i++){
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
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="block";
	document.getElementById("news").style.display="none";
	document.getElementById("notices").style.display="none";
	document.getElementById("guest-book").style.display="none";
}

function showNews(){
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="none";
	document.getElementById("news").style.display="block";
	document.getElementById("notices").style.display="none";
	document.getElementById("guest-book").style.display="none";
}
function showNotices(){
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="none";
	document.getElementById("news").style.display="none";
	document.getElementById("notices").style.display="block";
	document.getElementById("guest-book").style.display="none";
}

function showGuestBook(){
	document.getElementById("home").style.display="none";
	document.getElementById("courses").style.display="none";
	document.getElementById("people").style.display="none";
	document.getElementById("news").style.display="none";
	document.getElementById("notices").style.display="none";
	document.getElementById("guest-book").style.display="block";
}

