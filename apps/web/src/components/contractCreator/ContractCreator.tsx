import React from 'react';
import { FieldValues, useForm } from "react-hook-form";
import { CreateAdPayload } from '../../interfaces/app.interfaces';
import Layout from "../Layout/Layout";

const ContractCreator: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data: FieldValues) => {
        const createAdPayload = data as CreateAdPayload;
        createAdPayload.totalBudget = Number(createAdPayload.totalBudget);
        createAdPayload.coinsPerEvent = Number(createAdPayload.coinsPerEvent);
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
                    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="mb-8">
                            <label className="block text-gray-200 text-sm font-bold mb-2" >
                                name
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline" {...register("name")} type="text" />
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-200 text-sm font-bold mb-2" >
                                coins Per Event
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline" {...register("coinsPerEvent")} type="number" />
                        </div>


                        <div className="mb-8">
                            <label className="block text-gray-200 text-sm font-bold mb-2" >
                                Total Budget
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline" {...register("totalBudget")} type="number" />
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-200 text-sm font-bold mb-2" >
                                Content
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline" {...register("content")} type="text" />
                        </div>

                        <div className="mb-8">
                            <label className="block text-gray-200 text-sm font-bold mb-2" >
                                Event Type
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline" {...register("eventType")} type="text" />
                        </div>



                        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" />
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default ContractCreator;