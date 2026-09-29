export interface ImageValidationResult {
  width: number;
  height: number;
  brightness: number; // 0 - 255
  contrast: number; // std dev
  isTooDark: boolean;
  isTooBright: boolean;
  isLowRes: boolean;
  isBlurry: boolean;
  qualityScore: number; // 0 - 100
  warningMessage?: string;
}

export function validateImageQuality(imageUrlOrBase64: string): Promise<ImageValidationResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;

      // Create a modest-sized canvas for quick pixel analysis
      const canvas = document.createElement('canvas');
      const sampleWidth = Math.min(width, 200);
      const sampleHeight = Math.min(height, 200);
      canvas.width = sampleWidth;
      canvas.height = sampleHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve({
          width,
          height,
          brightness: 128,
          contrast: 50,
          isTooDark: false,
          isTooBright: false,
          isLowRes: width < 250 || height < 250,
          isBlurry: false,
          qualityScore: 85
        });
        return;
      }

      ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
      const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
      const data = imageData.data;

      let totalBrightness = 0;
      const pixelCount = sampleWidth * sampleHeight;
      const luminanceValues: number[] = new Array(pixelCount);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // Standard relative luminance formula
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        luminanceValues[i / 4] = lum;
        totalBrightness += lum;
      }

      const avgBrightness = totalBrightness / pixelCount;

      // Compute variance & contrast
      let varianceSum = 0;
      for (let i = 0; i < pixelCount; i++) {
        varianceSum += Math.pow(luminanceValues[i] - avgBrightness, 2);
      }
      const contrast = Math.sqrt(varianceSum / pixelCount);

      const isTooDark = avgBrightness < 42;
      const isTooBright = avgBrightness > 225;
      const isLowRes = width < 300 || height < 300;
      const isBlurry = contrast < 18;

      let qualityScore = 100;
      if (isTooDark) qualityScore -= 35;
      if (isTooBright) qualityScore -= 30;
      if (isLowRes) qualityScore -= 25;
      if (isBlurry) qualityScore -= 30;
      qualityScore = Math.max(15, Math.min(100, qualityScore));

      let warningMessage: string | undefined;
      if (isTooDark) {
        warningMessage = '⚠️ Photo is very dark. Ensure good sunlight or indoor lighting on the leaf.';
      } else if (isTooBright) {
        warningMessage = '⚠️ Photo is washed out / overexposed. Avoid harsh direct flash reflecting on the leaf.';
      } else if (isBlurry) {
        warningMessage = '⚠️ Photo appears blurry or low contrast. Focus closer on the affected leaf area.';
      } else if (isLowRes) {
        warningMessage = '⚠️ Low resolution image detected. A clearer photo provides higher AI accuracy.';
      }

      resolve({
        width,
        height,
        brightness: Math.round(avgBrightness),
        contrast: Math.round(contrast),
        isTooDark,
        isTooBright,
        isLowRes,
        isBlurry,
        qualityScore,
        warningMessage
      });
    };

    img.onerror = () => {
      resolve({
        width: 0,
        height: 0,
        brightness: 128,
        contrast: 40,
        isTooDark: false,
        isTooBright: false,
        isLowRes: false,
        isBlurry: false,
        qualityScore: 70
      });
    };

    img.src = imageUrlOrBase64;
  });
}
