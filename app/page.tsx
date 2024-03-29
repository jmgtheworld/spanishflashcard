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
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

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
      <Stack direction="row" spacing={2} marginTop={3} alignItems="center">
        <Image src="/spain.png" width={30} height={30} alt="spanish flag" />
        <h1 style={{ fontSize: 20 }}> Practice Your Spanish Verbs</h1>
      </Stack>
      <Stack
        direction="column"
        style={{ marginLeft: 10, marginBottom: 60 }}
        spacing={2}
        marginTop={5}
        alignItems="flex-start"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <QuizIcon />
          <h2 style={{ fontSize: 16 }}>How to play </h2>
        </Stack>
        <p> 1. Select the tense and number of questions </p>
        <p> 2. Begin by tapping &quot;Vamos!&quot; to initiate the game</p>
        <p> 3. Input your answer </p>
        <p> 4. Tap the card/press enter to verify your answer</p>
        <p> 5. Tap again to proceed to the next verb</p>
        <p>
          6. If you&apos;re unsure of the answer, tap &quot;Reveal Answer&quot;
        </p>
        <Stack direction="row" spacing={1}>
          <p style={{ fontWeight: "bold" }}>TIP:</p>
          <p> To change the tense or number of questions, reset the game </p>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1} marginBottom={5}>
        <AssignmentTurnedInIcon />
        <h4> Selected tense: </h4>
        <h4 style={{ color: "#a6122b" }}> {conjugationType} Tense </h4>
      </Stack>
      <ClickableChips
        ready={ready}
        setConjugationType={setConjugationType}
        setEnglishVerb={setEnglishVerb}
        setSpanishVerb={setSpanishVerb}
        setUsedCombinations={setUsedCombinations}
      />
      {!ready ? (
        <Stack direction="row" spacing={1} marginTop={5} marginBottom={5}>
          <h4># of Cards: </h4>
          <h4 style={{ color: "#a6122b" }}> {value}</h4>
        </Stack>
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
