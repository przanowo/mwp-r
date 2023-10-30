import React, { useState } from 'react';

const ImageGallery = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center'>
      <button
        onClick={handlePrev}
        className='absolute left-8 text-white text-8xl'
      >
        ‹
      </button>
      <img
        src={images[currentIndex]}
        alt={`Gallery ${currentIndex}`}
        className='max-w-full max-h-full p-24'
      />
      <button
        onClick={handleNext}
        className='absolute right-8 text-white text-8xl'
      >
        ›
      </button>
      <button
        onClick={onClose}
        className='absolute bottom-4 right-4 text-white text-4xl'
      >
        Close ×
      </button>
    </div>
  );
};

export default ImageGallery;
