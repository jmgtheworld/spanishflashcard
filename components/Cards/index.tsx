import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";

import BasicTextFields from "../Input";

import {
  areWordsEqualWithoutAccents,
  compareWordsWithAccents,
} from "../../app/helpers/language";
import LinearWithValueLabel from "../ProgressBar";

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
  reset,
  setReset,
}: {
  ready: boolean;
  numberOfCards: number;
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
  reset: boolean;
  setReset: any;
}) {
  const [usedCombinations, setUsedCombinations] = useState(new Set());
  const [currentCombination, setCurrentCombination] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [answer, setAnswer] = useState("");

  let spanishPerson = "";
  let spanishVerb = "";
  let spanishAnswer = "";

  useEffect(() => {
    setRemainingClicks(numberOfCards);
    selectRandomCombination();
  }, [numberOfCards]);

  // Function to select a random verb index
  const selectRandomCombination = () => {
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
    if (remainingClicks === 0) {
      // If remaining clicks is zero, do nothing
      return setFeedback("Congrats! You've completed all the cards!");
    }

    if (reset) {
      setReset(false);
    }
    // logic for when card is clicked and when user was wrong and need to progress to next card
    if (input && feedback) {
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
        return `${spanishPerson} ${spanishVerb}`;
      }
      return `${person} ${verb.conjugations[person]}`;
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

  return (
    <>
      <Card
        sx={{ width: 400, minHeight: 300 }}
        style={{
          backgroundColor: backGroundColor(),
          marginTop: 40,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardActionArea
          sx={{ width: 400, minHeight: 300 }}
          onClick={() => {
            handleCardClick(input, spanishVerb);
          }}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3" color="text.secondary">
              {getContent()}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems="center">
          <Typography variant="h5">{spanishPerson}</Typography>
          {ready && <BasicTextFields input={input} setInput={setInput} />}
        </Stack>
      </Card>
      <LinearWithValueLabel
        numberOfCards={numberOfCards}
        remainingClicks={remainingClicks}
        progress={((numberOfCards - remainingClicks) / numberOfCards) * 100}
      />
      {feedback && <Typography variant="h5">{feedback}</Typography>}
    </>
  );
}
