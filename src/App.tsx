import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react';
import heroImage from './assets/IMG_4143_1788683916260.webp';
import exteriorDetail from './assets/IMG_4139_1788683916260.webp';
import sereneBedroom from './assets/IMG_3892_1788683916260.webp';
import warmKitchen from './assets/IMG_3891_1788683916260.webp';
import texturedBedroom from './assets/IMG_3495_1788683916260.webp';
import marbleBedroom from './assets/4FD70F6E-553B-44DB-BECF-674C21A0E856_1788683916260.webp';


const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/archsirius.studio?stkn=MXNzaXF6dWV0YzFycA%3D%3D&utm_source=qr' },
  { label: 'Facebook', href: 'https://www.facebook.com/share/184Vkd3REY/?mibextid=wwXIfr' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/archsirius?utm_source=share_via&utm_content=profile&utm_medium=member_ios' },
];

const projects = [
  {
    id: '01',
    title: 'Courtyard / Residence',
    category: 'Exterior visualization',
    image: heroImage,
    className: 'md:col-span-7 md:row-span-2',
    number: 'A',
  },
  {
    id: '02',
    title: 'Arrival / Residence',
    category: 'Architectural study',
    image: exteriorDetail,
    className: 'md:col-span-5',
    number: 'B',
  },
  {
    id: '03',
    title: 'Quiet Room',
    category: 'Interior visualization',
    image: sereneBedroom,
    className: 'md:col-span-5',
    number: 'C',
  },
  {
    id: '04',
    title: 'The Warm Kitchen',
    category: 'Interior visualization',
    image: warmKitchen,
    className: 'md:col-span-4',
    number: 'D',
  },
  {
    id: '05',
    title: 'Material / Bedroom',
    category: 'Interior visualization',
    image: texturedBedroom,
    className: 'md:col-span-4',
    number: 'E',
  },
  {
    id: '06',
    title: 'Marble / Bedroom',
    category: 'Atmosphere study',
    image: marbleBedroom,
    className: 'md:col-span-4',
    number: 'F',
  },
];

function useRevealObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="fixed left-0 top-0 z-[60] h-[2px] bg-[hsl(var(--accent))] transition-[width] duration-150" style={{ width: `${progress}%` }} aria-hidden="true" />;
}

function Mark() {
  return (
    <span className="flex items-center gap-2" aria-label="ArchSirius Studio">
      <span className="flex h-7 w-7 items-center justify-center border border-current font-mono-ui text-[10px] tracking-[-.08em]">AS</span>
      <span className="font-mono-ui text-[10px] uppercase tracking-[.2em]">ArchSirius</span>
    </span>
  );
}

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const links = [
    { label: 'Selected work', href: '#work' },
    { label: 'Studio', href: '#studio' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="absolute left-0 right-0 top-0 z-40 px-5 py-5 text-[#f0eadf] md:px-10 md:py-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <a href="#top" className="line-link" data-testid="link-home"><Mark /></a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => <a key={link.href} href={link.href} className="line-link font-mono-ui text-[10px] uppercase tracking-[.16em] text-[#d7d0c4] transition-colors hover:text-[#f0eadf]" data-testid={`link-nav-${link.label.toLowerCase().replaceAll(' ', '-')}`}>{link.label}</a>)}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.16em] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          data-testid="button-toggle-menu"
        >
          {menuOpen ? 'Close' : 'Menu'} {menuOpen ? <X size={16} strokeWidth={1.2} /> : <Menu size={16} strokeWidth={1.2} />}
        </button>
      </div>
      {menuOpen && (
        <nav id="mobile-nav" className="absolute left-0 right-0 top-full border-y border-[#f0eadf]/20 bg-[#25211c]/95 px-5 py-8 backdrop-blur-md md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-5">
            {links.map((link, index) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="font-display text-4xl text-[#f0eadf]" data-testid={`link-mobile-${index}`}>{link.label}</a>)}
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = heroRef.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onScroll = () => node.style.setProperty('--hero-shift', `${Math.min(window.scrollY * 0.1, 80)}px`);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="top" ref={heroRef} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#25211c] text-[#f0eadf]" data-testid="section-hero">
      <div className="absolute inset-0 -z-10" style={{ transform: 'translateY(var(--hero-shift, 0px)) scale(1.04)' }}>
        <img src={heroImage} alt="Residential courtyard framed by modern buildings and palm trees" className="h-full w-full object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#25211c] via-[#25211c]/40 to-[#25211c]/10" />
        <div className="absolute inset-0 bg-[#15130f]/20" />
      </div>
      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-10 pt-32 md:px-10 md:pb-16">
        <div className="mb-16 flex items-end justify-between md:mb-24">
          <p className="reveal max-w-[200px] font-mono-ui text-[9px] uppercase leading-[1.6] tracking-[.16em] text-[#d7d0c4] md:max-w-[270px]">Architecture / Interiors<br />Visual storytelling</p>
          <p className="reveal reveal-delay-1 hidden font-mono-ui text-[9px] uppercase tracking-[.16em] text-[#d7d0c4] md:block">Independent studio<br />2025—present</p>
        </div>
        <div className="max-w-[950px]">
          <p className="reveal font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#d7d0c4]">Aziz / ArchSirius Studio</p>
          <h1 className="reveal reveal-delay-1 mt-4 font-display text-[clamp(3.2rem,16vw,13rem)] font-light leading-[.78] tracking-[-.07em]">Spaces<br /><em className="ml-[4vw] sm:ml-[13vw]">remembered.</em></h1>
        </div>
        <div className="mt-12 flex items-end justify-between gap-5 md:mt-20">
          <p className="reveal reveal-delay-2 max-w-[350px] text-sm leading-[1.7] text-[#d7d0c4] md:text-base">A visual practice for architecture that begins with light, material, and the feeling a room leaves behind.</p>
          <a href="#work" className="reveal reveal-delay-3 group flex shrink-0 items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.16em]" data-testid="link-hero-work">Enter the work <ArrowDownRight size={17} strokeWidth={1.1} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></a>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 hidden h-16 w-px -translate-x-1/2 bg-[#f0eadf]/30 md:block" />
    </section>
  );
}

function Intro() {
  return (
    <section id="studio" className="bg-[#e7e0d5] px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-[.8fr_1.5fr] md:gap-24">
        <div className="reveal">
          <p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#975b3f]">01 / The approach</p>
          <div className="mt-10 h-px w-16 bg-[#975b3f]" />
        </div>
        <div>
          <h2 className="reveal font-display text-[clamp(2.8rem,6.2vw,6.8rem)] font-light leading-[.94] tracking-[-.06em]">The image is not<br /><em>the finish line.</em></h2>
          <p className="reveal reveal-delay-1 mt-10 max-w-[520px] text-lg leading-[1.65] text-[#574f46] md:ml-[16%] md:mt-14 md:text-xl">Aziz works between architectural intent and lived atmosphere — building images that make material, proportion, and daylight feel close enough to touch.</p>
          <p className="reveal reveal-delay-2 mt-6 max-w-[440px] text-sm leading-[1.7] text-[#756b60] md:ml-[16%]">Selected projects and visualization work are presented as studies in mood, rhythm, and the quiet details that give a space its character.</p>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  return (
    <article className={`project-card reveal ${index % 2 === 1 ? 'reveal-delay-1' : ''} group ${project.className}`} data-testid={`card-project-${project.id}`}>
      <div className="image-frame relative aspect-[4/5] h-full min-h-[350px] bg-[#cbc1b2] md:min-h-0">
        <img src={project.image} alt={`${project.title}, ${project.category}`} className="h-full w-full object-cover" loading={index > 1 ? 'lazy' : 'eager'} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17140f]/75 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
        <span className="absolute left-5 top-5 font-mono-ui text-[10px] text-[#f0eadf]">{project.number} / {project.id}</span>
        <div className="project-meta absolute bottom-5 left-5 right-5 text-[#f0eadf] md:bottom-7 md:left-7 md:right-7">
          <p className="font-mono-ui text-[9px] uppercase tracking-[.15em] text-[#e2c6b7]">{project.category}</p>
          <h3 className="mt-2 font-display text-3xl font-light tracking-[-.04em] md:text-4xl">{project.title}</h3>
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section id="work" className="bg-[#25211c] px-5 py-28 text-[#f0eadf] md:px-10 md:py-44">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-14 flex items-end justify-between md:mb-20">
          <div>
            <p className="reveal font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#c78767]">02 / Selected work</p>
            <h2 className="reveal reveal-delay-1 mt-5 font-display text-[clamp(3rem,7vw,7rem)] font-light leading-[.84] tracking-[-.07em]">A sense<br /><em>of place.</em></h2>
          </div>
          <p className="reveal hidden max-w-[190px] text-right text-xs leading-[1.6] text-[#a9a097] md:block">Six visual studies<br />across exterior and<br />interior space.</p>
        </div>
        <div className="grid auto-rows-[minmax(260px,28vw)] grid-cols-1 gap-3 md:grid-cols-12 md:gap-5">
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ['01', 'Read the brief', 'Understanding the architecture, its context, and the emotion it should carry.'],
    ['02', 'Find the light', 'Composition, atmosphere, and a point of view that makes the space feel inevitable.'],
    ['03', 'Build the stillness', 'Material, texture, and detail resolved until the image can hold attention quietly.'],
  ];
  return (
    <section className="bg-[#d5cec3] px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-14 md:grid-cols-[.8fr_1.5fr] md:gap-24">
          <div className="reveal">
            <p className="font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#975b3f]">03 / Working method</p>
            <p className="mt-20 max-w-[160px] text-xs leading-[1.6] text-[#756b60]">Good visualization is less about adding and more about noticing.</p>
          </div>
          <div>
            {steps.map(([number, title, copy], index) => (
              <div key={number} className={`reveal reveal-delay-${Math.min(index + 1, 3)} grid gap-5 border-t border-[#9f968a] py-8 md:grid-cols-[70px_1fr_1.2fr] md:gap-10 md:py-10`} data-testid={`process-step-${number}`}>
                <span className="font-mono-ui text-[10px] text-[#975b3f]">{number}</span>
                <h3 className="font-display text-4xl font-light leading-none tracking-[-.04em] md:text-5xl">{title}</h3>
                <p className="max-w-[280px] text-sm leading-[1.7] text-[#635b52]">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="bg-[#975b3f] px-5 pb-8 pt-28 text-[#f4eee5] md:px-10 md:pt-44">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-16 md:grid-cols-[1.35fr_.65fr] md:gap-24">
          <div>
            <p className="reveal font-mono-ui text-[10px] uppercase tracking-[.2em] text-[#f0d9c9]">04 / Next frame</p>
            <h2 className="reveal reveal-delay-1 mt-8 max-w-[900px] font-display text-[clamp(4rem,11vw,11rem)] font-light leading-[.78] tracking-[-.075em]">Let’s make<br /><em>space.</em></h2>
          </div>
          <div className="reveal reveal-delay-2 md:pt-12">
            <p className="max-w-[290px] text-base leading-[1.7] text-[#f0d9c9]">For new collaborations, project conversations, or simply to share a direction, find ArchSirius Studio on the channels below.</p>
            <div className="mt-10 flex flex-col items-start gap-4">
              {socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="line-link group flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.18em]" data-testid={`link-social-${social.label.toLowerCase()}`}>{social.label}<ArrowUpRight size={14} strokeWidth={1.1} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>)}
            </div>
          </div>
        </div>
        <div className="mt-28 flex flex-col justify-between gap-4 border-t border-[#f0eadf]/30 pt-5 font-mono-ui text-[9px] uppercase tracking-[.15em] text-[#f0d9c9] md:mt-44 md:flex-row">
          <span>Aziz / ArchSirius Studio</span>
          <span>Selected projects / visualization work</span>
          <a href="#top" className="line-link" data-testid="link-back-to-top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useRevealObserver();
  useEffect(() => {
    document.title = 'Aziz — ArchSirius Studio';
    const description = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    description.setAttribute('name', 'description');
    description.setAttribute('content', 'Aziz / ArchSirius Studio — architectural and interior visualization studies shaped by light, material, and atmosphere.');
    document.head.appendChild(description);
  }, []);
  return (
    <div className="site-grain min-h-screen">
      <ScrollProgress />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <Intro />
        <Work />
        <Process />
      </main>
      <Contact />
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;