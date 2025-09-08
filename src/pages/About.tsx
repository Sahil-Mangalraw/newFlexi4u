import React, { useEffect, useState } from 'react';
import { Heart, Target, Users } from 'lucide-react';

// Import images with error handling
const piyushImg = new URL('/assets/piyush.jpg', import.meta.url).href;
const laxmiImg = new URL('/assets/Laxminarayan.jpg', import.meta.url).href;
const gauravImg = new URL('/assets/gaurav.jpg', import.meta.url).href;

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const founders = [
    {
      name: 'Piyush Kumar',
      role: 'Founder',
      description: 'Blending healthcare with technology to create innovative solutions for better patient care.',
      image: piyushImg
    },
    {
      name: 'Khatik Laxminarayan',
      role: 'Co-founder',
      description: 'Passionate about patient care and ensuring every individual receives quality healthcare.',
      image: laxmiImg
    },
    {
      name: 'Gaurav Kumar',
      role: 'Co-founder',
      description: 'Connecting physiotherapy to daily health routines for sustainable wellness.',
      image: gauravImg
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-900 to-amber-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">About Flexi4U</h1>
            <p className="text-2xl text-amber-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Technology meets Compassion
            </p>
            <p className="text-xl text-amber-200 max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing healthcare by making quality physiotherapy and wellness 
              services accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-4">
                  <Target className="w-8 h-8 text-amber-900 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To democratize healthcare by providing personalized, technology-driven physiotherapy 
                  and wellness services that are accessible, affordable, and effective. We believe 
                  every individual deserves quality healthcare at their convenience.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-amber-900 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become the leading platform that bridges the gap between technology and healthcare, 
                  creating a world where quality physiotherapy and wellness services are just a click away, 
                  making healthy living a reality for everyone.
                </p>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5452298/pexels-photo-5452298.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Healthcare team collaboration"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-amber-900 mr-3" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Meet Our Founders</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visionary leaders dedicated to transforming healthcare through innovation and compassion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300 hover:-translate-y-2 group"
              >
                <img 
                  src={`${founder.image}?v=${Date.now()}`}
                  alt={founder.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover group-hover:shadow-lg group-hover:shadow-amber-900/20 transition-all duration-300"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                  <p className="text-amber-900 font-semibold text-lg mb-4">{founder.role}</p>
                  <p className="text-gray-600 leading-relaxed">{founder.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compassion</h3>
              <p className="text-gray-600">Every interaction is driven by genuine care for patient wellbeing</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">We strive for the highest standards in healthcare delivery</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">Making quality healthcare available to everyone, everywhere</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Continuously evolving with cutting-edge technology</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;