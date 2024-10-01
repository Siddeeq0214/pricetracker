import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
  { src: '/assets/icons/recent.png', alt: 'recent', href: '/recent' }, // Add href for recent page
  { src: '/assets/icons/user.svg', alt: 'user' },
]

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <p className="nav-logo">
            Price<span className='text-primary'>Tracker</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            icon.href ? (
              <Link key={icon.alt} href={icon.href}>
                <Image 
                  src={icon.src}
                  alt={icon.alt}
                  width={28}
                  height={28}
                  className="object-contain cursor-pointer"
                />
              </Link>
            ) : (
              <Image 
                key={icon.alt}
                src={icon.src}
                alt={icon.alt}
                width={28}
                height={28}
                className="object-contain"
              />
            )
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar;
