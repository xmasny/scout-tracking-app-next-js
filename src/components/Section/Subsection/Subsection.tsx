import React from 'react';

import { Accordion, AccordionSummary, Typography } from '@mui/material';

import ActivityCard from '../ActivityCard/ActivityCard';
import { StyledBox, StyledSubsection } from './Subsection.styles';

type Props = {
  id: number;
  name: string;
  program: any;
};

const Subsection: React.FC<Props> = ({ id: expId, name: expName, program }) => {
  const programMapped = program.map((aktivita: any) => {
    return <ActivityCard key={aktivita.items[0].id} program={aktivita.items} />;
  });

  return (
    <StyledBox>
      {program.length !== 0 && (
        <Accordion expanded>
          <AccordionSummary>
            <Typography variant="h5">{expName}</Typography>
          </AccordionSummary>
          <StyledSubsection>{programMapped}</StyledSubsection>
        </Accordion>
      )}
    </StyledBox>
  );
};

export default Subsection;
