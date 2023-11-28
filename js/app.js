(function() {

var width = 1;
var height = 1;
var blanket = [];
var patternList = [];
var availablePatternsList;
var patternColor;
var createBlanket = function() {
    updateWidth();
    updateHeight();
    updateQuantity();
    generateBlanket();
    displayBlanket();
};

var generateBlanket = function () {
     for(var i = 0;i < height;i++) {
         blanket[i] = [];
         for (var j = 0; j < width;j++) {
             blanket[i][j] = getNextPattern(i,j);
        }
    }
};

var getNextPattern = function(i,j) {
    var patternNo = getRandomPatternNo();
    if (patternList[patternNo] == 0 || positionIsIncorrect(i,j, patternNo)) {
        patternNo = getNextPattern(i,j);
    } else {
        patternList[patternNo] = patternList[patternNo] - 1;
        if (patternList[patternNo] == 0 ) {
            var index = availablePatternsList.findIndex(v => v==patternNo);
            availablePatternsList.splice(index, 1);
        }
    };

    return patternNo;
};

var positionIsIncorrect =  function(i,j, patternNo) {
    var prevCol = j-1;
    var prevRow = i-1;

    if (i == 0 && j == 0) {
        return false;
    }

    if( i == 0 && j > 0) {
        return blanket[i][prevCol] == patternNo || getPatternColor(blanket[i][prevCol]) == getPatternColor(patternNo);
    }

    if( i > 0 && j == 0 ) {
        return blanket[prevRow][j] == patternNo || getPatternColor(blanket[prevRow][j]) == getPatternColor(patternNo);
    }

    if( i > 0 && j > 0 ) {
        var isIncorrectPattern = blanket[i][prevCol] == patternNo || blanket[prevRow][j] == patternNo;
        var isIncorrectColor = getPatternColor(blanket[i][prevCol]) == getPatternColor(patternNo) || getPatternColor(blanket[prevRow][j]) == getPatternColor(patternNo);
        return isIncorrectPattern || isIncorrectColor;
    }
    return false;
};

var updateQuantity = function() {
    availablePatternsList = [];
    for(var i=0;i<patternList.length;i++) {
        var patternEl = document.querySelector("#pattern" + i);
        var quantity = parseInt(patternEl.querySelector("input.quantity").value) || 0;
        patternList[i] = quantity;
        if(quantity > 0) availablePatternsList.push(i);
    }
};

var updateColor = function(e) {
    var patternSymbol = e.currentTarget;
    patternSymbol.style = "background-color:" + patternSymbol.value;
};

var generateRandomColor = function () {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

var getRandomPatternNo = function() {
    var index = Math.floor(Math.random() * availablePatternsList.length);
    return availablePatternsList[index];
};


var getPatternColor = function(patternId) {
    var patternEl = document.querySelector("#pattern" + patternId);
    var style = patternEl.querySelector(".patternSymbol").getAttribute("style");
    return style;
};

var updateWidth = function(){
    width = parseInt(document.querySelector("#columns").value) || width;  
};

var updateHeight = function(){
    height = parseInt(document.querySelector("#rows").value) || height;
};

var updateBasePatternQuantity = function() {
    var basePattern = document.querySelector("#pattern0");
    basePattern.querySelector("input.quantity").value = width * height;
};
ss
var addPatternUI = function() {
    var patternNo = patternList.length;
    var settings = document.createElement("div");
    settings.className = "settings";
    settings.id="pattern"+patternNo;

    var settingsName = document.createElement("div");
    settingsName.className = "setting-name";
    settingsName.innerText = patternNo == 0 ? "Base pattern" : "Pattern #" + patternNo;

    var settingsValue = document.createElement("div");
    settingsValue.className = "settings-value";

    var patternSymbol = document.createElement("input");
    patternSymbol.className = "patternSymbol";
    patternSymbol.type = "color";  
    patternSymbol.style = "background-color:" + patternColor;
    patternSymbol.value = patternColor;

    patternSymbol.onchange = updateColor;

    var countInput = document.createElement("input");
    countInput.type = "text";
    countInput.className = "short quantity";
    countInput.value = width * height;
    patternList.push(width * height);

    settingsValue.appendChild(patternSymbol);
    settingsValue.appendChild(countInput);

    settings.appendChild(settingsName);
    settings.appendChild(settingsValue);

    var settingsContainer = document.querySelector("#add-pattern-btn").parentElement;
    var patternBtn = document.querySelector("#add-pattern-btn");
    settingsContainer.insertBefore(settings, patternBtn);    
};

var displayBlanket = function() {
    var blanketWrapper = document.createElement("div");
    blanketWrapper.className = "blanket-wrapper";

    var blanketEl = document.createElement("table");
    blanketEl.className = "blanket";

    var blanketContainer = document.querySelector("#blanket-container");
  
    blanketWrapper.appendChild(blanketEl);
    blanketContainer.appendChild(blanketWrapper);

    for(var i=0;i<height;i++)
    {
        var row = document.createElement("tr");
        blanketEl.appendChild(row);
        
        for(var j=0;j<width;j++) {
            var column = document.createElement("td");
            column.innerText = blanket[i][j];
            column.className = "cellSqaure";
            column.style = getPatternColor(blanket[i][j]);
            row.appendChild(column);
        }
    }
    
};

var bindEvents = function() {
    patternColor = generateRandomColor();
    var generateBlanketElem = document.querySelector("#settings-btn");
    generateBlanketElem.addEventListener('click', createBlanket);

    var patternBtn = document.querySelector("#add-pattern-btn");
    patternBtn.addEventListener('click', addPatternUI);

    var blanketWidth = document.querySelector("#columns");
    blanketWidth.addEventListener('change', updateWidth);

    var blanketHeight = document.querySelector("#rows");
    blanketHeight.addEventListener('change', updateHeight);
};

document.addEventListener("DOMContentLoaded", bindEvents);
})();