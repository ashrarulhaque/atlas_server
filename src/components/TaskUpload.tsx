import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAuth } from "../hooks/useAuth";
import { uploadAPI, tasksAPI } from "../lib/api";
import { Upload, X, Music, Loader2 } from "lucide-react";

interface TaskUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function TaskUpload({ onClose, onSuccess }: TaskUploadProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const audioFile = acceptedFiles[0];
      if (audioFile) {
        setFile(audioFile);
        if (!title) {
          setTitle(audioFile.name.replace(/\.[^/.]+$/, ""));
        }
      }
    },
    [title]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/*": [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"],
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const getDurationFromFile = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.onloadedmetadata = () => {
        resolve(Math.ceil(audio.duration / 60)); // Convert to minutes and round up
      };
      audio.onerror = () => resolve(5); // Default to 5 minutes if can't read
      audio.src = URL.createObjectURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !user) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Get duration
      const duration = await getDurationFromFile(file);

      // ✅ Calculate price correctly
      let totalPrice = 4000;
      if (duration > 10) {
        const extraDuration = Math.ceil(duration / 5) - 2;
        totalPrice = 4000 + extraDuration * 1000;
      }

      // Upload file
      setUploadProgress(50);
      const uploadResult = await uploadAPI.uploadAudio(file);

      // Create task
      setUploadProgress(75);
      await tasksAPI.createTask({
        title,
        description,
        original_file_url: uploadResult.fileUrl,
        duration_minutes: duration,
        price_cents: totalPrice,
        status: "pending",
      });

      setUploadProgress(100);
      onSuccess();
    } catch (error) {
      console.error("Error uploading task:", error);
      alert("Error uploading task. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upload Audio Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E71FF] focus:border-[#4E71FF]"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E71FF] focus:border-[#4E71FF]"
              placeholder="Describe what you need done..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Audio File
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
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>
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
                      ? "Drop the audio file here..."
                      : "Drag & drop an audio file here, or click to select"}
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
              className="flex-1 text-sm bg-gradient-to-r from-atlas-gold to-atlas-primary-light text-white font-bold px-4 py-2 hover:from-atlas-primary-light hover:to-atlas-gold transition-all duration-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload Task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
