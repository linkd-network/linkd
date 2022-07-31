import React from "react";
import classNames from "classnames";

export type User = {
    id: string;
    name: string;
    email: string;
}

export enum Status {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export enum Category {
    DEVELOPMENT = 'DEVELOPMENT',
    BUSINESS = 'BUSINESS',
    MARKETING = 'MARKETING',
    DESIGN = 'DESIGN',
}

export type TaskProps = {
    id: string;
    title: string;
    category: Category;
    users: User[] | null;
    content: string;
    published: boolean;
    tokens: number;
    status: Status;
};

const Task: React.FC<TaskProps> = ({
    title,
    category,
    tokens,
    users,
    status,
}) => {

    const categoryColorClass = classNames({
        'bg-red-100 text-red-600': category === Category.DEVELOPMENT,
        'bg-yellow-100 text-yellow-600': category === Category.MARKETING,
        'bg-green-100 text-green-600': category === Category.BUSINESS,
        'bg-indigo-100 text-indigo-600': category === Category.DESIGN,
    });

    return (
        <div className={`
            p-4
            shadow-md
            flex
            justify-between
            rounded-md
            border
            border-gray-100
            bg-white
            col-span-1
        `}>
            <div>
                <span
                    className={`
                        ${categoryColorClass}
                        py-1 px-2
                        rounded-md
                        text-xs
                        mr-2
                    `}>
                    {category.charAt(0) + category.slice(1).toLowerCase()}
                </span>
                <span
                    className={`
                        bg-gray-100 text-gray-600
                        py-1 px-2
                        rounded-md
                        text-xs
                    `}>
                    {status.split('_').join(' ')}
                </span>
                <h2 className={`
                    mt-2
                    text-lg
                `}>
                    {title}
                </h2>
            </div>
            <div className={`
                    flex 
                    flex-col
                    items-end
                    justify-between
                `}>
                <span>{tokens.toLocaleString()}</span>
                <div className={"flex items-end"}>
                    {status === Status.IN_PROGRESS && users && users.map(({user, userId}: any) => (
                        <span key={userId} className={`
                            bg-blue-200
                            w-6 h-6
                            flex items-center justify-center
                            text-blue-600 text-xs font-medium
                            rounded-2xl
                            ml-1
                        `}>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Task;
