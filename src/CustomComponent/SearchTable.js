import React from "react";
import { SEARCHICON } from "../Global/Icons";
import "../css/search.css";
const SearchTable = ({ searchFunction }) => {
  return (
    <div style={InlineStyle.searchContainer}>
      {/* <div>
        <h3>Search</h3>
      </div> */}
      <div className="searchInputContainer">
        <SEARCHICON />

        <input
          // style={InlineStyle.searchInput}
          className="ABD searInput"
          placeholder={"Search"}
          onChange={(e) => searchFunction(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchTable;

const InlineStyle = {
  searchContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "20px 0px",
  },

  searchInputContainer: {
    border: "1px solid #6B5EFF",
    color: "white",
    borderRadius: "5px",
    width: "30%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 10px",
  },
  searchInput: {
    backgroundColor: "transparent",
    border: "none",
    padding: "20px",
    color: "black",
    fontSize: "18px",
    width: "95%",
  },
};
