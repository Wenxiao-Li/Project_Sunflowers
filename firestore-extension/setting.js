function changeUsername () {
    let fn = document.getElementById('user_firstname').value;
    let ln = document.getElementById('user_lastname').value;
    var user = firebase.auth().currentUser;
    var email;
    if (user != null){
        email = user.email;
    }
    chrome.runtime.sendMessage({command : "set", firstname : fn, lastname : ln, useremail : email}, (response) =>{
        if (response.message === "success") {
            window.location.replace('./temp.html');
        }
    });
}

document.getElementById('changeUsername').addEventListener('click', () => {
    changeUsername();
});