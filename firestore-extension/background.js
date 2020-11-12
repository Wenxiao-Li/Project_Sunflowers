let user_signedin = false;
const db = firebase.firestore();
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.command)
    if (request.message === "user_signed_in") {
        sendResponse ({
            message : "success",
            payload : user_signedin
        })
    } else if (request.message === "sign_out") {
        user_signedin = false;
        sendResponse ({ message : "success" });
    } else if (request.message === "sign_in") {
        user_signedin = true;
        sendResponse ({message : "success"});     
    }
    return true;
});