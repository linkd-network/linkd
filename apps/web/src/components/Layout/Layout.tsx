import React, {Fragment, ReactNode} from 'react';
import {Header} from "./Header";

interface LayoutProps {
    children: ReactNode | ReactNode[];
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <Fragment>
            <Header />
            <main className="h-100vh p-14 bg-gray-900">
                <div className="container w-full mx-auto px-6">
                    {children}
                </div>
            </main>
        </Fragment>
    );
};

export {
    Layout
};