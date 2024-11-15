import { useEffect, useState } from "react";

const AutoCarousel = ({ images, setSelected }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="max-h-72 max-w-md" onClick={() => setSelected("Offer")}>
      {images &&
        images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item  ${index === currentIndex ? "block" : "hidden"}`}
          >
            <img src={image} className="rounded-box w-full object-cover" />
          </div>
        ))}
    </div>
  );
};

export default AutoCarousel;
