/*
	variables
*/
class Course {
	constructor(name, credits, category, isElective, year, trimester) {
		this.name = name;
		this.credits = credits;
		this.category = category;
		this.grade = -1;
		this.isElective = isElective;
		this.year = year;
		this.trimester = trimester;
	}
}


const courses = [
	new Course("Foreign language", 5, "Languages", false, 1, 1),
	new Course("Culturology", 2, "Society", false, 1, 1),
	new Course("ICT", 5, "IT", false, 1, 1),
	new Course("Physical Culture 1", 2, "Sport", false, 1, 1),
	new Course("Practice", 2, "Practice", false, 1, 1),
	new Course("Linear Algebra", 5, "Math", false, 1, 1),
	new Course("Introduction to Programming", 5, "IT", false, 1, 1),
	new Course("Physical Culture 2", 2, "IT", false, 1, 2),
	new Course("Modern history of Kazakhstan", 5, "Society", false, 1, 2),
	new Course("Foreign Language 2", 5, "Languages", false, 1, 2),
	new Course("Discrete Math", 5, "Math", false, 1, 2),
	new Course("Web Programming 1", 5, "IT", false, 1, 2),
	new Course("Object Oriented Programming in Java", 5, "IT", false, 1, 2),
	new Course("Physical Culture 3", 2, "Sport", false, 1, 3),
	new Course("Algorithms and Data structure", 5, "IT", false, 1, 3),
	new Course("Web technologies 2", 5, "IT", false, 1, 3),
	new Course("Math analysis 1", 5, "Math", false, 1, 3),
	new Course("Professional English language", 5, "Languages", false, 1, 3),	
	new Course("Labaratory of programming", 5, "IT", false, 1, 3),	
]

const grades = [    
    ["A", 4],
    ["A-", 3.7],
    ["B+", 3.3],
    ["B", 3],
    ["B-", 2.7],
    ["C+", 2.3],
    ["C", 2.0],
    ["C-", 1.7],
    ["D+", 1.3],
    ["D", 1.0],
    ["D-", 0.7],
    ["F", 0]
]

let selected_courses;
let selected_year = 1;
let selected_trimesters = [2];





/* 
	Initializing
*/
init();	

function init()     {
    selected_year = localStorage.getItem('selected_year');
    var st = localStorage.getItem('selected_trimesters');        
    selected_trimesters = [];		

    for (let trim of st) {
        if (trim != ',')
            selected_trimesters.push(new Number(trim));
    }

    

  	selected_courses = courses.filter(course =>  
                selected_year == course.year 
                && selected_trimesters.findIndex(trimester => trimester == course.trimester) != -1);
    
  
  	for (let course of selected_courses) {		
			var div = document.createElement("div");		
			div.classList.add("d-flex");		
			if (course !== selected_courses[0])
					div.classList.add("mt-2")

			
			var inputName = document.createElement("input");	
			inputName.type = "text";
			inputName.value = course.name;
			inputName.readOnly = true;
			inputName.classList.add("form-control");
			inputName.classList.add("w-25");


			var inputCredits = document.createElement("input");	
			inputCredits.type = "text";
			inputCredits.value = course.credits;
			inputCredits.readOnly = true;
			inputCredits.classList.add("form-control");
			inputCredits.classList.add("w-25");
			inputCredits.classList.add("ms-2");

			var selectDiv = document.createElement("div");
			selectDiv.classList.add("w-25");
			selectDiv.classList.add("ms-2");
					

			var select = document.createElement("select");
					select.setAttribute("id", course.name);
			select.classList.add("form-select");
			select.name = course.name;
			select.id = course.name;
		
			var selected_option = document.createElement("option");
			selected_option.text = '-';
					selected_option.value = -1;
			selected_option.selected = true;
			
			select.appendChild(selected_option);
			for (const grade of grades) {
				var option = document.createElement("option");
				option.text = grade[0];
				option.value = grade[1];
				select.appendChild(option);
			}
			
			selectDiv.appendChild(select);
			

			div.appendChild(inputName);		
			div.appendChild(inputCredits);
			div.appendChild(selectDiv);
			document.getElementById('display-courses').appendChild(div);
  }
}

/*
    Cancel button
*/
const cancel = document.getElementById('cancel');

cancel.addEventListener("click", () => {
    document.location.replace("http://127.0.0.1:5500/home.html");
})

/*
    Submit button
*/
const button = document.getElementById('submit')

button.addEventListener("click", () => {
    for (let course of selected_courses) {
        var select = document.getElementById(course.name);
        var selected_grade = select.options[select.selectedIndex].value;
        if (selected_grade == -1) {
            alert('Please, fill all the grades')
            return;
        }
        course.grade = selected_grade;
    }    
    localStorage.setItem("courses", JSON.stringify(selected_courses));
    document.location.replace("http://127.0.0.1:5500/results.html");
})

