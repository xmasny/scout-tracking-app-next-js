import React from 'react';

import { Box } from '@mui/material';

import css from './ProgramInfo.module.css';
import ProgramInfoCategory from './ProgramInfoCategory/ProgramInfoCategory';

type Props = {
  info: {
    poznamky: string[];
    odporucana_literatura: string[];
    vychovny_zamer_odborky: string[];
    odporucane_zdroje: string[];
  };
};

const ProgramInfo: React.FC<Props> = ({ info }) => {
  return (
    <Box>
      {info.poznamky && (
        <ProgramInfoCategory title="Poznámky" items={info.poznamky} />
      )}
      {info.vychovny_zamer_odborky && (
        <ProgramInfoCategory
          title="Výchovný zámer odborky"
          items={info.vychovny_zamer_odborky}
        />
      )}
      {info.odporucana_literatura && (
        <ProgramInfoCategory
          title="Odporúčaná literatúra"
          items={info.odporucana_literatura}
        />
      )}
      {info.odporucane_zdroje && (
        <ProgramInfoCategory
          title="Odporúčané zdroje"
          items={info.odporucane_zdroje}
        />
      )}
    </Box>
  );
};

export default ProgramInfo;

/*   const titleSetter = (keyName: string) => {
    if (keyName === 'poznamky') return 'Poznámky';
    if (keyName === 'odporucana_literatura') return 'Odporúčaná literatúra';
    if (keyName === 'vychovny_zamer_odborky') return 'Výchovný zámer odborky';
    if (keyName === 'odporucane_zdroje') return 'Odporúčané zdroje';
    return undefined;
  };*/
