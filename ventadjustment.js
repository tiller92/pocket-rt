// this file is for the software for the adjusting the mechanical ventilator after one abg or vbg has been optianed. The goal of this file will be to take current ventilator settings and adjust them based on the results of an ABG and then a second VBG option. Originally I wanted to use the settings from the intial vent settings software but since this is meant for real life and not teaching the vent setttings will need to entered in Via user input. Hopefully one day this information can be directly grabbed from the ventilor and appporoved by the RT, RN, or MD at bedside.
let ph = document.getElementById('cph')
let pco = document.getElementById('cco')
let po = document.getElementById('cpao')
let hco = document.getElementById('chco')
let submit = document.getElementById('getTwo')
let currentTidalVolume = document.getElementById('cVt')
let currentRespiratoryRate = document.getElementById('cRr')
let currentInspiratoryTime = document.getElementById('cTi')
let currentPeep = document.getElementById('cPeep')
let currentFio = document.getElementById('cFio')
let currentPpeak = document.getElementById('curPpeak')
let currentPlat = document.getElementById('curPplat')
let currentAutoPeep = document.getElementById('curAutoPeep')
let airwayProtection = document.getElementById('airwayProtection')
let male = document.getElementById('maleBtn')
let female = document.getElementById('femaleBtn')

//ph = 0
//pco = 0
//po = 0
//hco = 0

/*let currentTidalVolume = 0
let currentRespiratoryRate = 0
let currentInspiratoryTime = 0
let currentPeep = 0
let currentFio = 0
let cuurentPpeak = 0
let currentPlat = 0
let currentAutoPeep = 0*/






// submit button Ultimate for page two 
submit.addEventListener('submit', (sub) => {
    sub.preventDefault()
    if (airwayProtection === 1 && male === 1) {
        sub.preventDefault()
        intialTidalMale()
        airwayProctectionPressures()
        airwayProtectionOxygenation()
        airwayProtectionAcidBalance()
    } else if (airwayProtection === 1 && female === 1) {
        sub.preventDefault()
        intialTidalfemale()
        airwayProctectionPressures()
        airwayProtectionOxygenation()
        airwayProtectionAcidBalance()
    } else {
        console.log('lung condition needs chosen')
    }
})




//airway protection button
airwayProtection.addEventListener('click', (ap) => {
    airwayProtection = 1
})

// male Vs female click
male.addEventListener('click', (press) => {
    male = 1
    female = 0
})

female.addEventListener('click', (press2) => {
    female = 1
    male = 0
})

// new settings functions
// pressure check function 

function airwayProctectionPressures() {
    if (currentPpeak.value >= 40 && currentPpeak.value !== undefined) {
        let highPeakWarning = document.getElementById('pressureWarningPeak')
        highPeakWarning.innerHTML = `Wargning! Ppeak of ${currentPpeak.value}cmH20 check if patient requires suction, bronchodilators, and or physical obstructions in ventilator circiut.`
    }
    if (currentPlat.value >= 30 && currentPlat.value !== undefined) {
        let highPlatWarning = document.getElementById('pressureWarningPlat')
        highPlatWarning.innerHTML = `Warning! Pplat of ${currentPlat.value}cmH20 consdier using the ARDS button of this page instead of airway protection.`
    }
}

let newFio = currentFio.value
let newPeep = currentPeep.value

// airway protection fio2 and PEEP titrator     
function airwayProtectionOxygenation() {
    if (currentPeep.value !== undefined && currentFio.value !== NaN) {
        if (currentPeep.value <= 10 && currentFio.value < 60) {
            newFio = 80 * currentFio.value / po.value
            newFio = Math.round(newFio)
            let adjustedFio = document.getElementById('newFio')
            adjustedFio.innerHTML = `Fi02: ${newFio}%`
            let adjustedPeep = document.getElementById('newPeep')
            adjustedPeep.innerHTML = `PEEP: ${currentPeep.value}`
            console.log(newFio)
        }
        if (currentPeep.value >= 10 && currentFio.value > 60) {
            newFio = 80 * currentFio.value / po.value
            newFio = Math.round(newFio)
            let adjustedFio = document.getElementById('newFio')
            adjustedFio.innerHTML = ` Fi02: ${newFio}%`
            let adjustedPeep = document.getElementById('newPeep')
            adjustedPeep.innerHTML = `PEEP: ${currentPeep.value}`
            console.log(newFio)
        }
        if (currentPeep.value < 8 && currentFio.value >= 50 && po < 80) {
            newPeep = Number(currentPeep.value) + 2
            let adjustedFio = document.getElementById('newFio')
            adjustedFio.innerHTML = `Fi02: ${newFio}%`
            let adjustedPeep = document.getElementById('newPeep')
            adjustedPeep.innerHTML = `New PEEP: ${newPeep}`
            console.log(newPeep)
            console.log(currentFio.value)
        } else {
            let adjustedPeep = document.getElementById('newPeep')
            adjustedPeep.innerHTML = `PEEP: ${currentPeep.value}`
            console.log(currentPeep.value)
        }
    }
}

// airway protection ph fixer 
function airwayProtectionAcidBalance() {
    if (ph.value !== undefined && pco.value !== undefined && currentRespiratoryRate.value !== undefined) {

        if (ph.value < 7.35 || ph.value > 7.45) {
            let newRespiratoryRate = (Number(pco.value) * Number(currentRespiratoryRate.value)) / 45
            let adjustedRR = document.getElementById('newResp')
            adjustedRR.innerHTML = `Respiratroy Rate: ${Math.round(newRespiratoryRate)} b/min`
            console.log(newRespiratoryRate)
        }
    }
}

function airwayProtectionInspiratoryTimeCheck() {
    if (currentAutoPeep.value >= 3 || newRespiratoryRate.value >= 24) {
        let newTi = document.getElementById('newTi')
        newTi.innerHTML = `decrease Ti to ${newIt} .1 sec until autoPEEP is less than 3 or Ti = .6 seconds`

    }
}


function intialTidalMale() {
    if (ht.value !== undefined) {
        idb = (50 + (.91 * [ht.value - 152.4]))
        ivt = idb * 6
        ivt = Math.round(ivt)
        console.log(ivt)
        let liVt = document.getElementById('newTidal')
        liVt.innerHTML = (`Tidal Volume: ${ivt}ml`)
    }
}


// female
function intialTidalfemale() {
    if (ht.value !== undefined) {
        idb = (45.5 + (.91 * [ht.value - 152.4]))
        ivt = idb * 6
        ivt = Math.round(ivt)
        console.log(ivt)
        let liVt = document.getElementById('newTidal')
        liVt.innerHTML = (`Tidal Volume: ${ivt} ml`)
    }
}


// airwaty protection inspiratory time function 
function airwayProtectionTi() {
    if (currentInspiratoryTime.value > 1 || currentAutoPeep.value >= 3 && currentAutoPeep <= 5) {
        let newTi = currentInspiratoryTime.value - .1
    }
    if (currentAutoPeep.value > 5) {

    }

}