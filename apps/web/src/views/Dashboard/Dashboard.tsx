import React, {Fragment, useEffect, useState} from 'react';
import { AnalyticsPayload } from '../../interfaces/app.interfaces';
import { Layout } from "../../components/Layout";

interface AnalyticsData extends AnalyticsPayload {
    sum: {
        click: number;
        view: number;
        pageLoad: number;
    }
}

interface DashboardProps {
    // ...proptypes
}

const Dashboard = ({}: DashboardProps): JSX.Element => {
    const [analyticsPayload, setAnalyticsPayload] = useState<AnalyticsData>();

    useEffect(() => {
        fetch('/mgmt/v1/ads/accountView')
            .then(res => res.json())
            .then(data => {
                const sum: any = {
                    click: 0,
                    view: 0,
                    pageLoad: 0
                }

                for (const event of data.events) {
                    sum[event]++
                }

                return { ...data, sum }
            })
            .then(setAnalyticsPayload)
            .catch(console.log);
    }, [setAnalyticsPayload]);

    const handleReloadButtonClick = () => {
        // get more data
    }

    return (
        <Layout>
            {analyticsPayload &&
                <Fragment>
                    <div className="flex flex-col">
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
                                                Campaign
                                            </th>
                                            <th scope="col" className="text-md font-medium text-white px-6 py-4 text-left">
                                                Subscribers
                                            </th>
                                            <th scope="col" className="text-md font-medium text-white px-6 py-4 text-left">
                                                HBAR (ℏ)
                                            </th>
                                            <th scope="col" className="text-md font-medium text-white px-6 py-4 text-left">
                                                Views
                                            </th>
                                            <th scope="col" className="text-md font-medium text-white px-6 py-4 text-left">
                                                Clicks
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="bg-gray-900 border-b border-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-white">1</td>
                                            <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{analyticsPayload?.accounts[analyticsPayload?.accounts.length - 1].name}</td>
                                            <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap"></td>
                                            <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{analyticsPayload?.contractBalance}</td>
                                            <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{analyticsPayload?.sum.view ?? 0}</td>
                                            <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{analyticsPayload?.sum.click ?? 0}</td>
                                        </tr>
                                        <tr className="bg-gray-900 border-b border-gray-800">
                                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-white"></td>
                                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-white">1.1</td>
                                            <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{analyticsPayload?.accounts[analyticsPayload?.accounts.length - 1].userId}</td>
                                            <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{analyticsPayload?.accounts[analyticsPayload?.accounts.length - 1].amount}</td>
                                            <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{analyticsPayload?.sum.view ?? 0}</td>
                                            <td className="text-md text-white font-light px-6 py-4 whitespace-nowrap">{analyticsPayload?.sum.click ?? 0}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-8">
                        <button
                            onClick={handleReloadButtonClick}
                            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline focus:border-blue-600">
                            Reload
                        </button>
                    </div>
            </Fragment>}
        </Layout>
    );
}

export {
    Dashboard
};