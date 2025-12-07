import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GymShowcaseProps {
  scrollY: number;
}

export default function GymShowcase({ scrollY }: GymShowcaseProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const areas = [
    {
      title: 'Weightlifting Zone',
      description: 'Premium equipment for serious strength training',
      image: 'https://mocha-cdn.com/019af40a-53cd-73a4-ba49-a263443ce62c/weights-area.png',
    },
    {
      title: 'Cardio Zone',
      description: 'State-of-the-art cardio machines with entertainment',
      image: 'https://mocha-cdn.com/019af40a-53cd-73a4-ba49-a263443ce62c/cardio-zone.png',
    },
    {
      title: 'CrossFit Arena',
      description: 'Functional training space for high-intensity workouts',
      image: 'https://mocha-cdn.com/019af40a-53cd-73a4-ba49-a263443ce62c/crossfit-area.png',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="py-24 bg-neutral-950 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="bebas text-5xl md:text-6xl text-white mb-4">
            WORLD-CLASS <span className="text-gradient-lime">FACILITIES</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience premium training environments designed for peak performance
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/80 border border-lime-400/30 rounded-full text-lime-400 hover:bg-lime-400/20 transition-all duration-300 hidden md:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            {areas.map((area, index) => (
              <div
                key={index}
                className="flex-none w-[90%] md:w-[500px] snap-center group"
              >
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="bebas text-3xl text-white mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-300">
                      {area.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{area.description}</p>
                    <div className="mt-4 w-16 h-1 bg-gradient-to-r from-lime-400 to-transparent rounded transform origin-left group-hover:scale-x-150 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/80 border border-lime-400/30 rounded-full text-lime-400 hover:bg-lime-400/20 transition-all duration-300 hidden md:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
