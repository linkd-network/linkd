import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {FieldValues, useForm} from "react-hook-form";
import SubscribeModal from '../../components/SubscribeModal/SubscribeModal';
import {TextField, Button, Stack, FormControl, Select, MenuItem, InputLabel} from '@mui/material';
import {Add} from '@mui/icons-material';
import {CustomField} from "../../components/CustomField/CustomField";

enum FieldTypes {
    BOOLEAN,
    STRING,
    NUMBER,
    COLLECTION,
}

type FieldType = boolean | string | number | Array<string>;

interface _Field<T> {
    type: FieldTypes;
    key: string;
    value: T;
}

interface InputConfig {
    field: string;
    label: string
    type: string
}

interface Field {
    field: string;
    value: string;
}

interface ModalConfig {
    showModal: boolean;
    title: string;
}

interface CreateProps {
    // ...proptypes
}


const inputsList: InputConfig[] = [
    {field: 'name', label: 'Data Resource ID', type: 'text'}
]

const Create = ({}: CreateProps): JSX.Element => {
    const [customInputsList, setCustomInputsList] = useState<Field[]>([]);

    const [values, setValues] = useState({});

    const {entityType} = useParams();
    const {register, handleSubmit, reset} = useForm();

    const onSubmit = async (data: FieldValues) => {
        try {
            const validCustomUserField = customInputsList.filter(({field, value}) => field && value);

            data.customMetadata = {}

            validCustomUserField.forEach(({field, value}) => {
                data.customMetadata[field] = value
            })

            const res = await submitCreateDRTReq({userData: data});

            if (res?.success) // close modal

            setCustomInputsList([]);
            reset();
        } catch (err) {
            console.log('Error submitting form: ', err);
        }
    };

    const submitCreateDRTReq = async ({userData}: { userData: Record<string, any> }) => {

        const response = await fetch(`/mgmt/v1/drt/subscribe/${entityType}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        });

        return response.json();

    }

    const addCustomField = () => setCustomInputsList(prevState => [...prevState, {type: '', field: '', value: '' }]);


    return (
        <div className="flex items-center justify-center">

            <div className="flex-9/12">
                <div className="p-12 shadow-md rounded-md bg-black">
                    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {inputsList.map(({field, label, type}) => {
                            return <TextField
                                fullWidth
                                key={field}
                                label={label}
                                variant="outlined"
                                color="secondary"
                                {...register(field)}
                                type={type}
                            />
                        })}

                        {customInputsList.map((formItem, i) => {
                            return (
                                <CustomField
                                    setValues={setValues}
                                    key={`field-${i}`}
                                />
                            )
                        })}

                        <Stack sx={{mt: 4}} spacing={2} direction="row" justifyContent="space-between">
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={addCustomField}
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
