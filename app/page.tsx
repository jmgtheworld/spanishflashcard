"use client";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import FlashCard from "../components/Cards";
import ClickableChips from "../components/Chip";
import BasicSelect from "../components/Select";
import IconLabelButtons from "@/components/Button";

import Image from "next/image";

import CelebrationIcon from "@mui/icons-material/Celebration";
import CircularProgress from "@mui/material/CircularProgress";
import LinearWithValueLabel from "../components/ProgressBar";

import preteriteEnglish from "../components/verbs/preterite/english.js";
import preteriteSpanish from "../components/verbs/preterite/spanish.js";

export default function Home() {
  const [conjugationType, setConjugationType] = useState("Preterite");
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(10);
  const [input, setInput] = useState("");
  const [remainingClicks, setRemainingClicks] = useState(value);
  const [correct, setCorrect] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [englishVerb, setEnglishVerb] = useState<
    {
      infinitive: string;
      conjugations: {
        yo: string;
        tú: string;
        "él/ella/usted": string;
        "nosotros/nosotras": string;
        "ellos/ellas/ustedes": string;
      };
    }[]
  >([]);
  const [spanishVerb, setSpanishVerb] = useState<
    {
      infinitive: string;
      conjugations: {
        yo: string;
        tú: string;
        "él/ella/usted": string;
        "nosotros/nosotras": string;
        "ellos/ellas/ustedes": string;
      };
    }[]
  >([]);

  const [usedCombinations, setUsedCombinations] = useState(new Set());
  const [currentCombination, setCurrentCombination] = useState("");

  useEffect(() => {
    setEnglishVerb(preteriteEnglish.verbs);
    setSpanishVerb(preteriteSpanish.verbs);
  }, []);

  return (
    <main
      style={{
        minWidth: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={2} marginTop={5} alignItems="center">
        <Image src="/spain.png" width={30} height={30} alt="spanish flag" />
        <h1 style={{ fontSize: 20 }}> Practice Your Spanish Verbs</h1>
      </Stack>

      <h4 style={{ marginTop: 35 }}> {conjugationType} Tense </h4>
      <ClickableChips
        ready={ready}
        setConjugationType={setConjugationType}
        setEnglishVerb={setEnglishVerb}
        setSpanishVerb={setSpanishVerb}
        setUsedCombinations={setUsedCombinations}
      />
      {!ready ? (
        <h4 style={{ marginTop: 50 }}># of Cards: {value}</h4>
      ) : (
        <Stack direction="row" spacing={2} marginTop={5} alignItems="center">
          <h2># of Cards left: {remainingClicks}</h2>
          <IconLabelButtons
            icon="RestartAltIcon"
            content="Reset"
            onClick={() => {
              setRemainingClicks(value);
              setCorrect(0);
              setInput("");
              setFeedback("");
              setReady(false);
              setSubmitted(false);
              // reset combination
              setUsedCombinations(new Set());
              const randomEnglishVerbIndex = Math.floor(
                Math.random() * englishVerb.length
              );
              const randomPersonIndex = Math.floor(Math.random() * 5); // 6 persons in total
              const combination = `${randomEnglishVerbIndex}-${randomPersonIndex}`;
              setCurrentCombination(combination);
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
        <Stack direction="column" mt={5} spacing={2} alignItems="center">
          <h3>Your score was {(correct / value) * 100}%</h3>
          <CelebrationIcon color="success" fontSize="large" />
        </Stack>
      ) : (
        <Stack direction="column" spacing={2} alignItems="center">
          {englishVerb.length > 0 && spanishVerb.length > 0 ? (
            <FlashCard
              numberOfCards={value}
              setNumberOfCards={setValue}
              englishVerbs={englishVerb}
              spanishVerbs={spanishVerb}
              ready={ready}
              remainingClicks={remainingClicks}
              setRemainingClicks={setRemainingClicks}
              correct={correct}
              setCorrect={setCorrect}
              input={input}
              setInput={setInput}
              feedback={feedback}
              setFeedback={setFeedback}
              submitted={submitted}
              setSubmitted={setSubmitted}
              usedCombinations={usedCombinations}
              setUsedCombinations={setUsedCombinations}
              currentCombination={currentCombination}
              setCurrentCombination={setCurrentCombination}
            />
          ) : (
            <Stack
              direction="column"
              spacing={2}
              alignItems="center"
              style={{ marginTop: 50 }}
            >
              <h3 style={{ marginBottom: 10 }}>Loading...</h3>
              <CircularProgress color="inherit" style={{ marginBottom: 20 }} />
            </Stack>
          )}

          <LinearWithValueLabel
            numberOfCards={value}
            remainingClicks={remainingClicks}
            progress={((value - remainingClicks) / value) * 100}
          />
        </Stack>
      )}
    </main>
  );
}
