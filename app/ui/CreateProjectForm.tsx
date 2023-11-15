"use client";

import React from "react";

export default function CreateProjectForm({ formRef }: { formRef: React.RefObject<HTMLDialogElement | undefined> }) {
    return <dialog className="modal" ref={formRef}>
        <div className="modal-box">
            <form>
                <h1 className="font-bold text-2xl">Create Project</h1>
                <div className="form-control">
                    <label className="label" htmlFor="name">Name</label>
                    <input className="input input-bordered" id="name" name="name" type="text" />
                </div>
                <div className="form-control">
                    <label className="label" htmlFor="color">Color</label>
                    <select className="select select-bordered">
                        <option>Red</option>
                        <option>Red</option>
                        <option>Red</option>
                        <option>Red</option>
                    </select>
                </div>
            </form>
            <div className="modal-action flex justify-end gap-5">
                <form method="dialog">
                    <button className="btn">Cancel</button>
                </form>
                <button type="submit" className="btn btn-primary">Create</button>
            </div>
        </div>
    </dialog>
}