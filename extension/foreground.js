const first = document.createElement('button')
first.innerText = 'SETUP'
first.id = 'first'

const second = document.createElement('button')
second.innerText = 'SEND'
second.id = 'second'

first.addEventListener('click', () =>{
    chrome.storage.local.set({ "password" : "123" })
});

second.addEventListener('click', () => {
    chrome.runtime.sendMessage({message : 'NEW'})
});