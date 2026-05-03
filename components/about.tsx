import React from 'react';
import { Award, Camera, Clock, Heart, Binary, Microscope, Zap } from 'lucide-react';

const stats = [
  { icon: Camera, label: 'Projects', value: '50+' },
  { icon: Clock, label: 'Experience', value: '3y+' },
  { icon: Award, label: 'Awards', value: '4' },
  { icon: Heart, label: 'Clients', value: '100+' },
];

const skills = [
  'Portraiture', 'Optical Physics', 'Light Shaping', 
  'Digital Post-Processing', 'Visual Narrative', 'Event Documentation'
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 bg-background overflow-hidden">
      {/* Decorative Grid Pattern (Scientific Feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" >
       <a href='https://i.pinimg.com/736x/3b/e9/8a/3be98a870c0efe26f9ba9a2e47d4655d.jpg'    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}/> 
   
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: The Visuals */}
          <div className="lg:col-span-5 relative">
            {/* Focal Point Brackets (Camera UI style) */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-accent/40" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-accent/40" />
            
            <div className="relative z-10 group">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-muted">
                 {/* Replace with your actual portrait */}
                <div className="w-full h-full bg-gradient-to-br from-secondary to-accent/10 flex flex-col items-center justify-center p-8 text-center">
                   <div className="relative">
                      <Camera className="w-16 h-16 text-accent mb-4 animate-pulse" />
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
                   </div>
                   <p className="text-foreground font-serif italic text-lg tracking-tight">"Capturing the physics of emotion."</p>
                </div>
              </div>

              {/* Floating Technical Badge */}
              <div className="absolute -bottom-8 -left-8 bg-card/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-border flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Binary className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Current Focus</p>
                  <p className="text-sm font-semibold text-foreground italic">MPC Specialization (S5)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Narrative */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-sm uppercase tracking-[0.3em] text-accent font-bold">Biography</h2>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                  A Lens Refracted Through <br /> 
                  <span className="italic">Analytical Precision.</span>
                </h3>
              </div>

              <div className="space-y-4 text-lg text-muted-foreground font-light leading-relaxed">
                <p>
                  I am <span className="text-foreground font-medium">Nehemie Calvin</span>, 
                  a photographer who views the world as a complex interaction of light, 
                  geometry, and human connection. 
                </p>
                <p>
                  As an <span className="text-foreground font-normal">S5 MPC student</span>, my work is informed 
                  by the laws of optics. I don't just "take" photos; I calculate the way light 
                  interacts with space to tell a story that feels both authentic and 
                  technically flawless. 
                </p>
              </div>

              {/* Skill Tags - More Professional Layout */}
              <div className="pt-4">
                <h4 className="text-xs uppercase tracking-widest text-foreground font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-accent" /> Expert Domains
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-4 py-1.5 bg-accent/5 hover:bg-accent/10 text-foreground text-xs font-medium rounded-full border border-accent/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Grid - High End Minimalist */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border pt-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group cursor-default">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-accent transition-transform group-hover:scale-110" />
                      <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}