
document.addEventListener('DOMContentLoaded', () => {

})


function pako(event) {
    event.target.removeAttribute('onmouseover');
    /*if (document.getElementById('textarea-viesti').value === '') {
        return
    }*/

    let arvonta = getRandomIntInclusive(0,10);

    if (arvonta === 0) {
        poisNakyvista(event.target);
        interval = setInterval(poisNakyvista, 50, event.target)

        timeout = setTimeout(() => {
            let uusiArvonta = getRandomIntInclusive(0,1);
            if (uusiArvonta === 0) {
                event.target.style.left = '100%';
            } else {
                event.target.style.left = '0%';
            }
            
            interval = setInterval(takaisinNakyviin, 50, event.target)
            event.target.setAttribute('onmouseover', 'pako(event)');
        }, getRandomIntInclusive(1000,4000))

    } else {
        let sijainti = parseInt(event.target.style.left.slice(0,-1))
        let uusi_paikka;
        if (sijainti < 50) {
            uusi_paikka = getRandomIntInclusive(50,100)
            if (uusi_paikka - sijainti < 10) {
                uusi_paikka = sijainti + 10
            }
            console.log(uusi_paikka)
        } else {
            uusi_paikka = getRandomIntInclusive(0,50)
            if (sijainti - uusi_paikka < 10) {
                uusi_paikka = sijainti - 10
            }
            console.log(uusi_paikka)
        }
    
        if (sijainti < 50) {
            interval = setInterval(oikealle, 5, event.target, uusi_paikka);
        } else {
            interval = setInterval(vasemmalle, 5, event.target, uusi_paikka);
        }
        event.target.setAttribute('onmouseover', 'pako(event)');
    }
}


function oikealle(button, uusi_paikka) {
    let sijainti = parseInt(button.style.left.slice(0,-1)) + 5;

    if (sijainti <= uusi_paikka) {
        button.style.left = sijainti + '%';
    } else {
        pysayta()
    }
}

function vasemmalle(button, uusi_paikka) {
    let sijainti = parseInt(button.style.left.slice(0,-1)) - 5;

    if (sijainti >= uusi_paikka) {
        button.style.left = sijainti + '%';
    } else {
        pysayta()
    }
}

function poisNakyvista(button) {
    let opacity = parseFloat(button.style.opacity);
    if (opacity != 0) {
        button.style.opacity = opacity - 0.1;
    } else {
        pysayta()
    }
}

function takaisinNakyviin(button) {
    let opacity = parseFloat(button.style.opacity);
    if (opacity != 1.0) {
        button.style.opacity = opacity + 0.1;
    } else {
        pysayta()
    }  
}


function pysayta() {
    clearInterval(interval)
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    let x;
    while (x % 5 != 0) {
        x = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }
    return x
}