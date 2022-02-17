import { Button, Row } from "react-bootstrap";

interface Props {
  choice: string;
}

export function Choice({ choice }: Props): JSX.Element | null {
  function mouseHover() {
    // console.log("hover", choice);
  }

  function mouseLeave() {
    // console.log("leave", choice);
  }

  return (
    <Row className="align-self-center w-100">
      <Button
        variant="outline-secondary"
        type="button"
        onMouseEnter={mouseHover}
        onMouseLeave={mouseLeave}
        className="mb-1"
      >
        {choice}
      </Button>
    </Row>
  );
}
