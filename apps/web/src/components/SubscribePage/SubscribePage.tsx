import React, { useEffect, useState } from 'react';
import { Ad } from '../../interfaces/app.interfaces';
import AdItem from '../AdItem/AdItem';



const SubscribePage: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>();

    useEffect(() => {
        getAds();
    }, [])


    const getAds = () => {
        fetch('/mgmt/v1/ads')
            .then(res => res.json())
            .then((res) => {
                console.log(res);

                setAds(res);
            });
    }



    return (
        <div className='p-5'>
            <div className="card-container flex flex-wrap gap-4	">
                {ads?.map((ad) => <AdItem
                    ad={ad}
                    key={ad.id}
                />
                )}

            </div>
        </div>
    );
}

export default SubscribePage;