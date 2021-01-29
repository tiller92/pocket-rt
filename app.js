const btn = document.getElementById('btn')
const form = document.getElementById('form')
const ht = document.getElementById('ht')
const wt = document.getElementById('wt')
const errorElement = document.getElementById('error')
let male = document.getElementById('maleBtn')
let female = document.getElementById('femaleBtn')

//form error messages
form.addEventListener('submit', (e) => {
    let messages = []
    e.preventDefault()
    if (ht.value === '' || ht.value == null) {
        messages.push('Vt and Ht required')
    }
    if (messages.length > 0) {
        e.preventDefault()
        ht.innerHTML = messages.join(', ')
    }
})



//male button click and female
male.addEventListener('click', (press) => {
    male = 1
    female = 0
})

female.addEventListener('click', (press2) => {
    female = 1
    male = 0
})


// submit form no error
form.addEventListener('submit', (s) => {
    if (male === 1 && female === 0) {
        intialTidalMale()
        console.log(ht.value)
    }
    if (female === 1 && male === 0) {
        intialTidalfemale()
        console.log(ht.value)
    }
    if (wt.value > 0) {

        console.log(wt.value)
    }
    frequency()
    getIntialTi()
    fioPeep()
    let inTitle = document.getElementById('inTitle')
    inTitle.innerHTML = (`Place patient on these settings for intial Mechanical Ventilation`)

})


// create functions for Vt, RR, Fio2, PEEP and Ti
// intital Vt function
let ivt = 0
let idb = 0
let bsa = 0
let ve = 0
let rr = 0
let iT = 0
let fioTwo = 0
let inPeep = 0

// male

function intialTidalMale() {
    if (ht.value !== undefined) {
        idb = (50 + (.91 * [ht.value - 152.4]))
        ivt = idb * 6
        ivt = Math.round(ivt)
        console.log(ivt)
        let liVt = document.getElementById('inVt')
        liVt.innerHTML = (`Vt = ${ivt}ml`)
    }
}


// female
function intialTidalfemale() {
    if (ht.value !== undefined) {
        idb = (45.5 + (.91 * [ht.value - 152.4]))
        ivt = idb * 6
        ivt = Math.round(ivt)
        console.log(ivt)
        let liVt = document.getElementById('inVt')
        liVt.innerHTML = (`Vt = ${ivt} ml`)
    }
}

// figure BSA and x 4 to get Ve 
function frequency() {
    bsa = .007184 * (ht.value ** 0.725) * (wt.value ** 0.425)
    ve = bsa * 4
    rr = ve / (ivt * .001)
    rr = Math.round(rr)
    console.log(rr)
    let liRr = document.getElementById('inRr')
    liRr.innerHTML = (`RR  = ${rr} breaths per minute`)
}

// inspiratory time function
function getIntialTi() {
    if (rr > 20) {
        iT = .7
    }
    if (rr <= 20) {
        iT = .9
    }
    //if (autoPEEP > 3 && iT > .65) {
    //    iT -= .1
    //}
    let liinTi = document.getElementById('inTi')
    liinTi.innerHTML = (`Ti = ${iT} seconds`)
}

// fio2 and PEEP funtion 
function fioPeep() {
    fioTwo = 100
    inPeep = 6
    let lifioTwo = document.getElementById('infio')
    lifioTwo.innerHTML = (`Fio2 = ${fioTwo}%`)
    let liinpeep = document.getElementById('inpeep')
    liinpeep.innerHTML = (`PEEP = ${inPeep}`)
}




// buttons
//btn.addEventListener('click', function() {
//    alert('you clicked the button')
//})
//const btnTwo = document.querySelector('#btnTwo')
//btnTwo.addEventListener('click', function() {
//    alert('this is button two')
//})