import { Award, ShieldCheck, Smile, Truck } from 'lucide-react';

const BrandTicker = () => {
  return (
    <div className="container" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <div className="flex justify-between items-center text-light flex-wrap gap-6" style={{ opacity: 0.7 }}>
        <div className="flex items-center gap-2">
          <Truck size={24} />
          <span className="font-medium">FAST DELIVERY</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={24} />
          <span className="font-medium">SECURE PAYMENT</span>
        </div>
        <div className="flex items-center gap-2">
          <Award size={24} />
          <span className="font-medium">TOP QUALITY</span>
        </div>
        <div className="flex items-center gap-2">
          <Smile size={24} />
          <span className="font-medium">HAPPY CUSTOMERS</span>
        </div>
         <div className="flex items-center gap-2">
          <span className="font-bold text-lg" style={{letterSpacing: '0.1em'}}>GRAPHIC STUDIO</span>
        </div>
      </div>
    </div>
  );
};

export default BrandTicker;
