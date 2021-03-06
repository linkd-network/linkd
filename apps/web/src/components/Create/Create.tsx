import React from 'react';
import { FieldValues, useForm } from "react-hook-form";
import { CreateAdPayload } from '../../interfaces/app.interfaces';
import Layout from "../Layout/Layout";

const Create: React.FC = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data: FieldValues) => {
        reset();
        const createAdPayload = data as CreateAdPayload;
        createAdPayload.budget = Number(createAdPayload.budget);
        createAdPayload.resourceType = 'img';
        createAdPayload.costPerAction = Number(createAdPayload.costPerAction);
        postAd({ ad: createAdPayload });

    };

    const postAd = async ({ ad }: { ad: CreateAdPayload }) => {
        const response = await fetch('mgmt/v1/ads/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ad)
        });
        return response.json();
    }

    return (
        <Layout>
            <div className="flex items-center justify-center">
                <div className="flex-6/12">
                    <div className="p-12 shadow-md rounded-md bg-black">
                        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="mb-8">
                                <label className="block text-gray-400 text-lg font-light mb-2">
                                    Brand Name
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
                                    {...register("title")}
                                    type="text"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block text-gray-400 text-lg font-light mb-2">
                                    Campaign Budget
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
                                    text-gray-200 
                                    font-light
                                    text-gray-300 
                                    leading-tight 
                                    `
                                    }
                                    {...register("budget")}
                                    type="number"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block text-gray-400 text-lg font-light mb-2">
                                    Content URL
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
                                    text-gray-200 
                                    font-light
                                    text-gray-300 
                                    leading-tight 
                                    `
                                    }
                                    {...register("contentURL")}
                                    type="text"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block text-gray-400 text-lg font-light mb-2">
                                    Event Type
                                </label>
                                <select
                                    className={`
                                    appearance-none 
                                    focus:outline-none focus:shadow-outline focus:border-blue-600
                                    bg-gray-900
                                    shadow 
                                    border border-black rounded 
                                    w-full 
                                    py-2 px-3 
                                    text-gray-200 
                                    font-light
                                    text-gray-300 
                                    leading-tight 
                                    `
                                    }
                                    {...register("triggerType")}
                                    defaultValue="default"
                                >
                                    <option value="default"></option>
                                    <option value="click">Click</option>
                                    <option value="view">View</option>
                                    <option value="pageLoad">Page Load</option>
                                </select>
                            </div>

                            <div className="mb-8">
                                <label className="block text-gray-400 text-lg font-light mb-2">
                                    HBAR (???) Per Event
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
                                    text-gray-200 
                                    font-light
                                    text-gray-300 
                                    leading-tight 
                                    `
                                    }
                                    {...register("costPerAction")}
                                    type="number"
                                />
                            </div>

                            <div className="mb-8">
                                <label className="block text-gray-400 text-lg font-light mb-2">
                                    Destination URL
                                </label>

                                <input
                                    className={`
                                    appearance-none 
                                    focus:outline-none focus:shadow-outline focus:border-blue-600
                                    focus:bg-gray-900 active:bg-gray-900 valid:bg-gray-900
                                    bg-gray-900 
                                    shadow 
                                    border border-black rounded 
                                    w-full 
                                    py-2 px-3 
                                    text-gray-300 
                                    leading-tight 
                                    `
                                    }
                                    {...register("destinationURL")}
                                    type="text"
                                />
                            </div>


                            <input className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline focus:border-blue-600" type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Create;