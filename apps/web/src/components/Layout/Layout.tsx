import React, {ReactNode} from 'react';

interface LayoutProps {
    children: ReactNode | ReactNode[];
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <main className="py-12">
            <div className="container w-full mx-auto px-6">
                {children}
            </div>
        </main>
    );
};

export default Layout;