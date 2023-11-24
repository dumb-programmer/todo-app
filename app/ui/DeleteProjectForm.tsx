import React from "react";
import { deleteProject } from "../lib/actions";

export default function DeleteProjectForm({ formRef, projectId }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, projectId: string }) {
    const deleteProjectWithId = deleteProject.bind(null, projectId);

    return <dialog className="modal" ref={formRef}>
        <div className="modal-box">
            <form id={`delete-project-${projectId}-form`} action={deleteProjectWithId}>
                <div className="prose">
                    <h1 className="text-2xl font-bold">Delete Project</h1>
                    <p>Are you sure you want to delete this project? All todos in this project will be deleted. This action is non-recoverable.</p>
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={(e) => {
                        e.preventDefault();
                        formRef?.current?.close();
                    }}>Cancel</button>
                    <button type="submit" className="btn btn-error" onClick={(e) => {
                        e.preventDefault();
                        const form: HTMLFormElement | null = document.querySelector(`#delete-project-${projectId}-form`);
                        form?.requestSubmit();
                    }} >Delete</button>
                </div>
            </form>
        </div>
    </dialog>
}