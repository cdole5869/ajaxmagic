document.querySelector('#cards-lists').addEventListener('click', (el) => {
    var name = el.target.innerText;
    fetch(`https://api.scryfall.com/cards/named?exact="${name}"`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.querySelector('#cards-details').classList.remove('none');
        name = data.name;
        artist = data.artist;
        color = data.color_identity[0];
        type = data.type_line;
        description = data.oracle_text;
        image = data.image_uris.normal;
        //var img = document.createElement('img');
        //img.setAttribute('src',image);                           // Le setAttribute permet d' "attribuer" à l'attribut src les données de var image. //
        document.querySelector('#card-name').innerHTML=name;
        document.querySelector('#card-artist').innerHTML=artist;
        document.querySelector('#card-color').innerHTML=color;
        document.querySelector('#card-type').innerHTML=type;
        document.querySelector('#card-description').innerHTML=description;
        document.querySelector('#card-img').setAttribute('src',image);
    })
})

allCards();
artistsCards();




function allCards() {
    fetch('https://api.scryfall.com/cards/search/?q=*+lang=fr')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var cards = data.data;
        var list ='';
        for (var i = 0; i < 10; i++) {
            card = cards[i];
            name = card.name;
            artist = card.artist;
            color = card.color_identity[0];
            type = card.type_line;
            description = data.oracle_text;
            image = data.image_uris.normal;
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                bgColor = "bg-img-" + data.color_identity[0];
                listName = data.name;
                li = document.createElement('li')
                li.innerHTML = listName;
                li.setAttribute('class', bgColor);
                document.querySelector('#cards-lists').append(li);
                //list += `<li class="">"${listName}"</li>`;
            })
        }
        document.querySelector('#cards-lists').innerHTML=list;
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



//function allCards() {                                     // Ceci est une solution parmis d'autres pour afficher les 10 prmières cartes. //
//    fetch('https://api.scryfall.com/catalog/card-names')  // fetch est propre à js et permet de faire la requête sur l'API que l'on veut. //
//    .then(function(response) {                            // le .then permet le traitement et attend la réponse de notre requête. //
//        return response.json();                           // ici on parse la réponse en json. //
//    })
//    .then(function(data) {
//        var cards = data.data;                            // le second data est propre à l'API (contien les noms des cartes). //
//        for (var i = 0; i < 10; i++) {
//            var li = document.createElement('li');               // On crée la variable li en javascript. //
//            li.innerHTML = cards[i];                             // On met dans le li en HTML le résulat de cards (la 1ère info). //
//            document.querySelector('#cards-lists').append(li);   // On ajoute dans la div (cards-lists) le résultat via li récemment crée. //
//        }                                                        // Une fois que le 1er résultat est fait, on repart dans la boucle et encore. //
//    })
//}
