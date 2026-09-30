// SetSail: single source of copy for the homepage Featured Build and /work/setsail.
//
// Rules this content follows (see the SetSail research and privacy audit):
// - Concepts only. No product screenshots, no recreated screens, no client or agency names,
//   no third-party product names for the previous workflow.
// - "I built...", never "is used by...". No usage, adoption, or result claims.
// - KPI reporting is monthly CSV import, not live analytics.
// - Booking is connected booking links, not a native scheduling engine.
// - The Cloud Campaign integration exists in source behind readiness flags that default off,
//   so it is never described as a live publishing workflow.
// - No em dashes in copy.

export const setsail = {
  name: 'SetSail',
  href: '/work/setsail',

  // ---------- Homepage Featured Build ----------
  home: {
    hook: [
      'I was working with an organic social media agency. The team’s workflow worked. The client side didn’t, especially when a post was waiting for approval.',
    ],
    idea: {
      instruction: 'Drag the card. Right approves, left asks for changes.',
      approve: 'Approve',
      changes: 'Request changes',
      after: {
        approve: 'Approved. That solved one part of it.',
        changes: 'Changes requested. That solved one part of it.',
      },
      reset: 'Try again',
      resetStatus: 'Card reset.',
      card: {
        title: 'Saturday, fresh out of the oven.',
        note: 'A draft post for a neighborhood bakery.',
        tag: 'Draft',
      },
    },
    bridge: {
      heading: 'That solved one part of it.',
      body: 'SetSail grew into a client portal and agency workspace. Here is some of what went into it.',
    },
    evidence: [
      {
        figure: '4',
        label: 'roles',
        note: 'Invitation only, and every client is scoped to their own account.',
      },
      {
        figure: '8',
        label: 'onboarding stages',
        note: 'Clients needed to know what happened next.',
      },
      {
        figure: 'Monthly',
        label: 'reporting',
        note: 'Imported from a CSV and charted in the same workspace.',
      },
      {
        figure: 'React',
        label: 'TypeScript, Supabase, Vercel',
        note: 'Planning through deployment, built end to end.',
      },
    ],
    cta: 'See how I built it',
  },

  // ---------- /work/setsail ----------
  case: {
    title: 'SetSail',
    lead: 'A client portal and agency workspace I built after noticing where the client experience broke down.',
    meta: [
      { label: 'Context', value: 'An organic social media agency' },
      { label: 'My part', value: 'Planning through deployment' },
      { label: 'Built with', value: 'React, TypeScript, Supabase, Vercel' },
    ],

    // Real interface fragments, exported as dedicated cropped derivatives with no client, agency,
    // account or count/usage figures in the pixels. Evidence that the build exists, not a walkthrough.
    proof: {
      tag: 'From the actual build',
      note: 'Client information left out.',
      workflow: {
        src: '/images/setsail/agency-workflow-fragment.png',
        width: 520,
        height: 240,
        alt: 'A fragment of the agency side of SetSail showing a today’s posts card and an admin checklist with a suggested next step.',
      },
      stages: {
        src: '/images/setsail/lifecycle-stages-fragment.png',
        width: 822,
        height: 262,
        alt: 'A fragment of the client dashboard showing a current stage, the next stage, and a step tracker at stage five of eight.',
      },
      mobile: {
        src: '/images/setsail/client-mobile-fragment.png',
        width: 730,
        height: 690,
        alt: 'A fragment of the mobile client view with a going live today card and a coming up next card.',
      },
    },

    friction: {
      statement: 'The team’s workflow worked. The client side kept getting stuck.',
      body: 'I was working with an organic social media agency. Internally, things moved. But clients were reviewing content inside a workflow that wasn’t built for them, and the same problems kept coming back.',
      log: [
        'Approving a post, or asking for changes',
        'Understanding what stage an account was in',
        'Seeing how the month went',
        'Getting to a strategy call',
        'Scheduling content',
        'Managing the work behind each account',
      ],
      close: 'None of it was dramatic. It worked for the team. It wasn’t built for the client experience.',
    },

    decision: {
      heading: 'One interaction changed the idea.',
      body: 'Content approval was the first thing I wanted to fix. I wanted reviewing a post to feel as direct as answering a question, so I borrowed a gesture everyone already knows: swipe right to approve, left to ask for changes.',
      notes: [
        { text: 'Right approves. Left asks for changes.', side: 'left' },
        { text: 'Buttons do the same thing, so nobody has to swipe.', side: 'right' },
        { text: 'One gesture, one decision.', side: 'left' },
      ],
      try: 'Try the idea on the homepage',
    },

    grew: {
      heading: 'But approvals were only one part of it.',
      body: 'Once the approval step made sense, the rest of the client experience needed the same treatment. SetSail grew around the workflow.',
      notes: [
        {
          lead: 'Clients needed to know what happened next.',
          detail:
            'Onboarding and recurring stages sit on the client dashboard: eight steps for onboarding, seven for the ongoing cycle.',
        },
        {
          lead: 'Monthly reporting lives in the same workspace.',
          detail:
            'Metrics are imported from a CSV and charted for the client. It is monthly reporting, not live analytics.',
        },
        {
          lead: 'Booking shouldn’t mean hunting for a link.',
          detail:
            'The portal surfaces the coordinator’s Calendly links for strategy calls and check-ins. The scheduling itself stays in the booking tool.',
        },
        {
          lead: 'The work behind each account needed a home.',
          detail: 'A board and a list view for the team’s tasks, with editing.',
        },
        {
          lead: 'Different people see different slices.',
          detail:
            'Four roles: Super Admin, Admin, Creative Coordinator and Client. Access is invitation only.',
        },
        {
          lead: 'The small things add up.',
          detail:
            'Notifications, guided onboarding, intake forms, a resources and training library, a content calendar, and a client experience that works on a phone.',
        },
      ],
    },

    hood: {
      heading: 'Here is what is under it.',
      body: 'A business owner doesn’t need any of this to understand the story. If you want the detail, it’s here.',
      notes: [
        {
          title: 'Roles and access',
          summary: 'Four roles, and the database enforces them.',
          body: 'Access is invitation only. Row Level Security policies in Postgres decide who can read or change what, so the rules don’t depend on the interface. Important actions are written to an append-only audit log.',
        },
        {
          title: 'Files and storage',
          summary: 'Uploads are checked on the server.',
          body: 'File uploads go through Edge Functions that verify the file before it is stored, and files are handed back through signed URLs instead of public links.',
        },
        {
          title: 'Edge Functions',
          summary: 'The server-side pieces run on Supabase Edge Functions.',
          body: 'Invitations, upload verification, signed storage URLs and the integration work all run as Edge Functions on Deno.',
        },
        {
          title: 'The integration, and where it stands',
          summary: 'Built, tested, and switched off by default.',
          body: 'I built the pieces for handing approved content into Cloud Campaign’s workflows: content handoff, scheduling, analytics read, reconciliation and a webhook contract, with tests. They sit behind readiness flags that are off by default, so I don’t describe publishing as a live workflow.',
        },
        {
          title: 'Testing',
          summary: 'Checked before anything merged.',
          body: 'Unit tests and 42 Playwright end-to-end specs, plus typecheck, lint and a production build before each change went in.',
        },
      ],
      diagram: {
        label: 'Simplified architecture',
        nodes: [
          'Clients, coordinators and admins',
          'React and TypeScript app on Vercel',
          'Supabase: Auth, Postgres with RLS, Storage',
          'Edge Functions on Deno',
          'Cloud Campaign (readiness flags off by default)',
        ],
      },
    },

    built: {
      heading: 'How I built it.',
      words: ['Plan it.', 'Build it small.', 'Review it.'],
      body: [
        'I planned the product structure first, then built it in small pieces. Each piece was reviewed as a pull request and run through typecheck, lint and a build before it merged.',
        'I use AI tools throughout, the same way I do on client projects. They speed up the work. I decide what gets built and whether it’s ready.',
        'I’m not publishing usage numbers or client results here. This page is about how it was built.',
      ],
    },

    bridge: {
      heading: 'What it changed about how I build websites.',
      body: 'SetSail is a bigger build than a business website, but I came at it the same way I come at every site: work out what isn’t working, figure out what people actually need, then build around that.',
      rows: [
        {
          title: 'Business Websites',
          line: 'Start with how the business actually works, then make it easy to understand and easy to contact.',
        },
        {
          title: 'Website Rebuilds',
          line: 'Find what’s getting in the way before deciding what to keep.',
        },
        {
          title: 'Landing Pages',
          line: 'One clear message and one clear action, built around the decision someone is really making.',
        },
      ],
      cta: 'Have something you need to solve?',
      secondary: 'See what I build',
    },
  },
}
