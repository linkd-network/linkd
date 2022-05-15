import React, { useEffect, useState } from 'react';
import { Ad, SubscribeResponse } from '../../interfaces/app.interfaces';
import AdItem from '../AdItem/AdItem';
import Layout from "../Layout/Layout";
import SubscribeModal from '../SubscribeModal/SubscribeModal';

const SubscribePage: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [modalConfig, setModalConfig] = useState<{ showModal: boolean, title: string }>({ showModal: false, title: 'Hola' });

    useEffect(() => {
        getAds();
    }, [])


    const getAds = async () => {
        const ads = await fetch('/mgmt/v1/ads')
            .then(res => res.json());
        setAds(ads);
    }

    const closeModal = () => {
        setModalConfig({ showModal: false, title: '' });

    }
    const subscribeToAd = async (ad: Ad) => {
        
        const response: SubscribeResponse = await fetch('mgmt/v1/ads/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: ad.id })
        }).then(res => res.json());
        
        setModalConfig({ showModal: true, title: ad.title });
        // console.log(response);
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
            <SubscribeModal closeCallBack={closeModal} title={modalConfig.title} showModal={modalConfig.showModal}></SubscribeModal>
        </Layout>
    );
}

export default SubscribePage;