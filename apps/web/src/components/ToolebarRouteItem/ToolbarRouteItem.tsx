import React from 'react';
import {routeItem} from '../../interfaces/app.interfaces';
import {NavLink} from "react-router-dom";

const RouteItemComponent: React.FC<routeItem> = ({path, text}: routeItem) => {
    return (
        <NavLink to={path}
        className={({isActive}) => (
            isActive ?
                `
                    text-md 
                    px-4 ml-4 py-2 
                    text-blue-500
                    hover:text-blue-white 
                    transition-all 
                    duration-100 
                    hover:border-blue-500
                ` :
                `
                    text-md 
                    px-4 ml-4 py-2 
                    text-white
                    hover:text-blue-500 
                    transition-all 
                    duration-100 
                    hover:border-blue-500
                `
            )
        }>
            {text}
        </NavLink>
    );
}


export default RouteItemComponent;
