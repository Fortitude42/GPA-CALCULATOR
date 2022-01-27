const start = document.getElementById('start');

start.addEventListener("click", () => {    
    var y1 = document.getElementById('year1');
    var y2 = document.getElementById('year2');
    var y3 = document.getElementById('year3');

    var selected_year = y1.checked ? 1 : (y2.checked ? 2 : 3);	
    
    var selected_trimesters = [];
    var trims = document.getElementsByName('trim');
        
    for (let i = 0; i < trims.length; ++i) {					
        if (trims[i].checked) {
            selected_trimesters.push(i + 1);            
        }
    }    
    
    if (selected_trimesters.length == 0) {
        alert('Please select trimester');
    } else {
        localStorage.setItem('selected_year', selected_year);        

        localStorage.setItem('selected_trimesters', selected_trimesters);
        document.location.replace("http://127.0.0.1:5500/index.html");
    }
})