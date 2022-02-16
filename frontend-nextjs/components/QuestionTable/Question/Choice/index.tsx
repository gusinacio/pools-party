interface Props {
  choice: string;
}

export function Choice({ choice }: Props): JSX.Element | null {
  return (
    <div className="row">
      <button type="button" className="btn btn-outline-secondary mb-1">
        {choice}
      </button>
    </div>
  );
}
