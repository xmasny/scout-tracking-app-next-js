import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { AddCircle, Delete } from "@mui/icons-material";
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton,
    InputAdornment, OutlinedInput, Tooltip
} from "@mui/material";

import { AddNewUlohyOdborkaMutation } from "../../../queries.graphql";
import { NewOdborka, Ulohy } from "../../../types/types";
import { FormMarginBox, IconButtonsBox } from "./VlozitUlohyDialog.styles";

type Props = {
	open: boolean;
	handleClose: () => void;
	data: NewOdborka;
};

const VlozitUlohyDialog: React.FC<Props> = ({ handleClose, open, data }) => {
	const { id, name, photo } = data.addNewOdborka;
	const [cisloUlohy, setCisloUlohy] = useState<number>(2);
	const [form, setForm] = useState<Ulohy[]>([
		{ program_id: id, cislo_ulohy: 1, text_ulohy: "", potrebny_pocet_poduloh: 0, podulohy: []},
	]);

	const [addNewOdborkaUlohyMutation] = useMutation<NewOdborka>(
		AddNewUlohyOdborkaMutation
	);

	console.log(form);

	const addUlohuHandle = () => {
		setCisloUlohy(cisloUlohy + 1);

		setForm([
			...form,
			{ program_id: id, cislo_ulohy: cisloUlohy, text_ulohy: "", potrebny_pocet_poduloh: 0, podulohy: []},
		]);
	};

	const deleteUlohaTextFieldHandle = () => {
		const data = [...form];
		setCisloUlohy(cisloUlohy - 1);
		data.pop();
		setForm(data);
	};

	const formMapped = form.map((formData: Ulohy, index: number) => {
		return (
			<FormMarginBox key={index}>
				<FormControl fullWidth color="secondary">
					<OutlinedInput
						value={formData.text_ulohy}
						multiline
						startAdornment={
							<InputAdornment position="start">{`${formData.cislo_ulohy}.`}</InputAdornment>
						}
						onChange={(e) => {
							const data = [...form];
							data[index]["text_ulohy"] = e.target.value;
							setForm(data);
						}}
					/>
				</FormControl>
			</FormMarginBox>
		);
	});

	return (
		<Box>
			<Dialog open={open} fullWidth maxWidth="lg">
				<DialogTitle>
					{`Vlož úlohy pre odborku ${name}`}
					<img src={photo} alt={name} />
				</DialogTitle>
				<DialogContent>
					{formMapped}
					<IconButtonsBox>
						<Tooltip title="Pridať úlohu">
							<IconButton color="warning" onClick={addUlohuHandle}>
								<AddCircle />
							</IconButton>
						</Tooltip>
						<Tooltip title="Odstrániť úlohu">
							<IconButton color="error" onClick={deleteUlohaTextFieldHandle}>
								<Delete />
							</IconButton>
						</Tooltip>
					</IconButtonsBox>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							addNewOdborkaUlohyMutation({
								variables: {
									ulohy: form,
								},
							});
						}}>
						Vložiť odborku do databazy
					</Button>
					<Button variant="contained" color="inherit" onClick={handleClose}>
						Zrušiť
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default VlozitUlohyDialog;

