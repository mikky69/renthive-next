'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Define types for our menu items
type SubmenuItem = {
  title: string;
  subitems?: string[];
};

type MenuItem = {
  title: string;
  link?: string;
  submenus?: Array<{
    title: string;
    items: Array<SubmenuItem | string>;
  }>;
};

// Custom Link component for Next.js 13+
const NavLink = ({
  href,
  className = '',
  children,
  ...props
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };
  
  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={className} 
      {...props}
    >
      {children}
    </a>
  );
};

const MainNavigation = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = useMemo(() => [
    {
      title: 'Properties',
      submenus: [
        {
          title: 'Land',
          items: [
            { 
              title: 'For Sale', 
              subitems: ['Residential Land', 'Commercial Land', 'Agricultural Land'] 
            },
            { 
              title: 'For Rent', 
              subitems: ['Residential Land', 'Commercial Land', 'Agricultural Land'] 
            },
          ],
        },
        {
          title: 'Buildings',
          items: [
            { 
              title: 'Residential Properties', 
              subitems: ['Apartments', 'Bungalows', 'Semi-Detached Houses', 'Terraced Houses', 'Fully Detached Houses'] 
            },
            { 
              title: 'Duplexes', 
              subitems: ['Semi-Detached Duplex', 'Terrace Duplex'] 
            },
            { 
              title: 'Vacation Rentals', 
              subitems: ['Short-Term Rentals', 'Long-Term Rentals'] 
            },
            { 
              title: 'Luxury Properties', 
              subitems: ['Condos', 'Penthouses', 'Mansions'] 
            },
          ],
        },
        {
          title: 'Commercial Properties',
          items: [
            { title: 'Hotels & Resorts', subitems: [] },
            { title: 'Blocks of Flats', subitems: [] },
            { title: 'Office Spaces', subitems: [] },
            { title: 'Retail Spaces', subitems: [] },
            { title: 'Warehouses', subitems: [] },
            { title: 'Co-Working Spaces', subitems: [] },
          ],
        },
      ],
    },
    {
      title: 'Services',
      submenus: [
        { 
          title: 'General Services', 
          items: [
            { title: 'Plumbing' },
            { title: 'Gardening' },
            { title: 'Interior Design' },
            { title: 'Painting' },
            { title: 'Cleaning' }
          ] 
        },
        { 
          title: 'Maintenance', 
          items: [
            { title: 'General Maintenance' },
            { title: 'HVAC' },
            { title: 'Pest Control' },
            { title: 'Security Systems' },
            { title: 'Home Automation' }
          ] 
        },
        { 
          title: 'Specialized Services', 
          items: [
            { title: 'Mechanical Services' },
            { title: 'Solar Installation' },
            { title: 'Smart Home' },
            { title: 'Kitchen Design' },
            { title: 'Tiling' }
          ] 
        },
        { 
          title: 'Financial & Legal', 
          items: [
            { title: 'Property Valuation' },
            { title: 'Mortgage Consultation' },
            { title: 'Legal Services' },
            { title: 'Insurance' }
          ] 
        },
      ],
    },
    { title: 'VIP', link: '/vip' },
    { title: 'About', link: '/about' },
    { title: 'Contact', link: '/contact' },
  ], []);

  return (
    <nav className="relative">
      <ul className="flex space-x-6">
        {menuItems.map((item) => (
          <li 
            key={item.title}
            className="relative group"
            onMouseEnter={() => setActiveMenu(item.title)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            {item.link ? (
              <NavLink 
                href={item.link}
                className="text-white hover:text-rent-hive-yellow transition-colors font-medium"
              >
                {item.title}
              </NavLink>
            ) : (
              <span className="text-white hover:text-rent-hive-yellow transition-colors font-medium cursor-pointer">
                {item.title}
              </span>
            )}
            
            {item.submenus && (
              <AnimatePresence>
                {activeMenu === item.title && (
                  <motion.div 
                    className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 space-y-4">
                      {item.submenus.map((submenu) => (
                        <div key={submenu.title} className="mb-4">
                          <h4 className="text-rent-hive-blue font-semibold mb-2">{submenu.title}</h4>
                          <ul className="space-y-1">
                            {submenu.items?.map((subitem) => (
                              <li key={typeof subitem === 'string' ? subitem : subitem.title}>
                                {typeof subitem === 'string' ? (
                                  <NavLink 
                                    href={`/category/${subitem.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-gray-700 hover:text-rent-hive-yellow block py-1"
                                  >
                                    {subitem}
                                  </NavLink>
                              ) : (
                                <>
                                  <NavLink 
                                    href={`/category/${(subitem as SubmenuItem).title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-gray-700 hover:text-rent-hive-yellow block py-1"
                                  >
                                    {(subitem as SubmenuItem).title}
                                  </NavLink>
                                  {subitem.subitems?.map((subsubitem) => (
                                    <NavLink 
                                      key={subsubitem}
                                      href={`/category/${subsubitem.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="text-gray-500 hover:text-rent-hive-yellow block py-1 pl-4 text-sm"
                                    >
                                      {subsubitem}
                                    </NavLink>
                                  ))}
                                </>
                              )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;
