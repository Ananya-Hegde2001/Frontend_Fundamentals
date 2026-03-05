const form = document.getElementById("form");

form.addEventListener("submit", function(e){

e.preventDefault();

let fname = document.getElementById("fname").value.trim();
let email = document.getElementById("email").value.trim();
let phone = document.getElementById("phone").value.trim();

if(fname === ""){
alert("Please enter first name");
return;
}

if(!email.includes("@")){
alert("Enter valid email");
return;
}

if(phone.length < 10){
alert("Enter valid phone number");
return;
}

alert("Form submitted successfully!");

});