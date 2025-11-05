export function TopBanner() {
    return (
      <div className="relative w-full h-10 bg-background overflow-hidden">
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[200%] aspect-square">
          <div className="absolute inset-0 rounded-full border-t-4 border-primary/80" 
               style={{
                  maskImage: 'radial-gradient(ellipse 50% 15% at 50% 100%, black 0%, transparent 100%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 50% 15% at 50% 100%, black 0%, transparent 100%)'
               }}
          />
          <div className="absolute inset-0 rounded-full border-t-4 border-primary blur-md" 
               style={{
                maskImage: 'radial-gradient(ellipse 50% 15% at 50% 100%, black 0%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 50% 15% at 50% 100%, black 0%, transparent 100%)'
             }}
          />
        </div>
      </div>
    );
  }
  