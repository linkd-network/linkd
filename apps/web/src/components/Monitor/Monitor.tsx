import React, { useEffect, useState } from 'react';
import { MonitorPayload } from '../../interfaces/app.interfaces';


const Monitor: React.FC = () => {
    const [monitorPayload, setMonitorPayload] = useState<MonitorPayload>();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const payload: MonitorPayload = await fetch('/mgmt/v1/ads/accountView')
            .then(res => res.json());
        setMonitorPayload(payload)
    }




    return (
        <div>
            <div>
                Event on contract: {monitorPayload?.events.map((e) => <span >{e}</span >)}
            </div>


            <table className="table-auto">
                <thead>
                    <tr>
                        <th>Account</th>
                        <th>Hbar's</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Contract</td>
                        <td>{monitorPayload?.contractBalnce}</td>
                    </tr>

                    <tr>
                        <td>{monitorPayload?.accounts[monitorPayload?.accounts.length - 1].name} Subscriber</td>
                        <td>{monitorPayload?.accounts[monitorPayload?.accounts.length - 1].amount}</td>
                    </tr>
                </tbody>
            </table>


        </div >
    );
}

export default Monitor;