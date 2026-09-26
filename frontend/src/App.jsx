import { motion } from "framer-motion";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import { Particles } from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {/* Global Particles Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Particles
          particleColors={["#00d2ff", "#3b82f6", "#7dd3fc", "#ffffff"]}
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

      {/* Website Content */}
      <div className="relative z-10">

        <Navbar />

        {/* Home */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <Home />
        </motion.section>

        {/* About */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <About />
        </motion.section>

        {/* Services */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <Services />
        </motion.section>

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
        >
          <Contact />
        </motion.section>

        {/* Footer */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          <Footer />
        </motion.section>

      </div>
    </div>
  );
}