"use client";
import { useState } from "react";
import FlashCard from "../components/Cards";
import ClickableChips from "../components/Chip";

export default function Home() {
  const [conjugationType, setConjugationType] = useState("Preterite");
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
      <h2> {conjugationType} Tense </h2>
      <ClickableChips setConjugationType={setConjugationType} />
      <FlashCard />
    </main>
  );
}
