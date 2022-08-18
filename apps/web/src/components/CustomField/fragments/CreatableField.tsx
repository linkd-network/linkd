import React from "react";
import {Autocomplete, Chip, TextField} from "@mui/material";

const CreatableField = ({sx}: any) => {

    const handleChange = (x: any, emails: any) => console.log(x, emails);

    return (
        <Autocomplete
            multiple
            id="tags-filled"
            onChange={handleChange}
            options={[]}
            defaultValue={[]}
            freeSolo
            fullWidth
            sx={sx}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Value"
                    name="value"
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