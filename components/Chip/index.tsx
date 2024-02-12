"use client";
import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function ClickableChips({
  setConjugationType,
}: {
  setConjugationType: (conjugationType: string) => void;
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

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      {conjugationTypes.map((conjugationType) => {
        return (
          <Chip
            key={conjugationType}
            label={conjugationType}
            color={conjugationType === selected ? "primary" : "default"}
            variant="outlined"
            onClick={() => handleClick(conjugationType)}
          />
        );
      })}
    </Stack>
  );
}
