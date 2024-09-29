import Image from 'next/image';
import { useRouter } from 'next/router';

const navIcons = [
  { src: '/assets/icons/recent.png', alt: 'recent' },
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/user.svg', alt: 'user' },
];

const Navbar = () => {
  const router = useRouter();

  // Handler to navigate to the TrendingPage when the recent icon is clicked
  const handleTrendingClick = () => {
    router.push('/trending')  // Programmatically navigate to the trending page
      .then(() => console.log('Navigation to trending page successful'))
      .catch((err) => console.error('Error navigating to trending page:', err));
  };

  return (
    <header className="w-full">
      <nav className="nav">
        <div className="flex items-center gap-1">
          <p className="nav-logo">
            Price<span className="text-primary">Tracker</span>
          </p>
        </div>

        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            icon.alt === 'recent' ? (
              <div onClick={handleTrendingClick} key={icon.alt} className="cursor-pointer">  
                <Image 
                  src={icon.src}
                  alt={icon.alt}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
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
  );
};

export default Navbar;
