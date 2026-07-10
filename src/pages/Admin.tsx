import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, LogOut, LayoutDashboard, Image as ImageIcon, UploadCloud, Trash2, CheckCircle, X } from 'lucide-react';
import { getGalleryImages, saveGalleryImage, deleteGalleryImage, GalleryImage } from '../utils/galleryStore';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [images, setImages] = useState<GalleryImage[]>([]);

  // Upload State
  const [dragActive, setDragActive] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('');
  const [previewUrls, setPreviewUrls] = useState<{url: string, file: File}[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadImages = async () => {
    const fetched = await getGalleryImages();
    setImages(fetched);
  };

  useEffect(() => {
    const initStorage = async () => {
      if (supabase) {
        try {
          const { data: buckets, error: getError } = await supabase.storage.listBuckets();
          if (!getError) {
            const hasGalleryBucket = buckets.some(b => b.name === 'gallery');
            if (!hasGalleryBucket) {
              await supabase.storage.createBucket('gallery', { public: true });
              console.log('Created gallery bucket');
            }
          }
        } catch (err) {
          console.error('Error initializing storage bucket:', err);
        }
      }
    };

    // Check session storage for admin login status
    const authStatus = sessionStorage.getItem('excel_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      initStorage();
      loadImages();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'tech123') {
      sessionStorage.setItem('excel_admin_auth', 'true');
      setIsAuthenticated(true);
      if (supabase) {
        try {
          const { data: buckets } = await supabase.storage.listBuckets();
          if (buckets && !buckets.some(b => b.name === 'gallery')) {
            await supabase.storage.createBucket('gallery', { public: true });
          }
        } catch (e) {
          console.error('Error on login storage init', e);
        }
      }
      await loadImages();
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('excel_admin_auth');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUrls(prev => [...prev, { url: e.target!.result as string, file }]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePreview = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (previewUrls.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(r => setTimeout(r, 100));
    }

    try {
      // Save all previewed images
      for (const preview of previewUrls) {
        await saveGalleryImage({
          url: preview.url,
          title: uploadTitle || preview.file.name.split('.')[0],
          category: uploadCategory || 'Uncategorized',
          file: preview.file
        });
      }

      await loadImages();
      setPreviewUrls([]);
      setUploadTitle('');
      setUploadCategory('');
      setActiveTab('gallery');
    } catch (error: any) {
      console.error('Upload failed:', error);
      alert('Upload failed: ' + (error.message || 'Please check your database permissions or local storage quota.'));
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteGalleryImage(id);
        await loadImages();
      } catch (error: any) {
        console.error('Delete failed:', error);
        alert('Delete failed: ' + (error.message || 'Please check your database permissions.'));
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-center text-text-main mb-2">Admin Access</h2>
          <p className="text-center text-gray-500 mb-8">Enter the administration password to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-center tracking-widest text-lg"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors shadow-md"
            >
              Access Dashboard
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full py-4 text-gray-500 font-medium rounded-xl hover:bg-gray-100 transition-colors"
            >
              Return to Website
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10 sticky top-0 md:h-screen">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded text-white flex items-center justify-center font-bold">E</div>
          <span className="font-heading font-bold text-lg text-text-main">Admin Portal</span>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {[
            { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
            { id: 'gallery', icon: <ImageIcon size={20} />, label: 'Gallery Management' },
            { id: 'uploads', icon: <UploadCloud size={20} />, label: 'Upload Images' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-10 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold text-text-main mb-2">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'gallery' && 'Gallery Management'}
                {activeTab === 'uploads' && 'Upload Images'}
              </h1>
              <p className="text-gray-500">Manage Excel International School website content.</p>
            </div>
            {activeTab === 'gallery' && (
              <button 
                onClick={() => setActiveTab('uploads')}
                className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm"
              >
                <UploadCloud size={18} /> Add New
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <ImageIcon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-main">{images.length}</h3>
                    <p className="text-sm text-gray-500 font-medium">Gallery Images</p>
                  </div>
                </div>
                
                <div className="bg-primary p-6 rounded-2xl shadow-sm text-white md:col-span-2 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <h3 className="text-xl font-bold mb-2 relative z-10">Welcome back, Administrator</h3>
                  <p className="text-blue-100 max-w-md relative z-10">
                    Use this dashboard to manage the school's public gallery. Changes made here are instantly reflected on the main website.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Gallery Management Tab */}
            {activeTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {images.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                    <ImageIcon size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-lg text-gray-500 mb-6">No images uploaded yet.</p>
                    <button 
                      onClick={() => setActiveTab('uploads')}
                      className="text-primary font-medium hover:underline"
                    >
                      Upload your first image
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                            <th className="py-4 px-6">Image</th>
                            <th className="py-4 px-6">Title</th>
                            <th className="py-4 px-6">Category</th>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {images.map((img) => (
                            <tr key={img.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                              <td className="py-3 px-6">
                                <img src={img.url} alt={img.title} className="w-16 h-12 object-cover rounded shadow-sm" />
                              </td>
                              <td className="py-3 px-6 font-medium text-text-main">{img.title}</td>
                              <td className="py-3 px-6 text-sm text-gray-500">
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{img.category || 'None'}</span>
                              </td>
                              <td className="py-3 px-6 text-sm text-gray-500">
                                {new Date(img.timestamp).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-6 text-right">
                                <button 
                                  onClick={() => handleDelete(img.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete Image"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Upload Tab */}
            {activeTab === 'uploads' && (
              <motion.div
                key="uploads"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-3xl"
              >
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
                  {/* Drag and drop area */}
                  <div 
                    className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                      dragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50 bg-gray-50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />
                    <UploadCloud size={48} className={`mx-auto mb-4 ${dragActive ? 'text-primary' : 'text-gray-400'}`} />
                    <h3 className="text-lg font-medium text-text-main mb-1">Drag and drop images here</h3>
                    <p className="text-gray-500 text-sm mb-6">PNG, JPG, WEBP up to 5MB</p>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-2 bg-white border border-gray-300 text-text-main font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Browse Files
                    </button>
                  </div>

                  {/* Previews & Details */}
                  {previewUrls.length > 0 && (
                    <div className="mt-8 space-y-6">
                      <h4 className="font-bold text-text-main border-b pb-2">Selected Images ({previewUrls.length})</h4>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {previewUrls.map((preview, idx) => (
                          <div key={idx} className="relative group rounded-lg overflow-hidden border border-gray-200">
                            <img src={preview.url} alt="preview" className="w-full h-24 object-cover" />
                            <button 
                              onClick={() => removePreview(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Default Title (Optional)</label>
                          <input 
                            type="text" 
                            value={uploadTitle}
                            onChange={e => setUploadTitle(e.target.value)}
                            placeholder="e.g. Science Fair 2026"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Category (Optional)</label>
                          <input 
                            type="text" 
                            value={uploadCategory}
                            onChange={e => setUploadCategory(e.target.value)}
                            placeholder="e.g. Events, Facilities, Sports"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary outline-none text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">Leave blank for 'Uncategorized'</p>
                        </div>
                      </div>

                      {/* Upload Button & Progress */}
                      <div className="pt-4 border-t border-gray-100">
                        {isUploading ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 font-medium">Uploading images...</span>
                              <span className="text-primary font-bold">{uploadProgress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all duration-100" 
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={handleUpload}
                            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-sm flex items-center justify-center gap-2"
                          >
                            <UploadCloud size={18} /> Upload {previewUrls.length} Image{previewUrls.length > 1 ? 's' : ''} to Gallery
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
