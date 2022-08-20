import React from "react";
import {Autocomplete, Chip, TextField} from "@mui/material";

const CreatableField =
    ({
         onChange,
         id = null,
         sx = {},
         defaultValue = [],
         options = [],
         name,
         label,
     }: any) => {

        return (
            <Autocomplete
                multiple
                id={id}
                onChange={onChange}
                options={options}
                defaultValue={defaultValue}
                freeSolo
                fullWidth
                limitTags={5}
                sx={sx}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip label={option} {...getTagProps({index})} />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        name={name}
                        label={label}
                        variant="outlined"
                        color="secondary"
                        fullWidth
                    />
                )}
            />
        );
    };

export {
    CreatableField
};