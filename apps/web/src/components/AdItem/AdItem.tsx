import React, {Fragment, useState} from 'react';
import {Ad} from '../../interfaces/app.interfaces';

interface AdProp {
    ad: Ad
    handleSubscribe: (ad: Ad) => void;
}

const AdItem: React.FC<AdProp> = ({ad, handleSubscribe}: AdProp) => {

    const {contentURL, title, budget, costPerAction, triggerType} = ad;

    return (
        <Fragment>
            <div className="px-4 flex-3/12 max-w-3/12 mb-8">
                <div className="rounded overflow-hidden shadow-lg p-8 text-white rounded-md bg-black">
                    <img className="w-full" src={contentURL} alt="Sunset in the mountains"/>
                    <div className="mt-8 flex justify-between items-center">
                        <div className="font-extrabold text-2xl">{title}</div>
                        <div>
                            <span
                                className="inline-block border border-gray-500 rounded-full px-3 py-1 text-xs font-normal text-gray-500 mr-2">NFTs</span>
                            <span
                                className="inline-block border border-gray-500 rounded-full px-3 py-1 text-xs font-normal text-gray-500">Hedera</span>
                        </div>
                    </div>

                    <ul className="mt-4">
                        <li className="flex items-center justify-between">
                            <strong className="underline font-normal">Budget:</strong>
                            <span className="font-light">{budget}ℏ</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <strong className="underline font-normal">Cost Per Action:</strong>
                            <span className="font-light">{costPerAction}ℏ</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <strong className="underline font-normal">Trigger Type:</strong>
                            <span className="font-light">{triggerType}</span>
                        </li>
                    </ul>

                    <div className="mt-6 pb-2">
                        <button
                            onClick={() => handleSubscribe(ad)}
                            className="bg-blue-500 ml-auto hover:bg-blue-700 text-white leading-tight text-sm py-2 px-6 rounded">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}


export default AdItem;
