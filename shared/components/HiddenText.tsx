import React from "react";

interface Props {
  className?: string;
}

export const HiddenText: React.FC<Props> = ({ className }) => {
  return <div className="gradient-overlay w-20 h-6"></div>;
};
