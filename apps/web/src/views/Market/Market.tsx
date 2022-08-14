import React, { useEffect, useState, Fragment } from 'react';
import { Ad, SubscribeResponse } from '../../interfaces/app.interfaces';
import AdItem from '../../components/AdItem/AdItem';
import SubscribeModal from '../../components/SubscribeModal/SubscribeModal';

interface MarketProps {
    // ...proptypes
}

const Market = ({}: MarketProps): JSX.Element => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [modalConfig, setModalConfig] = useState<{ showModal: boolean, title: string }>({ showModal: false, title: '' });

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
    }

    return (
        <Fragment>
            <div className="flex flex-wrap -mx-8">
                {ads?.map((ad) => <AdItem
                        ad={ad}
                        handleSubscribe={subscribeToAd}
                        key={ad.id}
                    />
                )}
            </div>
            <SubscribeModal closeCallBack={closeModal} title={modalConfig.title} showModal={modalConfig.showModal}></SubscribeModal>
        </Fragment>
    );
}

export {
    Market
};