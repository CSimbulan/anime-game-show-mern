import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import CountDown from "../CountDown";
import { character_questions_action } from "./character_action";
import { character_questions_fantasy } from "./character_fantasy";
import { character_questions_comedy } from "./character_comedy";
import { character_questions_sliceoflife } from "./character_sliceoflife";
import { character_questions_romance } from "./character_romance";

interface GuessTheCharacterProps {
  category: string;
  genre: string;
  difficulty: string;
  scores: { player: number; score: number }[];
  onPlayerButtonClick: (player: number) => void;
  question: any;//change
}

const GuessTheCharacter: React.FC<GuessTheCharacterProps> = ({
  category,
  genre,
  difficulty,
  scores,
  onPlayerButtonClick,
  question
}) => {
  const [questionTimer, setQuestionTimer] = useState(true);
  const [reveal, setReveal] = useState(false);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        padding={3}
        height="50%"
        width="100%"
      >
        <Box
          width="33%"
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {questionTimer ? (
            <>
              <CountDown
                seconds={30}
                onCountdownEnd={() => {
                  setQuestionTimer(false);
                  setReveal(true);
                }}
              ></CountDown>
            </>
          ) : (
            <Typography variant="h2">Times up!</Typography>
          )}
        </Box>
        <img
          src={
            process.env.PUBLIC_URL +
            question[reveal ? "image" : "shadow"]
          }
          height="150%"
        />

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          width="33%"
        >
          {reveal ? (
            <>
              <Typography variant="h3">
                {question.character}
              </Typography>
              <Typography variant="h3">
                {question.source}
              </Typography>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={() => setReveal(!reveal)}
              style={{ width: "20%" }}
            >
              Reveal
            </Button>
          )}
        </Box>
      </Box>
      <Box width="100%" display="flex" justifyContent="space-around">
        {scores.map((player) => (
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={() => onPlayerButtonClick(player.player)}
          >
            {`Player ${player.player}`}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default GuessTheCharacter;
