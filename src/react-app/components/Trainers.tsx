import { useState, useEffect, useRef } from 'react';
import { Award, Star } from 'lucide-react';

export default function Trainers() {
  const [isVisible, setIsVisible] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
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

  const trainers = [
    {
      name: 'Marcus Steel',
      specialization: 'Strength & Conditioning',
      image: 'https://mocha-cdn.com/019af40a-53cd-73a4-ba49-a263443ce62c/trainer-1.png',
      bio: '15+ years experience in powerlifting and Olympic weightlifting. Former national champion.',
      certifications: ['CSCS', 'USAW Level 2', 'Precision Nutrition'],
    },
    {
      name: 'Elena Rodriguez',
      specialization: 'HIIT & Fat Loss',
      image: 'https://mocha-cdn.com/019af40a-53cd-73a4-ba49-a263443ce62c/trainer-2.png',
      bio: 'Specialized in metabolic conditioning and body transformation programs. 500+ clients transformed.',
      certifications: ['NASM-CPT', 'CrossFit L2', 'TRX Certified'],
    },
    {
      name: 'David Chen',
      specialization: 'Bodybuilding & Hypertrophy',
      image: 'https://mocha-cdn.com/019af40a-53cd-73a4-ba49-a263443ce62c/trainer-3.png',
      bio: 'Professional bodybuilder and nutrition expert. Specializes in muscle building and contest prep.',
      certifications: ['IFBB Pro Card', 'ISSA-CFT', 'Sports Nutrition'],
    },
  ];

  return (
    <section id="trainers" ref={sectionRef} className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="bebas text-5xl md:text-6xl text-white mb-4">
            ELITE <span className="text-gradient-lime">TRAINERS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Learn from the best in the industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="relative h-[500px] cursor-pointer perspective-1000"
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                    flippedCard === index ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front of Card */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="relative h-full rounded-2xl overflow-hidden group">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center space-x-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 text-lime-400"
                              fill="currentColor"
                            />
                          ))}
                        </div>
                        <h3 className="bebas text-3xl text-white mb-2">
                          {trainer.name}
                        </h3>
                        <p className="text-lime-400 text-sm font-medium uppercase tracking-wide">
                          {trainer.specialization}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="h-full bg-gradient-to-br from-lime-500/20 to-neutral-900 border-2 border-lime-400/30 rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="bebas text-3xl text-white mb-4">
                          {trainer.name}
                        </h3>
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                          {trainer.bio}
                        </p>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <Award className="w-5 h-5 text-lime-400" />
                          <span className="text-lime-400 font-semibold text-sm uppercase tracking-wide">
                            Certifications
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {trainer.certifications.map((cert, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-lime-400/10 border border-lime-400/30 rounded-full text-lime-400 text-xs font-medium"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
