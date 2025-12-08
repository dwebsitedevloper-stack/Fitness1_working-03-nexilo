import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import { useEffect, useState, useRef, FormEvent } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const searchParams = new URLSearchParams();

    // Convert FormData to URLSearchParams
    formData.forEach((value, key) => {
      searchParams.append(key, value.toString());
    });

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbw7MM5zpd7V_N7tb06JRgkeWAs6IDK2ZXIeeLxIKfu6TQilcidM4E7Uelf1Ar6x0zAJPA/exec',
        {
          method: 'POST',
          body: searchParams,
        }
      );

      const result = await response.json();

      if (result.result === "success") {
        setFormStatus("Message sent successfully! We'll get back to you soon.");
        form.reset();
        
        // Clear status message after 3 seconds
        setTimeout(() => {
          setFormStatus("");
        }, 3000);
      } else {
        setFormStatus(`Error: ${result.error || 'Something went wrong'}`);
        
        // Clear error message after 3 seconds
        setTimeout(() => {
          setFormStatus("");
        }, 3000);
      }
    } catch (error) {
      setFormStatus(`Error: ${error instanceof Error ? error.message : 'Failed to submit'}`);
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setFormStatus("");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="bebas text-5xl md:text-6xl text-white mb-4">
            GET IN <span className="text-gradient-blue">TOUCH</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to start your transformation? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className={`transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-cyan-400/20 rounded-2xl p-8">
              <h3 className="bebas text-3xl text-white mb-6">Send Us a Message</h3>
              
              <form className="space-y-6" onSubmit={handleSubmit}>


<div>
  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
    Full Name
  </label>
  <input
    type="text"
    id="name"
    name="name"
    required
    disabled={isSubmitting}
    className="w-full px-4 py-3 bg-black border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
    placeholder="John Doe"
    pattern="[A-Za-z\s]+"
    title="Name can contain only letters"
  />
</div>

<div>
  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
    Phone Number
  </label>
  <input
    type="tel"
    id="phone"
    name="number"
    required
    disabled={isSubmitting}
    className="w-full px-4 py-3 bg-black border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
    placeholder="1234567890"
    pattern="\d{10}"
    title="Phone number must be 10 digits"
  />
</div>




                {/* <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-black border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
              
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="number"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-black border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div> */}
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-black border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none disabled:opacity-50"
                    placeholder="Tell us about your fitness goals..."
                  />
                </div>
                
                {/* Status Message */}
                {formStatus && (
                  <div className={`p-4 rounded-lg border ${
                    formStatus.includes('Error') 
                      ? 'bg-red-900/20 border-red-500 text-red-400' 
                      : 'bg-green-900/20 border-green-500 text-green-400'
                  }`}>
                    {formStatus}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div
            className={`space-y-8 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            {/* Contact Details */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-cyan-400/20 rounded-2xl p-8 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Location</h4>
                  <p className="text-gray-400 text-sm">
                    123 Fitness Avenue<br />
                    Downtown District, NY 10001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone</h4>
                  <p className="text-gray-400 text-sm">
                    +1 (555) 123-4567<br />
                    +1 (555) 765-4321
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-gray-400 text-sm">
                    info@apexfitness.com<br />
                    support@apexfitness.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Hours</h4>
                  <p className="text-gray-400 text-sm">
                    Mon-Fri: 5:00 AM - 11:00 PM<br />
                    Sat-Sun: 6:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-cyan-400/20 rounded-2xl p-8">
              <h3 className="bebas text-2xl text-white mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.youtube.com/"
                  className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center hover:bg-cyan-400/20 transition-colors group"
                >
                  <Instagram className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center hover:bg-cyan-400/20 transition-colors group"
                >
                  <Facebook className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-cyan-400/10 rounded-lg flex items-center justify-center hover:bg-cyan-400/20 transition-colors group"
                >
                  <Youtube className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-neutral-900 to-black border border-cyan-400/20 rounded-2xl overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919355!2d-74.00425878459391!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1560412335495!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}