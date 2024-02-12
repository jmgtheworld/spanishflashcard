export function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function areWordsEqualWithoutAccents(word1, word2) {
  var normalizedWord1 = removeAccents(word1.toLowerCase());
  var normalizedWord2 = removeAccents(word2.toLowerCase());
  return normalizedWord1 === normalizedWord2;
}

export function compareWordsWithAccents(word1, word2) {
  var accentsMismatch = [];
  for (var i = 0; i < word1.length; i++) {
      if (word1[i].toLowerCase() !== word2[i].toLowerCase()) {
          accentsMismatch.push(i);
      }
  }
  return accentsMismatch;
}

// Example usage:
/*
var spanishWord1 = "álgebra";
var spanishWord2 = "algebrá";

var mismatchIndices = compareWordsWithAccents(spanishWord1, spanishWord2);

if (mismatchIndices.length === 0) {
  console.log("The words have the same accents.");
} else {
  console.log("The words have different accents at the following indices:");
  mismatchIndices.forEach(function(index) {
      console.log("Index:", index, "Character in word 1:", spanishWord1[index], "Character in word 2:", spanishWord2[index]);
  });
}
*/
