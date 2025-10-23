import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = 'https://glxgocvxgdbjkolhtgor.supabase.co' // Replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdseGdvY3Z4Z2RiamtvbGh0Z29yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNDY5MjAsImV4cCI6MjA3NjcyMjkyMH0.4I9xsuIZCKqvybWlQD-28B-ZfOpZH6QecvicSpSvp9o' // Replace with your Supabase API key

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Storage bucket name
const STORAGE_BUCKET = 'product' // You can change this to your preferred bucket name

/**
 * Upload file to Supabase Storage
 * @param {File} file - The file to upload
 * @param {Function} progressCallback - Callback function to track upload progress
 * @param {Object} productData - Product data containing category and name
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadFileToSupabase = async (file, progressCallback, productData = null) => {
  try {
    // Generate filename using category + product name + random number
    const fileExtension = file.name.split('.').pop()
    const randomNumber = Math.floor(Math.random() * 10000) // 4-digit random number
    
    let fileName
    if (productData && productData.category && productData.name) {
      // Clean the names for filename (remove spaces, special chars)
      const cleanCategory = productData.category.toLowerCase().replace(/[^a-z0-9]/g, '')
      const cleanProductName = productData.name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20) // Limit to 20 chars
      fileName = `${cleanCategory}_${cleanProductName}_${randomNumber}.${fileExtension}`
    } else {
      // Fallback to timestamp if no product data
      const timestamp = Date.now()
      fileName = `${timestamp}_${randomNumber}.${fileExtension}`
    }
    
    const filePath = `product/${fileName}`

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file)

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`)
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath)

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get public URL')
    }

    // Simulate progress for better UX (Supabase doesn't provide real-time progress)
    if (progressCallback) {
      for (let i = 0; i <= 100; i += 10) {
        setTimeout(() => progressCallback(i), i * 10)
      }
    }

    return urlData.publicUrl
  } catch (error) {
    throw new Error(`Supabase upload failed: ${error.message}`)
  }
}

/**
 * Delete file from Supabase Storage
 * @param {string} fileUrl - The public URL of the file to delete
 * @returns {Promise<void>}
 */
export const deleteFileFromSupabase = async (fileUrl) => {
  try {
    // Extract file path from URL
    const url = new URL(fileUrl)
    console.log(url)

    // The URL format is: /storage/v1/object/public/{bucket}/{filepath}
    // We need to extract only the filepath after the bucket name
    // Example: /storage/v1/object/public/product/product/glasses_test4_793.png
    // We want only: product/glasses_test4_793.png (the last 2 parts)
    const pathParts = url.pathname.split('/').filter(part => part !== '')

    // Take the last 2 parts (folder/filename)
    const filePath = pathParts.slice(-2).join('/')
    console.log('File path to delete:', filePath)


    const { data , error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);
    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`)
    }
    else {
      console.log('Deleted successfully:', data)
    }
  } catch (error) {
    throw new Error(`Supabase delete failed: ${error.message}`)
  }
}


/**
 * Upload banner to Supabase Storage
 * @param {File} file - The banner file to upload
 * @returns {Promise<string>} - The public URL of the uploaded banner
 */
export const uploadBannerToSupabase = async (file) => {
  try {
    const filePath = 'banners/banner.jpg'

    // Upload banner to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        upsert: true, // Replace existing file if it exists
        cacheControl: '0' // Disable caching
      })

    if (error) {
      throw new Error(`Failed to upload banner: ${error.message}`)
    }

    // Get public URL with cache-busting timestamp
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath)

    if (!urlData?.publicUrl) {
      throw new Error('Failed to get banner public URL')
    }

    // Add timestamp to URL to prevent browser caching
    const timestamp = new Date().getTime()
    const urlWithCacheBust = `${urlData.publicUrl}?t=${timestamp}`

    return urlWithCacheBust
  } catch (error) {
    throw new Error(`Supabase banner upload failed: ${error.message}`)
  }
}

/**
 * Get current banner URL from Supabase Storage
 * @returns {Promise<string|null>} - The public URL of the current banner or null if not found
 */
export const getCurrentBannerFromSupabase = async () => {
  try {
    const filePath = 'banners/banner.jpg'
    
    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath)

    return urlData?.publicUrl || null
  } catch (error) {
    console.error('Error fetching current banner:', error)
    return null
  }
}

/**
 * Delete current banner from Supabase Storage
 * @returns {Promise<void>}
 */
export const deleteCurrentBannerFromSupabase = async () => {
  try {
    const filePath = 'banners/banner.jpg'
    
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath])

    if (error) {
      throw new Error(`Failed to delete banner: ${error.message}`)
    }
  } catch (error) {
    console.error('Error deleting current banner:', error)
    throw error
  }
}

export default supabase
