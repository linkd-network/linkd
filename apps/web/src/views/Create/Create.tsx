import React, {useState, Fragment} from 'react';
import {useParams} from 'react-router-dom';
import {FieldValues, useForm} from "react-hook-form";
import {TextField, Button, Stack, Typography, Divider} from '@mui/material';
import {Add} from '@mui/icons-material';
import {CustomField} from "../../components/CustomField/CustomField";
import {v4 as uuidv4} from 'uuid';
import {DetailsDialog} from "../../components/DetailsDialog/DetailsDialog";
import {CopyBlock, a11yDark} from "react-code-blocks";

interface FormField {
    type: string;
    name: string;
    label: string;
}

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

const formFields: FormField[] = [
    {
        name: 'id',
        label: 'Data Resource ID',
        type: 'text',
    }
];

const trackingScript = `<script src="https://www.cnss.net/track/js?id=1051s3934x"></script>
<script>
    window.CLayer = window.CLayer || []; 
    function cTag(){CLayer.push(args);} 
    cTag('js', new Date()); 
    cTag('conf', '1051s3934x');
</script>`;

const Create = ({}: CreateProps): JSX.Element => {
    const [customFields, setCustomFields] = useState<string[]>([]);
    const [values, setValues] = useState<object>({});
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const {entityType} = useParams();
    const {register, handleSubmit, reset} = useForm();

    const handleClose = () => setIsModalOpen(false);

    const onSubmit = async (data: FieldValues) => {
        try {
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

            setIsModalOpen(true);

            setCustomFields([]);
            reset();

        } catch (err) {
            console.log('Error submitting form: ', err);
        }
    };

    const createNewCustomField = () => {
        setCustomFields(prevState => [...prevState, uuidv4()]);
    };

    const handleRemove = (uid: string) => {
        // remove from values
        setValues((prevState: object) => {
            delete (prevState as any)[uid];
            return prevState;
        })

        // remove from ui
        setCustomFields(customFields.filter(function (item) {
            return item !== uid
        }));
    }

    return (
        <Fragment>
            <div className="flex items-center justify-center">
                <div className="flex-8/12">
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
                                        handleRemove={handleRemove}
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
                                    startIcon={<Add/>}
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
            <DetailsDialog
                title="Tracking Script Implementation Instructions"
                open={isModalOpen}
                handleClose={handleClose}
            >
                <Typography fontSize={20} gutterBottom>
                    Copy and paste this code as the first item into the head of every webpage you want to measure
                </Typography>

                <Divider sx={{my: 2}} />

                <CopyBlock
                    text={trackingScript}
                    language="javascript"
                    showLineNumbers={false}
                    theme={a11yDark}
                    wrapLines
                />

            </DetailsDialog>
        </Fragment>
    );
}

export {
    Create
};
