# Supabase Setup Guide

## 🚀 Quick Setup

### 1. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### 2. Get Your Supabase Credentials
1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Go to **Settings** → **API**
4. Copy your:
   - **Project URL**
   - **API Key** (anon/public key)

### 3. Update Supabase Configuration
Edit `src/Supabase.jsx` and replace these values:

```javascript
const supabaseUrl = 'your_project_url' // Replace with your Supabase project URL
const supabaseKey = 'your_supabase_api_key' // Replace with your Supabase API key
```

### 4. Create Storage Bucket
1. In your Supabase dashboard, go to **Storage**
2. Create a new bucket named `products`
3. Set bucket to **Public** (so images can be accessed via URL)

## 📁 File Structure

```
Firebase (Database)     Supabase (Storage)
├── products/          ├── products/
│   ├── product1.jpg   │   ├── 1234567890_abc123.jpg
│   └── product2.jpg   │   └── 1234567891_def456.jpg
└── banners/           └── banners/
    └── banner.jpg         └── banner.jpg
```

## 🔧 How It Works

### Database (Firebase)
- Stores product data: name, category, price, description
- Stores image URLs (pointing to Supabase storage)

### Storage (Supabase)
- Stores actual image files
- Generates public URLs for images
- Handles file uploads/deletions

## 🎯 Benefits

✅ **Firebase**: Fast, reliable database with real-time features  
✅ **Supabase**: Better file storage with CDN, cheaper pricing  
✅ **Hybrid**: Best of both worlds!

## 🚨 Important Notes

1. **Update your credentials** in `src/Supabase.jsx`
2. **Create the `products` bucket** in Supabase dashboard
3. **Set bucket to public** for image access
4. **Test upload** with a small image first

## 🧪 Testing

After setup, test by:
1. Adding a product through admin panel
2. Check if images appear in Supabase Storage
3. Verify product data in Firebase Firestore

## 📞 Support

If you encounter issues:
1. Check Supabase dashboard for errors
2. Verify bucket permissions
3. Check browser console for error messages
