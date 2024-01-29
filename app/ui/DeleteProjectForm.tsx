"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Action, Content, Header, Modal } from "../components/modal";
import { useForm } from "react-hook-form";
import { deleteProject } from "../lib/actions";

const formId = "delete-project";
export default function DeleteProjectForm({ formRef, projectId, onDelete }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, projectId: string, onDelete: (id: string) => void }) {
    const { handleSubmit, formState: { isSubmitting } } = useForm();
    const router = useRouter();

    return <Modal dialogRef={formRef}>
        <Header>
            <h1 className="text-2xl font-bold">Delete Project</h1>
        </Header>
        <Content>
            <form id={formId} onSubmit={handleSubmit(async () => {
                const result = await deleteProject(projectId);
                if (result.success) {
                    onDelete(projectId);
                    router.push("/");
                    formRef.current?.close();
                }
            })}>
                <div className="prose">
                    <p>Are you sure you want to delete this project? All todos in this project will be deleted. This action is non-recoverable.</p>
                </div>
            </form>
        </Content>
        <Action>
            <button type="button" className="btn" onClick={(e) => {
                e.preventDefault();
                formRef?.current?.close();
            }}>Cancel</button>
            <button form={formId} type="submit" className="btn btn-error">Delete</button>
        </Action>
    </Modal>
}