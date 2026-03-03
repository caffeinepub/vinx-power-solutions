import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "6+", label: "Years in Business" },
  { value: "200+", label: "Projects Completed" },
  { value: "4", label: "Core Sectors" },
  { value: "50+", label: "Satisfied Clients" },
];

const highlights = [
  "End-to-end project management and execution",
  "Compliance with Indian railway & civil standards",
  "Trained workforce with field expertise",
  "Quality delivery within schedule and budget",
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-navy-mid relative overflow-hidden"
    >
      {/* Decorative bg element */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-12 bg-gold" />
          <span className="text-xs font-medium text-gold tracking-widest uppercase">
            Who We Are
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display font-800 text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Building India's{" "}
              <span className="text-gold">Future Infrastructure</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              Vinx Power Solutions Pvt Ltd is a multi-sector infrastructure and
              services company headquartered in India. We deliver specialized
              expertise across electrical contracting, Indian railway projects,
              civil infrastructure, and automotive pre-delivery inspections.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              Founded with a commitment to quality, safety, and innovation, we
              work alongside government bodies, private enterprises, and
              automotive OEMs to deliver projects that meet and exceed the
              highest standards.
            </p>

            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80 text-sm md:text-base">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="bg-navy-surface border border-border rounded-lg p-6 md:p-8 text-center hover:border-gold/50 transition-colors duration-300 group shadow-card-lift"
                >
                  <div className="font-display font-900 text-4xl md:text-5xl text-gold mb-2 group-hover:scale-110 transition-transform duration-300 text-shadow-gold">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote / Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 p-6 bg-gold/10 border-l-4 border-gold rounded-r-lg"
            >
              <p className="text-foreground/90 text-sm md:text-base italic leading-relaxed font-serif">
                "Our mission is to engineer reliable, sustainable infrastructure
                that empowers communities and drives India's growth across every
                sector we serve."
              </p>
              <p className="mt-3 text-gold text-xs font-medium tracking-wide uppercase">
                — Vinx Power Solutions Leadership
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
