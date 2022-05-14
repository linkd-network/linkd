import React, { useState } from 'react';
import { routeItem } from '../../interfaces/app.interfaces';
import RouteItemComponent from '../ToolebarRouteItem/ToolbarRouteItem';

const Toolbar: React.FC = () => {
    const [routes, ] = useState<routeItem[]>(
        [
            {
                text: 'Create',
                path: '/create'
            },
            {
                text: 'Subscribe',
                path: '/subscribe'
            },
            {
                text: 'Monitor',
                path: '/monitor'
            }
        ]);

    return (
        <nav className="bg-black h-14 flex items-center">
            <div className="container w-full mx-auto px-6">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <span className="font-semibold text-xl text-4xl text-blue-500">Linkd</span>
                    </div>
                    <div className="flex">
                        {routes.map((route) => <RouteItemComponent key={route.text} {...route} />)}
                    </div>
                </div>
            </div>
        </nav>


    )
}

export default Toolbar;