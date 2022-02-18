import { useState } from "react";
import { Button, Row } from "react-bootstrap";

interface Props {
  index: number;
  choice: string;
  finalized: boolean;
  winner: boolean;
  voted: boolean;
  onVote: (index: number) => void;
}

export function Choice({
  index,
  choice,
  finalized,
  winner,
  voted,
  onVote
}: Props): JSX.Element | null {

  function mouseHover() {
    // console.log("hover", choice);
  }

  function mouseLeave() {
    // console.log("leave", choice);
  }

  return (
    <Row className="align-self-center w-100">
      <Button
        variant={winner ? "secondary" : (voted ? "primary" :  "outline-secondary")}
        type="button"
        onMouseEnter={mouseHover}
        onMouseLeave={mouseLeave}
        className="mb-1"
        disabled={finalized}
        onClick={() => onVote(index)}
      >
        {choice}
      </Button>
    </Row>
  );
}
