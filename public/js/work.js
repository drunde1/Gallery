async function deleteWork(name){
    const token = localStorage.getItem("token")
    const response = await fetch("/works/deleteWork", {
        method: "Delete",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
            name: name
        })
    });
    if (response.ok === true){
        $('#content').load('works.html')

    }
}

async function addWork(){
    const Name = document.getElementById("Name").value
    const Author = document.getElementById("Author").value
    const Date = document.getElementById("Date").value
    const Genre = document.getElementById("Genre").value
    const URL = document.getElementById("URL").value

    const token = localStorage.getItem("token")
    const response = await fetch("/works/addWork", {
        method: "Post",
        headers: { "Accept": "application/json", "Content-Type":
        "application/json", "Authorization": "Bearer " + token},
        body: JSON.stringify({
        name: Name,
        author: Author,
        date: Date,
        genre: Genre,
        imageURL: URL
    })
    });
    if (response.ok === true){
        $('#content').load('works.html')
    }
    else {
    }
}

async function getWorks() {
    const Name = document.getElementById("FName").value
    const Author = document.getElementById("FAuthor").value
    const Genre = document.getElementById("FGenre").value
    const token = localStorage.getItem("token")
    const response = await fetch("/works/getWorks/" + [Name, Author, Genre], {
        method: "Get",
        headers: { "Accept": "application/json", "Content-Type":
       "application/json", "Authorization": "Bearer " + token}
    });
    if (response.ok === true){
        const works = await response.json()
        var resultDiv = document.getElementById('works');
        resultDiv.innerHTML = ''
        var ListHTML = ''

        works.forEach(work => {
            ListHTML += `<li><div class = "imgcontainer"><img src = "${work.imageURL}"></div><br><label><b>${work.name}</b></label><br><label>Автор: ${work.author}</label><br><label>Жанр: ${work.genre}</label><br><label>Годы создания: ${work.date}</label><br><button onclick="deleteWork('${work.name}')">Удалить</button></li>`
        });
        resultDiv.innerHTML += ListHTML;
    }
}

getWorks()