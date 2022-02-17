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
    <div className="row align-self-center w-100">
      <button type="button" onMouseEnter={mouseHover} onMouseLeave={mouseLeave} className="btn btn-outline-secondary mb-1 ">
        {choice}
      </button>
    </div>
  );
}
