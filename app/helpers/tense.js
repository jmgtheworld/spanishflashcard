import preteriteEnglish from "../../components/verbs/preterite/english.js";
import preteriteSpanish from "../../components/verbs/preterite/spanish.js";

import imperfectEnglish from "../../components/verbs/imperfect/english.js";
import imperfectSpanish from "../../components/verbs/imperfect/spanish.js";

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