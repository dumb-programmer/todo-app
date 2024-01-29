"use client";

import { createProject } from "../lib/actions";
import clsx from "clsx";
import SubmitButton from "./SubmitButton";
import { Project } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema } from "../lib/schema";
import convertToFormData from "../lib/utils/convertToFormData";
import { Content, Header, Modal } from "../components/modal";

const formId = "create-form";
export default function CreateProjectForm({ formRef, onSuccess }: { formRef: React.MutableRefObject<HTMLDialogElement | null>, onSuccess: (project: Project) => void }) {
    const { handleSubmit, register, setError, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            name: "",
        },
        resolver: zodResolver(ProjectSchema)
    });

    return <Modal dialogRef={formRef}>
        <Header>
            <h1 className="font-bold text-2xl">Create Project</h1>
        </Header>
        <Content>
            <form id={formId} onSubmit={handleSubmit(async (data) => {
                const formData = convertToFormData(data);
                const result = await createProject(null, formData);
                if (result.success) {
                    reset();
                    formRef.current?.close();
                    onSuccess(result.data);
                }
                else if (result.errors?.name) {
                    setError("name", { message: result.errors.name[0] })
                }
            })}>
                <div className="form-control">
                    <label className="label" id="name">Name</label>
                    <input type="text"
                        className={clsx("input input-bordered", errors.name?.message && "input-error")}
                        {...register("name", { required: true })}
                    />
                    <p className="text-red-500 text-xs mt-2">{errors.name?.message}</p>
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={() => formRef.current?.close()}>Cancel</button>
                    <SubmitButton label="Create" form={formId} isSubmitting={isSubmitting} />
                </div>
            </form>
        </Content>
    </Modal>
}