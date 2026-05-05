'use client'

import { Award, Star, ExternalLink, Download, ChevronRight, Sparkles, Camera, Heart, Users, Globe, Video, Mail, Phone, ShieldCheck, FileText, Briefcase } from 'lucide-react'
import Link from 'next/link'

const achievements = [
  {
    id: 1,
    title: 'Outstanding Media Artist',
    issuer: 'Agahozo-Shalom Youth Village',
    year: '2024',
    description: 'Premier recognition for technical excellence and narrative depth in visual storytelling.',
    icon: Camera,
    color: 'accent',
    featured: true,
  },
  {
    id: 2,
    title: 'Media Club Mentor',
    issuer: 'ASYV Media Club',
    year: '2024',
    description: 'Empowering peers through technical leadership in video production and live broadcasting.',
    icon: ShieldCheck,
    color: 'blue',
    featured: true,
  },
  {
    id: 3,
    title: 'National Vocal Silver Medalist',
    issuer: 'Rwanda Cultural Competition',
    year: '2024',
    description: 'Expertise in traditional Kinyarwanda acoustics and complex rhythmic vocal control.',
    icon: Star,
    color: 'purple',
    featured: true,
  },
]

// Document items for easy management
const documents = [
  {
    title: 'Resume / CV',
    description: 'Complete technical CV and project breakdown',
    url: 'https://docs.google.com/document/d/19zHvWOu5mObNMjTNfCHHWvi8IC33i6ajdQ_Y6AxUP38/edit?usp=sharing',
    icon: Download,
    color: 'accent',
  },
  {
    title: 'Cover Letter',
    description: 'Professional introduction and career narrative',
    url: 'https://docs.google.com/document/d/e/2PACX-1vQbruMZOR_qmgnFCUyxbXSZu2r8pYbD6auWQvLCPWPUG8r8DGmKpm0VBwfRiouMYW4QGZjshwu57cX1/pub',
    icon: FileText,
    color: 'blue',
  },
]

export default function Achievements() {
  return (
    <section id="achievements" className="w-full py-32 bg-background relative overflow-hidden">
      {/* Background Aesthetic */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Excellence & Honors</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-foreground">
              Awards & <span className="italic font-light text-accent">Recognition</span>
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              Demonstrating a commitment to technical precision, community leadership, and cultural preservation.
            </p>
          </div>
          
          <div className="hidden md:block">
             <div className="text-right">
                <p className="text-4xl font-bold text-foreground">06</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Major Distinctions</p>
             </div>
          </div>
        </div>

        {/* Professional Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="group relative p-8 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-accent/30 transition-all duration-500"
            >
              {/* Subtle number indicator */}
              <span className="absolute top-8 right-8 text-4xl font-serif italic opacity-[0.03] group-hover:opacity-10 transition-opacity">
                0{item.id}
              </span>

              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-foreground text-background flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <item.icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-accent/80 uppercase tracking-tighter">
                    <span>{item.issuer}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{item.year}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed font-light">
                  {item.description}
                </p>

                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors">
                  Verify Credentials <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Skills & Documents Section - Rearranged */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Skills Area - Expanded */}
          <div className="lg:col-span-7 p-10 rounded-3xl bg-secondary/30 border border-border">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Video className="w-5 h-5 text-accent" />
               </div>
               <h4 className="text-2xl font-serif font-bold">Technical Skillset</h4>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {[
                'Post-Production Management', 'Live Streaming Architecture', 'Adobe Creative Suite', 
                'DaVinci Resolve', 'Visual Storytelling', 'Cinematography', 'Digital Compositing',
                'Peer Mentorship', 'Community Leadership', 'Optical Physics'
              ].map((skill) => (
                <span key={skill} className="px-4 py-2 text-xs font-medium bg-background border border-border rounded-full hover:border-accent hover:text-accent transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Documents Hub - Dedicated prominent location */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-foreground to-foreground/95 text-background overflow-hidden">
            <div className="p-8 border-b border-background/10">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-5 h-5 text-accent" />
                <h4 className="text-xl font-serif font-bold">Professional Portfolio</h4>
              </div>
              <p className="text-background/60 text-sm font-light">
                Download my complete credentials and professional documentation.
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              {documents.map((doc, idx) => {
                const Icon = doc.icon;
                return (
                  <Link 
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-2xl bg-background/5 hover:bg-background/10 transition-all duration-300 border border-background/10 hover:border-accent/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-${doc.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-4 h-4 text-${doc.color === 'accent' ? 'accent' : 'blue-400'}`} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-background group-hover:text-accent transition-colors">
                          {doc.title}
                        </p>
                        <p className="text-[10px] text-background/50 uppercase tracking-wider">
                          {doc.description}
                        </p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-background/40 group-hover:text-accent group-hover:translate-y-[-2px] transition-all" />
                  </Link>
                );
              })}
              
              {/* Contact Information Footer */}
              <div className="pt-6 mt-2 border-t border-background/10">
                <div className="flex flex-col gap-2 text-xs text-background/50">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" /> 
                    <span>Rwanda (Rusizi / ASYV)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" /> 
                    <a href="mailto:calvinnehem@gmail.com" className="hover:text-accent transition-colors">
                      calvinnehem@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}