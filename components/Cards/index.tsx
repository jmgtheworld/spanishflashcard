import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import BasicTextFields from "../Input";

export default function FlashCard({
  ready,
  englishVerbs,
  spanishVerbs,
}: {
  ready: boolean;
  englishVerbs: Array<any>;
  spanishVerbs: Array<any>;
}) {
  const [usedCombinations, setUsedCombinations] = useState(new Set());
  const [currentCombination, setCurrentCombination] = useState("");
  const [answer, setAnswer] = useState("");

  // Function to select a random verb index
  const selectRandomCombination = () => {
    const randomEnglishVerbIndex = Math.floor(
      Math.random() * englishVerbs.length
    );
    const randomPersonIndex = Math.floor(Math.random() * 6); // 6 persons in total
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

  useEffect(() => {
    selectRandomCombination();
  }, []); // Empty dependency array to run only once after the initial render

  // Function to handle click event to change verb or person
  const handleCardClick = () => {
    selectRandomCombination();
  };

  let spanishPerson = "";

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
      return `${person} ${verb.conjugations[person]}`;
    }
  };

  return (
    <Card
      sx={{ width: 400, minHeight: 300 }}
      style={{
        backgroundColor: ready ? "lightblue" : "lightgrey",
        marginTop: 50,
        marginBottom: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardActionArea
        sx={{ width: 400, minHeight: 300 }}
        onClick={() => {
          handleCardClick();
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
      <Typography variant="h5">{spanishPerson}</Typography>
      <BasicTextFields answer={answer} setAnswer={setAnswer} />
    </Card>
  );
}
