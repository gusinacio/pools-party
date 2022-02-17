interface Props {
  form: JSX.Element;
}

export function CenteredForm({ form }: Props): JSX.Element | null {
  return (
    <div className="container-fluid d-flex h-100">
      <div className="row align-self-center" style={{ flex: 1 }}>
        <div className="col col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-8 col-xs-12 mx-auto">
          {form}
        </div>
      </div>
    </div>
  );
}
