import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { dir } from "console";

export default function FlashCard() {
  return (
    <Card
      sx={{ width: 400, minHeight: 300 }}
      style={{
        marginTop: 50,
        marginBottom: 30,
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardActionArea sx={{ width: 400, minHeight: 300 }}>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" color="text.secondary">
            HOLA
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
