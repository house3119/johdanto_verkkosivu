
// Sivun latautuessa alustetaan laskuri.
let counter = 0;


// Funktio, jota kutsutaan Ota yhteyttä -sivulta, kun käyttäjä vie hiiren "Lähetä" -napin päälle.
function pako(event) {
    event.target.removeAttribute('onmouseover');
    counter++;

    // Päivitetään napin sisältöä laskurin kasvaessa.
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
        // Laskurin ollessa 25, nappi häviää kokonaan. Funktion suoritus päättyy ja nappi jää deaktivoiduksi.
        event.target.style.opacity = 0;
        event.target.style.cursor = 'default';
        return;
    }

    // Arvotaan luku väliltä 0-8.
    let arvonta = getRandomIntInclusive(0,8);

    // Jos arvonnan arvo 0, poistetaan nappi hetkeksi näkyvistä.
    if (arvonta === 0) {
        interval = setInterval(poisNakyvista, 50, event.target);

        timeout = setTimeout(() => {
            arvonta = getRandomIntInclusive(0,1);

            if (arvonta === 1) {
                event.target.style.left = '100%';
            } else {
                event.target.style.left = '0%';
            }
            
            interval = setInterval(takaisinNakyviin, 50, event.target);
            event.target.setAttribute('onmouseover', 'pako(event)');

        }, getRandomIntInclusive(1000,2000));

    }
    // Jos arvonnan tulos on 1-8, siirretään nappia.
    else {
        let sijainti = parseInt(event.target.style.left.slice(0,-1));
        let uusi_paikka;
        
        if (sijainti < 50) {
            uusi_paikka = getRandomIntInclusive5(50,100);
            if (uusi_paikka - sijainti < 10) {
                uusi_paikka = sijainti + 10;
            }
        } else {
            uusi_paikka = getRandomIntInclusive5(0,50);
            if (sijainti - uusi_paikka < 10) {
                uusi_paikka = sijainti - 10;
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


// Funktio, joka siirtää nappia oikealle.
function oikealle(button, uusi_paikka) {
    let sijainti = parseInt(button.style.left.slice(0,-1)) + 5;

    if (sijainti <= uusi_paikka) {
        button.style.left = sijainti + '%';
    } else {
        clearInterval(interval);
    }
}


// Funktio, joka siirtää nappia vasemmalle.
function vasemmalle(button, uusi_paikka) {
    let sijainti = parseInt(button.style.left.slice(0,-1)) - 5;

    if (sijainti >= uusi_paikka) {
        button.style.left = sijainti + '%';
    } else {
        clearInterval(interval);
    }
}


// Funktio, joka vähentää napin opacitya.
function poisNakyvista(button) {
    let opacity = parseFloat(button.style.opacity);
    if (opacity != 0) {
        button.style.opacity = opacity - 0.1;
    } else {
        clearInterval(interval);
    }
}


// Funktio, joka lisää napin opacitya.
function takaisinNakyviin(button) {
    let opacity = parseFloat(button.style.opacity);
    if (opacity != 1.0) {
        button.style.opacity = opacity + 0.1;
    } else {
        clearInterval(interval);
    }  
}


// Funktio, joka palauttaa 5:llä jaollisen kokonaisluvun väliltä min - max.
function getRandomIntInclusive5(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    let x;
    while (x % 5 != 0) {
        x = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }
    return x;
}


// Funktio, joka palauttaa kokonaisluvun väliltä min-max.
function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}