import { ArrowRight, Building2, Car, Train, Zap } from "lucide-react";
import { motion } from "motion/react";

const sectors = [
  {
    icon: Zap,
    title: "Electrical Contracting",
    subtitle: "Commercial & Industrial",
    description:
      "Comprehensive electrical solutions for commercial complexes, industrial facilities, and large-scale infrastructure. From high-tension installations to precision wiring, we deliver safe, code-compliant electrical systems.",
    tags: [
      "HT/LT Installations",
      "Industrial Wiring",
      "Power Distribution",
      "Safety Systems",
    ],
    ocid: "sectors.item.1",
  },
  {
    icon: Train,
    title: "Indian Railway Projects",
    subtitle: "Rail Infrastructure & Signaling",
    description:
      "Specialized execution of Indian Railways contracts including signaling, overhead electrification, track-related works, and civil infrastructure supporting rail networks across India.",
    tags: [
      "Signaling Systems",
      "OHE Works",
      "Station Infrastructure",
      "Track-Side Civil",
    ],
    ocid: "sectors.item.2",
  },
  {
    icon: Building2,
    title: "Civil Infrastructure",
    subtitle: "Roads, Structures & Development",
    description:
      "End-to-end civil construction covering roadways, buildings, bridges, and urban development projects. We combine engineering excellence with rigorous quality assurance on every build.",
    tags: [
      "Road Construction",
      "RCC Structures",
      "Urban Development",
      "Government Tenders",
    ],
    ocid: "sectors.item.3",
  },
  {
    icon: Car,
    title: "Carify",
    subtitle: "Pre-Delivery Inspection (PDI)",
    description:
      "A dedicated pre-delivery inspection service for automotive OEMs and dealers. Our certified technicians perform thorough PDI checks ensuring every vehicle meets delivery standards before handover.",
    tags: [
      "PDI Audit",
      "OEM Compliance",
      "Quality Checks",
      "Dealership Support",
    ],
    ocid: "sectors.item.4",
  },
];

export default function SectorsSection() {
  return (
    <section
      id="sectors"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.80 0.17 85) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-gold" />
            <span className="text-xs font-medium text-gold tracking-widest uppercase">
              What We Do
            </span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display font-800 text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-4">
            Our Core <span className="text-gold">Sectors</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Four specialized domains. One unwavering commitment to excellence.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.title}
                data-ocid={sector.ocid}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group bg-card border border-border rounded-xl p-6 flex flex-col hover:border-gold/50 hover:shadow-gold-sm transition-all duration-300 cursor-default shadow-card-lift"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center mb-5 group-hover:bg-gold/25 group-hover:border-gold/60 transition-all duration-300">
                  <Icon className="w-6 h-6 text-gold" />
                </div>

                {/* Title */}
                <div className="mb-3">
                  <h3 className="font-display font-700 text-lg text-foreground leading-snug mb-1">
                    {sector.title}
                  </h3>
                  <p className="text-xs text-gold font-medium tracking-wide uppercase">
                    {sector.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                  {sector.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {sector.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground border border-border bg-secondary/50 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA link */}
                <button
                  type="button"
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center gap-1.5 text-xs font-medium text-gold hover:gap-3 transition-all duration-200 group/link"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
