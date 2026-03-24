import SdkTester from './components/SdkTester';
import { Mail } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen">
      <nav className="p-6 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Mail size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Mail<span className="text-emerald-500">X</span></h1>
        </div>
      </nav>

      <main>
        <header className="text-center py-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent italic leading-[1.3] pb-2">
            Professional SDK Experience
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Test our zero-dependency, lightweight MailX SDK in a real-world frontend environment. 
            Send emails with templates and custom data in seconds.
          </p>
        </header>

        <SdkTester />
      </main>

      <footer className="py-12 text-center text-sm text-gray-500">
        © 2026 MailX Backend Integrated Demo. Powering secure vertical communication.
      </footer>
    </div>
  );
}

export default App;
