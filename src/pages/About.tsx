import { motion } from 'framer-motion';
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Award,
  Crown,
  Globe,
  Newspaper,
  Users,
  Plane,
  Car,
  Map
} from 'lucide-react';

const pageContent = {
  hero: {
    heading: 'Building a Global Travel Brand With Trust, Experience and Vision',
    subtext: 'Since 2005, Airland Holidays has been committed to delivering world-class travel experiences with precision, care and consistency.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=2000&q=80',
  },

  story: {
    sectionLabel: 'Our Story',
    title: 'A Journey Built on Trust',
    paragraphs: [
      'Airland Holidays was founded with a clear purpose — to create meaningful travel experiences backed by trust and expertise.',
      'Over the years, we have grown into a trusted travel partner for thousands of travellers, offering personalised journeys that combine comfort, quality and attention to detail.',
    ],
    milestones: [
      { year: '2005', title: 'Airland Founded', desc: 'Started with a vision to create meaningful, personalised travel experiences for Indian travellers.' },
      { year: '2010', title: 'IATA Accreditation', desc: 'Earned IATA accreditation, establishing global credibility and airline partnership access.' },
      { year: '2015', title: '5,000+ Happy Travellers', desc: 'Crossed a significant milestone, building a reputation for trust and quality service.' },
      { year: '2020', title: 'TAFI Leadership', desc: 'Mr. C.K. Raja appointed Chairman of TAFI Tamil Nadu Chapter, elevating industry standing.' },
      { year: '2024', title: '20,000+ Travellers Served', desc: 'Trusted by over twenty thousand travellers with consistent five-star satisfaction.' },
    ],
  },

  founder: {
    sectionLabel: 'Leadership That Builds Trust',
    name: 'Mr. C.K. Raja',
    title: 'Founder & CEO, Airland Group of Companies',
    about: 'A visionary leader with over three decades of experience in the travel industry, Mr. C.K. Raja has played a pivotal role in shaping Airland Tours and Holidays into a trusted and respected brand. His deep industry insight combined with a commitment to excellence has helped the brand earn credibility among travellers and partners alike.',
    leadershipTitle: 'Leadership & Industry Influence',
    leadershipPoints: [
      'Currently serving as Chairman of the Travel Agents Federation of India (TAFI), Tamil Nadu Chapter',
      'Previously held the position of Secretary – TAFI Tamil Nadu, strengthening collaboration across travel stakeholders',
      'Active member of national and international travel industry bodies',
    ],
    networkTitle: 'Strategic Strength & Global Network',
    networkDesc: 'Through strong engagement with Tourism Boards, Global Travel Networks and Government Organisations, Mr. Raja has built a powerful network of partnerships. These relationships have enabled Airland Tours & Holidays to deliver seamless, high-quality travel experiences with global standards.',
    vision: '"To build Airland into a globally trusted travel company that serves millions of travellers with exceptional quality, care, and unforgettable experiences."',
    portraitSrc: '/whychooseus/5.jpeg',
    supportingImages: [
      { src: '/whychooseus/2.jpeg', alt: 'Industry event – national tourism board', aspect: 'landscape' },
      { src: '/whychooseus/3.jpeg', alt: 'Sri Lanka National Day event', aspect: 'landscape' },
      { src: '/whychooseus/4.jpeg', alt: 'Sri Lanka Tourism Awareness Session', aspect: 'landscape' },
      { src: '/whychooseus/6.jpeg', alt: 'Boardroom discussion with industry leaders', aspect: 'landscape' },
    ],
  },

  credentials: {
    sectionLabel: 'Authority',
    title: 'Recognised. Connected. Trusted.',
    items: [
      { icon: 'Award', text: 'IATA Accredited Travel Company' },
      { icon: 'Crown', text: 'Chairman – Travel Agents Federation of India (TAFI), Tamil Nadu' },
      { icon: 'Globe', text: 'Strong partnerships with International Tourism Boards' },
      { icon: 'Newspaper', text: 'Featured in Industry Events and Media' },
      { icon: 'Users', text: 'Trusted by 20,000+ travellers across India and beyond' },
    ],
  },

  globalNetwork: {
    sectionLabel: 'Our Network',
    title: 'Strong Global Partnerships for Seamless Travel',
    intro: 'We collaborate with world-class partners to ensure every journey is smooth, safe, and well-coordinated.',
    partners: [
      { icon: 'Plane', label: 'Leading Airlines' },
      { icon: 'Building2', label: 'Premium Hotels & Resorts' },
      { icon: 'Car', label: 'Trusted Transport Providers' },
      { icon: 'Users', label: 'Professional Local Guides' },
      { icon: 'Map', label: 'Destination Experts' },
      { icon: 'Globe', label: 'Tourism Boards' },
    ],
    valueStatement: 'This ensures every journey is smooth, safe, and well-coordinated.',
  },

  promise: {
    sectionLabel: 'Our Promise',
    title: 'We Take Complete Responsibility',
    text: 'We take complete responsibility for your travel experience — from planning to execution. Every trip is designed to match your comfort, preferences and expectations.',
    points: [
      'End-to-end travel management',
      'Personalised itinerary for every traveller',
      'Dedicated support from booking to return',
      'Quality-assured partners at every destination',
    ],
  },

  team: {
    sectionLabel: 'Our Team',
    title: 'Decades of Experience. Real Destination Knowledge.',
    desc: 'Our team brings decades of experience and genuine destination knowledge. With direct involvement from Mr. C.K. Raja, every journey is monitored to ensure customer satisfaction and service excellence.',
    members: [
      { role: 'Travel Advisors', desc: 'Expert consultants with first-hand destination knowledge across 50+ countries.', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=80' },
      { role: 'Operations Team', desc: '24/7 support ensuring seamless travel execution from start to finish.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80' },
      { role: 'Destination Experts', desc: 'Local partners and guides in 50+ countries worldwide ensuring authentic experiences.', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000&q=80' },
    ],
  },

  brandStatement: {
    line1: 'We are not just a travel company.',
    line2: 'We are your trusted partner in creating unforgettable life experiences.',
  },

  cta: {
    primary: { label: 'Plan Your Journey With Experts', href: '/contact' },
    secondary: { label: 'Connect With Our Team', href: '/contact' },
  },
};

const getIcon = (name: string, props: any = {}) => {
  switch (name) {
    case 'Award': return <Award {...props} />;
    case 'Crown': return <Crown {...props} />;
    case 'Globe': return <Globe {...props} />;
    case 'Newspaper': return <Newspaper {...props} />;
    case 'Users': return <Users {...props} />;
    case 'Plane': return <Plane {...props} />;
    case 'Building2': return <Building2 {...props} />;
    case 'Car': return <Car {...props} />;
    case 'Map': return <Map {...props} />;
    default: return <Award {...props} />;
  }
};

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="min-h-[80svh] relative flex items-center justify-center">
        <img
          src={pageContent.hero.image}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/55 to-[#0a1628]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(10,22,40,0.6)_100%)] pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="relative z-10 text-center flex flex-col items-center justify-center min-h-[80svh] px-6"
        >
          <motion.div variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-black px-4 py-2 rounded-full inline-flex items-center gap-2 mb-6 uppercase tracking-widest">
            <Building2 className="w-4 h-4" /> About Airland Holidays
          </motion.div>

          <motion.h1 variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="font-['Marcellus'] text-white text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.15] max-w-6xl mx-auto mb-5">
            {pageContent.hero.heading}
          </motion.h1>

          <motion.p variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="text-white/70 font-light text-lg md:text-xl max-w-2xl mx-auto">
            {pageContent.hero.subtext}
          </motion.p>
        </motion.div>
      </section>

      {/* 2. OUR STORY */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <section className="section-padding relative overflow-hidden bg-[#fafaf8]">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none -z-0"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--color-primary, #0f3460) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block overflow-hidden pointer-events-none -z-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80"
            className="w-full h-full object-cover opacity-[0.06]"
            loading="lazy"
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafaf8] to-transparent" />
        </div>

        <div className="content-container relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-xs uppercase tracking-widest font-black text-secondary mb-3">{pageContent.story.sectionLabel}</h2>
            <h3 className="font-['Marcellus'] text-3xl md:text-4xl text-slate-900 mb-4">{pageContent.story.title}</h3>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-slate-600 font-light text-lg leading-[1.9] max-w-3xl mx-auto space-y-4"
            >
              {pageContent.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="relative mt-14 max-w-3xl mx-auto pl-5 md:pl-0 border-l-2 md:border-l-0 border-primary/20"
          >
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

            {pageContent.story.milestones.map((milestone, i) => {
              const isEven = i % 2 !== 0;
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { y: 20, opacity: 0, x: isEven ? 20 : -20 },
                    visible: { y: 0, opacity: 1, x: 0 }
                  }}
                  className="relative flex items-center md:justify-between mb-8 last:mb-0"
                >
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md z-10" />

                  <div className="md:hidden absolute -left-[29px] w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md z-10" />

                  {isEven ? (
                    <>
                      <div className="hidden md:block md:w-5/12" />
                      <div className="bg-white/90 md:backdrop-blur-sm border border-[#ede9e3] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow w-full md:w-5/12 ml-4 md:ml-0 text-left">
                        <div className="font-['Marcellus'] text-primary text-2xl font-bold mb-1 drop-shadow-[0_0_8px_rgba(15,52,96,0.2)]">{milestone.year}</div>
                        <h4 className="font-bold text-slate-900 text-lg mb-2">{milestone.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{milestone.desc}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white/90 md:backdrop-blur-sm border border-[#ede9e3] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow w-full md:w-5/12 ml-4 md:ml-0 md:text-right text-left">
                        <div className="font-['Marcellus'] text-primary text-2xl font-bold mb-1 drop-shadow-[0_0_8px_rgba(15,52,96,0.2)]">{milestone.year}</div>
                        <h4 className="font-bold text-slate-900 text-lg mb-2">{milestone.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{milestone.desc}</p>
                      </div>
                      <div className="hidden md:block md:w-5/12" />
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. FOUNDER POWER BLOCK */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <section className="section-padding relative overflow-hidden bg-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1600&q=60"
            className="absolute right-0 top-0 w-2/3 h-full object-cover opacity-[0.05] hidden md:block"
            loading="lazy"
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="content-container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-xs uppercase tracking-widest font-black text-secondary mb-3">{pageContent.founder.sectionLabel}</h2>
            <h3 className="font-['Marcellus'] text-3xl md:text-4xl text-slate-900">{pageContent.founder.title}</h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:w-[280px] shrink-0 w-full max-w-[240px] mx-auto lg:mx-0"
            >
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl ring-2 ring-primary/20 ring-offset-4 ring-offset-white aspect-[3/4] relative z-10">
                <img src={pageContent.founder.portraitSrc} className="w-full h-full object-cover object-center" loading="lazy" alt={pageContent.founder.name} />
                <div className="absolute inset-0 rounded-3xl border-2 border-primary/25 translate-x-3 translate-y-3 -z-10" />
              </div>
              <div className="mt-5 bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm text-center">
                <h4 className="font-['Marcellus'] text-xl text-slate-900 font-bold">{pageContent.founder.name}</h4>
                <p className="text-primary text-sm font-semibold mt-1">{pageContent.founder.title}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 space-y-8"
            >
              <p className="text-slate-600 font-light text-lg leading-[1.9]">{pageContent.founder.about}</p>

              <div>
                <h4 className="font-['Marcellus'] text-xl text-slate-900 mb-4 flex items-center gap-3">
                  <Crown className="w-5 h-5 text-secondary" /> {pageContent.founder.leadershipTitle}
                </h4>
                <div>
                  {pageContent.founder.leadershipPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-1" />
                      <p className="text-slate-600 text-base leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-['Marcellus'] text-xl text-slate-900 mb-3">{pageContent.founder.networkTitle}</h4>
                <p className="text-slate-600 font-light leading-relaxed">{pageContent.founder.networkDesc}</p>
              </div>

              <div className="bg-gradient-to-r from-primary/8 to-primary/3 border-l-4 border-primary rounded-r-2xl px-6 py-5 flex items-start gap-3">
                <Sparkles className="text-primary/50 w-6 h-6 shrink-0 mt-1" />
                <p className="font-['Marcellus'] text-xl text-slate-800 italic leading-relaxed">{pageContent.founder.vision}</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h5 className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-5">Recognition & Industry Presence</h5>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {pageContent.founder.supportingImages.map((img, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden border border-[#ede9e3] hover:border-primary/40 transition-colors group aspect-[1.4/1]"
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. CREDENTIALS */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <section className="section-padding relative overflow-hidden bg-[#f5f3ef]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] -z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f3460' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="content-container relative z-10">
          <div className="text-center">
            <h2 className="text-secondary text-xs uppercase tracking-widest font-black mb-3">{pageContent.credentials.sectionLabel}</h2>
            <h3 className="font-['Marcellus'] text-3xl md:text-4xl text-slate-900 mb-2">{pageContent.credentials.title}</h3>
            <div className="w-16 h-[3px] bg-gradient-to-r from-primary to-primary/30 rounded-full mx-auto mt-3 mb-10" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {pageContent.credentials.items.map((item, i) => {
              const isFifth = i === 4;
              return (
                <motion.div
                  key={i}
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  className={`flex items-start gap-5 bg-white/80 md:backdrop-blur-sm border border-[#e8e4dc] rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 group ${isFifth ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2' : ''}`}
                >
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    {getIcon(item.icon, { className: "w-6 h-6" })}
                  </div>
                  <p className="text-slate-700 font-medium text-base leading-snug pt-1">{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 5. GLOBAL NETWORK */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <section className="section-padding relative overflow-hidden bg-[#0a1628]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&q=60"
            className="w-full h-full object-cover opacity-[0.12] hidden md:block"
            loading="lazy"
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/40 to-[#0a1628]/70" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,52,96,0.4)_0%,_transparent_70%)] pointer-events-none -z-0" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="content-container relative z-10">
          <div className="text-center">
            <h2 className="text-secondary text-xs uppercase tracking-widest font-black mb-3">{pageContent.globalNetwork.sectionLabel}</h2>
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 -z-10" />
              <h3 className="font-['Marcellus'] text-3xl md:text-4xl text-white mb-4 relative">{pageContent.globalNetwork.title}</h3>
            </div>
            <p className="text-white/60 font-light text-lg max-w-2xl mx-auto">{pageContent.globalNetwork.intro}</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12"
          >
            {pageContent.globalNetwork.partners.map((partner, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                className="flex flex-col items-center gap-3 bg-white/[0.07] md:backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {getIcon(partner.icon, { className: "w-6 h-6 text-white/70" })}
                </div>
                <span className="text-white/70 text-xs font-semibold text-center">{partner.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="relative z-10 mt-10 text-center bg-white/[0.08] md:backdrop-blur-sm border border-white/[0.15] rounded-2xl px-8 py-5 max-w-2xl mx-auto">
            <CheckCircle2 className="w-5 h-5 text-secondary inline mr-2" />
            <span className="text-white/80 font-medium text-base">{pageContent.globalNetwork.valueStatement}</span>
          </div>
        </div>
      </section>

      {/* 6. OUR PROMISE */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <section className="section-padding relative overflow-hidden bg-white">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none -z-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #0f3460 0, #0f3460 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-primary/[0.03] to-transparent pointer-events-none -z-0" />

        <div className="content-container relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-secondary uppercase tracking-widest text-xs font-black mb-3">{pageContent.promise.sectionLabel}</h2>
              <h3 className="font-['Marcellus'] text-3xl md:text-4xl text-slate-900 mb-6">{pageContent.promise.title}</h3>
              <p className="text-slate-600 font-light text-lg leading-[1.9] mb-8">{pageContent.promise.text}</p>
              <div>
                {pageContent.promise.points.map((point, i) => (
                  <div key={i} className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div
                className="relative rounded-3xl p-10 text-white overflow-hidden shadow-2xl"
                style={{ background: 'linear-gradient(135deg, var(--color-primary, #0f3460) 0%, #0a1628 100%)' }}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
                  <img
                    src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=60"
                    className="w-full h-full object-cover opacity-[0.1] mix-blend-overlay hidden md:block"
                    loading="lazy"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl z-0" />
                <p className="font-['Marcellus'] text-2xl md:text-3xl leading-relaxed italic relative z-10">"Every trip is a commitment, not just a service."</p>
                <p className="text-white/60 text-sm mt-4 relative z-10">— Airland Holidays</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. TEAM SECTION */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <section className="section-padding relative overflow-hidden bg-[#fafaf8]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] -z-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=60"
            className="w-full h-full object-cover object-top hidden md:block"
            loading="lazy"
            alt=""
            aria-hidden="true"
          />
        </div>

        <div className="content-container relative z-10">
          <div className="text-center">
            <h2 className="text-secondary uppercase tracking-widest text-xs font-black mb-3">{pageContent.team.sectionLabel}</h2>
            <h3 className="font-['Marcellus'] text-3xl md:text-4xl text-slate-900 mb-4">{pageContent.team.title}</h3>
            <p className="text-slate-600 font-light text-lg max-w-2xl mx-auto">{pageContent.team.desc}</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
          >
            {pageContent.team.members.map((member, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                className="bg-white border border-[#ede9e3] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group rounded-3xl overflow-hidden relative z-10"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={member.image} alt={member.role} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <h4 className="font-['Marcellus'] text-xl text-slate-900 group-hover:text-primary transition-colors mb-2">{member.role}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. BRAND STATEMENT & CTA */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <section className="section-padding relative overflow-hidden bg-[#0a1628] text-center pb-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=60"
            className="w-full h-full object-cover opacity-[0.15] hidden md:block"
            loading="lazy"
            alt=""
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 to-[#0a1628]/95" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(15,52,96,0.5),_transparent)] pointer-events-none -z-0" />

        <div className="content-container relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-['Marcellus'] text-3xl md:text-5xl text-white leading-[1.2] max-w-3xl mx-auto mb-6">
              <span className="text-white/60 block mb-2">{pageContent.brandStatement.line1}</span>
              <span className="text-white font-bold block">{pageContent.brandStatement.line2}</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent w-48 mx-auto mt-8" />
          </motion.div>
        </div>

        <div className="content-container mt-7 relative z-10">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href={pageContent.cta.primary.href} className="btn-primary flex items-center justify-center gap-2 text-lg w-full sm:w-auto">
              <ArrowRight className="w-5 h-5 sm:block hidden" /> {pageContent.cta.primary.label}
            </a>
            <a href={pageContent.cta.secondary.href} className="btn-outline border-white/40 text-primary hover:bg-white hover:text-primary flex items-center justify-center gap-2 text-lg w-full sm:w-auto">
              <MessageCircle className="w-5 h-5 sm:block hidden" /> {pageContent.cta.secondary.label}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
