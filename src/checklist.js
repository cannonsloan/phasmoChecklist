let evidence = ["EMF Level 5", "Freezing Temperatures", "Spirit Box", "Ghost Writing", "Ghost Orb", "Fingerprints", "DOTS Projector"]
let recordedEvidence = []
let canceledEvidence = []

let banshee = {
  name: "Banshee",
  traits: [evidence[4], evidence[5], evidence[6]],
  count: 0
}

let demon = {
  name: "Demon",
  traits: [evidence[1], evidence[3], evidence[5]],
  count: 0
}

let jinn = {
  name: "Jinn",
  traits: [evidence[0], evidence[1], evidence[5]],
  count: 0
}

let mare = {
  name: "Mare",
  traits: [evidence[2], evidence[3], evidence[4]],
  count: 0
}

let oni = {
  name: "Oni",
  traits: [evidence[0], evidence[1], evidence[6]],
  count: 0
}

let phantom = {
  name: "Phantom",
  traits: [evidence[2], evidence[5], evidence[6]],
  count: 0
}

let poltergeist = {
  name: "Poltergeist",
  traits: [evidence[2], evidence[3], evidence[5]],
  count: 0
}

let revenant = {
  name: "Revenant",
  traits: [evidence[1], evidence[3], evidence[4]],
  count: 0
}

let shade = {
  name: "Shade",
  traits: [evidence[0], evidence[1], evidence[3]],
  count: 0
}

let spirit = {
  name: "Spirit",
  traits: [evidence[0], evidence[2], evidence[3]],
  count: 0
}

let wraith = {
  name: "Wraith",
  traits: [evidence[0], evidence[2], evidence[6]],
  count: 0
}

let yurei = {
  name: "Yurei",
  traits: [evidence[1], evidence[4], evidence[6]],
  count: 0
}

let hantu = {
  name: "Hantu",
  traits: [evidence[1], evidence[4], evidence[5]],
  count: 0
}

let yokai = {
  name: "Yokai",
  traits: [evidence[2], evidence[4], evidence[6]],
  count: 0
}

let goryo = {
  name: "Goryo",
  traits: [evidence[0], evidence[5], evidence[6]],
  count: 0
}

let myling = {
  name: "Myling",
  traits: [evidence[0], evidence[3], evidence[5]],
  count: 0
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

// Take canceled evidence to get impossible ghosts
function findImpossibleGhosts(canceledEvidenceArray) {
  let impossibleGhosts = []
  ghosts.forEach(ghost => {
    let truthArray = []
    // if ONE element of imp are in ghost, add to list
    canceledEvidenceArray.forEach(element => {
      // if is in ghost traits append a true
      if (ghost.traits.indexOf(element) >= 0) {
        truthArray.push(true)
      } else {
        truthArray.push(false)
      }
    })
    // if ONE elements of truthSet is true
    if (truthArray.includes(true)) {
      impossibleGhosts.push(ghost.name)
    }
  })
  return impossibleGhosts
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
// needs tidying
function toggleEvidence(givenEvidence, buttonpress) {
  let button = document.getElementById(givenEvidence)
  if (recordedEvidence.includes(givenEvidence) && buttonpress === 'left' && button.style.backgroundColor !== 'darkred') {
    recordedEvidence.splice(recordedEvidence.indexOf(givenEvidence), 1)
    button.style.backgroundColor = 'white'
    // if confirm button exists, delete it
    if (document.getElementById("Confirm") != null) {
      document.getElementById("Confirm").remove()
    }
  }
  else if (buttonpress === 'left' && recordedEvidence.length < 3 && button.style.backgroundColor !== 'red' && button.style.backgroundColor !== 'darkred'){
    recordedEvidence.push(givenEvidence)
    if (button.style.backgroundColor === 'darkred') {
      canceledEvidence.splice(canceledEvidence.indexOf(givenEvidence), 1)
    }
    button.style.backgroundColor = 'green'
  }
  else if (buttonpress === 'right' && button.style.backgroundColor !== 'darkred' && button.style.backgroundColor !== 'green' && button.style.backgroundColor !== 'red') {
    canceledEvidence.push(givenEvidence)
    button.style.backgroundColor = 'darkred'
  }
  else if (buttonpress === 'right' && button.style.backgroundColor === 'darkred' && button.style.backgroundColor !== 'green' && button.style.backgroundColor !== 'red') {
    canceledEvidence.splice(canceledEvidence.indexOf(givenEvidence), 1)
    button.style.backgroundColor = 'white'
  }
  let possible = findPossibleGhosts(recordedEvidence)
  // find the remaining possible evidence
  let remaining = findPossibleEvidence(possible)
  // take evidence - remaining and turn the results red (not possible evidence)
  let impossibleEvidence = evidence.filter(x => !remaining.includes(x)) //takes all evidence minus possible
  impossibleEvidence.forEach(impossible => {
    let impossibleButton = document.getElementById(impossible)
    if (impossibleButton.style.backgroundColor !== 'darkred') {
      impossibleButton.style.backgroundColor = 'red'
    } 
  })
  // if button is remaining and NOT white, set to white
  remaining.forEach(rem => {
    let remButton = document.getElementById(rem)
    if (remButton.style.backgroundColor === 'red') {
      remButton.style.backgroundColor = 'white'
    }
  })
  // subtract possible ghosts from ghost list to get IMPOSSIBLE GHOSTS
  let allGhosts = []
  ghosts.forEach(ghost => {
    allGhosts.push(ghost.name)
  })
  let impossibleGhostsTest = findImpossibleGhosts(canceledEvidence)
  let impossibleGhosts = allGhosts.filter(x => !possible.includes(x)) // all ghosts - possible ghosts
  // set all IMPOSSIBLE GHOSTS to red on table header and leave others white
  allGhosts.forEach(ghost => {
    let ghostHeader = document.getElementById(ghost + "Header")
    ghostHeader.style.color = 'white'
  })
  impossibleGhosts.forEach(impossibleGhost => {
    let ghostHeader = document.getElementById(impossibleGhost + "Header")
    ghostHeader.style.color = 'red'
  })
  impossibleGhostsTest.forEach(impossibleGhost => {
    let ghostHeader = document.getElementById(impossibleGhost + "Header")
    ghostHeader.style.color = 'red'
  })
  // if 3 evidence selected create confirm button if no confirm button exists
  if (recordedEvidence.length === 3 && document.getElementById("Confirm") == null) {
    finalGhost = possible[0]
    let btn = document.createElement("button")
    btn.id = "Confirm"
    btn.onclick = function() {
      confirmGhost(finalGhost)
    }
    btn.innerHTML = "Confirm " + finalGhost
    document.body.appendChild(btn)
  }
}

// confirm the ghost, update count, save, reset environment
function confirmGhost(ghostType) {
  let ghostObj = 0
  let btn = document.getElementById("Confirm")
  ghosts.forEach(ghost => {
    if (ghost.name === ghostType) {
      ghostObj = ghost
    }
  })
  ghostObj.count++
  saveCount()
  updateCount()
  btn.remove()
  let recLength = recordedEvidence.length
  let canLength = canceledEvidence.length
  for (let i = 0; i < recLength; i++) {
    toggleEvidence(recordedEvidence[0], 'left')
  }
  for (let i = 0; i < canLength; i++) {
    toggleEvidence(canceledEvidence[0], 'right')
  }
}

// create html table of ghosts and caught amount
function createTable() {
  let table = document.querySelector("table")
  let thead = table.createTHead()
  let ghostNameRow = thead.insertRow()
  let ghostCaughtRow = thead.insertRow()
  let i = 0
  ghosts.forEach(ghostType => {
    // extract data
    ghostNameText = ghostType.name
    ghostCaughtText = ghostType.count
    i++
    // generate table header
    let th = document.createElement("th")
    let text = document.createTextNode(ghostNameText)
    th.appendChild(text)
    th.setAttribute("id", ghostNameText + "Header")
    ghostNameRow.appendChild(th)
    // generate table body
    let td = document.createElement("td")
    text = document.createTextNode(ghostCaughtText)
    td.appendChild(text)
    td.setAttribute("id", ghostNameText + "Count")
    ghostCaughtRow.appendChild(td)
  })
}

// save ghostsCaught to storage
function saveCount() {
  ghostsCaught = []
  ghosts.forEach(ghost => {
    ghostsCaught.push(ghost.count)
  })
  localStorage.setItem('phasmoChecklistCount', JSON.stringify(ghostsCaught))
}

// load ghostsCaught from storage
function loadCount() {
  if (localStorage.getItem('phasmoChecklistCount')) {
    ghostsCaught = JSON.parse(localStorage.getItem('phasmoChecklistCount'))
    let i = 0
    ghostsCaught.forEach(entry => {
      ghosts[i].count = entry
      updateCount()
      i++
    })
  }
}

// get total ghost caught count
function getTotalCount() {
  let totalGhostCount = 0
  ghosts.forEach(ghost => {
    totalGhostCount += ghost.count
  })
  return totalGhostCount
}

// update html data with ghost count
function updateCount() {
  let totalGhostCount = document.getElementById("TotalCountText")
  ghosts.forEach(ghost => {
    let ghostCount = document.getElementById(ghost.name + "Count")
    ghostCount.innerHTML = ghost.count
  })
  totalGhostCount.innerHTML = "Total Ghosts Caught: " + getTotalCount()
}

// reset saved data
function resetCount() {
  ghosts.forEach(ghost => {
    ghost.count = 0
  })
  saveCount()
  updateCount()
}

// reset logged evidence
function resetEvidence() {
  let recLength = recordedEvidence.length
  let canLength = canceledEvidence.length
  for (let i = 0; i < recLength; i++) {
    toggleEvidence(recordedEvidence[0], 'left')
  }
  for (let i = 0; i < canLength; i++) {
    toggleEvidence(canceledEvidence[0], 'right')
  }
  // reset evidence buttons
  evidence.forEach(evidence => {
    let evidenceButton = document.getElementById(evidence)
    evidenceButton.style.backgroundColor = 'white'
  })
  // reset table headers
  ghosts.forEach(ghost => {
    // reset table headers
    let ghostHeader = document.getElementById(ghost + "Header")
    ghostHeader.style.color = 'white'
  })
}

// startup functions
window.onload = function() {
  createTable()
  loadCount()
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
