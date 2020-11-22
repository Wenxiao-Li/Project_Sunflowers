import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module hello");

const createOverlay = () => {
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.onmousewheel = function () {return false;}
    document.body.onkeydown = function (e) {
        return false;
    }
    document.body.style.overflow='hidden';
    var overlayHtml = "<div><button id=\'quit\'> quit </button></div>";
    var div = document.createElement("div");
    div.id = "overlay";
    document.body.insertBefore(div, document.body.firstChild);
    div.style.display='block';
    div.style.width='100%';
    div.style.height='100%';
    div.style.position='fixed';
    div.style.top='0px';
    div.style.left='0px';
    div.style.backgroundColor='#181818b3';
    div.style.zIndex='65534';
    div.innerText="test123";
    div.innerHTML=overlayHtml;
    const button = document.getElementById('quit');
    button.addEventListener('click', () => {
        console.log('clicked');
    })
}

createOverlay();