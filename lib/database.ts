import { supabase } from './supabase'

export interface PortfolioImage {
  id: string
  title: string
  category: string
  image: string // Cloudinary URL
  createdAt: number
  aspect?: string
}

export interface VideoProject {
  id: string
  title: string
  description: string
  category: string
  duration: string
  date: string
  videoUrl: string // Cloudinary URL
  thumbnail: string // Cloudinary URL
  color: string
}

// ==================== PORTFOLIO IMAGES ====================

export async function getPortfolioImages(): Promise<PortfolioImage[]> {
  try {
    const { data, error } = await supabase
      .from('portfolio_images')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching portfolio images:', error)
      return []
    }

    return data.map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      image: item.image_url,
      createdAt: new Date(item.created_at).getTime(),
      aspect: item.aspect_ratio
    })) || []
  } catch (error) {
    console.error('Error fetching portfolio images:', error)
    return []
  }
}

export async function addPortfolioImage(image: PortfolioImage): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('portfolio_images')
      .insert({
        id: image.id,
        title: image.title,
        category: image.category,
        image_url: image.image,
        aspect_ratio: image.aspect,
        created_at: new Date(image.createdAt).toISOString()
      })

    if (error) {
      console.error('Error adding portfolio image:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Error adding portfolio image:', error)
    return false
  }
}

export async function deletePortfolioImage(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('portfolio_images')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting portfolio image:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Error deleting portfolio image:', error)
    return false
  }
}

export async function updatePortfolioImage(id: string, updates: Partial<PortfolioImage>): Promise<boolean> {
  try {
    const updateData: any = {}
    
    if (updates.title) updateData.title = updates.title
    if (updates.category) updateData.category = updates.category
    if (updates.image) updateData.image_url = updates.image
    if (updates.aspect) updateData.aspect_ratio = updates.aspect

    const { error } = await supabase
      .from('portfolio_images')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Error updating portfolio image:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Error updating portfolio image:', error)
    return false
  }
}

// ==================== VIDEO PROJECTS ====================

export async function getVideoProjects(): Promise<VideoProject[]> {
  try {
    const { data, error } = await supabase
      .from('video_projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching video projects:', error)
      return []
    }

    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      category: item.category,
      duration: item.duration,
      date: item.date,
      videoUrl: item.video_url,
      thumbnail: item.thumbnail_url,
      color: item.color
    })) || []
  } catch (error) {
    console.error('Error fetching video projects:', error)
    return []
  }
}

export async function addVideoProject(video: VideoProject): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('video_projects')
      .insert({
        id: video.id,
        title: video.title,
        description: video.description,
        category: video.category,
        duration: video.duration,
        date: video.date,
        video_url: video.videoUrl,
        thumbnail_url: video.thumbnail,
        color: video.color,
        created_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error adding video project:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Error adding video project:', error)
    return false
  }
}

export async function deleteVideoProject(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('video_projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting video project:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Error deleting video project:', error)
    return false
  }
}

export async function updateVideoProject(id: string, updates: Partial<VideoProject>): Promise<boolean> {
  try {
    const updateData: any = {}
    
    if (updates.title) updateData.title = updates.title
    if (updates.description) updateData.description = updates.description
    if (updates.category) updateData.category = updates.category
    if (updates.duration) updateData.duration = updates.duration
    if (updates.date) updateData.date = updates.date
    if (updates.videoUrl) updateData.video_url = updates.videoUrl
    if (updates.thumbnail) updateData.thumbnail_url = updates.thumbnail
    if (updates.color) updateData.color = updates.color

    const { error } = await supabase
      .from('video_projects')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Error updating video project:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Error updating video project:', error)
    return false
  }
}
