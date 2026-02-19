import { ArrowUpRight } from 'lucide-react';

const Hero = () => {
    // Dummy images - using placeholders for now if needed, or colored blocks
    // In a real scenario, we'd use actual image URLs.
    const heroImage = "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1000"; // Fashion guy
    const smallImage1 = "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=500"; // Jacket detail
    const smallImage2 = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=500"; // Clothing rack
    
  return (
    <section className="container" style={{ padding: '4rem 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* Left Column: Text Content */}
        <div>
          <h1 className="text-display" style={{ marginBottom: '1.5rem', lineHeight: '1.1' }}>
            Unleash Your Style <br />
            <span className="text-light">Shop the Latest Trends</span>
          </h1>
          
          <p className="text-light" style={{ maxWidth: '400px', marginBottom: '2.5rem' }}>
            Discover the latest trends & express your style effortlessly. Shop exclusive collections with premium designs, just for you!
          </p>
          
          <div className="flex items-center gap-4" style={{ marginBottom: '4rem' }}>
            <button className="btn-primary">
              Shop Now
            </button>
            <button style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                border: '1px solid #000', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: '#000',
                color: '#fff'
            }}>
                <ArrowUpRight size={20} />
            </button>
          </div>
          
          <div>
            <h3 className="text-xl font-bold">25 Million+</h3>
            <p className="text-sm text-light">Real reviews from our happy customers!</p>
            <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
                {/* Dummy avatars */}
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ 
                        width: '32px', 
                        height: '32px', 
                        backgroundColor: '#ddd', 
                        borderRadius: '50%',
                        border: '2px solid #fff',
                        marginLeft: i > 1 ? '-10px' : '0'
                    }}></div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Column: Hero Image */}
        <div style={{ position: 'relative' }}>
          <div style={{ 
              borderRadius: '24px', 
              overflow: 'hidden', 
              height: '500px',
              backgroundColor: '#f0f0f0' 
            }}>
              <img src={heroImage} alt="Men's Fashion" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>

      {/* Bottom Row: Post-Hero Content (Small Images) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginTop: '4rem' }}>
         <div style={{ borderRadius: '16px', overflow: 'hidden', height: '250px' }}>
            <img src={smallImage1} alt="Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         </div>
         <div style={{ borderRadius: '16px', overflow: 'hidden', height: '250px' }}>
            <img src={smallImage2} alt="Rack" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         </div>
         <div style={{ 
             borderRadius: '16px', 
             backgroundColor: '#fff', 
             padding: '2rem', 
             display: 'flex', 
             flexDirection: 'column', 
             justifyContent: 'center', 
             alignItems: 'center',
             textAlign: 'center',
             boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
         }}>
             <h3 className="text-xl font-bold" style={{ marginBottom: '1rem' }}>Models wearing <br/> full outfits</h3>
             <button className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}>Explore more</button>
         </div>
      </div>
    </section>
  );
};

export default Hero;
