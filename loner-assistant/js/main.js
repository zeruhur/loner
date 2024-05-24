var twistCounter = 0;
var selector = document.getElementById("modifiers").value;
var combatSelector = document.getElementById("fight-modifiers").value;
var luck = 6;
var opponentLuck = 6;

const getRandomArrayElement = array => array[Math.floor(Math.random() * array.length)];

const rollD6 = () => Math.floor(Math.random() * 6) + 1;


function selectModifier() {
    selector = document.getElementById("modifiers").value;
    combatSelector = document.getElementById("fight-modifiers").value;
}

function resetOracle() {
    document.getElementById("oracle").className = "d-none";
    document.getElementById("subject-action").className = "d-none";
}

function resetScene() {
    document.getElementById("next-scene").className = "d-none";
}

function resetHook() {
    document.getElementById("hook-p").className = "d-none";
}

function resetOpenQuestion() {
    document.getElementById("open-question").className = "d-none";
}

function resetTwistCounter() {
    if (twistCounter >= 3) {
      twistCounter = 0;
    }
}

function myOracle(modifier){
    let white  = rollD6();
    let black  = rollD6();
    let advantage  = rollD6();
    let disadvantage = rollD6();

    let oracle = "";

    function yesNo (black, white) {
        if (white > black) {
            return "Yes";
        } 
        else if (white === black) {
            twistCounter++;
            return "Yes";
        }
        else {
            return "No";
        } 
    }

    function andBut(black, white) {
        if (black === white) {
            return ", but...";
        }
        else if (black < 4 && white < 4) {
            return ", but...";
        } 
        else if (black > 3 && white > 3) {
            return ", and...";
        } else return "";
    }
  
    if (modifier == "advantage" && advantage > white) {
        return oracle = yesNo(black, advantage) + andBut(black, advantage);
    }
    else if (modifier == "disadvantage" && disadvantage > black) {
        return oracle = yesNo(disadvantage, white) + andBut(disadvantage, white);
    }
    else {
        return oracle = yesNo(black, white) + andBut(black, white);
        }
    }

function combat() {
    let oracle = myOracle(combatSelector);
    let damage = 0;

    if (oracle === "Yes, and...") {
        damage = 3;
        opponentLuck = opponentLuck - damage;
    }
    else if (oracle === "Yes") {
        damage = 2;
        opponentLuck = opponentLuck - damage;
    }
    else if (oracle === "Yes, but...") {
        damage = 1;
        opponentLuck = opponentLuck - damage;
    }
    else if (oracle === "No, but...") {
        damage = -1;
        luck = luck + damage;
    }
    else if (oracle === "No") {
        damage = -2;
        luck = luck + damage;
    }
    else if (oracle === "No, and...") {
        damage = -3;
        luck = luck + damage;
    }
    return damage;
    //console.log(damage, opponentLuck, luck);
}

function victory() {
    let outcome = "continue";
    if (opponentLuck <= 0) {
        outcome = "win";
    }
    else if (luck <= 0) {
        outcome = "lose";
    } 
    return outcome;
}

function renderLuck(luck) {
    let bullet = "";
    for (i = 0; i < luck; i++) {
        bullet += "&#11044";
    }
    return bullet;
}

function resetLuck() {
    luck = 6;
    opponentLuck = 6;
    document.getElementById("char-luck").innerHTML = renderLuck(luck);
    document.getElementById("opponent-luck").innerHTML = renderLuck(opponentLuck);
}

function fight() {
    // invoke combat
    let damage = combat();
    // interpreta damage in messaggio

    if (damage < 0) {
        document.getElementById("combat-outcome").innerHTML = "You Take " + Math.abs(damage) + " Harm";
    }
    else {
        document.getElementById("combat-outcome").innerHTML = "You Cause " + Math.abs(damage) + " Harm";
    }
    // renderLuck
    document.getElementById("char-luck").innerHTML = renderLuck(luck);
    document.getElementById("opponent-luck").innerHTML = renderLuck(opponentLuck);
    
    // controlla vittoria
    // interpreta messaggio di vittoria
    // inibire pulsante combat (opzionale) se finito
    let outcome = victory();

    switch (outcome) {
        case "win":
            document.getElementById("combat-outcome").innerHTML = "You Win!";
            opponentLuck = 6
            document.getElementById("opponent-luck").innerHTML = renderLuck(opponentLuck);
            break;
        case "lose":
            document.getElementById("combat-outcome").innerHTML = "You Lose!";
            document.getElementById("fight-button").setAttribute("disabled");
            break;
    }
}

function startCombat(){
    document.getElementById('start-combat').style.display = 'none';
    document.getElementById("fight-button").removeAttribute("disabled");
    document.getElementById("combat-outcome").innerHTML = "";
    document.getElementById('combat-run').style.display = 'block';
}

function endCombat() {
    document.getElementById("fight-button").removeAttribute("disabled");
    document.getElementById('combat-run').style.display = 'none';
    document.getElementById('start-combat').style.display = 'block';
    resetLuck();
    document.getElementById("combat-outcome").innerHTML = "";
}

function invokeOracle(){
    let selector = document.getElementById("modifiers").value;
    let oracle = myOracle(selector);

    resetHook();
    resetScene();
    resetOpenQuestion();
    document.getElementById("oracle").className = "display-2 d-block";

    document.getElementById("twist-counter").innerHTML = twistCounter;
    document.getElementById("oracle").innerHTML = oracle;
    

    if (twistCounter == 3) {
        document.getElementById("twist-counter").className = "badge bg-danger";

        var subj = getRandomArrayElement(subject);
        var act = getRandomArrayElement(action);

        document.getElementById("subject-action").className = "d-block";
        document.getElementById("twist").innerHTML = subj + " " + act;
    } else {
        document.getElementById("subject-action").className = "d-none";
        document.getElementById("twist-counter").className = "badge bg-dark";
    }

    resetTwistCounter();

}

function askNextScene() {
    resetOracle();
    resetScene();
    resetHook();
    resetOpenQuestion();
    document.getElementById("next-scene").className = "d-block";
    document.getElementById("nxt-scn").innerHTML = "The next scene is <strong>" + getRandomArrayElement(nextScene) + "</strong>";
}

function generateHook() {
    resetOracle();
    resetScene();
    resetHook();
    resetOpenQuestion();

    document.getElementById("hook-p").className = "d-block";

    document.getElementById("who").innerHTML = "<strong>Who?</strong> " + getRandomArrayElement(who);
    document.getElementById("what").innerHTML = "<strong>What?</strong> " + getRandomArrayElement(what);
    document.getElementById("why").innerHTML = "<strong>Why?</strong> " + getRandomArrayElement(why);
    document.getElementById("where").innerHTML = "<strong>Where?</strong> " + getRandomArrayElement(where);
    document.getElementById("how").innerHTML = "<strong>How?</strong> " + getRandomArrayElement(how);
    document.getElementById("obstacle").innerHTML = "<strong>Obstacle?</strong> " + getRandomArrayElement(obstacle);

}

function askOpenQuestion() {
    resetOracle();
    resetScene();
    resetHook();
    resetOpenQuestion();

    document.getElementById("open-question").className = "d-block";

    document.getElementById("verb").innerHTML = getRandomArrayElement(verbs);
    document.getElementById("adjective").innerHTML = getRandomArrayElement(adjectives);
    document.getElementById("noun").innerHTML = getRandomArrayElement(nouns);

}

// character sheet

// Variabili globali
let isEditMode = false;

document.addEventListener('DOMContentLoaded', function() {
    const characterSheet = {
        name: document.getElementById('name'),
        concept: document.getElementById('concept'),
        skillsList: document.getElementById('skills-list'),
        frailtyList: document.getElementById('frailty-list'),
        gearList: document.getElementById('gear-list'),
        goalMotive: document.getElementById('goal-motive'),
        nemesis: document.getElementById('nemesis'),
        editButton: document.getElementById('edit-char-sheet'),
        saveButton: document.getElementById('save-char-sheet'),
        resetButton: document.getElementById('reset-char-sheet')
    };

    function toggleEdit() {
        const isEditable = characterSheet.name.contentEditable === "true";
        const newEditState = !isEditable;

        characterSheet.name.contentEditable = newEditState;
        characterSheet.concept.contentEditable = newEditState;
        characterSheet.goalMotive.contentEditable = newEditState;
        characterSheet.nemesis.contentEditable = newEditState;

        characterSheet.editButton.style.display = newEditState ? 'none' : 'inline-block';
        characterSheet.saveButton.style.display = newEditState ? 'inline-block' : 'none';

        toggleListItemsEditable(characterSheet.skillsList, newEditState);
        toggleListItemsEditable(characterSheet.frailtyList, newEditState);
        toggleListItemsEditable(characterSheet.gearList, newEditState);
    }

    function toggleListItemsEditable(list, isEditable) {
        const items = list.querySelectorAll('li');
        items.forEach(item => {
            item.contentEditable = isEditable;
        });
    }

    function saveCharSheet() {
        const characterData = {
            name: characterSheet.name.innerText,
            concept: characterSheet.concept.innerText,
            skills: getListItems(characterSheet.skillsList),
            frailty: getListItems(characterSheet.frailtyList),
            gear: getListItems(characterSheet.gearList),
            goalMotive: characterSheet.goalMotive.innerText,
            nemesis: characterSheet.nemesis.innerText
        };

        localStorage.setItem('characterSheet', JSON.stringify(characterData));
        toggleEdit();
    }

    function getListItems(list) {
        const items = list.querySelectorAll('li span');
        return Array.from(items).map(item => item.innerText);
    }

    function loadCharSheet() {
        const characterData = JSON.parse(localStorage.getItem('characterSheet'));
        if (characterData) {
            characterSheet.name.innerText = characterData.name;
            characterSheet.concept.innerText = characterData.concept;
            setListItems(characterSheet.skillsList, characterData.skills);
            setListItems(characterSheet.frailtyList, characterData.frailty);
            setListItems(characterSheet.gearList, characterData.gear);
            characterSheet.goalMotive.innerText = characterData.goalMotive;
            characterSheet.nemesis.innerText = characterData.nemesis;
        }
    }

    function setListItems(list, items) {
        list.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.innerText = item;
            span.contentEditable = characterSheet.name.contentEditable;
            li.appendChild(span);

            const removeButton = document.createElement('button');
            removeButton.innerText = 'Remove';
            removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
            removeButton.onclick = function() {
                list.removeChild(li);
            };
            li.appendChild(removeButton);

            list.appendChild(li);
        });
    }

    function addToList(listId) {
        const list = document.getElementById(`${listId}-list`);
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.contentEditable = characterSheet.name.contentEditable;
        span.innerText = 'New Item';
        li.appendChild(span);

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
        removeButton.onclick = function() {
            list.removeChild(li);
        };
        li.appendChild(removeButton);

        list.appendChild(li);
    }

    function confirmResetCharSheet() {
        if (confirm("Are you sure you want to reset the character sheet?")) {
            resetCharSheet();
        }
    }

    function resetCharSheet() {
        localStorage.removeItem('characterSheet');
        characterSheet.name.innerText = 'Character Name';
        characterSheet.concept.innerText = 'Concept';
        characterSheet.skillsList.innerHTML = '';
        characterSheet.frailtyList.innerHTML = '';
        characterSheet.gearList.innerHTML = '';
        characterSheet.goalMotive.innerText = 'Goal and Motive';
        characterSheet.nemesis.innerText = 'Nemesis';
    }

    characterSheet.editButton.addEventListener('click', toggleEdit);
    characterSheet.saveButton.addEventListener('click', saveCharSheet);
    characterSheet.resetButton.addEventListener('click', confirmResetCharSheet);

    document.querySelectorAll('.btn-secondary').forEach(button => {
        button.addEventListener('click', function() {
            const listId = button.getAttribute('onclick').match(/'(\w+)'/)[1];
            addToList(listId);
        });
    });

    loadCharSheet();
});



// Funzione per inizializzare la pagina
function initPage() {
  loadCharSheet();
  toggleEdit(); // Disabilita la modifica all'avvio della pagina
}

initPage(); // Chiamata alla funzione di inizializzazione

  

document.getElementById("char-luck").innerHTML = renderLuck(luck);
document.getElementById("opponent-luck").innerHTML = renderLuck(opponentLuck);
document.getElementById("twist-counter").innerHTML = twistCounter;
//document.getElementById("luck").innerHTML = '<strong>' + luck + '</strong>';

// get random icon from icon folder
const iconpath = 'assets/icons/';
var myModal = document.getElementById("story-dice");
var myModalBody = document.getElementById("story-dice-body");

//$('.el').append("<img src='"+path+imgs[i]+"'>").hide().fadeIn(2000);

// function generateStoryDice() {

// }

myModal.addEventListener('show.bs.modal', function () {
    let n = document.getElementById("story-dice-n").value
    myModalBody.innerHTML = "";
    for (i = 0; i < n; i++) {
        let icon = getRandomArrayElement(icons);
        let div = document.createElement('div');
        div.className = "col-4 my-1";
        console.log(div);
        div.innerHTML = '<img src="' + iconpath + icon + '" width="100">'
        myModalBody.appendChild(div);
        //<div class="col-md-4"><img src="assets/icons/whale-tail.svg" alt=""></div>
    }
})