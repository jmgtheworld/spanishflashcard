import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function IconLabelButtons({
  icon,
  content,
  setReady,
  onClick,
}: {
  icon: string;
  content: string;
  setReady?: (value: boolean) => void;
  onClick?: () => void;
}) {
  const buttonIcon = (icon: string) => {
    if (icon === "RocketLaunchIcon") {
      return <RocketLaunchIcon />;
    } else if (icon === "RestartAltIcon") {
      return <RestartAltIcon />;
    }
  };
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        endIcon={buttonIcon(icon)}
        onClick={() => {
          setReady && setReady(true);
          onClick && onClick();
        }}
      >
        {content}
      </Button>
    </Stack>
  );
}
