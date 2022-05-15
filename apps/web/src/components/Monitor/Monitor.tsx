import React, { useEffect, useState } from 'react';
import { MonitorPayload } from '../../interfaces/app.interfaces';
import Layout from "../Layout/Layout";


interface MonitorData extends MonitorPayload {
    sum: {
        click: number;
        view: number;
        pageLoad: number;
    }
}
const Monitor: React.FC = () => {
    const [monitorPayload, setMonitorPayload] = useState<MonitorData>();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const payload: MonitorPayload = await fetch('/mgmt/v1/ads/accountView')
            .then(res => res.json());
        let eventSum: any = {
            click: 0,
            view: 0,
            pageLoad: 0
        }
        for (const event of payload.events) {
            eventSum[event]++
        }
        let data: MonitorData = { ...payload, sum: eventSum }
        setMonitorPayload(data)
    }

    return (
        <Layout>
            <button onClick={getData} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline focus:border-blue-600"> Reload</button>

            {monitorPayload &&< div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-black">
                                    <tr>
                                        <th scope="col" className="text-md font-medium text-white px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" className="text-md font-medium text-white px-6 py-4 text-left">
                                            Account
                                        </th>
                                        <th scope="col" className="text-md font-medium text-white px-6 py-4 text-left">
                                            HBAR (ℏ)
                                        </th>
                                        <th scope="col" className="text-md font-medium text-white px-6 py-4 text-left">
                                            Events
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="bg-gray-900 border-b border-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-white">1</td>
                                        <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{monitorPayload?.accounts[monitorPayload?.accounts.length - 1].name}</td>
                                        <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{monitorPayload?.contractBalnce}</td>
                                        <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">
                                            <div>{monitorPayload?.sum.click ?? 0} Clicks</div>
                                            <div>{monitorPayload?.sum.view ?? 0} Views</div>
                                        </td>
                                    </tr>

                                    <tr className="bg-gray-900 border-b border-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-white">2</td>
                                        <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{monitorPayload?.accounts[monitorPayload?.accounts.length - 1].name} Subscriber</td>
                                        <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{monitorPayload?.accounts[monitorPayload?.accounts.length - 1].amount}</td>
                                        <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}


        </Layout>
    );
}

export default Monitor;