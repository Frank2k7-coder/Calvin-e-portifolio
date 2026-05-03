export interface PortfolioImage {
  id: string
  title: string
  category: string
  image: string // base64 encoded image
  createdAt: number
}

const STORAGE_KEY = 'portfolio_images'

export function getImages(): PortfolioImage[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addImage(image: PortfolioImage): void {
  const images = getImages()
  images.push(image)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(images))
}

export function deleteImage(id: string): void {
  const images = getImages()
  const filtered = images.filter(img => img.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
}

export function updateImage(id: string, updates: Partial<PortfolioImage>): void {
  const images = getImages()
  const index = images.findIndex(img => img.id === id)
  if (index !== -1) {
    images[index] = { ...images[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images))
  }
}
