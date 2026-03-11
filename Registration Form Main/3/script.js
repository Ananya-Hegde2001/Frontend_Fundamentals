document.getElementById("loginForm").addEventListener("submit", function(e){

e.preventDefault()

let email = document.getElementById("email").value
let password = document.getElementById("password").value
let error = document.getElementById("error")

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailPattern.test(email)){
error.innerText = "Enter a valid email"
return
}

if(password.length < 6){
error.innerText = "Password must be at least 6 characters"
return
}

error.innerText = "Login Successful"

})