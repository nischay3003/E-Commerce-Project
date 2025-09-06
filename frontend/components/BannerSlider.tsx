import React, { useState, useEffect, useCallback } from 'react';
import Banner from './Banner';

interface BannerData {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  bgColorClasses: string;
}

interface BannerSliderProps {
  banners: BannerData[];
  autoPlayInterval?: number;
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const goToNext = useCallback(() => {
    setCurrentIndex(prevIndex => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
  }, [banners.length]);
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };
  
  useEffect(() => {
    if (autoPlayInterval > 0 && banners.length > 1) {
      const slideTimer = setInterval(goToNext, autoPlayInterval);
      return () => clearInterval(slideTimer);
    }
  }, [goToNext, autoPlayInterval, banners.length]);

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden shadow-lg mb-8">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <Banner key={index} {...banner} />
        ))}
      </div>

      {/* Navigation (only if more than one banner) */}
      {banners.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevious} 
            className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={goToNext} 
            className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
            {banners.map((_, slideIndex) => (
              <button 
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                aria-label={`Go to slide ${slideIndex + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BannerSlider;
