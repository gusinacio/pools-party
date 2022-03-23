import { useState } from "react";
import { Button, Row } from "react-bootstrap";
import { Alternative } from "../../../../graphql/generated";


interface Props {
  index: number;
  alternative: Alternative;
  winner: boolean;
  voted: boolean;
  onVote: (index: number) => void;
}

export function Alternative({
  index,
  alternative,
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
        disabled={alternative.votes >= 0}
        onClick={() => onVote(index)}
      >
        {alternative.text}
      </Button>
    </Row>
  );
}
