import {db} from './firestore.js';


document.getElementById('sign_out').addEventListener('click', () => {
    chrome.runtime.sendMessage({message : 'sign_out'}, (response) => {
        if (response.message === "success") {
            window.location.replace('../options.html');
        }
    });
});

setInterval(function () {
    var user = firebase.auth().currentUser;
                var blackL = db.collection("user").doc(user.email);    
    chrome.windows.getAll({ populate: true }, function (windows) {
        windows.forEach(function (window) {
            window.tabs.forEach(function (tab) {
                var comparator = tab.url.toString();
                var test = "https://www.youtube.com/watch?v=fM4jxd1iOAA&ab_channel=TrenRed";
                
                //console.log(comparator);
                blackL.get().then(function(doc) {
                    if (doc.exists) {
                        var blacklists = doc.data().blacklist;
                        for (var i=0; i < blacklists.length; i++){
                            var count = blacklists[i].toString();
                            if(comparator.includes(count)){
                                console.log("Please stop it!!");
                            }
                            //console.log(count);
                            //console.log(test);
                        }
                        //console.log("Document data:", blacklists);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
            
                
                    
                
                //collect all of the urls here, currently log them
                //console.log(tab.url);
            });
        });
    });
  }, 1000);