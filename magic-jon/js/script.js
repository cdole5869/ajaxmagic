var list = '';
var firstItem = 0;
var index = 1;

function allCards() {
    fetch('https://api.scryfall.com/cards/search?q=*+lang=fr')    // Fait la requête sur le serveur de l'API
    .then(function(response) {                                    // Attend et traite la réponse
        return response.json();                                   // Parse la réponse pour être utilisable
    })
    .then(function(data) {  
        var cards = data.data;
        var list = '';
        for (let i = firstItem; i < firstItem + 10; i++) {
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
                image = card.image_uris.normal;
            } else {
                image = card.card_faces[0].image_uris.normal;
            }
            list += `<li class="card ${color}" data-artist="${artist}" data-color="${color_identity}" data-type="${type}" data-description="${description}" data-image="${image}">${name}</li>`;
        }
        list += '<div class="pagination"><button onclick="prev()">Prev</button><p class="index"></p><button onclick="next()">Next</button></div>';
        document.querySelector('#cards-list').innerHTML = list;
        document.querySelector('.index').innerHTML = index;
    })
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

function prev() {
    if (firstItem != 0) {
        index -= 1;
        firstItem -= 10;
        allCards();
    }
}

function next() {
    index += 1;
    firstItem += 10;
    allCards();
}

function getIcon(color) {
    switch (color) {
        case "B":
            return '<img class="icon" src="img/black.png">';
            break;  
        case "G":
            return '<img class="icon" src="img/green.png">';
            break;         
        case "R":
            return '<img class="icon" src="img/red.png">';
            break; 
        case "U":
            return '<img class="icon" src="img/blue.png">';
            break; 
        case "W":
            return '<img class="icon" src="img/white.png">';
            break; 

        default:
            //return '<img class="icon" src="img/.png">';
            break;
    }
}

allCards();