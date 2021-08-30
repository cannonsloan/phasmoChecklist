let evidence = ["EMF Level 5", "Freezing Temperatures", "Spirit Box", "Ghost Writing", "Ghost Orb", "Fingerprints", "DOTS Projector"]
let recordedEvidence = []
let impossibleColor = '#cc0000'
let inactiveColor = 'white'
let activeColor = '#3CB371'


let banshee = {
  name: "Banshee",
  traits: [evidence[4], evidence[5], evidence[6]]
}

let demon = {
  name: "Demon",
  traits: [evidence[1], evidence[3], evidence[5]]
}

let jinn = {
  name: "Jinn",
  traits: [evidence[0], evidence[1], evidence[5]]
}

let mare = {
  name: "Mare",
  traits: [evidence[2], evidence[3], evidence[4]]
}

let oni = {
  name: "Oni",
  traits: [evidence[0], evidence[1], evidence[6]]
}

let phantom = {
  name: "Phantom",
  traits: [evidence[2], evidence[5], evidence[6]]
}

let poltergeist = {
  name: "Poltergeist",
  traits: [evidence[2], evidence[3], evidence[5]]
}

let revenant = {
  name: "Revenant",
  traits: [evidence[1], evidence[3], evidence[4]]
}

let shade = {
  name: "Shade",
  traits: [evidence[0], evidence[1], evidence[3]]
}

let spirit = {
  name: "Spirit",
  traits: [evidence[0], evidence[2], evidence[3]]
}

let wraith = {
  name: "Wraith",
  traits: [evidence[0], evidence[2], evidence[6]]
}

let yurei = {
  name: "Yurei",
  traits: [evidence[1], evidence[4], evidence[6]]
}

let hantu = {
  name: "Hantu",
  traits: [evidence[1], evidence[4], evidence[5]]
}

let yokai = {
  name: "Yokai",
  traits: [evidence[2], evidence[4], evidence[6]]
}

let goryo = {
  name: "Goryo",
  traits: [evidence[0], evidence[5], evidence[6]]
}

let myling = {
  name: "Myling",
  traits: [evidence[0], evidence[3], evidence[5]]
}

let ghosts = [banshee, demon, jinn, mare, oni, phantom, poltergeist, revenant, shade, spirit, wraith, yurei, hantu, yokai, goryo, myling]


// Take evidence array of 0 to 3 objects, return possibilities
function findPossibleGhosts(recordedEvidenceArray) {
  let possibleGhosts = []
  // match ENTIRE recordedEvidenceArray to ghost traits, order doesn't matter
  ghosts.forEach(ghost => {
    let truthArray = []
    // if ALL elements of rec are in ghost, add to list
    recordedEvidenceArray.forEach(element => {
      // if is in ghost traits append a true
      if (ghost.traits.indexOf(element) >= 0) {
        truthArray.push(true)
      } else {
        truthArray.push(false)
      }
    })
    // if ALL elements of truthSet are true
    if (truthArray.every(element => {return element === true})) {
      possibleGhosts.push(ghost.name)
    }
  })
  return possibleGhosts
}

// return possible evidences given an array of ghosts
function findPossibleEvidence(ghostArray) {
  let possibleEvidence = []
  // generate list of ghost objects from their names
  ghostArray.forEach(ghost => {
    let ghostObject = ''
    ghosts.forEach(ghostObj => {
      if (ghostObj.name === ghost) {
        ghostObject = ghostObj
      }
    })
    ghostObject.traits.forEach(trait => {
      if (!possibleEvidence.includes(trait)) {
        possibleEvidence.push(trait)
      }
    })
  })
  return possibleEvidence
}

// if evidence in array, remove it. if it isn't, add it
function toggleEvidence(givenEvidence) {
  let button = document.getElementById(givenEvidence)
  if (recordedEvidence.includes(givenEvidence)) {
    recordedEvidence.splice(recordedEvidence.indexOf(givenEvidence), 1)
    button.style.backgroundColor = 'white'
  }
  else if (recordedEvidence.length < 3 && button.style.backgroundColor !== 'red'){
    recordedEvidence.push(givenEvidence)
    button.style.backgroundColor = 'green'
  }
  let possible = findPossibleGhosts(recordedEvidence)
  // find the remaining possible evidence
  let remaining = findPossibleEvidence(possible)
  // take evidence - remaining and turn the results red (not possible evidence)
  let impossibleEvidence = evidence.filter(x => !remaining.includes(x)) //takes all evidence minus possible
  impossibleEvidence.forEach(impossible => {
    let impossibleButton = document.getElementById(impossible)
    impossibleButton.style.backgroundColor = 'red'
  })
  // if button is remaining and NOT white, set to white
  remaining.forEach(rem => {
    let remButton = document.getElementById(rem)
    if (remButton.style.backgroundColor === 'red') {
      remButton.style.backgroundColor = 'white'
    }
  })
  document.getElementById('possibleGhosts').innerHTML = possible.join(', ')
}


// TESTS //
/*
console.log("Given Ghost Orb") //should be jinn, mare, phantom, poltergeist, shade, yurei
let test1 = findPossibleGhosts(["Ghost Orb"])
console.log(test1)

console.log("Given Ghost Orb and Freezing Temperatures") //should be phantom, mare, yurei
let test2 = findPossibleGhosts(["Ghost Orb", "Freezing Temperatures"])
console.log(test2)

console.log("Given Ghost Orb, Freezing Temperatures and EMF Level 5") //should be phantom
let test3 = findPossibleGhosts(["Ghost Orb", "Freezing Temperatures", "EMF Level 5"])
console.log(test3)
*/
