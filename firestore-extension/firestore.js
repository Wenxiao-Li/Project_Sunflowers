const db = firebase.firestore();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "set"){
        db.collection("user").doc(request.useremail).set({
            first_name : request.firstname,
            last_name : request.lastname
        })
        .then(() => {
            sendResponse ({message : "success"});
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });    
    }else if (request.message === "sign_in"){
        var user = request.user;
        var name = user.displayName.split(" ");
        db.collection("user").doc(user.email).set({
            first_name : name[0],
            last_name : name[1]
        })
        .then(() => {
            sendResponse ({message : "success"});
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });    
    }
    return true;
});