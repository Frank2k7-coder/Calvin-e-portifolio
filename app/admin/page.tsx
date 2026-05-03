'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getImages, addImage, deleteImage } from '@/lib/image-storage'
import type { PortfolioImage } from '@/lib/image-storage'

const categories = ['Portraits', 'Landscapes', 'Events', 'Lifestyle']

export default function AdminPage() {
  const [images, setImages] = useState<PortfolioImage[]>([])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Portraits')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setImages(getImages())
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
    if (!file || !title || !preview) {
      alert('Please fill in all fields and select an image')
      return
    }

    setLoading(true)
    try {
      const newImage: PortfolioImage = {
        id: Date.now().toString(),
        title,
        category,
        image: preview,
        createdAt: Date.now(),
      }
      addImage(newImage)
      setImages(getImages())
      setTitle('')
      setCategory('Portraits')
      setFile(null)
      setPreview('')
      alert('Image uploaded successfully!')
    } catch (error) {
      alert('Error uploading image')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      deleteImage(id)
      setImages(getImages())
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your portfolio images</p>
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
                    PNG, JPG, WebP (Max 5MB)
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
                  className="w-full bg-accent text-accent-foreground py-2 rounded font-semibold hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Upload Image'}
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
                        <p className="text-sm text-muted-foreground mb-3">{img.category}</p>
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="w-full px-3 py-2 bg-destructive text-destructive-foreground rounded text-sm font-semibold hover:opacity-90 transition"
                        >
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
