function getNum(name) {
    for (var i in elements) {
        if (elements[i].symbol == name) {
            return (elements[i].number);
        }
    }
}

function getName(num) {
    for (var i in elements) {
        if (elements[i].number == num) {
            return (elements[i].symbol);
        }
    }
}

function pow(arr) {
    args = arr.split(' ');
    out = ''
    for (i in args) {
        if (args[i].endsWith(']')) {
            out = out + ' ' + args[i];
        } else {
            out = out + ' ' + args[i].slice(0, 2) + '<sup>' + args[i].slice(2) + '</sup>';
        }
    }
    return out;
}


function update(sym, input) {

    var selected = document.getElementsByClassName("selected");
    while (selected.length) {
        selected[0].className = selected[0].className.replace(/\bselected\b/g, "");
    }

    if (sym) {
        X = sym;
        document.getElementById("X").value = sym;
        document.getElementById("Z").value = getNum(X);
    } else {
        if (input == 'X') {
            X = document.getElementById("X").value;
            document.getElementById("Z").value = getNum(X);
        } else if (input == 'Z') {
            update(elements[document.getElementById("Z").value - 1].symbol);
        }
    }

    ptjs = elements[getNum(X) - 1];

    document.getElementById("mass_number").innerHTML = Math.round(ptjs.atomic_mass);
    document.getElementById("atomic_number").innerHTML = ptjs.number;
    document.getElementById("symbol").innerHTML = `<br><h1 style="color:#${intToRGB(hashCode(ptjs.category))}; text-shadow: 0px 0px 5px; ">` + getName(getNum(X)) + '</h1><br>'
    document.getElementById("elemname").innerHTML = ptjs.name;
    document.getElementById("elemname").setAttribute('href', ptjs.source);
    document.getElementById("category").innerHTML = ptjs.category;
    document.getElementById("box").setAttribute('style', `background-color:#${intToRGB(hashCode(ptjs.category))};`);
    document.getElementById("summary").innerHTML = ptjs.summary;

    //general info
    if (ptjs.electronegativity_pauling) document.getElementById("en").innerHTML = ptjs.electronegativity_pauling;
    else document.getElementById("en").innerHTML = 'none';
    if (ptjs.electron_affinity) document.getElementById("ea").innerHTML = ptjs.electron_affinity;
    else document.getElementById("ea").innerHTML = 'none';
    if (ptjs.melt) document.getElementById("mp").innerHTML = ptjs.melt;
    else document.getElementById("mp").innerHTML = 'none';
    if (ptjs.boil) document.getElementById("bp").innerHTML = ptjs.boil;
    else document.getElementById("bp").innerHTML = 'none';
    if (ptjs.density) document.getElementById("density").innerHTML = ptjs.density;
    else document.getElementById("density").innerHTML = 'none';
    if (ptjs.molar_heat) document.getElementById("mh").innerHTML = ptjs.molar_heat;
    else document.getElementById("mh").innerHTML = 'none';

    if (ptjs.electron_configuration == ptjs.electron_configuration_semantic) {
        document.getElementById("config").innerHTML = pow(ptjs.electron_configuration);
    } else {
        document.getElementById("config").innerHTML = pow(ptjs.electron_configuration) + '<br>or<br>' + pow(ptjs.electron_configuration_semantic)
    }

    if (ptjs.ionization_energies.length != 0) document.getElementById("Ie").innerHTML = ptjs.ionization_energies.join('<br>');
    else document.getElementById("Ie").innerHTML = "none";
}

function generateTable() {
    var table = document.getElementById('pdt');
    for (i = 1; i < 11; i++) {
        var newRow = document.createElement('tr');
        for (a = 1; a < 19; a++) {
            for (g in elements) {
                if (elements[g].ypos == i && elements[g].xpos == a) {
                    var newCell = document.createElement("td");
                    newCell.textContent = elements[g].symbol;
                    newCell.setAttribute('onclick', 'update("' + elements[g].symbol + '"); this.className="selected"; document.getElementById("audio").play();');
                    newCell.setAttribute('style', `color:#${intToRGB(hashCode(elements[g].category))}`);
                    newCell.id = `items`;
                    newRow.appendChild(newCell);
                    console.log(elements[g].symbol);
                    break;
                } else {
                    var newCell = document.createElement("td");
                    newCell.setAttribute('border', '0px');
                    newCell.id = 'tdnull';
                    newCell.textContent = '';
                }
            }
            newRow.appendChild(newCell);
        }
        table.appendChild(newRow);
    }
}

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i) {
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}