import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Music, User, Briefcase, Loader2, ArrowLeft , Headphones, Zap, Globe, CheckCircle2Icon} from 'lucide-react';


export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'user' | 'worker'>('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let authResult;
      if (isLogin) {
        authResult = await signIn(email, password);
      } else {
        authResult = await signUp(email, password, fullName, role);
      }

      const { error } = authResult;
      if (error) {
        setError(error.message);
      } else {
        navigate('/'); // redirect to "/" — App will route to correct dashboard based on user.role
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#193661] via-[#255191] to-[#000503] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-atlas-gold rounded-2xl shadow-2xl drop-shadow-[#d1a95b] p-8 my-4 relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 text-black hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-[#3471cb] to-[#000503] rounded-full p-3">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Atlas</h2>
          <p className="text-atlas-dark font-semibold mt-2">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <label htmlFor="fullName" className="block text-sm text-atlas-dark font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E71FF] focus:border-[#4E71FF] transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm text-atlas-dark font-semibold mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      role === 'user'
                        ?  'border-[#4E71FF] bg-white text-[#5409DA]'
                        : 'border-[#4E71FF] bg-atlas-primary-default text-white font-bold hover:border-gray-400'
                    }`}
                  >
                    <User className="h-5 w-5 mr-2" /> 
                    Client &nbsp; {role === 'user' && <CheckCircle2Icon className='text-white fill-green-400'/>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('worker')}
                    className={`flex items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      role === 'worker'
                        ? 'border-[#4E71FF] bg-white text-[#5409DA]'
                        : 'border-[#4E71FF] bg-atlas-primary-default text-white font-bold hover:border-gray-400'
                    }`}
                  >
                    <Briefcase className="h-5 w-5 mr-2" />
                    Worker &nbsp; {role === 'worker' && <CheckCircle2Icon className='text-white fill-green-400'/>}
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm text-atlas-dark font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E71FF] focus:border-[#4E71FF] transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-atlas-dark font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4E71FF] focus:border-[#4E71FF] transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-br from-[#3471cb] to-[#000503] hover:from-[#193661] hover:to-[#3471cb] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4E71FF] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#000503] font-medium hover:text-[#5409DA] transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
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
  );
}