import { Users, Award, Calendar, TrendingUp } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Users, label: 'Members Trained', value: '5000+', color: 'lime' },
    { icon: Award, label: 'Expert Trainers', value: '25+', color: 'cyan' },
    { icon: Calendar, label: 'Years Experience', value: '12+', color: 'lime' },
    { icon: TrendingUp, label: 'Success Rate', value: '98%', color: 'cyan' },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-black to-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isLime = stat.color === 'lime';
            
            return (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`p-4 rounded-2xl ${
                      isLime
                        ? 'bg-lime-400/10 border border-lime-400/30'
                        : 'bg-cyan-400/10 border border-cyan-400/30'
                    }`}
                  >
                    <Icon
                      className={`w-8 h-8 ${
                        isLime ? 'text-lime-400' : 'text-cyan-400'
                      }`}
                    />
                  </div>
                </div>
                <div
                  className={`bebas text-4xl md:text-5xl mb-2 ${
                    isLime ? 'text-gradient-lime' : 'text-gradient-blue'
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
