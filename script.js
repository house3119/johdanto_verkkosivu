
document.addEventListener('DOMContentLoaded', () => {

})


function siirto(event) {
    /*if (document.getElementById('textarea-viesti').value === '') {
        return
    }*/

    if (event.target.style.left === '0%') {
        interval = setInterval(oikealle, 5, event.target);
    } else {
        interval = setInterval(vasemmalle, 5, event.target);
    }
    
}

function oikealle(button) {
    let sijainti = parseInt(button.style.left.slice(0,-1)) + 3;

    if (sijainti <= 100) {
        button.style.left = sijainti + '%';
    } else {
        pysayta()
    }
}

function vasemmalle(button) {
    let sijainti = parseInt(button.style.left.slice(0,-1)) - 3;

    if (sijainti >= 0) {
        button.style.left = sijainti + '%';
    } else {
        pysayta()
    }
}

function pysayta() {
    clearInterval(interval)
}