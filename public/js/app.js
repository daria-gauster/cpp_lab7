const xhr = new XMLHttpRequest();

xhr_butt = document.getElementById("xhrbutt");


const load_xhr = () => {
    console.log("xhr success");
    xhr.open('GET', books, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onload = () => {
        console.log(this.responseJSON);
        console.log("xhr success");
    }
}

xhr_butt.addEventListener("click", load_xhr());