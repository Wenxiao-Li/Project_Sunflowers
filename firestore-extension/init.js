function init () {
    chrome.runtime.sendMessage({message: "user_signed_in"}, (response) => {
        if (response.message === "success" && response.payload) {
            window.location.replace("./home.html");
        }
    });
};

init();