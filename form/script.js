document.getElementById("form").addEventListener("submit", function(e){

    const email = document.getElementById("email").value;
    const error = document.getElementById("emailError");

    const personalDomains = ["gmail.com","yahoo.com","hotmail.com","outlook.com"];

    const domain = email.split("@")[1];

    if(personalDomains.includes(domain)){
        e.preventDefault();
        error.textContent = "Please use an official email address (no personal domains).";
    }
});
