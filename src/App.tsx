import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MousePointer2, Sparkles } from "lucide-react";
import CrystalScene from "./components/CrystalScene";
import PointerField from "./components/PointerField";
import { evidence, projects, stackGroups, surfScreens } from "./data";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: "easeOut" },
} as const;

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-space text-white selection:bg-acid selection:text-black">
      <PointerField />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_10%,rgba(136,170,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(204,255,0,0.13),transparent_24%),linear-gradient(180deg,#030014_0%,#07031b_48%,#030014_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.18] grid-texture" />

      <Header />

      <main className="relative z-10">
        <Hero />
        <Projects />
        <Evidence />
        <Stack />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-10">
      <a href="#top" className="group flex items-center gap-3" aria-label="Rui Chen home">
        <span className="grid h-9 w-9 place-items-center border border-acid/70 bg-acid text-black transition-transform duration-500 group-hover:rotate-45">
          <Sparkles className="h-4 w-4" />
        </span>
        <span className="font-display text-2xl uppercase tracking-[0.16em]">Rui Chen</span>
      </a>
      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
        {["Projects", "Research", "Stack", "About"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="border border-white/10 bg-white/[0.035] px-3 py-2 font-mono text-xs uppercase tracking-[0.24em] text-white/72 backdrop-blur-md transition-all duration-200 ease-out hover:border-acid hover:bg-acid hover:text-black hover:shadow-[0_0_24px_rgba(204,255,0,0.24)]"
          >
            {item}
          </a>
        ))}
      </nav>
      <a
        href="#contact"
        className="inline-flex h-11 items-center gap-2 border border-white/15 bg-white/5 px-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-md transition-colors hover:border-acid hover:bg-acid hover:text-black"
      >
        Contact
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28 pb-28 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-20 z-0 mx-auto h-[62vh] max-h-[720px] min-h-[420px] max-w-[1100px] opacity-55 blur-[0.2px] sm:top-16 sm:opacity-65">
        <CrystalScene />
      </div>

      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-[1500px] items-center justify-center">
        <motion.div {...fadeUp} className="relative z-10 mx-auto max-w-6xl text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-acid sm:text-xs">
            Computer science student / early-stage builder
          </p>
          <h1 className="mt-5 font-display text-[clamp(5.2rem,17vw,16rem)] uppercase leading-[0.78] tracking-normal">
            Rui <span className="text-stroke">Chen</span>
          </h1>
          <p className="mx-auto mt-7 max-w-4xl text-balance text-xl leading-8 text-white/78 sm:text-2xl sm:leading-10">
            Computer science student and early-stage builder focused on local-first macOS tools, AI-native software, and spatial computing experiments.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-white/58 sm:text-lg">
            Building practical systems around work memory, prompt workflows, and spatial interfaces while keeping privacy and usefulness at the center.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {["WorkTrace", "ClipDock", "VisionOS / AR", "CUDA Python"].map((item) => (
              <a
                key={item}
                href={item === "CUDA Python" ? "#research" : "#projects"}
                className="border border-white/18 bg-white/[0.055] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/76 backdrop-blur-md transition-all duration-200 ease-out hover:scale-[1.025] hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_28px_rgba(255,255,255,0.18)]"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[-0.18em] overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-[clamp(4rem,13vw,12rem)] uppercase leading-none text-transparent footer-stroke">
          <span className="pr-10">LOCAL-FIRST // AI-NATIVE // SPATIAL SYSTEMS //</span>
          <span className="pr-10">LOCAL-FIRST // AI-NATIVE // SPATIAL SYSTEMS //</span>
          <span className="pr-10">LOCAL-FIRST // AI-NATIVE // SPATIAL SYSTEMS //</span>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <SectionHeader eyebrow="Selected Projects" title="Practical systems with a strong privacy spine." />
      <div className="mx-auto mt-12 grid max-w-[1500px] gap-5 lg:grid-cols-2">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <motion.article
              key={project.title}
              {...fadeUp}
              transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group overflow-hidden border border-white/10 bg-white/[0.055] backdrop-blur-md transition-colors hover:border-acid/60"
            >
              {project.image && (
                <div className="relative h-56 overflow-hidden border-b border-white/10 bg-black/30 sm:h-72">
                  <img src={project.image} alt={`${project.title} screenshot or evidence`} className="h-full w-full object-cover opacity-80 grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-space/70 to-transparent" />
                </div>
              )}
              <div className="p-5 sm:p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-acid">{project.kicker}</p>
                    <h3 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">{project.title}</h3>
                  </div>
                  <Icon className="h-8 w-8 shrink-0 text-cyan" />
                </div>
                <p className="max-w-2xl text-base leading-7 text-white/70">{project.description}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {project.stats.map((stat) => (
                    <div key={stat} className="border border-white/10 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                      {stat}
                    </div>
                  ))}
                </div>
                <ul className="mt-6 space-y-3">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-white/64">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-acid" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="bg-black/25 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function Evidence() {
  return (
    <section id="research" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <SectionHeader eyebrow="Research / Proof" title="Evidence, kept in support of the work." />
      <div className="mx-auto mt-12 grid max-w-[1500px] gap-5 md:grid-cols-3">
        {evidence.map((item, index) => (
          <motion.article key={item.title} {...fadeUp} transition={{ duration: 0.65, delay: index * 0.05 }} className="overflow-hidden border border-white/10 bg-white/[0.055]">
            <div className="h-48 overflow-hidden border-b border-white/10 bg-white">
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover object-left-top" />
            </div>
            <div className="p-5">
              <p className="font-display text-3xl uppercase">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-white/62">{item.detail}</p>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div {...fadeUp} className="mx-auto mt-8 max-w-[1500px] border border-white/10 bg-white/[0.045] p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-acid">University promotion</p>
            <h3 className="mt-2 font-display text-4xl uppercase">SURF project visibility</h3>
          </div>
          <MousePointer2 className="hidden h-7 w-7 text-cyan sm:block" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {surfScreens.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`SURF university promotion screenshot ${index + 1}`}
              className="aspect-[9/14] w-full border border-white/10 object-cover object-top"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <SectionHeader eyebrow="Technical Stack" title="A clearer map of what Rui is building with." />
      <div className="mx-auto mt-12 grid max-w-[1500px] gap-4 lg:grid-cols-5">
        {stackGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <motion.article
              key={group.title}
              {...fadeUp}
              transition={{ duration: 0.55, delay: index * 0.04 }}
              className="border border-white/10 bg-white/[0.045] p-5 backdrop-blur-md transition-colors hover:border-acid/45"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-4xl uppercase leading-none">{group.title}</h3>
                <Icon className="h-7 w-7 shrink-0 text-acid" />
              </div>
              <p className="mt-5 text-sm leading-6 text-white/60">{group.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="border border-white/10 bg-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/52">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader eyebrow="About" title="A builder of memory, tools, and spatial interfaces." compact />
        <motion.div {...fadeUp} className="border-y border-white/10 py-8">
          <p className="text-2xl leading-10 text-white/78">
            Rui works at the edge of practical productivity and experimental interface design: local-first macOS utilities, compressed work-memory systems, prompt/tool docks, and VisionOS ideas that turn physical space into an interactive surface.
          </p>
          <p className="mt-6 text-base leading-8 text-white/58">
            The through-line is restraint: collect less, compress first, keep useful context local, and use AI only when it can reflect on meaningful signals rather than raw private behavior.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-10 lg:py-32">
      <motion.div {...fadeUp} className="mx-auto max-w-[1500px] border border-acid/35 bg-acid p-6 text-black sm:p-10 lg:p-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em]">Open channel</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h2 className="font-display text-[clamp(4rem,12vw,11rem)] uppercase leading-[0.82]">
            Build the next useful interface.
          </h2>
          <div>
            <p className="text-lg leading-8">
              Available for internships, research collaborations, AI-native app projects, and spatial computing experiments.
            </p>
            <a
              href="mailto:15980825997@163.com"
              className="mt-7 inline-flex h-14 items-center gap-3 border border-black px-5 font-mono text-xs uppercase tracking-[0.22em] transition-colors hover:bg-black hover:text-acid"
            >
              <Mail className="h-4 w-4" />
              15980825997@163.com
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-white/42 sm:flex-row sm:items-center sm:justify-between">
        <p>Rui Chen / computer science student / local-first tools / spatial experiments</p>
        <p>2026</p>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  compact?: boolean;
}) {
  return (
    <motion.div {...fadeUp} className={compact ? "" : "mx-auto max-w-[1500px]"}>
      <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-acid sm:text-xs">{eyebrow}</p>
      <h2 className="mt-4 max-w-5xl font-display text-[clamp(3.5rem,9vw,9rem)] uppercase leading-[0.86]">
        {title}
      </h2>
    </motion.div>
  );
}
