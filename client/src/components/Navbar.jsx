import { ChevronDown, Menu, Search, ShoppingBag, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar" style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
      {/* Top Bar */}
      <div style={{ borderBottom: '1px solid var(--color-border)' }}>
        <div className="container flex items-center" style={{ height: '60px' }}>
          
          {/* Left: Menu */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
             <button style={{ padding: '0.5rem', marginLeft: '-0.5rem' }}>
                <Menu size={20} />
             </button>
          </div>

          {/* Center: Logo */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div className="font-bold text-xl" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>SHOPSMART</div>
          </div>

          {/* Right: Links & Icons */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '2rem' }}>
            <div className="flex gap-6 text-sm font-medium text-light hidden-mobile">
                <a href="#">About Us</a>
                <a href="#">Blog</a>
                <a href="#">FAQ</a>
            </div>
            <div className="flex gap-4">
                <button><User size={20} strokeWidth={1.5} /></button>
                <button><ShoppingBag size={20} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Second Bar: Search & Nav */}
      <div style={{ borderBottom: '1px solid transparent' }}>
         <div className="container flex items-center justify-between" style={{ padding: '1rem 2rem' }}>
            
            {/* Left: Search & Dropdown */}
            <div className="flex items-center gap-4">
                {/* Search Pill */}
                <div className="flex items-center" style={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '9999px', 
                    padding: '0.5rem 1rem', 
                    width: '240px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    <input 
                        type="text" 
                        placeholder="Clothing" 
                        style={{ 
                            border: 'none', 
                            background: 'transparent', 
                            outline: 'none',
                            width: '100%',
                            fontSize: '0.9rem',
                            color: 'var(--color-text)'
                        }} 
                    />
                     <Search size={16} className="text-light" />
                </div>

                {/* Dropdown Pill */}
                <button className="flex items-center gap-2" style={{
                     backgroundColor: '#fff', 
                     borderRadius: '9999px', 
                     padding: '0.5rem 1rem',
                     border: 'none',
                     fontSize: '0.9rem',
                     fontWeight: 500,
                     boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    <span>Clothing</span>
                    <ChevronDown size={14} className="text-light" />
                </button>
            </div>

            {/* Right: Nav Links */}
            <nav className="flex gap-8 text-sm font-medium text-light items-center">
                <a href="#" className="nav-link" style={{ color: 'var(--color-text)' }}>New Arrivals</a>
                <a href="#" className="nav-link">Sales</a>
                <a href="#" className="nav-link">Man</a>
                <a href="#" className="nav-link">Women</a>
                <a href="#" className="nav-link">Kids</a>
                <a href="#" className="nav-link">Brand</a>
                <a href="#" className="nav-link">Shopping</a>
            </nav>
            
         </div>
      </div>
    </header>
  );
};

export default Navbar;
