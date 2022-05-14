import React, {useEffect, useState} from 'react';
import {routeItem} from '../../interfaces/app.interfaces';
import {NavLink} from "react-router-dom";

const RouteItemComponent: React.FC<routeItem> = ({path, text}: routeItem) => {
    return (
        <NavLink to={path}
        className="text-sm px-4 ml-2 py-2 border rounded text-white border-white hover:text-blue-500 transition-all duration-100 hover:border-blue-500">
            {text}
        </NavLink>
    );
}


export default RouteItemComponent;
