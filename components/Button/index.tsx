import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

export default function IconLabelButtons({
  icon,
  content,
  setReady,
}: {
  icon: string;
  content: string;
  setReady?: (value: boolean) => void;
}) {
  const buttonIcon = (icon: string) => {
    if (icon === "RocketLaunchIcon") {
      return <RocketLaunchIcon />;
    }
  };
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        endIcon={buttonIcon(icon)}
        onClick={() => {
          setReady && setReady(true);
        }}
      >
        {content}
      </Button>
    </Stack>
  );
}
