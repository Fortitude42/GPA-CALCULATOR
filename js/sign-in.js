const signin = document.getElementById('signin');

signin.addEventListener("click", ()=>{
    let email1 = document.getElementById('email1').value;
    let pass3 = document.getElementById('pass3').value;

    let email = localStorage.getItem("email")
    let pass = localStorage.getItem("password")

    
    if(pass != pass3 || email1 != email){
        return alert('You entered an incorrect email or password');
    }
    else 
        document.location.replace("http://127.0.0.1:5500/home.html");
})