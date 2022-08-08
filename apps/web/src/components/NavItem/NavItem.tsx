import React, {ForwardedRef, forwardRef} from "react";
import { NavLink } from 'react-router-dom';

interface NavLinkProps {
    to: string;
    [key: string]: any;
}

const NavItem = forwardRef(({to, ...rest}: NavLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => (
    <NavLink
        to={to}
        ref={ref}
        {...rest}
    />
));

export {
    NavItem
}