/** @format */

import React from "react";
import styles from "./ClickableText.module.css";

interface ClickableTextProps {
  text: string;
  onClick: () => void;
  className: string; // Optional height property to make component height dynamic
}

const ClickableText: React.FC<ClickableTextProps> = ({
  text,
  onClick,
  className,
}) => {
  const finalClassName = `${styles[className]}`;

  return (
    <div className={finalClassName} onClick={onClick}>
      {text}
    </div>
  );
};

export default ClickableText;
