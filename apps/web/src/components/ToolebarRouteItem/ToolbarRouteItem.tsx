import React, { useEffect, useState } from 'react';
import { routeItem } from '../../interfaces/app.interfaces';

const RouteItemComponent: React.FC<routeItem> = (props: routeItem) => {
    return <a href={props.path} className="inline-block text-sm px-4 mr-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0">{props.text}</a>;
}


export default RouteItemComponent;
