import React from "react";
import {Link} from "react-router-dom";

const OpenSearch = (props) => {
  return (
    <div className="open-search">
      <Link to="/search" title="Search for a book">Search</Link>
    </div>
  );
};

export default OpenSearch;
