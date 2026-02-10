import React from "react";
import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useMatches,
} from "kbar";
import ResultRenderer from "./ResultRenderer";

const searchStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  border: "none",
  background: "#ffffff",
  color: "#171717",
};

const animatorStyle: React.CSSProperties = {
  maxWidth: "600px",
  width: "100%",
  background: "#ffffff",
  color: "#171717",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow:
    "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.06)",
};

function CommandBar() {
  const { results } = useMatches();

  return (
    <KBarPortal>
      <KBarPositioner>
        <KBarAnimator style={animatorStyle}>
          <KBarSearch style={searchStyle} />
          <ResultRenderer />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

export default CommandBar;
