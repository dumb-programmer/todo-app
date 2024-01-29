export default function SubmitButton({ label, form = "", isSubmitting }: { label: string, form?: string, isSubmitting: boolean }) {
    return <button form={form} type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? <span className="loading loading-spinner loading-md"></span> : label}</button>;
}