import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

// function LinearProgressWithLabel({ value }: { value: number }) {
//   return (
//     <Box sx={{ display: "flex", alignItems: "center" }}>
//       <Box sx={{ width: "100%", mr: 2 }}>
//         <LinearProgress variant="determinate" value={value} />
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="h5" color="text.secondary">{`${Math.round(
//           value
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export default function LinearWithValueLabel({
  progress,
  numberOfCards,
  remainingClicks,
}: {
  progress: number;
  numberOfCards: number;
  remainingClicks: number;
}) {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <BorderLinearProgress value={progress} variant="determinate" />
      </Box>
      <Box>
        <Typography variant="h6">
          {numberOfCards - remainingClicks}/{numberOfCards}
        </Typography>
      </Box>
    </>
  );
}
