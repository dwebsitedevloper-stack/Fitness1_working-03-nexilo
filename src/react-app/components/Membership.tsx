import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function Membership() {
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

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: '49',
      period: 'month',
      description: 'Perfect for beginners',
      features: [
        'Gym Access (6AM-10PM)',
        'Standard Equipment',
        'Locker Room Access',
        'Free Fitness Assessment',
        'Mobile App Access',
      ],
      color: 'cyan',
      popular: false,
    },
    {
      name: 'Pro',
      icon: Crown,
      price: '129',
      period: 'quarter',
      description: 'Most popular choice',
      features: [
        'Everything in Starter',
        '24/7 Gym Access',
        '2 Personal Training Sessions',
        'Group Class Access',
        'Nutrition Consultation',
        'Guest Pass (2/month)',
      ],
      color: 'lime',
      popular: true,
    },
    {
      name: 'Elite',
      icon: Rocket,
      price: '449',
      period: 'year',
      description: 'Ultimate fitness package',
      features: [
        'Everything in Pro',
        'Unlimited Personal Training',
        'Priority Class Booking',
        'Monthly Body Composition',
        'Supplement Discounts',
        'Free Merchandise',
        'VIP Lounge Access',
      ],
      color: 'cyan',
      popular: false,
    },
  ];

  return (
    <section id="membership" ref={sectionRef} className="py-24 bg-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="bebas text-5xl md:text-6xl text-white mb-4">
            MEMBERSHIP <span className="text-gradient-lime">PLANS</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isLime = plan.color === 'lime';
            
            return (
              <div
                key={index}
                className={`relative transform transition-all duration-700 hover:-translate-y-4 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                } ${plan.popular ? 'md:scale-105' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="px-4 py-1 bg-gradient-to-r from-lime-400 to-lime-500 text-black text-xs font-bold rounded-full uppercase tracking-wide">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`relative bg-gradient-to-br from-neutral-900 to-black rounded-2xl p-8 border-2 ${
                  isLime ? 'border-lime-400/30' : 'border-cyan-400/30'
                } ${plan.popular ? 'border-glow-lime' : ''} group hover:border-glow-${plan.color} transition-all duration-500`}>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      isLime ? 'bg-lime-400/10' : 'bg-cyan-400/10'
                    }`}>
                      <Icon className={`w-7 h-7 ${isLime ? 'text-lime-400' : 'text-cyan-400'}`} />
                    </div>
                  </div>
                  
                  <h3 className="bebas text-3xl text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className={`bebas text-5xl ${
                        isLime ? 'text-gradient-lime' : 'text-gradient-blue'
                      }`}>
                        ${plan.price}
                      </span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-300 text-sm">
                        <Check className={`w-5 h-5 mr-3 flex-shrink-0 ${
                          isLime ? 'text-lime-400' : 'text-cyan-400'
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 ${
                    isLime
                      ? 'bg-gradient-to-r from-lime-400 to-lime-500 text-black hover:shadow-2xl hover:shadow-lime-400/50'
                      : 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10'
                  } ${plan.popular ? 'glow-lime' : ''}`}>
                    {plan.popular ? 'Get Started' : 'Choose Plan'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            All plans include a 7-day money-back guarantee. No contracts, cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
