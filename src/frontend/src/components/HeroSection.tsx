import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const handleScrollToSectors = () => {
    document.querySelector("#sectors")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/vinx-hero-banner.dim_1200x500.jpg')",
        }}
      />

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/80 via-navy-deep/60 to-navy-deep" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-transparent to-navy-deep/50" />

      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      {/* Animated particles / subtle lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {([25, 50, 75] as const).map((topPercent, i) => (
          <motion.div
            key={topPercent}
            className="absolute h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
            style={{
              top: `${topPercent}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scaleX: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i * 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-medium text-gold tracking-widest uppercase">
              Pvt. Ltd. — Est. 2018
            </span>
          </motion.div>

          {/* Company Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display font-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none tracking-tight mb-2 text-shadow-gold"
          >
            <span className="text-gold">VINX</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="font-display font-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-widest text-foreground/90 uppercase mb-8"
          >
            Power Solutions
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="w-24 h-0.5 bg-gold mx-auto mb-8 origin-center"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-foreground/75 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Powering Infrastructure.{" "}
            <span className="text-gold">Delivering Excellence.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              data-ocid="hero.cta_button"
              onClick={handleScrollToSectors}
              className="gradient-gold text-primary-foreground font-display font-700 text-base px-8 py-6 h-auto shadow-gold-md hover:shadow-gold-md hover:scale-105 active:scale-100 transition-all duration-200 tracking-wide"
            >
              Explore Our Sectors
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-gold/50 text-foreground hover:bg-gold/10 hover:border-gold font-display font-600 text-base px-8 py-6 h-auto transition-all duration-200 backdrop-blur-sm"
            >
              Contact Us
            </Button>
          </motion.div>
        </motion.div>

        {/* Sector pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-wrap justify-center gap-3 mt-16"
        >
          {[
            "Electrical Contracting",
            "Railway Projects",
            "Civil Infrastructure",
            "Carify PDI",
          ].map((sector, i) => (
            <motion.span
              key={sector}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
              className="px-3 py-1 text-xs font-medium text-muted-foreground border border-border bg-navy-surface/60 rounded-full backdrop-blur-sm"
            >
              {sector}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-4 h-4 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
