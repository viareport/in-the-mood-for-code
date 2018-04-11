var NB_IMAGES = 28;
var sizeW = "150px";
var sizeH = "150px";

var NAMES = ["cyril", "agnes", "guillaume", "antoine", "anne-claire", "cedric", "yann", "louis", "benoit"].sort();

var categorieHumeur = {
    positive: {
        1: "Satisfait",
        3: "Motivé",
        5: "Joyeux",
        14: "Créative",
        22: "Enjoué",
        23: "Heroïque",
        24: "Warrior",
        27: "Illuminé"
    },
    negative: {
        2: "Blasé",
        4: "Exténué",
        6: "Dépité",
        8: "Démotivé",
        9: "Mécontent",
        10: "Sarcastique",
        12: "Furax",
        15: "Énervé",
        16: "Triste",
        18: "Déprimé",
        19: "Fatigué"
    },
    neutre: {
        7: "Je suis malade",
        11: "Je suis perplexe",
        13: "Je suis concentré",
        17: "Je suis endormi",
        20: "Je suis vaseux",
        21: "J’ai faim",
        25: "Je suis affamé",
        26: "Je me détend",
        28: "Je suis surpris"
    }
};

var USER_SELECTED = NAMES[0];

var HUMEUR = {};

var HISTORY = {};

function display() {

    initUsers(document.getElementById("users"));

    selectUsers(USER_SELECTED);
}

function cleanHumeurImg() {

    var categorie = document.getElementById("images");
    while (categorie.hasChildNodes()) {
        categorie.removeChild(categorie.firstChild);
    }

    var avatar = document.getElementById("user_humeur");
    while (avatar.hasChildNodes()) {
        avatar.removeChild(avatar.firstChild);
    }
}

function displayHumeurImg() {

    var selectCategorie = (HUMEUR[USER_SELECTED] || {}).categorie;

    var images = categorieHumeur[selectCategorie];

    var content = document.getElementById("images");
    while (content.hasChildNodes()) {
        content.removeChild(content.firstChild);
    }

    var div = document.createElement('div');
    div.className = "flex spaceBetween flexWrap";

    if (images !== undefined) {
        Object.keys(images).forEach(function (imgName, idx) {
            var newDiv = document.createElement('div');

            var img = document.createElement('img');
            img.className = "avatar";
            img.src = USER_SELECTED + "/" + imgName + ".png";
            img.id = "img_" + imgName;
            img.title = images["" + imgName];
            img.addEventListener("click", function (event) {
                changeHumeur(imgName);
            });

            newDiv.appendChild(img);
            div.appendChild(newDiv);
        });

        content.appendChild(div);
    }
}

function initUsers(combo) {
    for (var i = 0; i < NAMES.length; i++) {
        var newOption = document.createElement('option');
        newOption.value = NAMES[i];
        newOption.innerHTML = NAMES[i];

        combo.appendChild(newOption);
    }
}

function selectUsers(value) {

    cleanHumeurImg();

    USER_SELECTED = value;

    var titre = document.getElementById("name");
    titre.innerHTML = value + ", ";

    var humeurComponent = document.getElementById("humeurs");

    humeurComponent.selectedIndex = 0;

    displayHumeur((HUMEUR[USER_SELECTED] || {}).humeur);
    displayHistory();
}

function selectHumeurGroup(value) {

    HUMEUR[USER_SELECTED] = {
        categorie: value,
        humeur: null
    }

    displayHumeurImg();
}

function changeHumeur(value) {

    if (HUMEUR[USER_SELECTED] === undefined) {
        HUMEUR[USER_SELECTED] = {};
    }
    HUMEUR[USER_SELECTED].humeur = value;

    addToHistory(HUMEUR[USER_SELECTED]);

    displayHumeur(value);
    displayHistory();
}

function addToHistory(currentHumeur) {
    (HISTORY[USER_SELECTED] = HISTORY[USER_SELECTED] || []).unshift(Object.assign({ date: Date.now() }, currentHumeur));
}

function displayHistory() {
    console.log(HISTORY[USER_SELECTED])

    var content = document.getElementById("user_histo");
    while (content.hasChildNodes()) {
        content.removeChild(content.firstChild);
    }

    (HISTORY[USER_SELECTED] || []).forEach(function (historyEntry, idx) {
        var newDiv = document.createElement('div');
        newDiv.className = "avatarHisto-wrapper";
        var imgDesc = categorieHumeur[historyEntry.categorie][historyEntry.humeur]
        var img = document.createElement('img');
        img.className = "avatar avatar--min";
        img.src = USER_SELECTED + "/" + historyEntry.humeur + ".png";
        img.title = imgDesc + ' - ' + (new Date(historyEntry.date)).toLocaleString();
        var label = document.createElement('span');
        label.className = "avatarHisto-label";
        label.innerText = (new Date(historyEntry.date)).toLocaleString();
        newDiv.appendChild(img);
        newDiv.appendChild(label);
        content.appendChild(newDiv);
    });

}

function displayHumeur(value) {

    var content = document.getElementById("user_humeur");
    while (content.hasChildNodes()) {
        content.removeChild(content.firstChild);
    }

    if (value) {

        var img = document.createElement('img');
        img.className = "avatar";
        img.src = USER_SELECTED + "/" + value + ".png";
        content.appendChild(img);

        var humeurLabel = document.getElementById("humeur_label");
        humeurLabel.innerHTML = categorieHumeur[HUMEUR[USER_SELECTED].categorie]["" + value];

    } else {
        var img = document.createElement('img');
        img.className = "avatar";
        img.src = "themes/index.png";
        content.appendChild(img);

        var humeurLabel = document.getElementById("humeur_label");
        humeurLabel.innerHTML = "";
    }

}