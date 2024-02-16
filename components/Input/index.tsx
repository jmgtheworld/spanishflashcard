import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { customTheme } from "./theme";

export default function BasicTextFields({
  input,
  setInput,
  handleCardClick,
  spanishVerb,
}: {
  input: string;
  setInput: (input: string) => void;
  handleCardClick: any;
  spanishVerb: string;
}) {
  const outerTheme = useTheme();

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "15ch" },
      }}
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        handleCardClick(input, spanishVerb);
      }}
    >
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          id="standard-basic"
          size="medium"
          variant="standard"
          value={input}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            setInput(event.target.value);
          }}
        />
      </ThemeProvider>
    </Box>
  );
}
