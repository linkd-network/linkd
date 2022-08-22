import React from 'react';
import {TextField} from "@mui/material";
import {BooleanField} from "./BooleanField";
import {CreatableField} from "./CreatableField";

const DynamicField = ({id, type, onChange, name, label, sx = {}}: any) => {
    if (type === 'boolean') return (
        <BooleanField
            sx={{...sx, flex: 1}}
            id={id}
            name={name}
            onChange={onChange}
        />
    )

    if (type === 'collection') return (
        <CreatableField
            id={id}
            type={type}
            name={name}
            label={label}
            sx={{...sx, flex: 4}}
            onChange={onChange}
        />
    )

    return (
        <TextField
            sx={{...sx, flex: 1}}
            id={id}
            label={label}
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