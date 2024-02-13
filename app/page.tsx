"use client";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import FlashCard from "../components/Cards";
import ClickableChips from "../components/Chip";
import BasicSelect from "../components/Select";
import IconLabelButtons from "@/components/Button";
import LinearProgressWithLabel from "@/components/ProgressBar";

import english from "../app/preterite/english.js";
import spanish from "../app/preterite/spanish.js";

import CelebrationIcon from "@mui/icons-material/Celebration";

export default function Home() {
  const [conjugationType, setConjugationType] = useState("Preterite");
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(10);
  const [input, setInput] = useState("");
  const [remainingClicks, setRemainingClicks] = useState(value);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [reset, setReset] = useState(false);

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
        <Stack direction="row" spacing={2} marginTop={5} alignItems="center">
          <h2># of Cards left : {remainingClicks}</h2>
          <IconLabelButtons
            icon="RestartAltIcon"
            content="Reset"
            onClick={() => {
              setRemainingClicks(value);
              setCorrect(0);
              setInput("");
              setFeedback("");
              setReset(true);
              setReady(false);
            }}
          />
        </Stack>
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
        <Stack direction="column" spacing={2} alignItems="center">
          <FlashCard
            numberOfCards={value}
            englishVerbs={english.verbs}
            spanishVerbs={spanish.verbs}
            ready={ready}
            remainingClicks={remainingClicks}
            setRemainingClicks={setRemainingClicks}
            correct={correct}
            setCorrect={setCorrect}
            input={input}
            setInput={setInput}
            feedback={feedback}
            setFeedback={setFeedback}
            reset={reset}
            setReset={setReset}
          />
        </Stack>
      )}
    </main>
  );
}
