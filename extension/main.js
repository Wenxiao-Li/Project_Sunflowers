document.getElementById('sign_out').addEventListener('click', () => {
    chrome.runtime.sendMessage({message : 'sign_out'}, (response) => {
        if (response.message === "success") {
            window.location.replace('../options.html');
        }
    });
});




chrome.windows.getAll({ populate: true }, function (windows) {
    windows.forEach(function (window) {
        window.tabs.forEach(function (tab) {
            //collect all of the urls here, currently log them
            console.log(tab.url);
        });
    });
});