import React from 'react';
import {TextField} from "@mui/material";
import {BooleanField} from "./BooleanField";
import {CreatableField} from "./CreatableField";

const DynamicField = ({id, type, onChange, name, sx = {}}: any) => {
    if (type === 'boolean') return <BooleanField sx={{flex: 1}} id={id} name={name} onChange={onChange} />

    if (type === 'collection') return <CreatableField sx={{flex: 4}} />

    return (
        <TextField
            sx={{flex: 1}}
            id={id}
            label="Value"
            name={name}
            type={type}
            variant="outlined"
            color="secondary"
            fullWidth
            onChange={onChange}
        />
    );
};

export {
    DynamicField
};