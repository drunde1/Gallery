async function getUser(){
    const token = localStorage.getItem("token")
    const response = await fetch("/cabinet/user", {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const user = await response.json()
        document.getElementById("login").innerHTML  = user.username
        document.getElementById("name").innerHTML  = user.name
        document.getElementById("surname").innerHTML  = user.surname
        document.getElementById("phone").innerHTML  = user.phone
    }
}

async function getTickets(){
    const token = localStorage.getItem("token")
    const response = await fetch("/cabinet/tickets", {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const tickets = await response.json()
        console.log(tickets)
        var resultDiv = document.getElementById('tickets');
        resultDiv.innerHTML = ''
        var ListHTML = ''

        tickets.forEach(ticket => {
            ListHTML += `<li><label><b>Билет№</b>${ticket._id}</label><br><label>Имя: ${ticket.name}</label><br><label>Фамилия: ${ticket.surname}</label><br><label>Телефон: ${ticket.phone}</label><br></li>`
        });
        resultDiv.innerHTML += ListHTML;
    }
}

function changeClick(){
    document.getElementById("userName").value  = document.getElementById("login").innerHTML
    document.getElementById("Name").value  = document.getElementById("name").innerHTML
    document.getElementById("Surname").value  = document.getElementById("surname").innerHTML
    document.getElementById("Phone").value  = document.getElementById("phone").innerHTML
    document.getElementById("userPassword").value = ''
}

async function editUser(){
    console.log("sdfsdfs")
    const token = localStorage.getItem("token")
    const userName = document.getElementById("userName").value
    const Name = document.getElementById("Name").value
    const Surname = document.getElementById("Surname").value
    const Phone = document.getElementById("Phone").value
    const userPassword = document.getElementById("userPassword").value
    const response = await fetch("/cabinet/editUser", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            username: userName,
            password: userPassword,
            name: Name,
            surname: Surname,
            phone: Phone
        })
    });

    if (response.ok === true){
        getUser()
    }
    else{

    }

}

getUser()
getTickets()