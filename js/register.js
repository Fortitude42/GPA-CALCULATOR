const register = document.getElementById('register');

register.addEventListener("click", ()=>{
    let email = document.getElementById('email').value;
    let pass1 = document.getElementById('pass1').value;
    let pass2 = document.getElementById('pass2').value;


    if (pass1.length == 0 || pass2.length==0 || email.length == 0) {
        return alert('Please fill in all fields ');
    }

    else if (pass1.length < 8){
        return alert('Your password is less than 8 symbols');
    }

    else if (pass1 != pass2){
        return alert('you have incredibly repeated the password');
    }
    else 
        document.location.replace("http://127.0.0.1:5500/signin.html");

    localStorage.setItem("email", email);
    localStorage.setItem("password", pass1);
})
