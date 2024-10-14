import { useEffect, useState } from "react";

const AutoCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="max-h-52">
      {images &&
        images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item  ${index === currentIndex ? "block" : "hidden"}`}
          >
            <img src={image} className="rounded-box max-h-52 w-full object-cover" />
          </div>
        ))}
    </div>
  );
};

export default AutoCarousel;
