import Image from "next/image";

const ecosystem = [
  [
    "Real Estate Developers",
    "Handover, community setup, portfolio performance across projects.",
  ],
  [
    "Property Managers",
    "Leases, service charges, collections, renewals, communication.",
  ],
  [
    "Facility Management",
    "Asset registers, planned maintenance, inspections, compliance.",
  ],
  [
    "Maintenance Providers",
    "Work orders, dispatch, SLAs, parts, completion sign-off.",
  ],
  [
    "Community Management",
    "Owners associations, budgets, announcements, governance.",
  ],
  [
    "Operations Teams",
    "Daily workflow, escalations, staffing, service quality.",
  ],
  [
    "Owners & Investors",
    "Occupancy, yield, cost per unit, operational reporting.",
  ],
  [
    "Residents & Clients",
    "Requests, payments, documents, updates — one channel.",
  ],
];
const lifecycle = [
  ["Handover", "Snagging, documentation, unit data, warranty capture"],
  ["Community", "Associations, budgets, governance, announcements"],
  ["Facility", "Assets, PPM schedules, inspections, compliance"],
  ["Maintenance", "Requests, dispatch, SLA tracking, resolution"],
  ["Experience", "Resident portal, payments, documents, service"],
  ["Intelligence", "Cost, performance, benchmarking, decisions"],
];
const audiences = [
  [
    "Developers",
    "Portfolio visibility and handover complexity",
    "A foundation that scales across projects",
  ],
  [
    "Property Managers",
    "Fragmented processes and resident expectations",
    "Control across the full operating journey",
  ],
  [
    "Facility Management",
    "Disconnected assets, contractors and schedules",
    "One register for every operational detail",
  ],
  [
    "Residents & Clients",
    "Slow requests and unclear communication",
    "One channel for requests, payments and information",
  ],
];
const shell =
  "mx-auto w-[min(1440px,calc(100%-40px))] md:w-[min(1340px,calc(100%-96px))]";
function Label({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.22em]">
      <span className="text-[#00B383]">{number}</span>
      <span>{children}</span>
    </div>
  );
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(40px,6vw,82px)] font-medium leading-[.94] tracking-[-.065em]">
      {children}
    </h2>
  );
}
export default function Page() {
  return (
    <main className="bg-[#F5F4F0] text-[#0E1216]">
      <nav
        className={`${shell} relative z-10 flex h-[72px] items-center justify-between border-b border-[#0e1216]/15 md:h-[86px]`}
        aria-label="Primary navigation"
      >
        <a
          className="flex items-center gap-2.5 text-[17px] font-bold tracking-[.12em]"
          href="#top"
        >
          <Image src="/logo.png" width={100} height={100} alt="pilot"/>
        </a>
        <div className="hidden gap-8 text-[11px] uppercase tracking-[.15em] text-[#39424C] md:flex">
          <a href="#ecosystem">Ecosystem</a>
          <a href="#connect">What we connect</a>
          <a href="#about">About</a>
        </div>
        <a
          className="text-[11px] font-bold uppercase tracking-[.14em]"
          href="#contact"
        >
          Talk to Pilot 
        </a>
      </nav>
      <section
        id="top"
        className={`${shell} relative flex min-h-[calc(100svh-72px)] flex-col justify-between overflow-hidden py-10 md:min-h-[calc(100svh-86px)]`}
      >
        {/* Structural grid lines */}
        <div
          className="pointer-events-none absolute inset-0 grid grid-cols-2 md:grid-cols-4"
          aria-hidden="true"
        >
          {[1, 2, 3, 4].map((i) => (
            <i key={i} className="border-r border-[#0e1216]/[.08]" />
          ))}
        </div>

        <div className="relative z-[1] grid flex-1 grid-cols-1 items-center gap-10 py-[10vh] md:grid-cols-[1.15fr_.85fr] md:gap-6 md:py-0">
          {/* Left: copy */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-6 bg-[#00B383]" />
              <span className="text-[11px] font-bold tracking-[.16em] text-[#00B383]">
                01 // PILOT
              </span>
            </div>

            <h1 className="max-w-[620px] text-balance text-[clamp(40px,6.4vw,84px)] font-medium leading-[.98] tracking-[-.04em]">
              Digital infrastructure
              <br />
              <em className="not-italic text-[#39424C]">
                for property operations.
              </em>
            </h1>

            <p className="mt-7 max-w-md text-base leading-[1.6] text-[#39424C]">
              One system connecting developers, managers, operators, and
              residents — instead of six disconnected tools.
            </p>

            <div className="mt-9 flex items-center gap-5">
              <a
                href="#ecosystem"
                className="group inline-flex items-center gap-2 rounded-full bg-[#0e1216] px-6 py-3 text-[11px] font-bold uppercase tracking-[.14em] text-[#F5F4F0] transition-colors hover:bg-[#00B383]"
              >
                Explore the ecosystem
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </div>
          </div>

          {/* Right: connection diagram — visualizes "one system, four roles" */}
          <div className="relative mx-auto aspect-square w-full max-w-[420px] md:max-w-none">
            <svg
              viewBox="0 0 400 400"
              className="h-full w-full"
              aria-hidden="true"
            >
              <circle cx="200" cy="200" r="168" fill="none" stroke="#0e1216" strokeOpacity=".08" />
              {[
                [200, 46],
                [354, 200],
                [200, 354],
                [46, 200],
              ].map(([x, y], i) => (
                <line
                  key={i}
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke="#00B383"
                  strokeOpacity=".35"
                  strokeWidth="1"
                />
              ))}
              {[
                [200, 46],
                [354, 200],
                [200, 354],
                [46, 200],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="5" fill="#00B383" />
              ))}
              <circle cx="200" cy="200" r="34" fill="#0e1216" />
              <text
                x="200"
                y="204"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                letterSpacing=".04em"
                fill="#F5F4F0"
              >
                PILOT
              </text>
            </svg>

            {[
              { label: "Developers", pos: "left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+8px)]" },
              { label: "Managers", pos: "right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+10px)]" },
              { label: "Operators", pos: "left-1/2 bottom-0 -translate-x-1/2 translate-y-[calc(100%+8px)]" },
              { label: "Residents", pos: "left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+10px)]" },
            ].map(({ label, pos }) => (
              <span
                key={label}
                className={`absolute ${pos} whitespace-nowrap text-[10px] font-bold uppercase tracking-[.1em] text-[#39424C]`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-[1] flex items-center justify-between gap-4 text-[8px] uppercase tracking-[.14em] text-[#8E98A3] md:text-[10px]">
          <span className="h-px w-full bg-[#00B383]/30" />
          <span className="shrink-0">Scroll to operate better</span>
          <span className="h-px w-full bg-[#00B383]/30" />
        </div>
      </section>
      <section
        id="about"
        className="bg-[#0E1216] py-24 text-[#F5F4F0] md:py-36"
      >
        <div className={`${shell} grid gap-12 lg:grid-cols-[220px_1fr]`}>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Label number="01">What is Pilot</Label>
          </div>

          <div className="space-y-12">
            <div className="space-y-6 max-w-3xl">
              <SectionTitle>
                Pilot is a Property Operations Technology Company.
              </SectionTitle>
              <p className="text-xl leading-relaxed text-mist">
                Our technology helps real estate developers, property managers,
                and facility management companies operate their properties with
                greater visibility, control, and confidence.
              </p>
            </div>

            <div className="h-px w-full bg-white/10" />

            <div className="grid gap-8 md:grid-cols-2 items-start">
              <p className="text-base leading-relaxed text-[#8E98A3]">
                From community management and facility operations to resident
                experiences and operational intelligence, Pilot transforms
                fragmented processes into one connected ecosystem.
              </p>

              <div className="rounded-xl border border-[#00B383]/20 bg-[#121A17] p-6 text-[#00B383]">
                <p className="font-medium leading-relaxed">
                  We don&apos;t simply build software. We build the operating
                  foundation that helps properties perform better every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="ecosystem" className={`${shell} py-24 md:py-36`}>
        <Label number="02">The Ecosystem</Label>

        <div className="my-14 grid gap-8 md:grid-cols-[1fr_1fr]">
          <SectionTitle>
            One platform,
            <br />
            <em className="not-italic text-[#39424C]">every party.</em>
          </SectionTitle>
          <p className="max-w-md self-end leading-relaxed text-[#39424C]">
            Property operations are not a single company&apos;s problem. They
            are a chain of organisations that must agree with each other
            continuously. Pilot is the layer they all operate on.
          </p>
        </div>

        {/* ---------- xl and up: top-down tree ---------- */}
        <div className="hidden xl:block">
          {/* root */}
          <div className="mx-auto grid size-44 place-items-center rounded-full border border-[#0E1216] text-center">
            <div>
              <span className="mx-auto mb-3 block size-2 rounded-full bg-[#00B383]" />
              <b className="block tracking-[.12em]">PILOT</b>
              <small className="text-[8px] tracking-[.18em] text-[#8E98A3]">
                CONNECTED ECOSYSTEM
              </small>
            </div>
          </div>

          {/* trunk */}
          <div className="mx-auto h-12 w-px bg-[#0e1216]/15" />

          {/* spine + 8 leaves */}
          <div className="relative">
            <span className="absolute left-[6.25%] right-[6.25%] top-0 h-px bg-[#0e1216]/15" />
            <div className="grid grid-cols-8 gap-x-3">
              {ecosystem.map(([title, copy], i) => (
                <div key={title} className="relative pt-8">
                  <span className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-[#0e1216]/15" />
                  <span className="absolute left-1/2 top-8 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00B383]" />
                  <span className="block text-[10px] font-bold tracking-[.14em] text-[#00B383]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-[13px] font-semibold leading-snug">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[10px] leading-relaxed text-[#39424C]">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- below xl: vertical rail tree ---------- */}
        <div className="xl:hidden">
          <ol className="relative border-l border-[#0e1216]/15 pl-10">
            {/* root, as the first node on the rail */}
            <li className="relative pb-10">
              <span className="absolute -left-[58px] top-0 grid size-9 place-items-center rounded-full border border-[#0E1216] bg-white">
                <span className="size-1.5 rounded-full bg-[#00B383]" />
              </span>
              <b className="text-sm tracking-[.14em]">PILOT</b>
              <span className="ml-2 align-middle text-[9px] tracking-[.18em] text-[#8E98A3]">
                CONNECTED ECOSYSTEM
              </span>
            </li>

            {ecosystem.map(([title, copy], i) => (
              <li key={title} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[44px] top-1.5 size-2 rounded-full bg-[#00B383]" />
                <span className="text-[10px] font-bold tracking-[.14em] text-[#00B383]">
                  0{i + 1}
                </span>
                <h3 className="mt-1 text-[15px] font-semibold">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#39424C]">
                  {copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section id="connect" className="bg-white py-24 md:py-36">
        <div className={shell}>
          <Label number="03">What We Connect</Label>
          <div className="my-14 grid gap-8 md:grid-cols-[1fr_1fr]">
            <SectionTitle>
              From fragmented processes to{" "}
              <em className="not-italic text-[#00B383]">
                one connected ecosystem.
              </em>
            </SectionTitle>
            <p className="max-w-md self-end leading-relaxed text-[#39424C]">
              The operational journey does not begin at handover and it does not
              end at occupancy. Pilot spans the entire operating life of a
              property.
            </p>
          </div>
          <div className="grid grid-cols-1 border-t border-[#0e1216]/15 sm:grid-cols-2 lg:grid-cols-3">
            {lifecycle.map(([title, copy], i) => (
              <div
                className="min-h-48 border-b border-r border-[#0e1216]/15 p-5"
                key={title}
              >
                <span className="text-[10px] font-bold text-[#00B383]">
                  0{i + 1}
                </span>
                <h3 className="mt-10 text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#39424C]">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#00B383] py-24 md:py-36">
        <div className={`${shell} grid gap-10 md:grid-cols-[220px_1fr]`}>
          <Label number="04">Vision</Label>
          <div>
            <SectionTitle>
              To become the digital infrastructure behind the world&apos;s most
              trusted property operations.
            </SectionTitle>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#0E1216]/70">
              We envision a future where every residential community, commercial
              property, and mixed-use development operates through a connected,
              intelligent platform.
            </p>
          </div>
        </div>
      </section>
      <section className={`${shell} py-24 md:py-36`}>
        <Label number="05">Mission</Label>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <SectionTitle>
            To simplify, connect, and elevate property operations through
            intelligent technology.
          </SectionTitle>
          <div>
            <p className="text-lg leading-relaxed text-[#39424C]">
              We empower real estate organizations with scalable digital
              solutions that improve operational efficiency, enhance customer
              experiences, and grow alongside their business.
            </p>
            <div className="mt-12 grid gap-8">
              {[
                ["Simplify", "Remove the manual work and duplicate entry."],
                ["Connect", "Put every stakeholder on the same information."],
                ["Elevate", "Turn operations into a source of intelligence."],
              ].map(([title, copy], i) => (
                <div className="border-t border-[#0e1216]/15 pt-5" key={title}>
                  <span className="text-[10px] font-bold text-[#00B383]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-xl">{title}</h3>
                  <p className="mt-2 text-sm text-[#39424C]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="bg-[#0E1216] py-24 text-[#F5F4F0] md:py-36"
      >
        <div className={shell}>
          <Label number="06">Brand Story</Label>
          <div className="mt-14 max-w-4xl">
            <SectionTitle>
              Every property is designed to stand for decades.
            </SectionTitle>
            <p className="mt-6 text-xl text-[#8E98A3]">
              But its true success is never determined on the day it is built.
            </p>
            <p className="mt-2 text-3xl text-[#00B383]">
              It is determined every single day after.
            </p>
            <a
              className="mt-16 inline-block text-[11px] font-bold uppercase tracking-[.14em]"
              href="mailto:hello@pilot.com"
            >
              Talk to Pilot{" "}
            </a>
          </div>
        </div>
      </section>
      <footer className="bg-[#0E1216] px-5 pb-8 text-[#F5F4F0] md:px-12">
        <div
          className={`${shell} flex flex-col gap-5 border-t border-white/15 pt-8 text-[10px] uppercase tracking-[.15em] text-[#8E98A3] md:flex-row md:justify-between`}
        >
          <span>© Pilot</span>
          <span>Property Operations Technology Company</span>
          <span>07 / 07</span>
        </div>
      </footer>
    </main >
  );
}
