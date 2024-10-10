var userId;
async function editClick(userID, userName, userRole, Name, Surname, Phone){
    $('#addHref').hide()
    $('#editHref').show()
    userId = userID
    document.getElementById("userName").value = userName
    document.getElementById("Name").value = Name
    document.getElementById("Surname").value = Surname
    document.getElementById("Phone").value = Phone
    if (userRole === 'ADMIN'){
        // document.getElementById("userRoleAdmin").selected = true
        // document.getElementById("userRoleManager").selected = false
        // document.getElementById("userRoleGuest").selected = false
        document.querySelector('#userRole').value = 'ADMIN';
    }
    if (userRole === 'MANAGER'){
        // document.getElementById("userRoleAdmin").selected = false
        // document.getElementById("userRoleManager").selected = true
        // document.getElementById("userRoleGuest").selected = false 
        document.querySelector('#userRole').value = 'MANAGER';   
    }
    if (userRole === 'GUEST'){
        console.log(userRole)
        document.querySelector('#userRole').value = "GUEST";
        // document.getElementById("userRoleAdmin").selected = false
        // document.getElementById("userRoleManager").selected = false
        // document.getElementById("userRoleGuest").selected = true
    }

}

async function editUser(){
    const token = localStorage.getItem("token")
    const userName = document.getElementById("userName").value
    const Name = document.getElementById("Name").value
    const Surname = document.getElementById("Surname").value
    const Phone = document.getElementById("Phone").value
    const userPassword = document.getElementById("userPassword").value
    const userRole = document.getElementById("userRole").value
    const response = await fetch("/users/editUser", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            _id: userId,
            username: userName,
            password: userPassword,
            roles: [userRole],
            name: Name,
            surname: Surname,
            phone: Phone
        })
    });

    if (response.ok === true){
        $('#content').load('personal.html')
    }
    else{

    }

}

function addClick(){
    $('#editHref').hide()
    $('#addHref').show()
    document.getElementById("userName").value = ''
    document.getElementById("Name").value = ''
    document.getElementById("Surname").value = ''
    document.getElementById("Phone").value = ''
}

async function addUser(){
    const userName = document.getElementById("userName").value
    const userPassword = document.getElementById("userPassword").value
    const name = document.getElementById("Name").value
    const surname = document.getElementById("Surname").value
    const phone = document.getElementById("Phone").value
    const userRole = document.getElementById("userRole").value
    const token = localStorage.getItem("token")
    const response = await fetch("/users/addUser", {
        method: "Post",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            username: userName,
            password: userPassword,
            name: name,
            surname: surname,
            phone: phone,
            role: [userRole]
        })
    });
    if (response.ok === true){
        $('#content').load('personal.html')
    }
}

async function deleteClient(userName){
    const token = localStorage.getItem("token")
    const response = await fetch("/users/deleteUser", {
        method: "Delete",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            username: userName
        })
    });
    if (response.ok === true){
        $('#content').load('personal.html')

    }
}

async function getClients() {
    const token = localStorage.getItem("token")
    const Login = document.getElementById("FuserName").value
    const Role = document.getElementById("FRole").value
    const response = await fetch("/users/users/"+ [Login, Role], {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const users = await response.json()
        var resultDiv = document.getElementById('result');
        resultDiv.innerHTML ='';
        var tableHTML = '<table><tr><th>Логин</th><th>Имя</th><th>Фамилия</th><th>Телефон</th><th>Роли</th><th>Действия</th></tr>';

        users.forEach(client => {
            tableHTML += `<tr><td>${client.username}</td><td>${client.name}</td><td>${client.surname}</td><td>${client.phone}</td><td>${client.roles}</td><td><a href="#zatemnenie"><button onclick="editClick('${client._id}','${client.username}', '${client.roles}', '${client.name}','${client.surname}','${client.phone}')">Редактировать</button></a> <button onclick="deleteClient('${client.username}')">Удалить</button></td></tr>`;
        });
        tableHTML += '</table>';
        resultDiv.innerHTML += tableHTML;
    }
}

getClients()
