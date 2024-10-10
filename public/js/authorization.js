async function login(){
    const userName = document.getElementById("clientLogin").value
    const userPassword = document.getElementById("clientPassword").value
    const response = await fetch("/autho/login", {
        method: "Post",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json"},
        body: JSON.stringify({
        username: userName,
        password: userPassword
        })
    });
    if (response.ok === true) {
        const token = await response.json();
        localStorage.setItem("token", token.token)
        window.location.replace('/')
    }
    else {
        console.log("Проблемы со входом")
    }
       
}

async function signUp(){
    //const token = localStorage.getItem("token")
    const userName = document.getElementById("clientLogin").value
    const userPassword = document.getElementById("clientPassword").value
    const response = await fetch("/autho/registration", {
        method: "Post",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json"},
        body: JSON.stringify({
        username: userName,
        password: userPassword
        })
    });
    if (response.ok === true) {
        login()
    }
    else {
        console.log("Проблемы со входом")
    }
}















// document.forms["userForm"].addEventListener("submit", e => {
//     e.preventDefault();
//     console.log("sdfsdfsdfsd")
//     const form = document.forms["userForm"];
//     const id = form.elements["enterBut"];
//     const userName = form.elements["clientLogin"].value;
//     const userPassword = form.elements["clientPassword"].value;
//     console.log("USER222: ", userName)
    
//     if (id == "enterBut"){
//         login(userName, userPassword)
//     }
//     else {
//         signUp(userName, userPassword)
//     }
//    });
   


