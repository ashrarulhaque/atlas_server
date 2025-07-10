import React from 'react';
import { Music, Upload, Clock, CheckCircle, Users, Headphones, Zap, Shield, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#193661] via-[#3471cb] to-[#000503]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-[#BBFBFF] rounded-full blur-xl opacity-30 animate-pulse"></div>
                <Globe className="relative h-24 w-24 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Atlas <br /><span className="text-[#BBFBFF]">Perfect Your Podcast Sound</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#BBFBFF] mb-8 max-w-3xl mx-auto leading-relaxed">
              From raw recordings to polished perfection — Atlas specializes in repairing audio issues, enhancing clarity, and mastering your podcast for a professional-grade listening experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/auth')}
                className="bg-white text-[#193661] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#BBFBFF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Fix My Audio
              </button>
              <button className="text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#193661] transition-all duration-300">
                Get a Free Sample
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Headphones className="h-16 w-16 text-white animate-bounce" style={{ animationDelay: '0s' }} />
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <Music className="h-12 w-12 text-white animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Zap className="h-14 w-14 text-white animate-bounce" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-t from-[#193661] via-[#d1a95b] to-[#193661] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Simple, fast, and professional audio processing in just a few steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#193661] to-[#3471cb] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Audio</h3>
              <p className="text-white">
                Simply drag and drop your audio files. We support all major formats.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#3471cb] to-[#000503] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Matched</h3>
              <p className="text-white">
                Our skilled audio engineers review and claim your project within hours.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#193661] to-[#000503] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24-Hour Delivery</h3>
              <p className="text-white">
                Professional processing completed within 24 hours, guaranteed.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-[#3471cb] to-[#193661] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Download & Approve</h3>
              <p className="text-white">
                Review your processed audio and approve when you're completely satisfied.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-t from-[#193661] via-[#3471cb] to-[#193661] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Why Choose AudioFlow?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#BBFBFF] rounded-full p-2 flex-shrink-0">
                    <Shield className="h-6 w-6 text-[#193661]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Professional Quality</h3>
                    <p className="text-[#BBFBFF]">
                      Work with verified audio engineers who have years of experience in the industry.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#BBFBFF] rounded-full p-2 flex-shrink-0">
                    <Zap className="h-6 w-6 text-[#193661]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
                    <p className="text-[#BBFBFF]">
                      Get your audio processed in 24 hours or less, without compromising on quality.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-[#BBFBFF] rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-[#193661]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Satisfaction Guaranteed</h3>
                    <p className="text-[#BBFBFF]">
                      Request revisions until you're completely happy with the final result.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-t from-[#193661] via-[#d1a95b] to-[#193661] border-atlas-dark border-2 text-white rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-[#3471cb] to-[#000503] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
                  <p className="text-atlas-dark font-semibold mb-6">
                    Join thousands of creators who trust AudioFlow for their audio processing needs.
                  </p>
                  <button
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-[#193661] to-[#3471cb] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Start Your First Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-t from-[#193661] via-[#d1a95b] to-[#193661] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#000503] mb-2">10K+</div>
              <div className="text-white font-bold">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#000503] mb-2">500+</div>
              <div className="text-white font-bold">Audio Engineers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#000503] mb-2">24hr</div>
              <div className="text-white font-bold">Average Delivery</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#000503] mb-2">99%</div>
              <div className="text-white font-bold">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="bg-gradient-to-t from-[#000503] via-[#3471cb] to-[#193661] py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Transform Your Audio Today
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Experience professional audio processing that exceeds your expectations.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="bg-white text-[#3471cb] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#BBFBFF] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}