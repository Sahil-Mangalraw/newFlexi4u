import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Home as HomeIcon, Users, CheckCircle, Star } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Bot,
      title: 'AI Diagnosis',
      description: 'Advanced AI-powered diagnostic tools for accurate health assessments.'
    },
    {
      icon: HomeIcon,
      title: 'Home Sessions',
      description: 'Professional physiotherapy sessions in the comfort of your home.'
    },
    {
      icon: Users,
      title: 'Intern Support',
      description: 'Dedicated intern support for comprehensive patient care.'
    }
  ];

  const doctors = [
    {
      name: 'Dr. Priya Sharma',
      specialization: 'Orthopedic Specialist',
      experience: '15+ years',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Dr. Rajesh Kumar',
      specialization: 'Neurological Physiotherapy',
      experience: '12+ years',
      image: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Dr. Amit Singh',
      specialization: 'Sports Medicine',
      experience: '10+ years',
      image: 'https://images.pexels.com/photos/5215946/pexels-photo-5215946.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-stone-100 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Personal{' '}
                <span className="text-amber-900">Physiotherapy</span>{' '}
                & Wellness Partner
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience the future of healthcare with AI-powered diagnosis, 
                professional home sessions, and dedicated intern support.
              </p>
              <Link 
                to="/patient-registration"
                className="inline-block bg-amber-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-800 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Book Appointment
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Doctor-patient consultation"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Flexi4U?
            </h2>
            <p className="text-xl text-gray-600">Modern healthcare solutions tailored for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-stone-50 p-8 rounded-2xl hover:shadow-lg hover:shadow-amber-900/10 transition-all duration-300 hover:-translate-y-2 group"
                >
                  <div className="w-16 h-16 bg-amber-900 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-amber-900/30 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold">5000+</div>
              <div className="text-amber-200">Happy Patients</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">200+</div>
              <div className="text-amber-200">Expert Doctors</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">98%</div>
              <div className="text-amber-200">Success Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">24/7</div>
              <div className="text-amber-200">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Partners Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Expert Partners
            </h2>
            <p className="text-xl text-gray-600">Meet our experienced healthcare professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:shadow-amber-900/10 transition-all duration-300 hover:-translate-y-2"
              >
                <img 
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-amber-900 font-semibold mb-1">{doctor.specialization}</p>
                  <p className="text-gray-600 text-sm mb-3">{doctor.experience}</p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;