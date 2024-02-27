
let counter = 0;

function pako(event) {
    event.target.removeAttribute('onmouseover');
    counter++;

    if (counter === 5) {
        event.target.innerHTML = '&#129300';
    } else if (counter === 10) {
        event.target.innerHTML = '&#128544';
    } else if (counter === 15) {
        event.target.innerHTML = '&#128545';
    } else if (counter === 20) {
        event.target.style.backgroundColor = 'OrangeRed';
        event.target.style.border = '1px solid OrangeRed';
    } else if (counter === 25) {
        event.target.style.opacity = 0;
        event.target.style.cursor = 'default';
        return
    }

    let arvonta = getRandomIntInclusive(0,8);

    if (arvonta === 0) {
        interval = setInterval(poisNakyvista, 50, event.target)

        timeout = setTimeout(() => {
            arvonta = getRandomIntInclusive(0,1);

            if (arvonta === 1) {
                event.target.style.left = '100%';
            } else {
                event.target.style.left = '0%';
            }
            
            interval = setInterval(takaisinNakyviin, 50, event.target)
            event.target.setAttribute('onmouseover', 'pako(event)');

        }, getRandomIntInclusive(1000,2000))

    } else {
        let sijainti = parseInt(event.target.style.left.slice(0,-1))
        let uusi_paikka;
        
        if (sijainti < 50) {
            uusi_paikka = getRandomIntInclusive5(50,100)
            if (uusi_paikka - sijainti < 10) {
                uusi_paikka = sijainti + 10
            }
        } else {
            uusi_paikka = getRandomIntInclusive5(0,50)
            if (sijainti - uusi_paikka < 10) {
                uusi_paikka = sijainti - 10
            }
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

function getRandomIntInclusive5(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    let x;
    while (x % 5 != 0) {
        x = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }
    return x
}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}