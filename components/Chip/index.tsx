"use client";
import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import preteriteEnglish from "../verbs/preterite/english.js";
import preteriteSpanish from "../verbs/preterite/spanish.js";

import imperfectEnglish from "../verbs/imperfect/english.js";
import imperfectSpanish from "../verbs/imperfect/spanish.js";

export default function ClickableChips({
  setConjugationType,
  setEnglishVerb,
  setSpanishVerb,
  ready,
  setUsedCombinations,
}: {
  setConjugationType: (conjugationType: string) => void;
  setEnglishVerb: (englishVerb: Array<any>) => void;
  setSpanishVerb: (spanishVerb: Array<any>) => void;
  ready: boolean;
  setUsedCombinations: any;
}) {
  const handleClick = (conjugationType: string) => {
    setConjugationType(conjugationType);
    setSelected(conjugationType);
  };
  const [selected, setSelected] = React.useState("Preterite");

  const conjugationTypes = [
    "Preterite",
    "Imperfect",
    "Future",
    "Conditional",
    "Present",
    "Subjunctive",
    "Imperative",
  ];

  const chooseTense = (userChoice: string) => {
    if (userChoice === "Preterite") {
      setEnglishVerb(preteriteEnglish.verbs);
      setSpanishVerb(preteriteSpanish.verbs);
    } else if (userChoice === "Imperfect") {
      setEnglishVerb(imperfectEnglish.verbs);
      setSpanishVerb(imperfectSpanish.verbs);
    }
  };
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      {conjugationTypes.map((conjugationType) => {
        if (ready) {
          return (
            <Chip
              key={conjugationType}
              label={conjugationType}
              sx={{
                fontSize: 16,
                padding: 1.5,
                fontWeight: conjugationType === selected ? "bold" : "normal",
              }}
              color="default"
            />
          );
        } else if (
          conjugationType === "Preterite" ||
          conjugationType === "Imperfect"
        ) {
          return (
            <Chip
              sx={{
                fontSize: 16,
                padding: 1.5,
                fontWeight: conjugationType === selected ? "bold" : "normal",
              }}
              key={conjugationType}
              label={conjugationType}
              color={conjugationType === selected ? "primary" : "default"}
              variant="outlined"
              onClick={() => {
                handleClick(conjugationType);
                chooseTense(conjugationType);
                setUsedCombinations(new Set());
              }}
            />
          );
        }
        return (
          <Chip
            key={conjugationType}
            label={conjugationType}
            sx={{
              fontSize: 16,
              padding: 1.5,
            }}
          />
        );
      })}
    </Stack>
  );
}
