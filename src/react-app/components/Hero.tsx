import { ArrowRight, Zap } from 'lucide-react';

interface HeroProps {
  scrollY: number;
}

export default function Hero({ scrollY }: HeroProps) {
  const parallaxOffset = scrollY * 0.5;

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img
          src="https://mocha-cdn.com/019af40a-53cd-73a4-ba49-a263443ce62c/hero-gym.png"
          alt="APEX Fitness Gym"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-cyan-500/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-lime-400">
              <Zap className="w-6 h-6 animate-pulse" fill="currentColor" />
              <span className="text-sm font-bold tracking-widest uppercase">
                Transform Your Life
              </span>
              <Zap className="w-6 h-6 animate-pulse" fill="currentColor" />
            </div>

            <h1 className="bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none">
              <span className="block text-white">UNLEASH YOUR</span>
              <span className="block text-gradient-lime">INNER BEAST</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
              Where champions are forged and limits are shattered. Join the elite.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-lime-400 to-lime-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-lime-400/50 transition-all duration-300 transform hover:scale-105 glow-lime flex items-center space-x-2">
                <span className="text-lg">START YOUR JOURNEY</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-400/10 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300">
                WATCH TOUR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-lime-400/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-lime-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
