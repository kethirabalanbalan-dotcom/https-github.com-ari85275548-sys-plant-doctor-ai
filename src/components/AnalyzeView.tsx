import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Image as ImageIcon,
  SwitchCamera,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/translations';
import { validateImageQuality, ImageValidationResult } from '../utils/imageValidator';
import { SAMPLE_PLANTS, SampleLeaf } from '../utils/sampleImages';

interface AnalyzeViewProps {
  currentLanguage: Language;
  initialMode?: 'upload' | 'camera';
  preloadedSample?: SampleLeaf | null;
  onStartAnalysis: (base64Image: string, mimeType?: string) => void;
  onClearPreloadedSample: () => void;
}

export const AnalyzeView: React.FC<AnalyzeViewProps> = ({
  currentLanguage,
  initialMode = 'upload',
  preloadedSample,
  onStartAnalysis,
  onClearPreloadedSample
}) => {
  const t = UI_TRANSLATIONS[currentLanguage];

  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'samples'>(
    preloadedSample ? 'samples' : initialMode
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(
    preloadedSample ? preloadedSample.imageUrl : null
  );
  const [imageMime, setImageMime] = useState<string>('image/jpeg');

  const [validation, setValidation] = useState<ImageValidationResult | null>(null);
  const [validating, setValidating] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Camera states
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Check validation whenever selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      setValidating(true);
      validateImageQuality(selectedImage)
        .then((res) => {
          setValidation(res);
        })
        .finally(() => {
          setValidating(false);
        });
    } else {
      setValidation(null);
    }
  }, [selectedImage]);

  // Handle preloaded sample
  useEffect(() => {
    if (preloadedSample) {
      setSelectedImage(preloadedSample.imageUrl);
      setActiveTab('samples');
    }
  }, [preloadedSample]);

  // Handle Camera Stream Start / Stop
  const startCamera = async (facing: 'environment' | 'user' = cameraFacing) => {
    stopCamera();
    setCameraError(null);
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.warn('Camera error:', err);
      setCameraError(
        'Unable to access camera. Please allow camera permissions or upload an image instead.'
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    if (activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    startCamera(nextFacing);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setSelectedImage(dataUrl);
    setImageMime('image/jpeg');
    stopCamera();
    // Immediately start AI disease diagnosis
    onStartAnalysis(dataUrl, 'image/jpeg');
  };

  // File upload handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, WebP).');
      return;
    }
    setImageMime(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedImage(dataUrl);
      // Immediately start AI disease diagnosis so the user sees the disease result right away
      onStartAnalysis(dataUrl, file.type);
    };
    reader.readAsDataURL(file);
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleResetImage = () => {
    setSelectedImage(null);
    setValidation(null);
    onClearPreloadedSample();
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  const handleRunAnalysis = () => {
    if (!selectedImage) return;
    onStartAnalysis(selectedImage, imageMime);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Title & Instructions */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 flex items-center justify-center space-x-2">
          <Sparkles className="w-6 h-6 text-emerald-600" />
          <span>{t.analyzePlantBtn}</span>
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
          Capture or upload a clear photo of the infected leaf or whole plant. AI will validate quality and inspect for diseases.
        </p>
      </div>

      {/* Main Mode Tabs */}
      {!selectedImage && (
        <div className="flex p-1.5 bg-stone-100 dark:bg-stone-800 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'upload'
                ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>{t.uploadPhoto}</span>
          </button>

          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'camera'
                ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{t.takePhoto}</span>
          </button>

          <button
            onClick={() => setActiveTab('samples')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-all ${
              activeTab === 'samples'
                ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{t.trySample}</span>
          </button>
        </div>
      )}

      {/* Mode Viewports (When no image is selected yet) */}
      {!selectedImage && (
        <div className="bg-white dark:bg-stone-800/90 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-sm overflow-hidden">
          
          {/* 1. Upload Dropzone */}
          {activeTab === 'upload' && (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-14 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20'
                  : 'border-stone-300 dark:border-stone-600 hover:border-emerald-400 hover:bg-stone-50/50 dark:hover:bg-stone-800/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 stroke-[1.8]" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-1">
                {t.selectOrDrop}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-4">
                Supports JPG, PNG, WEBP files up to 20MB. Clear close-up photos of leaves produce the most reliable diagnostic scores.
              </p>
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
              >
                Browse Files
              </button>
            </div>
          )}

          {/* 2. Live Camera View */}
          {activeTab === 'camera' && (
            <div className="space-y-4">
              {cameraError ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-semibold text-rose-700 dark:text-rose-300 max-w-md mx-auto">
                    {cameraError}
                  </p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                  >
                    Switch to Photo Upload
                  </button>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-stone-950 aspect-4/3 max-w-md mx-auto shadow-inner">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* Viewfinder Target Framing Guide (Matching Screen 2) */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6">
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                      {/* 4 Corner Bracket Borders */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl"></div>
                    </div>

                    <p className="text-xs font-bold text-white/90 drop-shadow-md text-center mt-6 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full">
                      Place the plant within the frame for best results
                    </p>
                  </div>

                  {/* Camera Controls Overlay (Matching Screen 2) */}
                  <div className="absolute bottom-5 inset-x-0 flex items-center justify-around px-8">
                    {/* Gallery / File Picker */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer shadow-lg"
                      title={t.uploadPhoto}
                    >
                      <ImageIcon className="w-5 h-5" />
                    </button>

                    {/* Big Green Central Shutter Button */}
                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="w-18 h-18 rounded-full bg-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform border-4 border-emerald-500 cursor-pointer"
                      title={t.capturePhoto}
                    >
                      <div className="w-13 h-13 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                        <Camera className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    </button>

                    {/* Flip Camera */}
                    <button
                      type="button"
                      onClick={toggleCameraFacing}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer shadow-lg"
                      title={t.switchCamera}
                    >
                      <SwitchCamera className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Sample Leaves Quick Selection */}
          {activeTab === 'samples' && (
            <div className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Select a pre-configured diseased or healthy leaf from our experimental dataset:
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {SAMPLE_PLANTS.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => {
                      setSelectedImage(sample.imageUrl);
                      onStartAnalysis(sample.imageUrl, 'image/jpeg');
                    }}
                    className="cursor-pointer rounded-2xl bg-stone-50 dark:bg-stone-900 p-3 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 hover:shadow-md transition-all group"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-2 relative">
                      <img
                        src={sample.imageUrl}
                        alt={sample.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className={`absolute top-1.5 right-1.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm text-white ${
                        sample.status === 'Healthy'
                          ? 'bg-emerald-600'
                          : sample.status === 'Invalid'
                          ? 'bg-rose-600'
                          : 'bg-amber-600'
                      }`}>
                        {sample.status}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                      {sample.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                      {sample.disease || sample.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Preview & Pre-Analysis Quality Card (When Image Is Selected) */}
      {selectedImage && (
        <div className="bg-white dark:bg-stone-800 rounded-3xl border border-stone-200 dark:border-stone-700 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-700">
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Plant Photo Ready for AI Diagnosis</span>
            </h3>
            <button
              onClick={handleResetImage}
              className="text-xs font-bold text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.changeImage}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Image Preview */}
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-sm flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Selected plant leaf"
                className="w-full h-full object-contain"
              />
              <button
                onClick={handleResetImage}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                title={t.removeImage}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quality & Pre-Analysis Indicators */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-3">
                <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Image Quality Assessment</span>
                  {validating ? (
                    <span className="text-[10px] text-emerald-600 animate-pulse">Checking quality...</span>
                  ) : (
                    <span className={`text-xs font-extrabold ${
                      (validation?.qualityScore || 0) > 70 ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                      {validation?.qualityScore}% Score
                    </span>
                  )}
                </h4>

                <div className="space-y-2 text-xs">
                  {/* Resolution check */}
                  <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                    <span>Resolution</span>
                    <span className="font-semibold">
                      {validation ? `${validation.width} × ${validation.height}px` : 'Analyzing...'}
                    </span>
                  </div>

                  {/* Brightness check */}
                  <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                    <span>Lighting / Brightness</span>
                    <span className={`font-semibold ${
                      validation?.isTooDark
                        ? 'text-rose-600'
                        : validation?.isTooBright
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}>
                      {validation?.isTooDark ? 'Too Dark' : validation?.isTooBright ? 'Overexposed' : 'Optimal'}
                    </span>
                  </div>

                  {/* Blur check */}
                  <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                    <span>Focus / Sharpness</span>
                    <span className={`font-semibold ${validation?.isBlurry ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {validation?.isBlurry ? 'Low Contrast / Soft' : 'Sharp'}
                    </span>
                  </div>
                </div>

                {/* Warning notification if quality issues detected */}
                {validation?.warningMessage && (
                  <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs flex items-start space-x-2">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{validation.warningMessage}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleRunAnalysis}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.99] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.startAnalysis}</span>
                </button>

                <button
                  onClick={handleResetImage}
                  className="w-full py-2 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 text-xs font-semibold"
                >
                  {t.changeImage}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botanical Guidelines footer tip */}
      <div className="rounded-2xl p-4 bg-emerald-50/50 dark:bg-stone-800/40 border border-emerald-100 dark:border-stone-700/60 text-xs text-stone-600 dark:text-stone-400 flex items-start space-x-3">
        <Info className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-stone-900 dark:text-stone-100">Photography tips for high diagnostic confidence: </span>
          Hold camera 4 to 8 inches away from the affected leaf. Ensure good natural daylight. Avoid capturing hands or background shadows over the leaf surface.
        </div>
      </div>

    </div>
  );
};
