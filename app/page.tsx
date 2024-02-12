"use client";
import { useState } from "react";
import FlashCard from "../components/Cards";
import ClickableChips from "../components/Chip";
import BasicSelect from "../components/Select";

export default function Home() {
  const [conjugationType, setConjugationType] = useState("Preterite");
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
      <BasicSelect value={value} setValue={setValue} />
      <FlashCard />
    </main>
  );
}
