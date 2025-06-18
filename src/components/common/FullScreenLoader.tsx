// src/components/common/FullScreenLoader.tsx
import React from "react";

export const FullScreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-70 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        <p className="mt-4 text-blue-600 text-sm font-semibold">Memuat data profil...</p>
      </div>
    </div>
  );
};

