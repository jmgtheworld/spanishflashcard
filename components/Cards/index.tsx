import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import LoopIcon from "@mui/icons-material/Loop";

import BasicTextFields from "../Input";

import {
  areWordsEqualWithoutAccents,
  compareWordsWithAccents,
} from "../../app/helpers/language";

export default function FlashCard({
  ready,
  englishVerbs,
  spanishVerbs,
  numberOfCards,
  remainingClicks,
  setRemainingClicks,
  correct,
  setCorrect,
  input,
  setInput,
  feedback,
  setFeedback,
  submitted,
  setSubmitted,
  usedCombinations,
  setUsedCombinations,
  currentCombination,
  setCurrentCombination,
}: {
  ready: boolean;
  numberOfCards: number;
  setNumberOfCards: any;
  englishVerbs: Array<any>;
  spanishVerbs: Array<any>;
  remainingClicks: number;
  setRemainingClicks: any;
  correct: number;
  setCorrect: any;
  input: string;
  setInput: any;
  feedback: string;
  setFeedback: any;
  submitted: boolean;
  setSubmitted: any;
  usedCombinations: any;
  setUsedCombinations: any;
  currentCombination: string;
  setCurrentCombination: any;
}) {
  const [answer, setAnswer] = useState("");
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  let spanishPerson = "";
  let spanishVerb = "";
  let spanishAnswer = "";

  useEffect(() => {
    setRemainingClicks(numberOfCards);
  }, [numberOfCards]);

  useEffect(() => {
    selectRandomCombination();
  }, [englishVerbs]);

  // Function to select a random verb index
  const selectRandomCombination = () => {
    setSubmitted(false);
    const randomEnglishVerbIndex = Math.floor(
      Math.random() * englishVerbs.length
    );
    const randomPersonIndex = Math.floor(Math.random() * 5); // 6 persons in total
    const combination = `${randomEnglishVerbIndex}-${randomPersonIndex}`;

    // Check if the combination has already been used
    if (usedCombinations.has(combination)) {
      // If so, try to generate another combination
      selectRandomCombination();
    } else {
      // Otherwise, set the current combination and mark it as used
      setCurrentCombination(combination);
      setUsedCombinations(new Set(usedCombinations.add(combination)));
    }
  };

  // Function to handle click event to change verb or person
  const handleCardClick = (input: string, spanishVerb: string) => {
    setRevealedAnswer(false);
    if (remainingClicks === 0) {
      // If remaining clicks is zero, do nothing
      return setFeedback("Congrats! You've completed all the cards!");
    }

    // logic for when card is clicked and when user was wrong and need to progress to next card
    if (
      (input && feedback) ||
      (feedback === "You'll get it next time!" && !input)
    ) {
      setRemainingClicks(remainingClicks - 1); // Decrement remaining clicks
      setInput("");
      setAnswer("");
      setFeedback("");
      setSubmitted(false);
      return selectRandomCombination();
    }
    // logic for when card is clicked and determine if user was right
    if (input) {
      setSubmitted(true);
      if (!areWordsEqualWithoutAccents(input, spanishVerb)) {
        return setFeedback("Whoops, that was incorrect");
      } else {
        if (compareWordsWithAccents(input, spanishVerb).length > 0) {
          setCorrect(correct + 1);
          return setFeedback("Watch out for the accents!");
        } else {
          setFeedback("You got it!");
          return setCorrect(correct + 1); // Increment correct answers
        }
      }
    }
  };

  // Display the verb and its conjugation
  const getContent = () => {
    if (!ready) return "HOLA!";

    if (currentCombination) {
      const [verbIndex, personIndex] = currentCombination
        .split("-")
        .map(Number);
      const verb = englishVerbs[verbIndex];

      const personKeys = Object.keys(verb.conjugations);
      const spanishPersonKeys = Object.keys(
        spanishVerbs[verbIndex].conjugations
      );
      const person = personKeys[personIndex];
      spanishPerson = spanishPersonKeys[personIndex];
      spanishVerb = spanishVerbs[verbIndex].conjugations[spanishPerson];
      spanishAnswer = spanishPerson + " " + spanishVerb;
      if (submitted) {
        return `${spanishPerson}`;
      }
      return `${verb.conjugations[person]}`;
    }
  };

  // Display the verb and its conjugation
  const getAnswer = () => {
    if (!ready) return "";

    if (currentCombination) {
      const [verbIndex, personIndex] = currentCombination
        .split("-")
        .map(Number);
      const spanishPersonKeys = Object.keys(
        spanishVerbs[verbIndex].conjugations
      );
      spanishPerson = spanishPersonKeys[personIndex];
      spanishVerb = spanishVerbs[verbIndex].conjugations[spanishPerson];
      spanishAnswer = spanishPerson + " " + spanishVerb;
      if (submitted) {
        return `${spanishVerb}`;
      }
    }
  };

  const backGroundColor = () => {
    if (!ready) return "lightgrey";
    else if (ready && !submitted) {
      return "lightblue";
    } else if (ready && submitted) {
      return "#e7e2b1";
    }
  };

  const revealAnswer = () => {
    if (ready) {
      setIsAnimating(true);
      setTimeout(() => {
        setSubmitted(true);
        setRevealedAnswer(true);
        setIsAnimating(false);
        return setFeedback("You'll get it next time!");
      }, 300);
    }
  };

  return (
    <>
      <Card
        sx={{ width: 400, minHeight: 300 }}
        style={{
          backgroundColor: backGroundColor(),
          marginTop: 40,
          marginBottom: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!revealedAnswer && ready && (
          <CardActionArea
            sx={{
              backgroundColor: "#e7e2b1",
            }}
            onClick={() => {
              revealAnswer();
            }}
          >
            <CardContent>
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <LoopIcon
                  sx={{
                    color: "#8b0000",
                    fontSize: 22,
                    animation: isAnimating
                      ? "spin 0.5s linear infinite"
                      : "none",
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(360deg)",
                      },
                      "100%": {
                        transform: "rotate(0deg)",
                      },
                    },
                  }}
                />
                <Typography variant="h6" color="#8b0000">
                  Reveal Answer
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        )}

        <CardActionArea
          sx={{ width: 400, minHeight: 300 }}
          onClick={() => {
            handleCardClick(input, spanishVerb);
          }}
        >
          <CardContent
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Stack
              direction="column"
              spacing={2}
              alignItems="flexStart"
              justifyContent="center"
            >
              {submitted && ready && (
                <div style={{ marginBottom: "25px" }}>
                  <Typography variant="h4" color="text.secondary">
                    Answer:
                  </Typography>
                </div>
              )}
              <Stack
                direction="column"
                spacing={2}
                alignItems="flexStart"
                justifyContent="center"
              >
                <Typography variant="h4" color="text.secondary" mr={1}>
                  {englishVerbs && spanishVerbs
                    ? getContent()
                    : "Whoops, try resetting!"}
                </Typography>
                {revealedAnswer ? (
                  <Typography variant="h4" color="red">
                    {englishVerbs && spanishVerbs ? getAnswer() : ""}
                  </Typography>
                ) : (
                  <Typography variant="h4" color="black">
                    {englishVerbs && spanishVerbs ? getAnswer() : ""}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center">
          <Typography variant="h5">{spanishPerson}</Typography>
          {ready && <BasicTextFields input={input} setInput={setInput} />}
        </Stack>
      </Card>
      {feedback && (
        <Stack direction="row" alignItems="center" spacing={1}>
          {feedback === "Whoops, that was incorrect" ||
          feedback === "You'll get it next time!" ? (
            <CloseIcon sx={{ color: "red", fontSize: 25 }} />
          ) : (
            <CheckIcon sx={{ color: "green", fontSize: 25 }} />
          )}
          <Typography variant="h5">{feedback}</Typography>
        </Stack>
      )}
    </>
  );
}
