import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { customTheme } from "./../Input/theme";

export default function DisabledInputField({ answer }: { answer: string }) {
  const outerTheme = useTheme();

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "15ch" },
      }}
      autoComplete="off"
    >
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          disabled
          size="medium"
          id="standard-disabled"
          defaultValue={answer}
          variant="standard"
        />
      </ThemeProvider>
    </Box>
  );
}
