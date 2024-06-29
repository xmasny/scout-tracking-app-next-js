import React from "react";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { StyledLi, StyledTitle } from "./ProgramInfoCategory.styles";

type Props = {
  title: string;
  items: string[];
};

const ProgramInfoCategory: React.FC<Props> = ({ title, items }) => {
  const mapItems = items.map((item: string) => {
    return <StyledLi key={item}>{item}</StyledLi>;
  });

  return (
    <Accordion>
      <StyledTitle>{title}</StyledTitle>
      <AccordionDetails>
        <ul>{mapItems}</ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProgramInfoCategory;
