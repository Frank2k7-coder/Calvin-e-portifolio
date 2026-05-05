'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPortfolioImages, addPortfolioImage, deletePortfolioImage, type PortfolioImage } from '@/lib/database'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { Loader2, Trash2 } from 'lucide-react'

const categories = ['Portraits', 'Landscapes', 'Events', 'Lifestyle']
const aspectRatios = ['aspect-video', 'aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[2/3]']

export default function AdminPage() {
  const [images, setImages] = useState<PortfolioImage[]>([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Portraits')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    const loadImages = async () => {
      setIsInitialLoading(true)
      const fetchedImages = await getPortfolioImages()
      setImages(fetchedImages)
      setIsInitialLoading(false)
    }
    loadImages()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !title) {
      alert('Please fill in all fields and select an image')
      return
    }

    setLoading(true)
    try {
      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file)
      
      if (!cloudinaryUrl) {
        alert('Failed to upload image to Cloudinary')
        setLoading(false)
        return
      }

      // Create image object with Cloudinary URL
      const newImage: PortfolioImage = {
        id: Date.now().toString(),
        title,
        category,
        image: cloudinaryUrl, // Use Cloudinary URL instead of base64
        createdAt: Date.now(),
        aspect: aspectRatios[Math.floor(Math.random() * aspectRatios.length)]
      }

      // Save to Supabase
      const success = await addPortfolioImage(newImage)
      
      if (success) {
        setImages([newImage, ...images])
        setTitle('')
        setCategory('Portraits')
        setFile(null)
        setPreview('')
        alert('Image uploaded successfully to Cloudinary and saved to database!')
      } else {
        alert('Failed to save image to database')
      }
    } catch (error) {
      alert('Error uploading image')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const success = await deletePortfolioImage(id)
      if (success) {
        setImages(images.filter(img => img.id !== id))
      } else {
        alert('Failed to delete image')
      }
    }
  }

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground py-20 px-6 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio images with Cloudinary & Supabase</p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-foreground text-background rounded hover:opacity-90 transition"
          >
            Back to Portfolio
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border sticky top-24">
              <h2 className="text-2xl font-serif font-bold mb-6">Upload Image</h2>
              <form onSubmit={handleUpload} className="space-y-4">
                {/* Image Preview */}
                {preview && (
                  <div className="mb-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full aspect-square object-cover rounded"
                    />
                  </div>
                )}

                {/* File Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Select Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-border rounded bg-input text-foreground"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, WebP (Max 5MB) - Uploads to Cloudinary
                  </p>
                </div>

                {/* Title Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Image Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Mountain Serenity"
                    className="w-full px-3 py-2 border border-border rounded bg-input text-foreground placeholder-muted-foreground"
                    required
                  />
                </div>

                {/* Category Select */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded bg-input text-foreground"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-accent-foreground py-2 rounded font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    'Upload Image'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Images List */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
              <h2 className="text-2xl font-serif font-bold mb-6">
                Gallery ({images.length} images)
              </h2>

              {images.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-muted-foreground">No images uploaded yet</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {images.map(img => (
                    <div key={img.id} className="border border-border rounded overflow-hidden">
                      <img
                        src={img.image}
                        alt={img.title}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1">{img.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{img.category}</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          Stored: Cloudinary & Supabase
                        </p>
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="w-full px-3 py-2 bg-destructive text-destructive-foreground rounded text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
