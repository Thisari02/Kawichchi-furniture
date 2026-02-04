
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Factory: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-4xl font-serif mb-6">Our Factory</h2>
              <p className="text-[#2C2C2C]/70 mb-8 leading-relaxed">
                Visit our state-of-the-art production facility where craftsmanship meets technology. Witness the creation of your furniture firsthand.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#BFA57A]/10 flex items-center justify-center text-[#BFA57A] flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Location</h4>
                  <p className="text-[#2C2C2C]/70">No. 45, Industrial Zone, Moratuwa, Sri Lanka</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#BFA57A]/10 flex items-center justify-center text-[#BFA57A] flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Phone</h4>
                  <p className="text-[#2C2C2C]/70">+94 11 2345 678</p>
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

          <div className="lg:col-span-2 h-[450px] rounded-sm overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15847.456637384918!2d79.882193!3d6.786317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae24578b868e88f%3A0xe54e995f92273618!2sMoratuwa%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
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
