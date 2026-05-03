'use client'

import { Play, Calendar, Clock, ArrowUpRight, Sparkles, Plus, Edit2, Trash2, X, Video as VideoIcon, Image as ImageIcon, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
// Import the function you just created
import { uploadToCloudinary } from '@/lib/cloudinary'

type VideoProject = {
  id: string
  title: string
  description: string
  category: string
  duration: string
  date: string
  videoUrl: string
  thumbnail: string
  color: string
}

const CATEGORIES = ['Weddings', 'Corporate', 'Travel', 'Events', 'Social Media', 'Documentary', 'Commercial']
const COLOR_PRESETS = [
  'from-rose-500 to-pink-600',
  'from-blue-500 to-cyan-600',
  'from-amber-500 to-yellow-600',
  'from-purple-500 to-indigo-600',
  'from-green-500 to-emerald-600',
]

const STORAGE_KEY = 'photographer_video_projects'

export default function VideoProjects() {
  const [videos, setVideos] = useState<VideoProject[]>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [editingVideo, setEditingVideo] = useState<VideoProject | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)

  useEffect(() => {
    const savedVideos = localStorage.getItem(STORAGE_KEY)
    if (savedVideos) setVideos(JSON.parse(savedVideos))
  }, [])

  useEffect(() => {
    if (videos.length > 0) localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
  }, [videos])

  const formatVideoUrl = (url: string): string => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/
    const youtubeMatch = url.match(youtubeRegex)
    if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    
    const vimeoRegex = /vimeo\.com\/(\d+)/
    const vimeoMatch = url.match(vimeoRegex)
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    
    return url
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === 'photographer2024') {
      setIsAdmin(true); setShowPasswordPrompt(false); setAdminPassword('')
    } else {
      alert('Incorrect password')
    }
  }

  const saveVideo = () => {
    if (editingVideo) {
      const exists = videos.find(v => v.id === editingVideo.id)
      setVideos(exists 
        ? videos.map(v => v.id === editingVideo.id ? editingVideo : v) 
        : [editingVideo, ...videos]
      )
      setIsEditing(false)
    }
  }

  // --- FORM MODAL COMPONENT ---
  const VideoForm = () => {
    if (!editingVideo) return null

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'video' | 'image') => {
      const file = e.target.files?.[0]
      if (!file) return

      setIsUploading(true)
      const url = await uploadToCloudinary(file)
      
      if (url) {
        if (type === 'video') {
          // Cloudinary hack: change extension to .jpg to get a frame from the video
          const thumbUrl = url.replace(/\.[^/.]+$/, ".jpg")
          setEditingVideo({ ...editingVideo, videoUrl: url, thumbnail: thumbUrl })
        } else {
          setEditingVideo({ ...editingVideo, thumbnail: url })
        }
      }
      setIsUploading(false)
    }

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <div className="bg-card rounded-2xl max-w-2xl w-full my-auto border border-border shadow-2xl">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h3 className="text-xl font-bold">Project Editor</h3>
            <button onClick={() => setIsEditing(false)}><X className="w-5 h-5" /></button>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-accent"><VideoIcon className="w-4 h-4" /> Video Source</label>
              <input 
                className="w-full p-2 bg-secondary rounded-lg border border-border outline-none focus:border-accent"
                placeholder="Cloudinary URL or YouTube/Vimeo link"
                value={editingVideo.videoUrl}
                onChange={e => setEditingVideo({...editingVideo, videoUrl: e.target.value})}
              />
              <div className="relative border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-accent/5 transition-colors cursor-pointer">
                <input 
                  type="file" accept="video/*" className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={e => handleFileUpload(e, 'video')}
                  disabled={isUploading}
                />
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2 text-accent">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-xs font-bold">Uploading to Cloudinary...</span>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Drop video file here or click to upload</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                className="w-full p-2 bg-secondary rounded-lg border border-border" 
                placeholder="Title" value={editingVideo.title}
                onChange={e => setEditingVideo({...editingVideo, title: e.target.value})}
              />
              <select 
                className="w-full p-2 bg-secondary rounded-lg border border-border"
                value={editingVideo.category}
                onChange={e => setEditingVideo({...editingVideo, category: e.target.value})}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                 <label className="text-[10px] uppercase font-bold text-muted-foreground">Thumbnail</label>
                 <div className="flex gap-2 items-center">
                    <div className="w-12 h-12 bg-black rounded overflow-hidden border border-border">
                      {editingVideo.thumbnail && <img src={editingVideo.thumbnail} className="w-full h-full object-cover" />}
                    </div>
                    <input type="file" accept="image/*" className="text-xs" onChange={e => handleFileUpload(e, 'image')} />
                 </div>
               </div>
               <div className="space-y-1">
                 <label className="text-[10px] uppercase font-bold text-muted-foreground">Color Theme</label>
                 <select 
                  className="w-full p-2 bg-secondary rounded-lg border border-border text-sm"
                  value={editingVideo.color}
                  onChange={e => setEditingVideo({...editingVideo, color: e.target.value})}
                >
                  {COLOR_PRESETS.map(c => <option key={c} value={c}>{c.split('-')[1]}</option>)}
                </select>
               </div>
            </div>
          </div>

          <div className="p-6 border-t border-border flex justify-end gap-3">
            <button 
              onClick={saveVideo} 
              disabled={isUploading}
              className="w-full md:w-auto px-8 py-3 bg-accent text-white rounded-xl font-bold disabled:opacity-50 shadow-lg shadow-accent/20"
            >
              {isUploading ? 'Uploading...' : 'Save Video Project'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <section id="videos" className="w-full py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-serif font-bold mb-4">Cinematography</h2>
              <p className="text-muted-foreground italic">Visual stories captured through motion and light.</p>
            </div>
            {!isAdmin ? (
              <button onClick={() => setShowPasswordPrompt(true)} className="text-[10px] text-muted-foreground/50 hover:text-accent uppercase tracking-widest font-bold">Access Admin</button>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => { setEditingVideo({ id: Date.now().toString(), title: '', description: '', category: CATEGORIES[0], duration: '3:00', date: '2024', videoUrl: '', thumbnail: '', color: COLOR_PRESETS[0] }); setIsEditing(true); }} className="bg-accent text-white px-5 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-accent/20"><Plus className="w-4 h-4" /> New Project</button>
                <button onClick={() => setIsAdmin(false)} className="px-5 py-2 border border-border rounded-full text-sm font-bold">Exit</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {videos.map((video) => (
              <div key={video.id} className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/40 transition-all duration-500">
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button onClick={() => { setEditingVideo(video); setIsEditing(true); }} className="p-2 bg-black/60 rounded-full text-white backdrop-blur-md hover:bg-accent"><Edit2 className="w-3 h-3" /></button>
                    <button onClick={() => setVideos(videos.filter(v => v.id !== video.id))} className="p-2 bg-red-500/80 rounded-full text-white backdrop-blur-md"><Trash2 className="w-3 h-3" /></button>
                  </div>
                )}
                
                <div className="relative h-64 cursor-pointer overflow-hidden" onClick={() => { setSelectedVideo(video); setIsModalOpen(true); }}>
                  <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={video.title} />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className={`p-5 rounded-full bg-gradient-to-br ${video.color} shadow-2xl transform scale-75 group-hover:scale-100 transition-transform`}>
                      <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-accent bg-accent/10 px-2 py-1 rounded">{video.category}</span>
                    <span className="text-xs text-muted-foreground font-mono">{video.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-2 group-hover:text-accent transition-colors">{video.title}</h3>
                  <div className="flex items-center justify-between mt-6 text-xs font-bold border-t border-border pt-4">
                    <span className="flex items-center gap-1.5 opacity-60"><Clock className="w-3 h-3" /> {video.duration}</span>
                    <button className="flex items-center gap-1 hover:gap-2 transition-all text-accent">Play Reel <ArrowUpRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO PLAYER MODAL */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4" onClick={() => setIsModalOpen(false)}>
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"><X className="w-6 h-6" /></button>
            <iframe src={formatVideoUrl(selectedVideo.videoUrl)} className="w-full h-full" allowFullScreen allow="autoplay" />
          </div>
        </div>
      )}

      {/* ADMIN LOGIN */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <form onSubmit={handleAdminLogin} className="bg-card p-8 rounded-3xl border border-border w-full max-w-sm text-center shadow-2xl">
            <h3 className="text-2xl font-serif font-bold mb-6">Director Login</h3>
            <input 
              type="password" autoFocus
              className="w-full p-4 bg-secondary rounded-2xl border border-border mb-4 text-center outline-none focus:border-accent" 
              placeholder="••••••••" 
              value={adminPassword} onChange={e => setAdminPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-accent text-white py-4 rounded-2xl font-bold shadow-lg shadow-accent/20">Authorize</button>
            <button type="button" onClick={() => setShowPasswordPrompt(false)} className="mt-4 text-xs font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">Cancel</button>
          </form>
        </div>
      )}

      {isEditing && <VideoForm />}
    </>
  )
}