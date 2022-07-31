import React from "react"
import {GetServerSideProps} from "next"
import ReactMarkdown from "react-markdown"
import prisma from '../../../lib/prisma';
import Layout from "../../components/Layout"
import {TaskProps} from "../../components/Task"

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const task = await prisma.task.findUnique({
        where: {
            id: String(params?.id),
        }
    });
    return {
        props: task,
    };
};

const Task: React.FC<TaskProps> = ({title, published, users, content}) => {
    return (
        <Layout>
            <div>
                <h2>{title}{!published && ` (Draft)`}</h2>
                <p>By {users[0]?.id || "Unknown author"}</p>
                <ReactMarkdown children={content}/>
            </div>
        </Layout>
    )
}

export default Task
