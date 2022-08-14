import React from 'react';
import {Status, TaskProps} from './Task';
import Link from 'next/link';

export type RelatedTask = {
    userId: string;
    taskId: string;
    task: TaskProps;
}

export type UserProps = {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    description: string;
    tokens: number;
    tasks: RelatedTask[];
};

const User: React.FC<{ user: UserProps }> = ({user}) => {
	const {firstName, lastName, userName, id, tasks} = user;
	return (
		<Link href={`/user/${id}`}>
			<button
				className={`
                    flex 
                    justify-between
                    items-center
                    p-4
                    w-full  
                    border-t 
                    hover:bg-blue-50
                    transition-all duration-100
                `}>
				<div className={`
                    flex items-center
                `}>
					<span className={`
                        bg-blue-200
                        w-8 h-8
                        flex items-center justify-center
                        text-blue-600 text-sm font-medium
                        rounded-2xl
                        mr-4
                    `}>{firstName.charAt(0)}{lastName.charAt(0)}</span>
					<h3>{firstName} {lastName}</h3>
				</div>
				<span>{tasks.reduce((total, relatedTask) => {
					if (relatedTask.task.status === Status.DONE) return total + relatedTask.task.tokens;
					return total;
				}, 0).toLocaleString()}</span>
			</button>
		</Link>
	);
};

export default User;
