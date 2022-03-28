const password = "aBDcA"

const allowedSymbols = "abcdABCD"


let brut = ""

for (let k = 0; brut !== password; k++) {

    for (let i = 0; i < password.length; i++) {

        let index = Math.floor(Math.random() * allowedSymbols.length)
        brut += allowedSymbols.substring(index, index + 1)

        console.log(brut)
    }
    if (brut === password) {
        console.log(brut, "Done, I find!")
        break
    }
    brut = ""
}
