import React from "react";

export const SearchInput = ({ searchQuery, handleSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="キーワードで検索"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};
