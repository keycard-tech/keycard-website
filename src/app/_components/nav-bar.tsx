import Link from 'next/link'
import { Logo } from './logo'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-dark-100 px-6 py-4 text-white-100">
      <Logo />
      <div className="flex items-center space-x-6">
        <Link href="#">Products</Link>
        <button className="rounded-12 bg-dark-60 px-4 py-2 text-16">
          Buy Keycard
        </button>
      </div>
    </nav>
  )
}

export { Navbar }
