import { useEffect, useState, useRef } from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Weight Loss Journey',
      text: 'APEX Fitness completely transformed my life. Lost 45 pounds in 6 months and gained so much confidence. The trainers are incredibly supportive and knowledgeable.',
      rating: 5,
    },
    {
      name: 'Mike Peterson',
      role: 'Bodybuilding',
      text: 'Best gym I\'ve ever been to. The equipment is top-notch, the atmosphere is motivating, and the community is amazing. Won my first competition thanks to the trainers here!',
      rating: 5,
    },
    {
      name: 'Emily Davis',
      role: 'Fitness Enthusiast',
      text: 'The group classes are incredible! High energy, great music, and amazing instructors. I look forward to my workouts every single day now.',
      rating: 5,
    },
    {
      name: 'James Wilson',
      role: 'Strength Training',
      text: 'Finally found a gym that takes training seriously. The powerlifting area is world-class and the coaching has taken my lifts to new heights.',
      rating: 5,
    },
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-500/5 to-transparent" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="bebas text-5xl md:text-6xl text-white mb-4">
            SUCCESS <span className="text-gradient-lime">STORIES</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real transformations from real people
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-neutral-900 to-black border-2 border-lime-400/30 rounded-3xl p-12 md:p-16 relative overflow-hidden">
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-24 h-24 text-lime-400" />
            </div>
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-lime-400 mx-1"
                    fill="currentColor"
                  />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 italic">
                "{currentTestimonial.text}"
              </p>
              
              <div>
                <h4 className="bebas text-2xl text-white mb-1">
                  {currentTestimonial.name}
                </h4>
                <p className="text-lime-400 text-sm font-medium uppercase tracking-wide">
                  {currentTestimonial.role}
                </p>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-lime-400 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
