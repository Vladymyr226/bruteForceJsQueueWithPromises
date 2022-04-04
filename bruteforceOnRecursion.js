function allPossibleCombinations(arr, length, letterComb) {
    if (letterComb.length >= length) {
        return [];
    }

    let resultArray = [];
    for (var i = 0; i < arr.length; i++) {
        resultArray.push(letterComb + arr[i]);

        resultArray = resultArray.concat(allPossibleCombinations(arr, length, letterComb + arr[i]));

        if (resultArray[i] === password) {
            console.log("Brut find password\t", resultArray[i])
        }
    }

    return resultArray;
}
const password = "az"
var array = ['a', 'b', 'c', 'A', 'B', 'C', 'z'];
console.log(allPossibleCombinations(array, 2, ''));