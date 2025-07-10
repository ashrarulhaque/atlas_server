import { X, Upload, Music, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import React, { useState, useCallback } from "react";
import { uploadAPI, tasksAPI } from "../lib/api";

type Props = {
  taskId: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ProcessedUploadModal({ onClose, onSuccess, taskId }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a'] },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024,
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      setUploadProgress(50);
      const uploadResult = await uploadAPI.uploadProcessed(file);

      setUploadProgress(75);
      await tasksAPI.submitTask(taskId, uploadResult.fileUrl);
      setUploadProgress(100);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload processed file. Try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upload Processed File</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Processed File
            </label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-[#4E71FF] bg-[#BBFBFF]"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="flex items-center justify-center space-x-2">
                  <Music className="h-8 w-8 text-[#4E71FF]" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {isDragActive
                      ? "Drop the file here..."
                      : "Drag & drop the processed file here, or click to select"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    MP3, WAV, FLAC, AAC, OGG, M4A (max 100MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-atlas-primary-default to-atlas-gold h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!file || uploading}
              className="flex-1 px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-atlas-gold to-atlas-primary-light hover:from-atlas-primary-light hover:to-atlas-gold transition-all duration-300 rounded-md disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Submit Processed</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
