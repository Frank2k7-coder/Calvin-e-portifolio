'use client'

import { useState, useEffect } from 'react'
import { Plus, Image as ImageIcon, ArrowUpRight, Loader2, Trash2, X, Lock } from 'lucide-react'
import { getImages, addImage, deleteImage } from '@/lib/image-storage'
import { uploadToCloudinary } from '@/lib/cloudinary'

const categories = ['Portraits', 'Landscapes', 'Events', 'Lifestyle']
const aspectRatios = ['aspect-video', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[2/3]']

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [portfolioItems, setPortfolioItems] = useState<any[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  
  // Upload Form State
  const [isUploading, setIsUploading] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Portraits')

  useEffect(() => {
    setPortfolioItems(getImages())
  }, [])

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === 'photographer2024') {
      setIsAdmin(true)
      setShowPasswordPrompt(false)
      setAdminPassword('')
    } else {
      alert('Incorrect password')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!newTitle) {
      alert("Please enter a title first")
      return
    }

    setIsUploading(true)
    const url = await uploadToCloudinary(file)
    
    if (url) {
      const newItem = {
        id: Date.now().toString(),
        title: newTitle,
        category: newCategory,
        image: url,
        aspect: aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
      }
      addImage(newItem)
      setPortfolioItems([newItem, ...portfolioItems])
      setNewTitle('')
    }
    setIsUploading(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("Permanently remove this image from portfolio?")) {
      deleteImage(id)
      setPortfolioItems(portfolioItems.filter(item => item.id !== id))
    }
  }

  const filtered = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <section id="portfolio" className="py-32 px-6 bg-background relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-[0.4em] text-accent font-bold">Portfolio</h2>
            <h3 className="text-5xl md:text-7xl font-serif font-bold text-foreground tracking-tight">
              Selected <span className="italic font-light">Works</span>
            </h3>
          </div>
          
          <div className="flex items-center gap-6">
              {!isAdmin ? (
                <button 
                  onClick={() => setShowPasswordPrompt(true)}
                  className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
                >
                  <Lock className="w-4 h-4" /> 
                  <span>Curate Studio</span>
                </button>
              ) : (
                <button 
                  onClick={() => setIsAdmin(false)}
                  className="text-sm font-bold uppercase text-red-500 hover:underline"
                >
                  Exit Admin
                </button>
              )}
          </div>
        </div>

        {/* Admin Upload Bar - Only visible when logged in */}
        {isAdmin && (
          <div className="mb-12 p-6 bg-card border border-accent/20 rounded-2xl flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-top-4">
            <div className="flex-1 min-w-[200px]">
              <input 
                type="text" 
                placeholder="Image Title..." 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-secondary p-3 rounded-xl border border-border outline-none focus:border-accent"
              />
            </div>
            <select 
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="bg-secondary p-3 rounded-xl border border-border outline-none"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="relative">
              <input 
                type="file" 
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer" 
                disabled={isUploading}
              />
              <button className="bg-accent text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50">
                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
              </button>
            </div>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-8 mb-16 border-b border-border pb-6">
          <button onClick={() => setActiveCategory('All')} className={`text-sm font-bold uppercase tracking-widest ${activeCategory === 'All' ? 'text-accent' : 'text-muted-foreground'}`}>All</button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative text-sm font-bold uppercase tracking-[0.2em] transition-all pb-2 ${
                activeCategory === category ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
              {activeCategory === category && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filtered.map((item, index) => (
            <div key={item.id} className="relative break-inside-avoid group overflow-hidden rounded-xl bg-muted transition-all duration-500 border border-border">
              
              {/* Admin Delete Button */}
              {isAdmin && (
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-4 right-4 z-30 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div className={`relative w-full ${item.aspect || 'aspect-square'} overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <p className="text-accent text-xs font-bold uppercase mb-1">{item.category}</p>
                  <div className="flex justify-between items-center">
                      <h4 className="text-xl font-serif text-white font-bold">{item.title}</h4>
                      <ArrowUpRight className="text-white w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="py-40 text-center text-muted-foreground italic">
             <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
             <p>No images found in this category.</p>
          </div>
        )}

      </div>

      {/* Admin Password Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <form onSubmit={handleAdminLogin} className="bg-card p-8 rounded-3xl border border-border w-full max-w-sm text-center shadow-2xl">
            <Lock className="w-8 h-8 mx-auto mb-4 text-accent" />
            <h3 className="text-2xl font-serif font-bold mb-6">Gallery Admin</h3>
            <input 
              type="password" autoFocus
              className="w-full p-4 bg-secondary rounded-2xl border border-border mb-4 text-center outline-none focus:border-accent" 
              placeholder="••••••••" 
              value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-accent text-white py-4 rounded-2xl font-bold">Unlock Studio</button>
            <button type="button" onClick={() => setShowPasswordPrompt(false)} className="mt-4 text-xs font-bold opacity-40 uppercase tracking-widest">Cancel</button>
          </form>
        </div>
      )}
    </section>
  )
}