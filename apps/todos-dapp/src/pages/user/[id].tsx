import React, {useState} from 'react';
import {GetServerSideProps} from 'next';
import prisma from '../../../lib/prisma';
import Layout from '../../components/Layout';
import Task, {Status} from '../../components/Task';
import {UserProps} from '../../components/User';
import Select, {SelectOption} from '../../components/Select';

type UserPageProps = {
    user: UserProps;
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
	const user = await prisma.user.findUnique({
		where: {id: String(params?.id),},
		include: {tasks: {include: {task: true}}}
	});

	return {
		props: {user: JSON.parse(JSON.stringify(user))},
	};
};

const options: SelectOption[] = [
	{label: 'ALL', value: null, disabled: false},
	{label: 'DONE', value: Status.DONE, disabled: false},
	{label: 'IN PROGRESS', value: Status.IN_PROGRESS, disabled: false},
];

const User: React.FC<UserPageProps> = ({user}) => {
	const {userName, lastName, firstName, tasks} = user;
	const [selectedOption, setSelectedOption] = useState(options[0]);

	return (
		<Layout>
			<div className="container">
				<div className={`
                    grid 
                    grid-flow-row 
                    grid-cols-4 
                    gap-4
                    py-8
                `}>
					<div className={`
                        col-span-1
                        border-gray-200
                        border-r
                        py-4
                        bg-gray-50
                    `}>
						<div className={`
							px-4 
							flex flex-col
						`}>
							<div className={`
								self-center
                                w-60 h-60
                                flex items-center justify-center
                                font-bold text-blue-600 text-7xl bg-blue-200
                                rounded-full
                                mb-6
                            `}>
								{firstName.charAt(0)}{lastName.charAt(0)}
							</div>
							<h2 className={`
								text-3xl
								mb-1
							`}>{firstName} {lastName}</h2>
							<h3 className={`
								text-gray-600
								text-2xl
								mb-6
							`}>@{userName}</h3>
						</div>
						<div
							className={`
                                flex 
                                justify-between
                                items-center
                                py-6
                                px-4
                                w-full  
                                border-t 
                                transition-all duration-100
                            `}>
							<div className={`
                                    flex items-center
                                `}>
								<h3 className={'text-2xl'}>Tokens</h3>
							</div>
							<p className={'text-2xl'}>{tasks.reduce((total, relatedTask) => {
								if (relatedTask.task.status === Status.DONE) return total + relatedTask.task.tokens;
								return total;
							}, 0).toLocaleString()}</p>
						</div>

					</div>
					<div className={`
                        col-span-3
                        border-gray-200
                        p-4
                    `}>
						<div className={'flex items-center justify-end mb-6'}>
							<Select
								options={options}
								selectedOption={selectedOption}
								setSelectedOption={setSelectedOption}
							/>
						</div>
						<div className={`
                            grid 
                            grid-flow-row 
                            grid-cols-2 
                            gap-4
                        `}>
							{tasks.map((relatedTask) => {
								if (!selectedOption.value) return <Task
									key={relatedTask.task.id} {...relatedTask.task} />;
								return relatedTask.task.status === selectedOption.value &&
                                    <Task key={relatedTask.task.id} {...relatedTask.task}/>;
							})}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default User;
