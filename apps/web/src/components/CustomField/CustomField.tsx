import React, {SetStateAction, useRef, useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, Stack, TextField, IconButton} from "@mui/material";
import {DynamicField} from "./fragments/DynamicField";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface CustomFieldProps {
    setValues: SetStateAction<any>;
    uuid: string;
    handleRemove: (uuid: string) => void;
}

const CustomField = ({ uuid, setValues, handleRemove }: CustomFieldProps) => {
    const [type, setType] = useState('text');

    const handleChange = ({target}: any) => {
        const {name, value} = target;

        if (name === 'type') setType(value);

        setValues((prevState: any) => {
            const field = prevState[uuid] || {};
            field['value'] = field['value'] || [];

            const isCollectionValue = field.type === 'collection' && name === 'value';

            return {
                ...prevState,
                [uuid]: {
                    ...field,
                    [name]: isCollectionValue ? [...field[name], value] : value,
                }
            }
        });
    }

    return (
        <Stack sx={{mt: 2}} spacing={2} direction="row">
            <IconButton edge="start" data-uid={uuid} onClick={() => handleRemove(uuid)} color="info" aria-label="delete">
                <RemoveCircleOutlineIcon />
            </IconButton>

            <FormControl sx={{width: 125}}>
                <InputLabel color="secondary" id={`type-${uuid}`}>Type</InputLabel>
                <Select
                    labelId={`type-${uuid}`}
                    id={`type-${uuid}`}
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
                id={`key-${uuid}`}
                label="Key"
                name="key"
                variant="outlined"
                color="secondary"
                onChange={handleChange}
                sx={{width: 200}}
            />
            <DynamicField
                id={`value-${uuid}`}
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