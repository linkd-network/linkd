import React, {Fragment, useState} from 'react';
import { useParams } from 'react-router-dom';
import { FieldValues, useForm } from "react-hook-form";
import SubscribeModal from '../../components/SubscribeModal/SubscribeModal';

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

    const { entityType } = useParams();
    const { register, handleSubmit, reset } = useForm();

    const inputsList: InputConfig[] = [
        { field: 'name', label: 'Key Name', type: 'text' }
    ]

    const onSubmit = async (data: FieldValues) => {
        try {
            const validCustomUserField = customInputsList.filter(({field, value}) => field && value);

            data.customMetadata = {}

            validCustomUserField.forEach(({field, value}) => {
                data.customMetadata[field] = value
            })

            const res = await submitCreateDRTReq({ userData: data });

            if (res?.success) setModalConfig({ showModal: true, title: 'Instructions Popup' });

            setCustomInputsList([]);
            reset();
        } catch (err) {
            console.log('Error submitting form: ', err);
        }
    };

    const submitCreateDRTReq = async ({ userData }: { userData: Record<string, any> }) => {

        const response = await fetch(`/mgmt/v1/drt/subscribe/${entityType}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        return response.json();

    }

    const addCustomField = () => {
        setCustomInputsList([...customInputsList, { field: '', value: '' }])
    }

    const customFieldChange = ({ field, key, value }: { value: string, key: "field" | "value", field: { field: string, value: string } }) => {
        field[key] = value;
    }

    const closeModal = () => {
        setModalConfig({ showModal: false, title: '' });
    }

    return (
        <Fragment>
            <div className="flex items-center justify-center">
                <SubscribeModal closeCallBack={closeModal} title={modalConfig.title} showModal={modalConfig.showModal} />

                <div className="flex-6/12">
                    <div className="p-12 shadow-md rounded-md bg-black">
                        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {inputsList.map((formItem) => {
                                return (<div key={formItem.field} className="mb-8">
                                    <label className="block text-gray-400 text-lg font-light mb-2">
                                        {formItem.label}
                                    </label>

                                    <input
                                        className={`
                                    appearance-none 
                                    focus:outline-none focus:shadow-outline focus:border-blue-600
                                    bg-gray-900 
                                    shadow 
                                    border border-black rounded 
                                    w-full 
                                    py-2 px-3 
                                    font-light
                                    text-gray-300 
                                    leading-tight 
                                    `
                                        }
                                        {...register(formItem.field)}
                                        type={formItem.type}
                                    />
                                </div>)
                            })
                            }

                            <div className="mb-8 ">
                                <div className='flex'>

                                    <label className="block  grow text-gray-400 text-lg font-light mb-2">
                                        Custom metadata
                                    </label>
                                    <div className='flex-none w-14 h-14'>
                                        <span
                                            onClick={addCustomField}
                                            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline focus:border-blue-600">
                                            +
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {customInputsList.map((formItem, i) => {
                                    return (
                                        <div key={i} className="flex ">
                                            {/*<InputCM label="Field"*/}
                                            {/*    onChangeFn={({ target }: any) => customFieldChange({*/}
                                            {/*        field: formItem,*/}
                                            {/*        key: 'field',*/}
                                            {/*        value: target.value*/}
                                            {/*    })} />*/}

                                            {/*<InputCM label="Value"*/}
                                            {/*    onChangeFn={({ target }: any) => customFieldChange({*/}
                                            {/*        field: formItem,*/}
                                            {/*        key: 'value',*/}
                                            {/*        value: target.value*/}
                                            {/*    })} />*/}
                                        </div>
                                    )
                                })
                                }
                            </div>

                            <input value="Subscribe" className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline focus:border-blue-600" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export {
    Create
};
