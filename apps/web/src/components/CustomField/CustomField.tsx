import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import {DynamicField} from "./fragments/DynamicField";

interface CustomFieldProps {
    setValues: SetStateAction<any>;
}

const CustomField = ({ setValues }: CustomFieldProps) => {
    const [type, setType] = useState('text');
    const uid = useRef<string>(uuidv4());

    const handleChange = ({target}: any) => {
        const {name, value} = target;

        if (name === 'type') setType(value);

        setValues((prevState: any) => {
            if (!prevState[uid.current]) prevState[uid.current] = {};

            return {
                ...prevState,
                [uid.current]: {
                    ...prevState[uid.current],
                    [name]: value
                }
            }
        });
    }

    return (
        <Stack sx={{mt: 2}} spacing={2} direction="row">
            <FormControl sx={{width: 125}}>
                <InputLabel color="secondary" id={`type-${uid.current}`}>Type</InputLabel>
                <Select
                    labelId={`type-${uid.current}`}
                    id={`type-${uid.current}`}
                    label="Type"
                    defaultValue=""
                    name="type"
                    onChange={handleChange}
                >
                    <MenuItem value="collection">Collection</MenuItem>
                    <MenuItem value="string">String</MenuItem>
                    <MenuItem value="number">Number</MenuItem>
                    <MenuItem value="boolean">Boolean</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id={`key-${uid.current}`}
                label="Key"
                name="key"
                variant="outlined"
                color="secondary"
                onChange={handleChange}
                sx={{width: 200}}
            />
            <DynamicField
                id={`value-${uid.current}`}
                onChange={handleChange}
                type={type}
                name="value"
                sx={{flex: 3}}
            />
        </Stack>
    );
};

export {
    CustomField
};