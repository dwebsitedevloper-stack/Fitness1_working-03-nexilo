import { Flame, Heart, Dumbbell, Users, Zap, Target } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function Programs() {
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

  const programs = [
    {
      title: 'Weight Loss',
      icon: Flame,
      description: 'High-intensity programs designed to burn fat and transform your physique',
      color: 'lime',
      features: ['Cardio Training', 'Nutrition Coaching', 'Progress Tracking'],
    },
    {
      title: 'Bodybuilding',
      icon: Dumbbell,
      description: 'Build muscle mass and sculpt your dream physique with expert guidance',
      color: 'cyan',
      features: ['Hypertrophy Training', 'Supplement Plans', 'Competition Prep'],
    },
    {
      title: 'Personal Training',
      icon: Target,
      description: 'One-on-one customized training sessions tailored to your goals',
      color: 'lime',
      features: ['Custom Programs', 'Form Correction', 'Accountability'],
    },
    {
      title: 'Group Fitness',
      icon: Users,
      description: 'High-energy group classes that motivate and push your limits',
      color: 'cyan',
      features: ['HIIT Classes', 'Spin Classes', 'Boot Camps'],
    },
    {
      title: 'Strength Training',
      icon: Zap,
      description: 'Build functional strength and power with progressive overload methods',
      color: 'lime',
      features: ['Powerlifting', 'Olympic Lifting', 'Strongman'],
    },
    {
      title: 'Athletic Performance',
      icon: Heart,
      description: 'Sport-specific training to enhance your athletic capabilities',
      color: 'cyan',
      features: ['Speed Training', 'Agility Work', 'Conditioning'],
    },
  ];

  return (
    <section id="programs" ref={sectionRef} className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-lime-500/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="bebas text-5xl md:text-6xl text-white mb-4">
            FITNESS <span className="text-gradient-blue">PROGRAMS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose from our comprehensive range of training programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            const isLime = program.color === 'lime';
            
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl p-8 border ${
                  isLime ? 'border-lime-400/20 hover:border-lime-400/50' : 'border-cyan-400/20 hover:border-cyan-400/50'
                } transition-all duration-500 hover:-translate-y-2 transform ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  isLime ? 'from-lime-500/5' : 'from-cyan-500/5'
                } to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                    isLime ? 'bg-lime-400/10' : 'bg-cyan-400/10'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${isLime ? 'text-lime-400' : 'text-cyan-400'}`} />
                  </div>
                  
                  <h3 className={`bebas text-2xl text-white mb-3 ${
                    isLime ? 'group-hover:text-lime-400' : 'group-hover:text-cyan-400'
                  } transition-colors duration-300`}>
                    {program.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {program.features.map((feature, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full mr-3 ${
                          isLime ? 'bg-lime-400' : 'bg-cyan-400'
                        }`} />
                        {feature}
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
