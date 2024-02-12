"use client";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import FlashCard from "../components/Cards";
import ClickableChips from "../components/Chip";
import BasicSelect from "../components/Select";
import IconLabelButtons from "@/components/Button";
import english from "../app/preterite/english.js";
import spanish from "../app/preterite/spanish.js";

import CelebrationIcon from "@mui/icons-material/Celebration";

export default function Home() {
  const [conjugationType, setConjugationType] = useState("Preterite");
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(10);
  const [remainingClicks, setRemainingClicks] = useState(value);
  const [correct, setCorrect] = useState(0);

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
      {!ready ? (
        <h2 style={{ marginTop: 50 }}>
          # of Cards:
          {value}
        </h2>
      ) : (
        <h2 style={{ marginTop: 50 }}>
          # of Cards left:
          {remainingClicks}
        </h2>
      )}

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
      {remainingClicks === 0 ? (
        <Stack direction="column" spacing={2} alignItems="center">
          <h3>Your score was {(correct / value) * 100}%</h3>
          <CelebrationIcon color="success" fontSize="large" />
        </Stack>
      ) : (
        <FlashCard
          numberOfCards={value}
          englishVerbs={english.verbs}
          spanishVerbs={spanish.verbs}
          ready={ready}
          remainingClicks={remainingClicks}
          setRemainingClicks={setRemainingClicks}
          correct={correct}
          setCorrect={setCorrect}
        />
      )}
    </main>
  );
}
