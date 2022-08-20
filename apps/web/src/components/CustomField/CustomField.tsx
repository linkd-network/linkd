import React, {SetStateAction, useRef, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {DynamicField} from "./fragments/DynamicField";

interface CustomFieldProps {
    setValues: SetStateAction<any>;
    uuid: string;
}

const CustomField = ({ uuid, setValues }: CustomFieldProps) => {
    const [type, setType] = useState('text');
    const uid = useRef<string>(uuid);

    const handleChange = ({target}: any) => {
        const id = uid.current;
        const {name, value} = target;

        if (name === 'type') setType(value);

        setValues((prevState: any) => {
            const field = prevState[id] || {};
            field['value'] = field['value'] || [];

            const isCollectionValue = field.type === 'collection' && name === 'value';

            return {
                ...prevState,
                [id]: {
                    ...field,
                    [name]: isCollectionValue ? [...field[name], value] : value,
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
                label="Value"
                sx={{flex: 1}}
            />
        </Stack>
    );
};

export {
    CustomField
};