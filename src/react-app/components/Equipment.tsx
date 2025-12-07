import { Dumbbell, Target, Activity, Zap } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function Equipment() {
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

  const equipment = [
    {
      category: 'Free Weights',
      icon: Dumbbell,
      items: ['Dumbbells 5-150 lbs', 'Olympic Barbells', 'Weight Plates', 'Kettlebells'],
    },
    {
      category: 'Machines',
      icon: Target,
      items: ['Cable Machines', 'Leg Press', 'Smith Machine', 'Chest Press'],
    },
    {
      category: 'Cardio',
      icon: Activity,
      items: ['Treadmills', 'Ellipticals', 'Rowing Machines', 'Spin Bikes'],
    },
    {
      category: 'Functional',
      icon: Zap,
      items: ['Battle Ropes', 'Suspension Trainers', 'Plyo Boxes', 'Slam Balls'],
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="bebas text-5xl md:text-6xl text-white mb-4">
            PREMIUM <span className="text-gradient-blue">EQUIPMENT</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Top-tier equipment from industry-leading brands
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipment.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl p-8 border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-500 transform ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  
                  <h3 className="bebas text-2xl text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {item.category}
                  </h3>
                  
                  <ul className="space-y-2">
                    {item.items.map((equipment, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3" />
                        {equipment}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
