var ExhId;
async function editClick(exhID, exhName, Date_start, Date_end, Info){
    $('#addHref').hide()
    $('#editHref').show()
    ExhId = exhID
    document.getElementById("EName").value = exhName
    document.getElementById("Date_start").value = Date_start
    document.getElementById("Date_end").value = Date_end
    document.getElementById("Cost").value = Cost
    document.getElementById("Info").value = Info
    getOutWorks()
    getInWorks()
}

async function editExh(){
    const token = localStorage.getItem("token")
    const Name = document.getElementById("EName").value
    const Date_start = document.getElementById("Date_start").value
    const Date_end = document.getElementById("Date_end").value
    const Cost = document.getElementById("Cost").value
    const Info = document.getElementById("Info").value
    const response = await fetch("/exhs/editExh", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            _id: ExhId,
            name: Name,
            date_start: Date_start,
            date_end: Date_end,
            cost: Cost, 
            info: Info
        })
    });

    if (response.ok === true){
        $('#content').load('exhibitions.html')
    }
    else{

    }
}

async function addExh(){
    const Name = document.getElementById("EName").value
    const Date_start = document.getElementById("Date_start").value
    const Date_end = document.getElementById("Date_end").value
    const Cost = document.getElementById("Cost").value
    const Info = document.getElementById("Info").value

    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/addExh", {
        method: "Post",
        headers: { "Accept": "application/json", "Content-Type":
        "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
        name: Name,
        date_start: Date_start,
        date_end: Date_end,
        cost: Cost,
        info: Info
    })
    });
    if (response.ok === true){
        $('#content').load('exhibitions.html')
    }
    else {
    }
}

async function buyClick(exhid, name, cost){
    ExhId = exhid
    document.getElementById("ExhName").value = name
    document.getElementById("ExhCost").innerHTML = cost
    const token = localStorage.getItem("token")
    const response = await fetch("/cabinet/user", {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const user = await response.json()
        document.getElementById("UserName").value  = user.name
        document.getElementById("UserSurname").value  = user.surname
        document.getElementById("UserPhone").value  = user.phone
    }
}

async function buyTicket(){

    const token = localStorage.getItem("token")
    const name = document.getElementById("UserName").value 
    const surname = document.getElementById("UserSurname").value  
    const phone = document.getElementById("UserPhone").value
    const response = await fetch("/exhs/buyTicket", {
        method: "Post",
        headers: { "Accept": "application/json", "Content-Type":
        "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
        exhID: ExhId,
        name: name,
        surname: surname,
        phone: phone
    })
    });
    if (response.ok === true){
        $('#content').load('exhibitions.html')
    }
}

function addClick(){
    $('#editHref').hide()
    $('#addHref').show()
    $('#table').hide()
    // $('.EditExh').show()
    // $('.DelExh').show()
    document.getElementById("EName").value = ''
    document.getElementById("Date_start").value = ''
    document.getElementById("Date_end").value = ''
    document.getElementById("Cost").value = ''
    document.getElementById("Info").value = ''
    
}

async function getInWorks(){
    const names = ExhId
    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/getInWorks/" + names, {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const works = await response.json()

        var resultDiv = document.getElementById('inWorks');
        resultDiv.innerHTML = ""


        var ListHTML = ''

        works.forEach(work => {
            ListHTML += `<li onclick="popWorkFromExh('${work.name}', '${ExhId}')"><label><b>${work.name}</b></label><br><label>Жанр: ${work.genre}</label><br><label>Годы создания: ${work.date}</label><br></li>`
        });
        resultDiv.innerHTML += ListHTML;
        resultDiv = document.getElementById('exhs');
            // resultDiv.innerHTML = ""
            // $('#content').load('exhibitions.html')

    }
}

async function addWorkToExh(name, ID){
    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/addWorkToExh", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            name: name,
            _id: ID
        })
    });
    if (response.ok === true){
       
        getInWorks()
        getOutWorks()
        getExhs()

    }
}

async function popWorkFromExh(name, ID){
    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/popWorkFromExh", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            name: name,
            _id: ID
        })
    });
    if (response.ok === true){
       
        getInWorks()
        getOutWorks()
        getExhs()   
    }
}

async function getOutWorks(){
    const names = ExhId
    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/getOutWorks/" + names, {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const works = await response.json()

        var resultDiv = document.getElementById('outWorks');
        resultDiv.innerHTML = ""

        var ListHTML = ''

        works.forEach(work => {
            ListHTML += `<li onclick="addWorkToExh('${work.name}', '${ExhId}')"><label><b>${work.name}</b></label><br><label>Жанр: ${work.genre}</label><br><label>Годы создания: ${work.date}</label><br></li>`
        });
        resultDiv.innerHTML += ListHTML;

    }
}

async function getWorks(exhID){
    const names = exhID
    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/getInWorks/" + names, {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const works = await response.json()
        // var resultDiv = document.getElementById('exhs');
        // var WorksList = '<ul id="works"></ul>'
        // resultDiv.innerHTML += WorksList;
        resultDiv = document.getElementById('works'+exhID);
        resultDiv.innerHTML = ""

        var ListHTML = ''

        works.forEach(work => {
            ListHTML += `<li><div class = "imgcontainer"><img id = "img" src = "${work.imageURL}"></div><br><label><b>${work.name}</b></label><br><label>Автор: ${work.author}</label><br><label>Жанр: ${work.genre}</label><br><label>Годы создания: ${work.date}</label><br></li>`
        });
        resultDiv.innerHTML += ListHTML;
        onLoad()

    }
}

async function getFeedbacks(exhID){
    const names = exhID
    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/getFeedbacks/" + names, {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const feedbacks = await response.json()
        // var resultDiv = document.getElementById('exhs');
        // var WorksList = '<ul id="works"></ul>'
        // resultDiv.innerHTML += WorksList;
        resultDiv = document.getElementById('Feedbacks'+exhID);
        resultDiv.innerHTML = ""

        var ListHTML = ''

        feedbacks.forEach(feedback => {
            ListHTML += `<li><label><b>${feedback.username} </b></label><label>Оценка: ${feedback.mark}</label><br><label>${feedback.value}</label><br><button class = "ModerDel" onclick="DelFeedback('${feedback._id}')">Удалить</button></li>`
        });
        resultDiv.innerHTML += ListHTML;
        onLoad()

    }
}

async function DelFeedback(ID){
    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/deleteFeedback", {
        method: "Delete",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            _id: ID
        })
    });
    if (response.ok === true){
        const res = await response.json()
        console.log(res)
        getExhs()
    }
}

async function DeleteExh(ID){
    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/deleteExh", {
        method: "Delete",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            _id: ID
        })
    });
    if (response.ok === true){
        const res = await response.json()
        console.log(res)
        getExhs()
    }
}

async function addFeedback(exhID){
    ExhId = exhID
    const token = localStorage.getItem("token")
    const value = document.getElementById("Feedback").value 
    const mark = document.querySelector('#FBmark').value

    const response = await fetch("/exhs/addFeedback", {
        method: "Post",
        headers: { "Accept": "application/json", "Content-Type":
        "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
        exhID: ExhId,
        value: value,
        mark: mark
    })
    });
    if (response.ok === true){
        getExhs()

    }
}


async function getExhs() {
    const token = localStorage.getItem("token")
    const response = await fetch("/exhs/getExhs", {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const exhs = await response.json()
        var resultDiv = document.getElementById('exhs');
        resultDiv.innerHTML = ""

        var ListHTML = ''

        exhs.forEach(exh => {
            ListHTML += `<li><label><h2>${exh.name}</h2></label><br><label><b>Открытие выставки:</b> ${exh.date_start}</label><br><label><b>Закрытие выставки:</b> ${exh.date_end}</label><br><label><b>О выставке:</b> ${exh.info}</label><br><label><b>Билет:</b> ${exh.cost}</label><br><a class = "ButClick" href="#zatemnenie2"><button onclick="buyClick('${exh._id}', '${exh.name}','${exh.cost}')">Купить</button></a><br><a class = "EditExh" href="#zatemnenie"><button onclick="editClick('${exh._id}','${exh.name}', '${exh.date_start}', '${exh.date_end}', '${exh.info}', '${exh.cost}')">Редактировать</button></a> <button class = "DelExh" onclick="DeleteExh('${exh._id}')">Удалить</button>`
            ListHTML += `<ul id="works${exh._id}" class="works"></ul>`
            ListHTML += `<ul id="Feedbacks${exh._id}" class="Feedbacks"></ul>`
            ListHTML += `<input type="text" class="Feedback" id="Feedback" name="Feedback"> <select class = "FBmark" id = "FBmark">
                <option id="1">1</option>
                <option id="2">2</option>
                <option id="3">3</option>
                <option id="4">4</option>
                <option id="5">5</option>
              </select> <button class = "FBBut" onclick="addFeedback('${exh._id}')">Добавить</button></li>`
            getWorks(exh._id)
            getFeedbacks(exh._id)
        });
        resultDiv.innerHTML += ListHTML;
        
        onLoad()
    }
}



async function checkToken(){
    const token = localStorage.getItem("token")
    const response = await fetch("/isAccessed", {
        method: "GET",
        headers: { "Accept": "application/json", "Content-Type":
        "application/json", "Authorization": "Bearer " + token }
    });
    if (response.ok === true){
        const access = await response.json()
        return access.hasRole
    }
    else {
        return false
    }
}

function onLoad(){
    const token = window.localStorage.getItem("token")
    if (!token){
        $('#addExh').hide()
        $('.EditExh').hide()
        $('.DelExh').hide()
        $('img').css("filter","blur(20px)"); 
        $('.Feedback').hide()
        $('.FBBut').hide()
        $('.FBmark').hide() 
        $('.ButClick').hide()
 
     
    }
    else {
        $('.ButClick').show()

        const access = checkToken()
        access.then(function(result){
            if (result){
                $('#addExh').show()
                $('.EditExh').show()
                $('.DelExh').show()
                $('.ModerDel').show()

            }
            else {
                $('#addExh').hide()
                $('.EditExh').hide()
                $('.DelExh').hide()
            }
        })
    }
}
getExhs()

onLoad()