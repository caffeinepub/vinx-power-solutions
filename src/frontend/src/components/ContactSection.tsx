import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiry } from "@/hooks/useQueries";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const sectorOptions = [
  { value: "electricalContracting", label: "Electrical Contracting" },
  { value: "indianRailwayProjects", label: "Indian Railway Projects" },
  { value: "civilInfrastructure", label: "Civil Infrastructure" },
  { value: "carify", label: "Carify (PDI)" },
];

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "vinxpowersolutions@gmail.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Nagpur, Maharashtra, India",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    sector: "",
  });

  const { mutate, isPending, isSuccess, isError, reset } = useSubmitInquiry();

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (isSuccess || isError) reset();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.sector) return;
    mutate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      sectorText: form.sector,
    });
    if (isSuccess) {
      setForm({ name: "", email: "", phone: "", message: "", sector: "" });
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 bg-navy-mid relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute -bottom-40 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6">
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
              Get In Touch
            </span>
            <span className="h-px w-12 bg-gold" />
          </div>
          <h2 className="font-display font-800 text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-4">
            Start a <span className="text-gold">Conversation</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Have a project in mind or want to learn more? Reach out to our team.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10 items-start max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-navy-surface border border-border rounded-xl p-6">
              <h3 className="font-display font-700 text-lg text-foreground mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-foreground/90 text-sm font-medium">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sector quick links */}
            <div className="bg-navy-surface border border-border rounded-xl p-6">
              <h3 className="font-display font-700 text-sm text-muted-foreground uppercase tracking-wide mb-4">
                Our Sectors
              </h3>
              <div className="space-y-2">
                {sectorOptions.map((s) => (
                  <div key={s.value} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="text-sm text-foreground/80">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="bg-navy-surface border border-border rounded-xl p-6 md:p-8 shadow-card-lift">
              {/* Success state */}
              {isSuccess && (
                <motion.div
                  data-ocid="contact.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12"
                >
                  <CheckCircle2 className="w-16 h-16 text-gold mb-4" />
                  <h3 className="font-display font-700 text-2xl text-foreground mb-2">
                    Enquiry Submitted!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. Our team will contact you within
                    24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      reset();
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        message: "",
                        sector: "",
                      });
                    }}
                    className="border-gold/50 text-foreground hover:bg-gold/10"
                  >
                    Submit Another Inquiry
                  </Button>
                </motion.div>
              )}

              {/* Error state */}
              {isError && !isSuccess && (
                <motion.div
                  data-ocid="contact.error_state"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg mb-6"
                >
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-destructive">
                      Submission failed
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Please try again or contact us directly.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              {!isSuccess && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-name"
                        className="text-foreground/80 text-sm"
                      >
                        Full Name <span className="text-gold">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        data-ocid="contact.name_input"
                        placeholder="Rajesh Kumar"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        className="bg-card border-border focus:border-gold focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-email"
                        className="text-foreground/80 text-sm"
                      >
                        Email Address <span className="text-gold">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        data-ocid="contact.email_input"
                        type="email"
                        placeholder="rajesh@company.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className="bg-card border-border focus:border-gold focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-phone"
                        className="text-foreground/80 text-sm"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="contact-phone"
                        data-ocid="contact.phone_input"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-card border-border focus:border-gold focus:ring-gold/20 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="contact-sector"
                        className="text-foreground/80 text-sm"
                      >
                        Sector of Interest <span className="text-gold">*</span>
                      </Label>
                      <Select
                        value={form.sector}
                        onValueChange={(v) => handleChange("sector", v)}
                        required
                      >
                        <SelectTrigger
                          id="contact-sector"
                          data-ocid="contact.sector_select"
                          className="bg-card border-border focus:border-gold text-foreground"
                        >
                          <SelectValue placeholder="Select a sector" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          {sectorOptions.map((s) => (
                            <SelectItem
                              key={s.value}
                              value={s.value}
                              className="text-foreground focus:bg-gold/20 focus:text-foreground"
                            >
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-message"
                      className="text-foreground/80 text-sm"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="contact-message"
                      data-ocid="contact.message_input"
                      placeholder="Tell us about your project or inquiry..."
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={5}
                      className="bg-card border-border focus:border-gold focus:ring-gold/20 text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>

                  {/* Loading state indicator */}
                  {isPending && (
                    <div
                      data-ocid="contact.loading_state"
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Loader2 className="w-4 h-4 animate-spin text-gold" />
                      <span>Submitting your inquiry...</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={
                      isPending || !form.name || !form.email || !form.sector
                    }
                    className="w-full gradient-gold text-primary-foreground font-display font-700 py-5 h-auto text-base tracking-wide shadow-gold-sm hover:shadow-gold-md transition-all duration-200 disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Send Inquiry"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
