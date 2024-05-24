// class Character {
//     constructor(
//       name, 
//       concept, 
//       skills, 
//       frailty, 
//       gear, 
//       goal, 
//       motive, 
//       nemesis) {
//         this.name = name;
//         this.concept = concept;
//         this.skills = skills;
//         this.frailty = frailty;
//         this.gear = gear;
//         this.goal = goal;
//         this.motive = motive;
//         this.nemesis = nemesis;
//         this.luck = 6;
//     }
//   }

// let myChar = new Character(
//     "Zahra Nakajima", 
//     "Space Smuggler", 
//     ["Nimble", "Smart"], 
//     "Merciful", 
//     ["Knife", 
//     "Low O2 Supplement"],
//     "obtain unknown technology",
//     "save her planet from atmosphere collapse.",
//     "The Naturalist Order",
//     );

function selectModifier(selector) {
    selector = document.getElementById("modifiers").value;
}

// document.getElementById("name").innerHTML = myChar.name;
// document.getElementById("concept").innerHTML = myChar.concept;
// document.getElementById("skills").innerHTML = myChar.skills.map(n => "<li>" + n + "</li>").join("");
// document.getElementById("frailty").innerHTML = myChar.frailty;
// document.getElementById("gear").innerHTML = myChar.gear.map(n => "<li>" + n + "</li>").join("");
// document.getElementById("goal-motive").innerHTML = myChar.goal  + " / " + myChar.motive;
// document.getElementById("nemesis").innerHTML = myChar.nemesis;
// document.getElementById("luck").innerHTML = myChar.luck;