var NB_IMAGES = 28;
var sizeW = "398px";
var sizeH = "398px";

var NAMES = ["cyril", "agnes", "guillaume", "antoine", "anne-claire", "cedric", "yann", "louis"];

function display() {

    var name = NAMES[Math.floor(Math.random() * 8)];

    var div = document.getElementById("images");
    for (var i = 1; i <= NB_IMAGES; i++) {
        var newDiv = document.createElement('div');
        newDiv.style.width = sizeW;
        newDiv.style.height = sizeH;

        var img = document.createElement('img');
        img.src = name + "/" + i + ".png";

        newDiv.appendChild(img);
        div.appendChild(newDiv);
    }

}
