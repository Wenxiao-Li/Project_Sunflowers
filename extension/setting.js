function changeUsername () {
    let fn = document.getElementById('user_firstname').value;
    let ln = document.getElementById('user_lastname').value;
    var user = firebase.auth().currentUser;
    var email;
    if (user != null){
        email = user.email;
    }
    chrome.runtime.sendMessage({command : "set_name", firstname : fn, lastname : ln, useremail : email}, (response) =>{
        if (response.message === "success") {
            window.location.replace('./temp.html');
        }
    });
}

document.getElementById('changeUsername').addEventListener('click', () => {
    changeUsername();
});

function changeBlacklist () {
    let bl = document.getElementById('addblacklist').value;
    var user = firebase.auth().currentUser;
    var email;
    if (user != null){
        email = user.email;
    }
    chrome.runtime.sendMessage({command : "add_blacklist", blacklist: bl, useremail : email}, (response) =>{
        if (response.message === "success") {
            window.location.replace('./temp.html');
        }
    });
}

function changeWhitelist () {
    let wl = document.getElementById('addwhitelist').value;
    var user = firebase.auth().currentUser;
    var email;
    if (user != null){
        email = user.email;
    }
    chrome.runtime.sendMessage({command : "add_whitelist", whitelist: wl, useremail : email}, (response) =>{
        if (response.message === "success") {
            window.location.replace('./temp.html');
        }
    });
}

document.getElementById('changeUsername').addEventListener('click', () => {
    changeUsername();
});

document.getElementById('addBlacklist').addEventListener('click', () => {
    changeBlacklist();
});

document.getElementById('addWhitelist').addEventListener('click', () => {
    changeWhitelist();
});