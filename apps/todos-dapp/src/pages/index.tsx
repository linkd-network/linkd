import React, {useState} from 'react';
import {GetServerSideProps} from 'next';
import prisma from '../../lib/prisma';
import Layout from '../components/Layout';
import Task, {Status, TaskProps} from '../components/Task';
import User, {UserProps} from '../components/User';
import Select, {SelectOption} from '../components/Select';

export const getServerSideProps: GetServerSideProps = async () => {
	const tasks = await prisma.task.findMany({
		where: {published: true},
		include: {users: {include: {user: true}}},
	});

	const users = await prisma.user.findMany({
		include: {tasks: {include: {task: true}}}
	});

	return {
		props: {
			tasks: JSON.parse(JSON.stringify(tasks)),
			users: JSON.parse(JSON.stringify(users)),
		}
	};
};

type Props = {
    tasks: TaskProps[],
    users: UserProps[],
}

const options: SelectOption[] = [
	{label: 'ALL', value: null, disabled: false},
	{label: 'OPEN', value: Status.OPEN, disabled: false},
	{label: 'IN PROGRESS', value: Status.IN_PROGRESS, disabled: false},
];

const Index: React.FC<Props> = ({tasks, users}) => {
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
						<h2 className={`
                            text-3xl
                            mb-6
                        `}>Contributors ({users.length})</h2>
						{users.map((user) => (
							<User key={user.id} user={user}/>
						))}
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
							{tasks.map((task) => {
								if (!selectedOption.value && task.status !== Status.DONE) return <Task key={task.id} {...task} />;
								return task.status === selectedOption.value && <Task key={task.id} {...task}/>;
							})}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Index;
