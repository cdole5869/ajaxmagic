var list = '';
var firstItem = 0;

function allCards() {
    fetch('https://api.scryfall.com/cards/search?q=*+lang=fr')    // Fait la requête sur le serveur de l'API
    .then(function(response) {                                    // Attend et traite la réponse
        return response.json();                                   // Parse la réponse pour être utilisable
    })
    .then(function(data) {
        var cards = data.data;
        console.log(cards);
        var list = '';
        for (var i = firstItem; i < firstItem +10; i++) {
            card = cards[i];
            name = card.name;
            artist = card.artist;
            if (typeof(card.color_identity[0]) != 'undefined'){
                color = "bg-img-" + card.color_identity[0];
                color_identity = card.color_identity[0]
            } else {
                color = "bg-img-N";
                color_identity = "N";
            }
            type = card.type_line;
            description = card.printed_text;
            if (card.image_uris) {
                image = card.image_uris.normal;                 // Ici, à la page suivante il y a une carte qui pose problème donc on modofie. //
            }   else {
                image = card.card_faces[0].image_uris.normal;
                }
            list += `<li class="card ${color}" data-artist="${artist}" data-color="${color_identity}" data-type="${type}" data-description="${description}" data-image="${image}">${name}</li>`;
        }
        document.querySelector('#cards-list').innerHTML = list;
    })
}

function artistsCards() {
    fetch('https://api.scryfall.com/catalog/artist-names')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var artists = data.data;
        var listartists ='';
        for (var i = 0; i < 10; i++) {
            listartists += `<li>${artists[i]}</li>`;
        }
        document.querySelector('#artists').innerHTML=listartists;
    })
}

function getIcon(color) {
    switch (color) {                                          // On utilise un switch (remplace le if) pour aller chercher nos images. //
        case "B":
        return '<img class="icon" src="img/black.png">';
        case "U":
        return '<img class="icon" src="img/blue.png">';
        case "G":
        return '<img class="icon" src="img/green.png">';
        case "R":
        return '<img class="icon" src="img/red.png">';
        case "W":
        return '<img class="icon" src="img/white.png">';
        break;                                       // Le break termine le switch et le default peur correspondre au else en fin de condition. //
        default:
    }
}

function next() {
    firstItem +=10;
    allCards();
}

function back() {
    if (firstItem != 0) {
        firstItem -=10;
        allCards();
    }
}

document.querySelector('#cards-list').addEventListener('click', (el) => {
    el = el.target;
    if (el.tagName == 'LI') {
    document.querySelector('#card-details').classList.remove('none');
    color = getIcon(el.dataset.color);
    document.querySelector('#card-color').innerHTML = color;
    document.querySelector('#card-name').innerHTML = el.textContent;
    document.querySelector('#card-artist').innerHTML = el.dataset.artist;
    document.querySelector('#card-type').innerHTML = el.dataset.type;
    document.querySelector('#card-description').innerHTML = el.dataset.description;
    document.querySelector('#card-img').setAttribute('src', el.dataset.image);
    }
})


allCards();
artistsCards();
