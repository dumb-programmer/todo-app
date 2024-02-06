import Link from "next/link";
import LoginForm from "@/app/ui/LoginForm";

export default function Page() {
    return <main className="h-screen flex justify-center items-center">
        <div className="card shadow-lg h-max w-max p-10">
            <h1 className="card-title text-3xl ml-8">Login</h1>
            <LoginForm />
            <p className="ml-8">Don&lsquo;t have an account? <Link className="link" href="/signup">Signup</Link></p>
        </div>
    </main>;
}