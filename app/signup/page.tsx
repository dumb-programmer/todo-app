import Link from "next/link";
import SignupForm from "../ui/SignupForm";

export default function Page() {
    return <main className="h-screen flex justify-center items-center">
        <div className="card shadow-md h-max w-max p-10">
            <h1 className="card-title text-3xl ml-8">Signup</h1>
            <SignupForm />
            <p className="ml-8">Already have an account? <Link className="link" href="/login">Login</Link></p>
        </div>
    </main>;
}
