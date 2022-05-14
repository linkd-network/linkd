import React, { useEffect, useState } from 'react';
import { Ad, SubscribeResponse } from '../../interfaces/app.interfaces';
import AdItem from '../AdItem/AdItem';
import Layout from "../Layout/Layout";

const SubscribePage: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);

    useEffect(() => {
        getAds();
    }, [])


    const getAds = async () => {
        const ads = await fetch('/mgmt/v1/ads')
            .then(res => res.json());
        setAds(ads);
    }
    const subscribeToAd = async (ad: Ad) => {

        const response: SubscribeResponse = await fetch('mgmt/v1/ads/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: ad.id })
        }).then(res => res.json());

        console.log(response);
    }

    return (
        <Layout>
            <div className="flex flex-wrap -mx-8">
                {ads?.map((ad) => <AdItem
                        ad={ad}
                        handleSubscribe={subscribeToAd}
                        key={ad.id}
                    />
                )}
            </div>
        </Layout>
    );
}

export default SubscribePage;