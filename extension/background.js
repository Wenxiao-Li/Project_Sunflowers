let user_signedin = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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