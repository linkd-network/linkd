import React, {Fragment, useState} from 'react';
import {useParams} from 'react-router-dom';
import {FieldValues, useForm} from "react-hook-form";
import SubscribeModal from '../../components/SubscribeModal/SubscribeModal';
import {TextField, Button, Stack, Box, FormControl, Select, MenuItem, InputLabel} from '@mui/material';
import {Add} from '@mui/icons-material';

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

const Create = ({}: CreateProps): JSX.Element => {
    const [customInputsList, setCustomInputsList] = useState<Field[]>([]);
    const [modalConfig, setModalConfig] = useState<ModalConfig>({
        showModal: false,
        title: ''
    });

    const {entityType} = useParams();
    const {register, handleSubmit, reset} = useForm();

    const inputsList: InputConfig[] = [
        {field: 'name', label: 'Data Resource ID', type: 'text'}
    ]

    const onSubmit = async (data: FieldValues) => {
        try {
            const validCustomUserField = customInputsList.filter(({field, value}) => field && value);

            data.customMetadata = {}

            validCustomUserField.forEach(({field, value}) => {
                data.customMetadata[field] = value
            })

            const res = await submitCreateDRTReq({userData: data});

            if (res?.success) setModalConfig({showModal: true, title: 'Instructions Popup'});

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

    const addCustomField = () => setCustomInputsList([...customInputsList, {field: '', value: ''}]);

    const customFieldChange = ({
                                   field,
                                   key,
                                   value
                               }: { value: string, key: "field" | "value", field: { field: string, value: string } }) => {
        field[key] = value;
    }

    const closeModal = () => setModalConfig({showModal: false, title: ''});

    return (
        <div className="flex items-center justify-center">
            <SubscribeModal closeCallBack={closeModal} title={modalConfig.title} showModal={modalConfig.showModal}/>

            <div className="flex-6/12">
                <div className="p-12 shadow-md rounded-md bg-black">
                    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {inputsList.map((formItem) => {
                            return <TextField
                                fullWidth
                                key={formItem.field}
                                label={formItem.label}
                                variant="outlined"
                                color="secondary"
                                {...register(formItem.field)}
                                type={formItem.type}
                            />
                        })}

                        {customInputsList.map((formItem, i) => {
                            return (
                                <Stack sx={{mt: 2}} key={i} spacing={2} direction="row">
                                    <FormControl fullWidth>
                                        <InputLabel color="secondary" id={`type-${i}`}>Type</InputLabel>
                                        <Select
                                            labelId={`type-${i}`}
                                            id={`type-${i}`}
                                            label="Type"
                                        >
                                            <MenuItem value={10}>Collection</MenuItem>
                                            <MenuItem value={20}>String</MenuItem>
                                            <MenuItem value={20}>Number</MenuItem>
                                            <MenuItem value={30}>Boolean</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        id={`field-${i}`}
                                        label="Key"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        onChange={({target}: any) => customFieldChange({
                                            field: formItem,
                                            key: 'field',
                                            value: target.value
                                        })}
                                    />
                                    <TextField
                                        id={`value-${i}`}
                                        label="Value"
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        onChange={({target}: any) => customFieldChange({
                                            field: formItem,
                                            key: 'value',
                                            value: target.value
                                        })}
                                    />
                                </Stack>
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
