import {
  createTheme
} from "@mui/material/styles";

export const customTheme = (outerTheme) =>
createTheme({
  palette: {
    mode: outerTheme.palette.mode,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "grey",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#6F7E8C",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
          "&::before": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom:
              "2px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom:
              "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
  },
});
