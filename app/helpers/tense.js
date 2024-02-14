import preteriteEnglish from "../app/preterite/english.js";
import preteriteSpanish from "../app/preterite/spanish.js";

import imperfectEnglish from "../app/imperfect/english.js";
import imperfectSpanish from "../app/imperfect/spanish.js";

export default function chooseTense(userChoice) {
  if (userChoice === "Preterite") {
    return {
      english: preteriteEnglish.verbs,
      spanish: preteriteSpanish.verbs
    }
  } 
  else if (userChoice === 'Imperfect'){
    return {
      english: imperfectEnglish.verbs,
      spanish: imperfectSpanish.verbs
    }
  }
}