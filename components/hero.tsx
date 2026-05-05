import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-background pt-24 pb-16 px-6 flex items-center overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bio & Call to Actions */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-6">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full transition-all hover:bg-accent/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                </span>
              
              </div>
              

              {/* Main Title */}
              <div className="space-y-2">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif text-foreground tracking-tight leading-none">
                  NEHEMIE <br />
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide flex items-center gap-3">
                  <span className="h-px w-8 bg-accent/50"></span>
                  Where <span className="text-foreground font-medium italic">Science</span> Meets <span className="text-foreground font-medium italic">Art</span>
                </p>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl font-light">
                An MPC student bridging the gap between <span className="text-foreground font-normal">mathematical precision</span> and <span className="text-foreground font-normal">visual poetry</span>. Using the physics of light to document the soul of the moment.
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#portfolio" 
                className="group inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-foreground/10"
              >
                Explore Works
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 border border-foreground/20 text-foreground font-bold rounded-full hover:bg-foreground/5 transition-all backdrop-blur-sm"
              >
                Inquire
              </a>
            </div>

            {/* Stats - Refined */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg border-t border-border/50">
              <div>
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Sessions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground underline decoration-accent/30 decoration-2">MPC</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Focus</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">1.4f</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Depth Expert</p>
              </div>
            </div>
          </div>

          {/* Right Column: Image with Artistic Framing */}
          <div className="lg:col-span-5 relative group">
            {/* Image Border/Frame Effect */}
            <div className="absolute -inset-4 border border-accent/20 rounded-3xl -z-10 group-hover:scale-[1.03] transition-transform duration-500"></div>
            
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
              <img 
            
                src="https://res.cloudinary.com/dmmldzjty/image/upload/v1778003500/Kwibuka32_12_di02kp.jpg" 
                alt="Nehemie Calvin Photography" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              
              {/* Scientific Overlay (The "MPC" Touch) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
              
              {/* Technical Spec Badge */}
              <div className="absolute top-6 right-6 p-4 backdrop-blur-md bg-black/30 rounded-xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <p className="text-[10px] uppercase tracking-tighter opacity-70">Optical Physics</p>
                 <p className="text-xs font-mono">Refraction Study № 01</p>
              </div>
            </div>

            {/* Floating Info Card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-card/80 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-border max-w-[200px]">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-accent font-bold">Specialization</span>
                <span className="text-base font-semibold text-foreground">Atmospheric Portraits & Urban Physics</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}