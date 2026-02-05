
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const workshopImages = [
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=1200&auto=format&fit=crop',
];

const Factory: React.FC = () => {
  return (
    <section id="factory" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Workshop Transparency</h2>
          <p className="text-[#2C2C2C]/70 max-w-3xl mx-auto leading-relaxed">
            Step inside our Moratuwa production floor where master artisans craft every joint, veneer, and finish with uncompromising precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {workshopImages.map((image, index) => (
            <div key={index} className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
              <img
                src={image}
                alt="Kawichchi workshop"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-3xl font-serif mb-4">Moratuwa Production Atelier</h3>
              <p className="text-[#2C2C2C]/70 leading-relaxed">
                From raw timber to polished masterpiece, each stage is documented, inspected, and refined by our in-house specialists.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#BFA57A]/10 flex items-center justify-center text-[#BFA57A] flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Location</h4>
                  <p className="text-[#2C2C2C]/70">No. 324 De Soysa Rd, Moratuwa 10400, Sri Lanka</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#BFA57A]/10 flex items-center justify-center text-[#BFA57A] flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Phone</h4>
                  <p className="text-[#2C2C2C]/70">071 550 5083</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#BFA57A]/10 flex items-center justify-center text-[#BFA57A] flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Email</h4>
                  <p className="text-[#2C2C2C]/70">hello@kawichchi.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#BFA57A]/10 flex items-center justify-center text-[#BFA57A] flex-shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Hours</h4>
                  <p className="text-[#2C2C2C]/70">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 h-[450px] rounded-sm overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-1000 md:grayscale md:hover:grayscale-0">
            <iframe 
              src="https://www.google.com/maps?q=Kawichchi%20by%20Siriwardana%20(Pvt)%20Ltd%2C%20No.%20324%20De%20Soysa%20Rd%2C%20Moratuwa%2010400&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Factory;
