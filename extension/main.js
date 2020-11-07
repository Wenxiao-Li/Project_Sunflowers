document.getElementById('sign_out').addEventListener('click', () => {
    chrome.runtime.sendMessage({message : 'sign_out'}, (response) => {
        if (response.message === "success") {
            window.location.replace('../options.html');
        }
    });
});




