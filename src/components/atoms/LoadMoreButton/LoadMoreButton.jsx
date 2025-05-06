import React from "react";
import "./LoadMoreButton.css";

export const LoadMoreButton = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className="load-more-btn">
      もっと見る
    </button>
  );
};
