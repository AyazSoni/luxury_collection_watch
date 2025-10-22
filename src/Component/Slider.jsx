{/*import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import SlideComponent1 from "./SlideComponent1"; // Import your custom component for Slide 1
import SlideComponent2 from "./SlideComponent2"; // Import your custom component for Slide 2
import SlideComponent3 from "./SlideComponent3"; // Import your custom component for Slide 3
import SlideComponent4 from "./SlideComponent4"; // Import your custom component for Slide 4

export default function Carousel() {
  const slides = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
  ];

  const [curr, setCurr] = useState(0);
  const autoSlide = true;
  const autoSlideInterval = 3000;

  const prev = () =>
    setCurr(curr === 0 ? slides.length - 1 : curr - 1);

  const next = () =>
    setCurr(curr === slides.length - 1 ? 0 : curr + 1);

  useEffect(() => {
    let slideInterval;
    if (autoSlide) {
      slideInterval = setInterval(next, autoSlideInterval);
    }
    return () => clearInterval(slideInterval);
  }, [curr]);

  const renderSlideComponent = (slideId) => {
    switch (slideId) {
      case 1:
        return <SlideComponent1 />;
      case 2:
        return <SlideComponent2 />;
      case 3:
        return <SlideComponent3 />;
      case 4:
        return <SlideComponent4 />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden relative">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id}>{renderSlideComponent(slide.id)}</div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
              transition-all w-3 h-3 bg-white rounded-full
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
          ))}
        </div>
      </div>
    </div>
  );
*/}
