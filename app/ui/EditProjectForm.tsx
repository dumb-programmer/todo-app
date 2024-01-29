"use client";

import { editProject } from "../lib/actions";
import clsx from "clsx";
import { Project } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema } from "../lib/schema";
import convertToFormData from "../lib/utils/convertToFormData";
import SubmitButton from "./SubmitButton";
import { Modal, Header, Content, Action } from "../components/modal";
import { useEffect } from "react";

interface Props {
    editDialog: React.RefObject<HTMLDialogElement>
    project: Project | undefined
    onEdit: (project: Project) => void
    onCancel: () => void
}

const formId = "edit-project";
export default function EditProjectForm({ editDialog, project, onEdit, onCancel }: Props) {
    const { handleSubmit, register, setError, reset, formState: { errors, isSubmitting }, setValue } = useForm({
        defaultValues: {
            name: project?.name,
        },
        resolver: zodResolver(ProjectSchema)
    });
    const editProjectWithId = editProject.bind(null, project as Project);

    useEffect(() => {
        if (project) {
            setValue("name", project?.name)
        }
    }, [project, setValue]);

    return <Modal dialogRef={editDialog}>
        <Header>
            <h1 className="font-bold text-2xl mb-4">Edit Project</h1>
        </Header>
        <Content>
            <form id={formId} onSubmit={handleSubmit(async (data) => {
                const formData = convertToFormData(data);
                const result = await editProjectWithId({}, formData);
                if (result.success) {
                    reset();
                    onEdit(result.data)
                    onCancel();
                }
                else if (result.errors?.name) {
                    setError("name", { message: result.errors.name[0] })
                }
            })}>
                <div className="form-control">
                    <label className="label" id="name">Name</label>
                    <input className={clsx("input input-bordered", errors.name?.message && "input-error")} {...register("name")} />
                    <p className="text-red-500 text-xs mt-2">{errors?.name?.message}</p>
                </div>
            </form>
        </Content>
        <Action>
            <button formMethod="dialog" className="btn" onClick={onCancel}>Cancel</button>
            <SubmitButton label="Save" form={formId} isSubmitting={isSubmitting} />
        </Action>
    </Modal>
}