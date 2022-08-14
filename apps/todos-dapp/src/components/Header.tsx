import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
	return (
		<header className={`
        py-2
        bg-white
        shadow-md
    `}>
			<div className="container">
				<div className={`
                flex
                items-center
            `}>
					<Link href={'/'}>
						<h1 className={`
						text-4xl 
						font-bold
						cursor-pointer
					`}>
							<span className={'text-blue-600'}>DE</span>DOS
						</h1>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
