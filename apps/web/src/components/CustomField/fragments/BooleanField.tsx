import React, {MouseEvent} from 'react';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

const BooleanField = ({id, onChange, name, sx}: any) => {
    const [value, setToggleValue] = React.useState<boolean>(false);

    const handleChange = (
        event: MouseEvent<HTMLElement>,
        value: boolean,
    ) => {
        setToggleValue(value);
        onChange({target: {name, value}});
    };

    return (
        <ToggleButtonGroup
            id={id}
            value={value}
            exclusive
            onChange={handleChange}
            aria-label="true/false"
            sx={sx}
        >
            <ToggleButton name={name} value={true} aria-label="true">
                True
            </ToggleButton>
            <ToggleButton name={name}  value={false} aria-label="false">
                False
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export {
    BooleanField
};