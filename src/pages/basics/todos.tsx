import Header from "@/components/header";
import { dataFetcher } from "@/lib/data-fetcher";
import { NextPageWithLayout } from "@/lib/types";
import clsx from "clsx";
import Head from "next/head";
import { useEffect, useState } from "react";

const Todos: NextPageWithLayout = () => {
    const [todos, setTodos] = useState(Array<any>);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getTodos() {
            const response = await dataFetcher<Array<any>>('/api/todos', { test: 123 });
            console.log(response.data);
            setTodos(response.data);
            setLoading(false);
        }
        setLoading(true);
        getTodos();
    }, []);
    return (
        <>
            <Head><title>Todos</title></Head>
            {loading && <span>Loading todos...</span>}
            {!loading && todos && <div className="grid grid-cols-3 gap-6">
                {todos.map((todo: any) => (
                    <span className={clsx(todo.completed ? 'text-green-500' : 'text-red-800')}>{todo.title}</span>
                ))}
            </div>}
        </>
    );
};

Todos.pageHeadingText = "TODOs";

export default Todos;
