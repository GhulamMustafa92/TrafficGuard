import Navbar from './pages/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import { Particles } from './pages/Home';
import Services from './pages/Services';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {/* Global Particles Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Particles
          particleColors={['#00d2ff', '#3b82f6', '#7dd3fc', '#ffffff']}
          particleCount={250}
          particleSpread={12}
          speed={0.12}
          particleBaseSize={75}
          moveParticlesOnHover={true}
          particleHoverFactor={0.4}
          alphaParticles={true}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Home />
        <About/>
        <Services/>
      </div>

    </div>
  );
}