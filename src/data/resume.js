// /resume: the structured professional record.
//
// Source of truth: Paul's resume PDF (kept outside the repository as of 2026-10-07). Every role,
// date, responsibility, figure and tool here comes from it; do not add anything it does not state.
// The figures are from Paul's past roles, never pawlystudios. client counts. SetSail copy follows
// the claim rules in src/data/setsail.js (no automatic scheduling or publishing claims). No em
// dashes in copy.
export const resume = {
  eyebrow: 'Resume',
  name: 'Niño Paul Cabiles',
  role: 'Web Developer',
  roleDetail: 'Operations & Project Experience',
  intro: [
    'I’ve been working remotely for over five years.',
    'I started in customer support. From there I moved into operations, executive support and project coordination. That work eventually put me around marketing, SEO, automation, and the systems businesses use every day.',
    'I spent years working inside those workflows before I moved deeper into building websites and software. It helps me spot where work slows down, where information gets lost, and where a better system would help.',
  ],

  glance: {
    heading: 'At a glance',
    context: 'Numbers from my remote roles over the years, not from my website work.',
    items: [
      { value: '5+', label: 'Years working remotely', source: 'Since 2021' },
      { value: '100+', label: 'Client accounts supported', source: 'SEO for Real Estate Investors' },
      { value: '28', label: 'Team members coordinated', source: 'SEO for Real Estate Investors' },
      {
        value: '30–40',
        spoken: '30 to 40',
        label: 'Client social workflows managed',
        source: 'SEO for Real Estate Investors',
      },
    ],
  },

  experience: {
    heading: 'Experience',
    roles: [
      {
        role: 'Senior Executive Assistant to the COO',
        company: 'SEO for Real Estate Investors',
        location: 'Remote',
        dates: '2025–2026',
        datesSpoken: '2025 to 2026',
        summary:
          'I worked closely with the COO, the Client Success team, and a 28-person cross-functional team supporting more than 100 client accounts.',
        figure: { value: '3h → 20m', spoken: 'From about 3 hours to about 20 minutes', label: 'One daily manual process, after a GoHighLevel automation I built' },
        points: [
          'Built a GoHighLevel automation for lead assignment, sales workflows and pipeline opportunities. It cut a daily manual process from around three hours to about 20 minutes.',
          'Built SOPs, output trackers and task delegation systems with the COO and Client Success Managers, so teams had clearer workflows and ownership.',
          'Built the social media service workflow for around 30–40 clients, covering content strategy, production, approvals, scheduling, reporting and publishing.',
          'Coordinated projects across development, SEO, PPC, copywriting, social media and client success.',
          'Worked with client-facing teams on workflow problems, project blockers and operational requirements, and prepared performance reports across service lines.',
        ],
        note: 'This role gave me much of the operational context behind the systems and tools I build today.',
      },
      {
        role: 'Director of Operations, Part-Time',
        company: 'Marketing-Mo',
        location: 'Remote',
        dates: '2025',
        points: [
          'Coordinated a small remote team working across web development, SEO, PPC and social media projects.',
          'Managed project timelines, task ownership, follow-ups and team communication.',
          'Built internal trackers, SOPs, guidelines and a Notion workspace to make recurring work easier to organize and track.',
          'Worked across operational and technical projects, which pushed me toward building better systems around repeatable work.',
        ],
      },
      {
        role: 'Associate, Phone, Chat & Email Support',
        company: 'Peak Support',
        location: 'Remote',
        dates: '2021–2024',
        datesSpoken: '2021 to 2024',
        summary: 'Where my remote work started.',
        figure: { value: '120+', label: 'Customer interactions a day, across phone, chat and email' },
        points: [
          'Resolved billing issues, account concerns and partner questions in high-volume support.',
          'Built a lot of my communication, prioritization and problem-solving habits here.',
        ],
      },
    ],
  },

  project: {
    eyebrow: 'Selected Project',
    name: 'SetSail',
    body: [
      'An internal operations platform I started building after seeing a real workflow problem while working with a social media agency.',
      'It began as a simpler client portal and grew into a broader agency workspace.',
    ],
    cta: 'View case study',
    href: '/work/setsail',
  },

  training: {
    heading: 'Training',
    program: 'Executive Assistant Training Program',
    provider: 'Athena',
    dates: '2024',
    body: 'Training in executive support, calendar and inbox management, client communication, meeting coordination, travel support, time management and project management.',
  },

  tools: {
    heading: 'Tools',
    ai: 'I use Claude Code during implementation, and ChatGPT to plan features, break down problems and troubleshoot.',
    groups: [
      {
        category: 'Development',
        items: ['React', 'TypeScript', 'JavaScript', 'Vite', 'Supabase', 'Vercel', 'GitHub', 'VS Code'],
      },
      { category: 'AI-assisted workflow', items: ['Claude Code', 'ChatGPT'] },
      {
        category: 'Operations & project work',
        items: ['Google Workspace', 'Microsoft 365', 'Notion', 'Asana', 'Slack', 'Zoom'],
      },
      {
        category: 'Marketing & analytics',
        items: [
          'GoHighLevel',
          'HubSpot',
          'Salesforce',
          'Semrush',
          'Google Search Console',
          'Google Analytics',
          'Google Ads',
          'WordPress',
        ],
      },
      { category: 'Creative', items: ['Canva', 'CapCut', 'DaVinci Resolve'] },
    ],
  },

  contact: {
    heading: 'Want to talk?',
    lead: 'Whether it’s about a website, a project or a role, these are the easiest ways to reach me.',
  },
}
