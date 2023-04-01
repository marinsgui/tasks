import Link from "next/link";
import SignInButton from "./SignInButton";

export default function Header() {
  return (
      <header className="h-20 bg-slate-800">
          <div className="max-w-6xl h-20 mx-auto flex items-center">
              <Link href='/'>
                  <img src="/images/tasks-logo.svg" alt="Tasks logo" className="cursor-pointer max-w-xs max-h-10 md:max-w-2xl md:max-h-16" />
              </Link>
              <nav className="ml-4 md:ml-10 h-20 flex items-center gap-6">
                  <Link href='/' className="pl-2 text-white border-l-2 border-orange-500">
                      <p>Home</p>
                  </Link>
                  <Link href='/tasks' className="pl-2 text-white border-l-2 border-orange-500">
                      <p>Minhas tasks</p>
                  </Link>
              </nav>
              <SignInButton />
          </div>
      </header>
  )
}
