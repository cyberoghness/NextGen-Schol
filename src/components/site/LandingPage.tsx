import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  GraduationCap, Users, Target, Compass, ClipboardCheck, MessageSquare,
  BookOpen, FlaskConical, Calculator, Briefcase, Palette, Sparkles,
  Star, MapPin, Phone, Mail, ChevronDown, MessageCircle, Menu, X,
} from "lucide-react";
import { AdmissionForm } from "./AdmissionForm";

const WHATSAPP = "https://wa.me/918090852167";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

function useScrolled(offset = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const links = [
    ["Courses", "#courses"],
    ["Faculty", "#faculty"],
    ["Results", "#results"],
    ["FAQs", "#faqs"],
    ["Contact", "#contact"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 shadow-sm backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-md shadow-primary/30">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-display text-base font-bold tracking-tight sm:text-lg">
            NEXTGEN <span className="text-gradient">SCHOLARS</span>
          </span>
        </a>
        <ul className="hidden items-center gap-7 text-sm font-medium text-foreground/80 lg:flex">
          {links.map(([l, h]) => (
            <li key={l}>
              <a href={h} className="transition hover:text-primary">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#enroll"
          className="btn-scale hidden rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 lg:inline-flex"
        >
          Book Free Counseling
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-xl border border-border bg-white/70 p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-white/95 backdrop-blur lg:hidden">
          <ul className="space-y-1 px-5 py-4">
            {links.map(([l, h]) => (
              <li key={l}>
                <a
                  href={h}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  {l}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#enroll"
                onClick={() => setOpen(false)}
                className="block rounded-full gradient-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Book Free Counseling
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      {/* floating shapes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-float-slow" />
        <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-secondary/15 blur-3xl animate-float-slower" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float-slow" />
      </div>

      <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <div className="animate-fade-up lg:pt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Admissions Open 2026
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Shape Your Future With{" "}
            <span className="text-gradient">Expert Guidance</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Admissions open for Classes 6th–12th. Personalized mentorship, experienced faculty,
            and small batch sizes — designed for ambitious students.
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-2.5 text-sm">
            {[
              "5000+ Students Guided",
              "Experienced Faculty",
              "Personalized Learning",
              "Career Counseling",
            ].map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 ring-1 ring-border backdrop-blur"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                  ✓
                </span>
                <span className="font-medium text-foreground/80">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
            {[
              ["5000+", "Students"],
              ["95%", "Success Rate"],
              ["15+", "Years Experience"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white/70 p-4 ring-1 ring-border backdrop-blur">
                <div className="font-display text-2xl font-extrabold text-gradient sm:text-3xl">
                  {n}
                </div>
                <div className="text-xs font-medium text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="enroll" className="lg:sticky lg:top-24">
          <AdmissionForm />
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    { icon: Target, t: "Personalized Learning", d: "Customized guidance for every student." },
    { icon: GraduationCap, t: "Expert Faculty", d: "Industry-leading educators." },
    { icon: Users, t: "Small Batch Sizes", d: "More attention for every learner." },
    { icon: Compass, t: "Career Guidance", d: "Academic and career planning support." },
    { icon: ClipboardCheck, t: "Regular Assessments", d: "Track progress effectively." },
    { icon: MessageSquare, t: "Parent Updates", d: "Transparent communication." },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Why Choose <span className="text-gradient">NextGen Scholars</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            A learning environment engineered for results — without losing the human touch.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, t, d }) => (
            <Reveal key={t}>
              <div className="hover-lift h-full rounded-3xl border border-border bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-md shadow-primary/25">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Courses() {
  const courses = [
    { icon: BookOpen, tag: "Classes 6–8", t: "Foundation Program", d: "Build strong fundamentals across all core subjects." },
    { icon: ClipboardCheck, tag: "Classes 9–10", t: "Board Excellence Program", d: "Score-focused preparation for board exams." },
    { icon: FlaskConical, tag: "Classes 11–12 Science", t: "PCM & PCB", d: "Concept mastery for boards & competitive exams." },
    { icon: Calculator, tag: "Classes 11–12 Commerce", t: "Accounts, Economics, Mathematics", d: "Application-first commerce coaching." },
    { icon: Palette, tag: "Classes 11–12 Arts", t: "Humanities Excellence", d: "Analytical thinking and writing skills." },
    { icon: Briefcase, tag: "All Classes", t: "Career Counseling", d: "1:1 sessions to map academic & career paths." },
  ];
  return (
    <section id="courses" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Courses Offered</h2>
          <p className="mt-3 text-muted-foreground">
            Programs designed for every stage of a student's academic journey.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(({ icon: Icon, tag, t, d }) => (
            <Reveal key={t}>
              <div className="hover-lift group relative h-full overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white to-muted/40 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-accent/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
                    {tag}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                <a
                  href="#enroll"
                  className="mt-5 inline-flex text-sm font-semibold text-primary transition group-hover:gap-2"
                >
                  Enquire now →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faculty() {
  const faculty = [
    { n: "Dr. Ananya Sharma", r: "Academic Director", x: "20+ Years Experience" },
    { n: "Rahul Mehta", r: "Senior Physics Faculty", x: "IIT Alumnus" },
    { n: "Neha Bansal", r: "Chemistry Faculty", x: "M.Sc., 12+ Yrs" },
    { n: "Karan Malhotra", r: "Mathematics Faculty", x: "Olympiad Mentor" },
    { n: "Sakshi Gupta", r: "Commerce Faculty", x: "CA, M.Com" },
    { n: "Meera Singh", r: "Humanities Faculty", x: "Ph.D. English" },
  ];
  const colors = [
    "from-primary/80 to-secondary/80",
    "from-secondary/80 to-primary/80",
    "from-primary/70 to-accent/60",
    "from-secondary/80 to-primary/70",
    "from-primary/80 to-secondary/70",
    "from-secondary/70 to-accent/60",
  ];
  return (
    <section id="faculty" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Meet Our Faculty</h2>
          <p className="mt-3 text-muted-foreground">
            Mentors with decades of combined teaching experience and a passion for student success.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((f, i) => (
            <Reveal key={f.n}>
              <div className="hover-lift flex h-full items-center gap-4 rounded-3xl border border-border bg-white p-5">
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${colors[i]} font-display text-xl font-bold text-white shadow-lg shadow-primary/20`}
                >
                  {f.n.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <h3 className="font-display text-base font-bold">{f.n}</h3>
                  <p className="text-sm text-primary">{f.r}</p>
                  <p className="text-xs text-muted-foreground">{f.x}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function useCounter(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(true)),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const n = useCounter(value, active);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl font-extrabold sm:text-6xl">
        {n}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-wider text-white/80">{label}</div>
    </div>
  );
}

function Results() {
  return (
    <section id="results" className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[28px] gradient-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <Reveal className="relative text-center">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Student Success</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/80">
              Real numbers. Real results. Built on consistent mentorship.
            </p>
          </Reveal>
          <div className="relative mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <StatItem value={95} suffix="%" label="Success Rate" />
            <StatItem value={5000} suffix="+" label="Students Mentored" />
            <StatItem value={15} suffix="+" label="Years Experience" />
            <StatItem value={300} suffix="+" label="Top Scorers" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { n: "Aarav Kapoor", r: "Class 12 — Science", q: "The faculty made tough concepts feel simple. I scored 96% in boards thanks to their mentorship." },
    { n: "Ishita Verma", r: "Class 10 — CBSE", q: "Small batches meant I never hesitated to ask doubts. My confidence improved drastically." },
    { n: "Mr. Rajeev Singh", r: "Parent", q: "Regular updates and genuine care for my child's progress. Truly a premium experience." },
    { n: "Priya Nair", r: "Class 11 — Commerce", q: "From accounts to economics, every doubt was solved patiently. Highly recommend." },
    { n: "Rohan Joshi", r: "Class 9", q: "Studying here is fun and structured. The mentors push you to be your best self." },
    { n: "Mrs. Kavita Mehta", r: "Parent", q: "The career counseling sessions helped my daughter choose the right stream. Worth every rupee." },
  ];
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">What Students & Parents Say</h2>
          <p className="mt-3 text-muted-foreground">Stories from our community of learners.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={i}>
              <div className="hover-lift h-full rounded-3xl border border-border bg-gradient-to-br from-white to-muted/30 p-6">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full gradient-primary font-display text-sm font-bold text-primary-foreground">
                    {t.n.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold">{t.n}</div>
                    <div className="text-xs text-muted-foreground">{t.r}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "How do I enroll?", a: "Fill the admission enquiry form above. Our counselor will reach out within 24 hours to guide you through the next steps." },
    { q: "Do you offer counseling?", a: "Yes, we offer free academic and career counseling sessions for every student before enrollment." },
    { q: "What boards do you support?", a: "We support CBSE, ICSE, and ISC curricula across all classes from 6 to 12." },
    { q: "Are weekend batches available?", a: "Yes — dedicated weekend batches are available for students with weekday commitments." },
    { q: "What are the fee structures?", a: "Fees vary by class and program. Our counselor will share a detailed structure during your consultation." },
    { q: "Do you provide study material?", a: "Absolutely — students receive curated notes, worksheets, and periodic assessment papers included with enrollment." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-3 text-muted-foreground">Everything you need to know before enrolling.</p>
        </Reveal>
        <div className="mt-10 space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full rounded-2xl border border-border bg-white p-5 text-left transition hover:border-primary/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display text-base font-semibold">{it.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden text-sm text-muted-foreground">{it.a}</div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Get In Touch</h2>
          <p className="mt-3 text-muted-foreground">Visit our campus or reach out — we'd love to hear from you.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="hover-lift h-full rounded-3xl border border-border bg-gradient-to-br from-white to-muted/30 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-primary text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">Visit Us</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                24 Knowledge Park Road, Hazratganj, Lucknow, Uttar Pradesh 226001
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="hover-lift h-full rounded-3xl border border-border bg-gradient-to-br from-white to-muted/30 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-primary text-primary-foreground">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">Call Us</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                <a className="block transition hover:text-primary" href="tel:+919876543210">+91 98765 43210</a>
                <a className="block transition hover:text-primary" href="tel:+919123456789">+91 91234 56789</a>
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="hover-lift h-full rounded-3xl border border-border bg-gradient-to-br from-white to-muted/30 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl gradient-primary text-primary-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">Email Us</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                <a className="block transition hover:text-primary" href="mailto:admissions@nextgenscholars.com">admissions@nextgenscholars.com</a>
                <a className="block transition hover:text-primary" href="mailto:hello@nextgenscholars.com">hello@nextgenscholars.com</a>
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 text-center text-primary-foreground sm:p-12">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Still have questions?</h3>
            <p className="mx-auto mt-3 max-w-xl text-white/85">
              Book a free counseling session today — our team will guide you through everything.
            </p>
            <a
              href="#enroll"
              className="btn-scale mt-6 inline-flex items-center rounded-full bg-white px-6 py-3 font-display text-sm font-semibold text-primary shadow-lg"
            >
              Book Free Counseling Session
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display text-base font-bold">NEXTGEN SCHOLARS</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Learn Today. Lead Tomorrow.</p>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a href="#courses" className="hover:text-primary">Courses</a></li>
            <li><a href="#faculty" className="hover:text-primary">Faculty</a></li>
            <li><a href="#results" className="hover:text-primary">Results</a></li>
            <li><a href="#faqs" className="hover:text-primary">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider">Contact</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            24 Knowledge Park Road, Hazratganj, Lucknow 226001
          </p>
          <p className="mt-2 text-sm text-muted-foreground">+91 98765 43210</p>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} NextGen Scholars. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="btn-scale fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Why />
        <Courses />
        <Faculty />
        <Results />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
