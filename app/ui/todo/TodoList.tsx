"use client";

import { Todo } from "@prisma/client";
import TodoItem from "./TodoItem";
import { useCallback, useRef, useState } from "react";
import { useInfiniteScroll } from "../../lib/hooks/useInfiniteScroll";
import CreateTodoButton from "./CreateTodoButton";
import DeleteTodoForm from "./DeleteTodoForm";
import EditTodoForm from "./EditTodoForm";

export default function TodoList({ todoItems, fetchMoreUrl, showAddTodoBtn = false }: { todoItems: { rows: Todo[], hasMore: boolean }, fetchMoreUrl: string, showAddTodoBtn?: boolean }) {
    const scrollElement = useRef<HTMLDivElement>(null);
    const deleteTodoDialog = useRef<HTMLDialogElement>(null);
    const editTodoDialog = useRef<HTMLDialogElement>(null);
    const [selectedTodo, setSelectedTodo] = useState<Todo>();

    const { data, isLoading, prependItem, updateItem, deleteItem } = useInfiniteScroll<Todo>(todoItems, scrollElement, useCallback((page: number) => {
        const url = new URL(fetchMoreUrl);
        url.searchParams.set("page", page.toString());
        return fetch(url.toString());
    }, [fetchMoreUrl]));

    return <>
        <div className="mt-10">
            {showAddTodoBtn && <CreateTodoButton onSuccess={prependItem} />}
            <div className="flex flex-col gap-8">
                {data.rows.map(todo => <TodoItem key={todo.id} todo={todo}
                    onEdit={() => {
                        setSelectedTodo(todo);
                        editTodoDialog.current?.showModal();
                    }} onDelete={() => {
                        setSelectedTodo(todo);
                        deleteTodoDialog.current?.showModal()
                    }}
                    markTodoAsDone={() => {
                        deleteItem(todo.id);
                    }}
                />)}
            </div>
            {isLoading && <div className="mt-10 flex justify-center"><div className="loading loading-spinner"></div></div>}
            <div id="more-todos" ref={scrollElement}></div>
        </div>
        <EditTodoForm formRef={editTodoDialog} todo={selectedTodo as Todo} onEdit={updateItem} />
        <DeleteTodoForm formRef={deleteTodoDialog} todoId={selectedTodo?.id as string} onDelete={deleteItem} />
    </>
}