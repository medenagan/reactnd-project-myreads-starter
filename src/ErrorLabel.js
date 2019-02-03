import React from "react";

const ErrorLabel = (props) => {

  const {error} = props;

  return !!error && (
    <div className="app-error">
      <div className="app-error-heading">Take a break :)</div>
      <div className="app-error-body">
        <div>Oops, something isn't quite alright here.</div>
        <div>No worries, someone may already be looking into that.</div>
      </div>
      <div className="app-error-detail">{String(error)}</div>
    </div>
  );
};

export default ErrorLabel;
