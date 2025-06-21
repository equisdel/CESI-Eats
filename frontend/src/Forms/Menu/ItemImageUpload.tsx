import React, { useRef, ChangeEvent } from 'react';

interface ItemImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

export const ItemImageUpload: React.FC<ItemImageUploadProps> = ({
  imageUrl,
  onImageChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

    return (
    <section className="flex flex-col whitespace-nowrap">
      <div
        className="bg-zinc-100 hover:bg-zinc-300 transition-colors rounded-xl aspect-[1.11] w-[159px] flex items-center justify-center cursor-pointer"
        onClick={handleImageClick}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className="object-contain rounded-xl w-full h-full"
        />
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </section>
  );
};
