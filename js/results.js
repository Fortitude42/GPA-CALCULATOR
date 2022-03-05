//colors
const colors = [
    '#003f5c',
    '#2f4b7c',
    '#665191',
    '#a05195',
    '#d45087',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
]

//getting courses from index.html
const courses = JSON.parse(localStorage.getItem("courses"));


let totCredits = 0;
for (let course of courses)
    totCredits += course.credits;

/*
    Main Method
*/
function calculate_gpa(courses) {
    let mySum = 0, totSum = 0;
    for (var i = 0; i < courses.length; ++i) {
        mySum += courses[i].grade * courses[i].credits; 
        totSum += courses[i].credits;
    }

    return (mySum / totSum).toFixed(2);
}

/*
    Initializing
*/
let bar_category_data, bar_category_comparing_data, doughnut_courses_data;
let bar_courses_data, doughnut_category_data, doughnut_category_colors, doughnut_courses_colors;
let overlook_category_data, overlook_courses_data;

init();
function init() {
    document.getElementById('overall').innerHTML = calculate_gpa(courses);
    /*
     * Collecting courses bar chart data
     */
    bar_courses_data = new Map();
    for (let course of courses)
        bar_courses_data.set(course.name, course.grade);

    bar_courses_data = new Map([...bar_courses_data.entries()].sort((a, b) => b[1] - a[1]));

    /*
     * Collecting category bar chart data
     */
    var categories = new Set();
    bar_category_data = new Map();
    bar_category_comparing_data = [];

    for (let course of courses)
        categories.add(course.category);
    

    for (let category of categories) {
        let courses_by_category = [];
        for (let course of courses)
            if (course.category == category) 
                courses_by_category.push(course);

        bar_category_data.set(category, calculate_gpa(courses_by_category));
        bar_category_comparing_data.push(calculate_gpa(courses))
    }    

    bar_category_data = new Map([...bar_category_data.entries()].sort((a, b) => b[1] - a[1]));

    /*
     * Collecting courses doughnut chart data
     */
    doughnut_courses_data = new Map();
    doughnut_courses_colors = [];

    let overlook = 0;
    for (let course of courses) {
        doughnut_courses_data.set(course.name, ((course.grade * course.credits) / totCredits).toFixed(2));
        overlook += ((4 - course.grade) * course.credits) / totCredits;
    }    

    overlook = overlook.toFixed(2);    
    doughnut_courses_data.set("Overlooked", overlook);    
    doughnut_courses_data = new Map([...doughnut_courses_data.entries()].sort((a, b) => {
        if (a[0] == "Overlooked")
            return -1;
        return b[1] - a[1];
    }));
    
    let i = 0;
    for (let [key, item] of doughnut_courses_data)
        if (key == "Overlooked")
            doughnut_courses_colors.push('rgb(255, 0, 0)')
        else    
            doughnut_courses_colors.push(colors[(i++) % colors.length])
    /*
    * Collecting category doughnut chart data        
    */
    doughnut_category_data = new Map();    
    for (let category of categories) {
        let sum = 0;
        for (let course of courses)
            if (course.category == category) 
                sum += course.grade * course.credits;                
                    
        doughnut_category_data.set(category, (sum / totCredits).toFixed(2));
    }    

    
    doughnut_category_data.set("Overlooked", overlook);
    doughnut_category_data = new Map([...doughnut_category_data.entries()].sort((a, b) => {
        if (a[0] == 'Overlooked')
            return -1;
        return b[1] - a[1];
    }));
    doughnut_category_colors = [];

    i = 0
    for (let [key, item] of doughnut_category_data)
        if (key == "Overlooked")
            doughnut_category_colors.push('rgb(255, 0, 0)')
        else    
            doughnut_category_colors.push(colors[(i++) % colors.length])

    /*
    * Collecting overlook by courses data
    */            
    overlook_courses_data = new Map();
    for (let course of courses)
        overlook_courses_data.set(course.name, (((4 - course.grade) * course.credits) / totCredits).toFixed(2));    

    overlook_courses_data = new Map([...overlook_courses_data.entries()].sort((a, b) => {        
        return b[1] - a[1];
    }));

    /*
    * Collecting overlook by category data    
    */
    overlook_category_data = new Map();
    for (let category of categories) {
        let sum = 0;
        for (let course of courses)
            if (course.category == category) 
                sum += (4 - course.grade) * course.credits;
        overlook_category_data.set(category, (sum / totCredits).toFixed(2));
    }

    overlook_category_data = new Map([...overlook_category_data.entries()].sort((a, b) => {        
        return b[1] - a[1];
    }));
}

/*
* Chart data
*/

const barCoursesData = {
    labels: Array.from( bar_courses_data.keys() ),
    datasets: [{
        label: 'GPA by course',
        data: Array.from( bar_courses_data.values() ),
        borderColor: 'rgb(0, 51, 102)',
        backgroundColor: 'rgba(0, 153, 204, 1)',
        borderWidth: 1,
        maxBarThickness:100,
    }]
}

const barCategoryData = {    
    labels: Array.from( bar_category_data.keys() ),
    datasets: [
        {                
            label: 'GPA by category',
            data: Array.from( bar_category_data.values() ),
            borderColor: 'rgb(0, 51, 102)',
            backgroundColor: 'rgba(0, 153, 204, 1)',
            borderWidth: 1,
            maxBarThickness:100,
        },    {        
            label: 'Overall GPA',
            data: bar_category_comparing_data,
            borderColor: 'rgb(0, 51, 102)',
            backgroundColor: 'rgb(255, 0, 102)',
            borderWidth: 1,
            maxBarThickness:100,
        },
    ],
}


const doughnutCoursesData = {
    labels: Array.from( doughnut_courses_data.keys() ),    
    datasets: [{        
        data: Array.from(doughnut_courses_data.values()),
        backgroundColor: doughnut_courses_colors,
        borderColor: 'rgb(0, 51, 102)',
        borderWidth: 1,
    }]
}

const doughnutCategoryData = {
    labels: Array.from( doughnut_category_data.keys() ),    
    datasets: [{        
        data: Array.from(doughnut_category_data.values()),
        backgroundColor: doughnut_category_colors,
        borderColor: 'rgb(0, 51, 102)',
        borderWidth: 1,
    }]
}


const overlookCoursesData = {
    labels: Array.from( overlook_courses_data.keys() ),    
    datasets: [{        
        data: Array.from(overlook_courses_data.values()),
        backgroundColor: doughnut_courses_colors,
        borderColor: 'rgb(0, 51, 102)',
        borderWidth: 1,
    }]
}

const overlookCategoryData = {
    labels: Array.from( overlook_category_data.keys() ),    
    datasets: [{        
        data: Array.from(overlook_category_data.values()),
        backgroundColor: doughnut_category_colors,
        borderColor: 'rgb(0, 51, 102)',
        borderWidth: 1,
    }]
}
/*
* Chart options
*/
const barOptions = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                color: 'white',
                font: {
                    size:15,
                }
            }            
        },        
    },

    scales: {
        x:{            
            ticks:{
                color: 'white',
            },
            grid: {
                display: false,
                borderColor: 'rgb(179, 218, 255)',
            },            
        },
        y: {
            drawBorder: false,                        
            max: 4,
            ticks:{
                color: 'white',
            },
            grid: {
                color: 'rgb(179, 218, 255)',
                borderColor: 'rgb(179, 218, 255)',
            }
        },
    }
}


const doughnutCoursesOptions = {
    responsive: true,
    plugins:{
        legend:{
            position: 'right',            
            labels: {                
                color: 'white',
                font: {
                    size: 9,
                }
            },                    
        },
        title: {
            display: true,
            color: 'white',
            text: 'Contribution to GPA by course',
            font:{
                size:18,
            }
        }
    }
}

const doughnutCategoryOptions = {
    responsive: true,
    plugins:{
        legend:{
            position: 'top',
            labels: {                
                color: 'white',
                font: {
                    size: 13,
                }
            },     

        },
        title: {                
            display: true,
            color: 'white',
            text: 'Contribution to GPA by category',
            font:{
                size: 18,
            }
        }
    }
}


const overlookCoursesOptions = {
    responsive: true,
    plugins:{
        legend:{
            position: 'right',            
            labels: {                
                color: 'white',
                font: {
                    size: 9,
                }
            },                    
        },
        title: {
            display: true,
            color: 'white',
            text: 'Missed points by course',
            font:{
                size:18,
            }
        }
    }
}

const overlookCategoryOptions = {
    responsive: true,
    plugins:{
        legend:{
            position: 'top',
            labels: {                
                color: 'white',
                font: {
                    size: 13,
                }
            },     

        },
        title: {                
            display: true,
            color: 'white',
            text: 'Missed points by category',
            font:{
                size: 18,
            }
        }
    }
}


/*
* Charts
*/

const ctx_bar_courses = document.getElementById('coursesBarChart').getContext('2d');
const cousesBarChart = new Chart(ctx_bar_courses, {
    type: 'bar',
    data: barCoursesData,
    options: barOptions,
}) 

const ctx_bar_category = document.getElementById('categoryBarChart').getContext('2d');
const categoryBarChart = new Chart(ctx_bar_category, {
    type: 'bar',
    data: barCategoryData,    
    options: barOptions,
})

const ctx_doughnut_courses = document.getElementById('coursesDoughnutChart').getContext('2d');
const coursesDoughnutChart = new Chart(ctx_doughnut_courses, {
    type: 'doughnut',
    data: doughnutCoursesData,
    options: doughnutCoursesOptions,
}) 


const ctx_doughnut_category = document.getElementById('categoryDoughnutChart').getContext('2d');
const categoryDoughnutChart = new Chart(ctx_doughnut_category, {
    type: 'doughnut',
    data: doughnutCategoryData,
    options: doughnutCategoryOptions,
}) 

const ctx_overlook_courses = document.getElementById('coursesOverlookChart').getContext('2d');
const coursesOverlookChart = new Chart(ctx_overlook_courses, {
    type: 'doughnut',
    data: overlookCoursesData,
    options: overlookCoursesOptions,
}) 

const ctx_overlook_category = document.getElementById('categoryOverlookChart').getContext('2d');
const categoryOverlookChart = new Chart(ctx_overlook_category, {
    type: 'doughnut',
    data: overlookCategoryData,
    options: overlookCategoryOptions,
}) 