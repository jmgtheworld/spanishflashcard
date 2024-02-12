"use client";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import FlashCard from "../components/Cards";
import ClickableChips from "../components/Chip";
import BasicSelect from "../components/Select";
import IconLabelButtons from "@/components/Button";
import english from "../app/preterite/english.js";
import spanish from "../app/preterite/spanish.js";

export default function Home() {
  const [conjugationType, setConjugationType] = useState("Preterite");
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState("10");

  return (
    <main
      style={{
        minWidth: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1> Practice Your Spanish Verbs</h1>
      <h2 style={{ marginTop: 35 }}> {conjugationType} Tense </h2>
      <ClickableChips setConjugationType={setConjugationType} />
      <h2 style={{ marginTop: 50 }}> # of Cards: {value}</h2>
      {!ready && (
        <Stack direction="row" spacing={2}>
          <BasicSelect value={value} setValue={setValue} />
          <IconLabelButtons
            icon="RocketLaunchIcon"
            content="Vamos!"
            setReady={setReady}
          />
        </Stack>
      )}

      <FlashCard
        englishVerbs={english.verbs}
        spanishVerbs={spanish.verbs}
        ready={ready}
      />
    </main>
  );
}
