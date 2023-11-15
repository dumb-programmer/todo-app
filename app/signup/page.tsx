import Link from "next/link";

export default function Page() {
    return <main className="h-screen flex justify-center items-center">
        <div className="card shadow-md h-max w-max p-10">
            <h1 className="card-title text-3xl ml-8">Signup</h1>
            <form className="card-body">
                <div className="form-control">
                    <label className="label" htmlFor="email">Email</label>
                    <input className="input input-bordered" type="email" id="email" name="email" />
                </div>
                <div className="form-control">
                    <label className="label" htmlFor="password">Password</label>
                    <input className="input input-bordered" type="password" id="password" name="password" />
                </div>
                <div className="form-control mt-5">
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
            <p className="ml-8">Already have an account? <Link className="link" href="/login">Login</Link></p>
        </div>
    </main>;
}
