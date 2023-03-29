import Link from "next/link";
import SignInButton from "./SignInButton";

export default function Header() {
  return (
      <header className="h-20 bg-slate-800">
          <div className="max-w-6xl h-20 mx-auto flex items-center">
              <Link href='/'>
                  <img src="/images/tasks-logo.svg" alt="Tasks logo" className="cursor-pointer max-w-sm max-h-16" />
              </Link>
              <nav className="ml-20 h-20 flex items-center gap-20">
                  <Link href='/' className="px-2 text-white border-l-2 border-orange-500">
                      <p>Home</p>
                  </Link>
                  <Link href='/tasks' className="px-2 text-white border-l-2 border-orange-500">
                      <p>Minhas tasks</p>
                  </Link>
              </nav>
              <SignInButton />
          </div>
      </header>
  )
}
