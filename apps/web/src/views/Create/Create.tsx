import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {FieldValues, useForm} from "react-hook-form";
import {TextField, Button, Stack} from '@mui/material';
import {Add} from '@mui/icons-material';
import {CustomField} from "../../components/CustomField/CustomField";
import {v4 as uuidv4} from 'uuid';

interface FormField {
    type: string;
    name: string;
    label: string;
}

const formFields: FormField[] = [
    {
        name: 'id',
        label: 'Data Resource ID',
        type: 'text',
    }
];

interface CustomField {
    [key: string]: {
        type: string
        key: string;
        value: any;
    };
}

interface CreateProps {
    // ...proptypes
}

const Create = ({}: CreateProps): JSX.Element => {
    const [customFields, setCustomFields] = useState<string[]>([]);
    const [values, setValues] = useState<object>({});

    const {entityType} = useParams();
    const {register, handleSubmit, reset} = useForm();

    useEffect(() => {
        console.log(values)
    }, [values])

    const onSubmit = async (data: FieldValues) => {
        try {
            console.log(values);
            const validCustomUserField = Object.values(values).filter(({field}) => field.key && field.value);

            data.customMetadata = {}

            validCustomUserField.forEach(({field}) => {
                data.customMetadata[field.key] = field.value
            })

            const res = await fetch(`/mgmt/v1/drt/subscribe/${entityType}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            console.log(res.json())

            setCustomFields([]);
            reset();
        } catch (err) {
            console.log('Error submitting form: ', err);
        }
    };

    const createNewCustomField = () => {
        setCustomFields(prevState => [...prevState, uuidv4()])
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex-9/12">
                <div className="p-12 shadow-md rounded-md bg-black">
                    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formFields.map(({name, label, type}) => {
                            return <TextField
                                fullWidth
                                key={name}
                                label={label}
                                variant="outlined"
                                color="secondary"
                                type={type}
                                {...register(name)}
                            />
                        })}

                        {customFields.map((uuid, i) => {
                            return (
                                <CustomField
                                    uuid={uuid}
                                    setValues={setValues}
                                    key={`field-${i}`}
                                />
                            )
                        })}

                        <Stack sx={{mt: 4}} spacing={2} direction="row" justifyContent="space-between">
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={createNewCustomField}
                                startIcon={<Add />}
                            >
                                META DATA
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                SUBMIT
                            </Button>
                        </Stack>
                    </form>
                </div>
            </div>
        </div>
    );
}

export {
    Create
};
