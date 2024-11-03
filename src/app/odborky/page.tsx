'use client';

import React, { useState } from 'react';

import { remove } from 'remove-accents';

import { CircularProgress, IconButton, TextField } from '@mui/material';

import Section from '@/components/Section/Section';
import { useGetAllCategories } from '@/features/queries';
import { VekKat, VekKatEnum } from '@/models';

import { BoxSpinner, OdborkyBox, OdborkyContainer, OdborkyPaper, OdborkySearch } from './odborky.styles';

const { VLCATA, SKAUTI, ROVERI } = VekKatEnum;

export default function OdborkyPage(): React.ReactElement {
	const { data, isLoading } = useGetAllCategories();

  const [searchField, setSearchField] = useState<string>('');

  if (isLoading) {
    return (
      <BoxSpinner>
        <CircularProgress color="secondary" />
      </BoxSpinner>
    );
  }

  const textFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(remove(e.target.value.toLowerCase()));
  };

  const sections = data?.vekovaKat
    .filter((vekKat) => [VLCATA, SKAUTI, ROVERI].includes(vekKat.id))
    .map((section: VekKat) => (
      <Section key={section.id} id={section.id} name={section.name} searchField={searchField} />
    ));
	return (<OdborkyContainer sx={{ display: 'grid' }}>
		<OdborkyPaper>
			<IconButton>
				<OdborkySearch />
			</IconButton>
			<TextField
				variant="outlined"
				color="secondary"
				label="Hľadať"
				fullWidth
				onChange={textFieldHandler}
			/>
		</OdborkyPaper>
		<OdborkyBox>{sections}</OdborkyBox>
	</OdborkyContainer>);
}
