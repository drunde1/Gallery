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

function DelToken(){
    localStorage.removeItem("token")
    location.reload()
    onLoad()
}

function onLoad(){
    const token = window.localStorage.getItem("token")
    if (!token){
        $('#forPersonal').hide()
        $('#worksForP').hide()
        $('#Autho').hide()
        $('#notAutho').show()
    }
    else {
        $('#Autho').show()
        $('#notAutho').hide()
        const access = checkToken()
        access.then(function(result){
            if (result){
                $('#forPersonal').show()
                $('#worksForP').show()
                $('#addExh').show()

            }
            else {
                $('#forPersonal').hide()
                $('#worksForP').hide()
                $('#addExh').hide()
            }
        })
    }
    $('#content').load('exhibitions.html')
}
onLoad()
