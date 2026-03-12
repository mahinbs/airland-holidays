import { Outlet, useLocation } from "react-router-dom";
import type { Location as RouterLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FloatingLeadGen from "../components/common/FloatingLeadGen";

const PageTransition = ({
  children,
  location,
}: {
  children: React.ReactNode;
  location: RouterLocation;
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex-grow w-full"
        onAnimationComplete={() => {
          // Remove transform after animation completes to fix sticky positioning
          const el = document.getElementById("page-transition-container");
          if (el) {
            el.style.transform = "none";
          }
        }}
        id="page-transition-container"
        style={{ transform: undefined }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function RootLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Thematic Travel Motion: Subtle Flight Path Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M-100,600 C200,400 400,800 800,200 S1200,100 1600,300"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 10"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          />
          <motion.path
            d="M-100,200 C300,300 600,100 1000,500 S1500,600 1800,400"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="15 15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              delay: 5,
            }}
          />
        </svg>
      </div>

      <Navbar />

      <main className={`flex-grow z-10 relative ${location.pathname !== "/" ? "pt-20" : ""}`}>
        <PageTransition location={location}>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
      <FloatingLeadGen />
    </div>
  );
}
