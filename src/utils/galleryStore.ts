// Local storage based simple gallery management

import { supabase } from '../lib/supabase';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  timestamp: number;
}

const STORAGE_KEY = 'excel_gallery_images';

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase fetch error:', error.message, error.details);
        // Fall through to localStorage fallback
      } else {
        return data.map((item: any) => ({
          id: item.id,
          url: item.url,
          title: item.title,
          category: item.category,
          timestamp: new Date(item.created_at).getTime()
        }));
      }
    } catch (err: any) {
      console.error('Supabase connection error:', err.message);
      // Fall through to localStorage fallback
    }
  }

  // Fallback
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse gallery images from localStorage', error);
    return [];
  }
};

export const saveGalleryImage = async (image: Omit<GalleryImage, 'id' | 'timestamp'> & { file?: File }) => {
  if (supabase) {
    try {
      let publicUrl = image.url;

      if (image.file) {
        const fileExt = image.file.name.split('.').pop() || 'jpg';
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, image.file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Supabase storage upload error:', uploadError.message);
          throw uploadError;
        }

        if (uploadData?.path) {
          const { data: urlData } = supabase.storage
            .from('gallery')
            .getPublicUrl(uploadData.path);
            
          if (urlData && urlData.publicUrl) {
            publicUrl = urlData.publicUrl;
          } else {
            throw new Error('Failed to resolve public URL for uploaded file.');
          }
        } else {
           throw new Error('Upload succeeded but no path was returned.');
        }
      }

      const { data, error } = await supabase
        .from('gallery_images')
        .insert([{
          url: publicUrl,
          title: image.title,
          category: image.category
        }])
        .select();
        
      if (error) {
        console.error('Supabase error saving image:', error.message, error.details);
        // If DB insert fails, we should ideally clean up the uploaded file, but we'll fall through
        throw error;
      } else {
        const item = data[0];
        return {
          id: item.id,
          url: item.url,
          title: item.title,
          category: item.category,
          timestamp: new Date(item.created_at).getTime()
        };
      }
    } catch (err: any) {
      console.error('Supabase connection error saving image:', err.message);
      // Fall through
    }
  }

  // Fallback
  const images = await getGalleryImages();
  const newImage: GalleryImage = {
    ...image,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newImage, ...images]));
  return newImage;
};

export const deleteGalleryImage = async (id: string) => {
  if (supabase) {
    try {
      // First get the image to find its url
      const { data: image } = await supabase
        .from('gallery_images')
        .select('url')
        .eq('id', id)
        .single();

      if (image && image.url) {
        try {
          // Extract the filename from the url
          // Assuming url format: .../storage/v1/object/public/gallery/[filename]
          const urlParts = image.url.split('/');
          const fileName = urlParts[urlParts.length - 1];
          if (fileName) {
             await supabase.storage.from('gallery').remove([fileName]);
          }
        } catch (e) {
          console.error('Failed to delete from storage', e);
        }
      }

      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Supabase error deleting image:', error.message, error.details);
        // Fall through
      } else {
        return;
      }
    } catch (err: any) {
      console.error('Supabase connection error deleting image:', err.message);
      // Fall through
    }
  }
  
  // Fallback
  const images = await getGalleryImages();
  const filtered = images.filter((img) => img.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
