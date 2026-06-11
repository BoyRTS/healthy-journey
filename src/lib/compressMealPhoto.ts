export type CompressMealPhotoOptions = {
  maxSide?: number;
  quality?: number;
  mimeType?: "image/webp" | "image/jpeg";
};

export type CompressedMealPhoto = {
  file: File;
  width: number;
  height: number;
  originalSize: number;
  compressedSize: number;
  mimeType: string;
};

const DEFAULT_MAX_SIDE = 1280;
const DEFAULT_QUALITY = 0.8;
const DEFAULT_MIME_TYPE = "image/webp";

export async function compressMealPhoto(
  sourceFile: File,
  options: CompressMealPhotoOptions = {},
): Promise<CompressedMealPhoto> {
  if (!sourceFile.type.startsWith("image/")) {
    throw new Error("Meal homework must be an image file.");
  }

  const maxSide = options.maxSide ?? DEFAULT_MAX_SIDE;
  const quality = options.quality ?? DEFAULT_QUALITY;
  const mimeType = options.mimeType ?? DEFAULT_MIME_TYPE;
  const bitmap = await createImageBitmap(sourceFile);
  const { width, height } = getResizedDimensions(bitmap.width, bitmap.height, maxSide);
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();
    throw new Error("Could not prepare image compression canvas.");
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await canvasToBlob(canvas, mimeType, quality);
  const extension = mimeType === "image/webp" ? "webp" : "jpg";
  const fileName = replaceFileExtension(sourceFile.name, extension);
  const file = new File([blob], fileName, {
    lastModified: Date.now(),
    type: blob.type || mimeType,
  });

  return {
    file,
    width,
    height,
    originalSize: sourceFile.size,
    compressedSize: file.size,
    mimeType: file.type,
  };
}

function getResizedDimensions(width: number, height: number, maxSide: number) {
  const longestSide = Math.max(width, height);

  if (longestSide <= maxSide) {
    return { width, height };
  }

  const scale = maxSide / longestSide;

  return {
    width: Math.round(width * scale),
    height: Math.round(height * scale),
  };
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: "image/webp" | "image/jpeg",
  quality: number,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }

        reject(new Error("Could not compress meal photo."));
      },
      mimeType,
      quality,
    );
  });
}

function replaceFileExtension(fileName: string, extension: string) {
  const baseName = fileName.replace(/\.[^/.]+$/, "");

  return `${baseName || "meal-homework"}.${extension}`;
}
