/**
 * Image utility functions for validation and compression
 */

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const COMPRESSION_THRESHOLD = 1 * 1024 * 1024; // 1MB in bytes
const COMPRESSION_QUALITY = 0.8; // 80% quality to maintain good visual quality

/**
 * Validate image file size
 * @param {File} file - The image file to validate
 * @returns {Object} - { valid: boolean, error: string|null, size: number }
 */
export const validateImageSize = (file) => {
  const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Image "${file.name}" is too large (${fileSizeInMB}MB). Maximum size is 2MB.`,
      size: file.size
    };
  }

  return {
    valid: true,
    error: null,
    size: file.size
  };
};

/**
 * Compress image file if it's larger than or equal to 1MB
 * @param {File} file - The image file to compress
 * @returns {Promise<File>} - Compressed file or original if no compression needed
 */
export const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    // If file is smaller than 1MB, return as is
    if (file.size < COMPRESSION_THRESHOLD) {
      resolve(file);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Maintain original dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas to blob with compression
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }

            // Create new File from blob
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            const originalSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            const compressedSizeInMB = (compressedFile.size / (1024 * 1024)).toFixed(2);

            console.log(`Image compressed: ${originalSizeInMB}MB → ${compressedSizeInMB}MB`);

            resolve(compressedFile);
          },
          file.type,
          COMPRESSION_QUALITY
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for compression'));
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Validate and compress multiple images
 * @param {File[]} files - Array of image files
 * @returns {Promise<Object>} - { validFiles: File[], errors: string[] }
 */
export const validateAndCompressImages = async (files) => {
  const validFiles = [];
  const errors = [];

  for (const file of files) {
    // Check if it's an image file
    if (!file.type.startsWith('image/')) {
      errors.push(`"${file.name}" is not a valid image file.`);
      continue;
    }

    // Validate size
    const validation = validateImageSize(file);
    if (!validation.valid) {
      errors.push(validation.error);
      continue;
    }

    try {
      // Compress if needed
      const processedFile = await compressImage(file);
      validFiles.push(processedFile);
    } catch (error) {
      errors.push(`Failed to process "${file.name}": ${error.message}`);
    }
  }

  return { validFiles, errors };
};
