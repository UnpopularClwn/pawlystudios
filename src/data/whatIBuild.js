// Homepage "What I Build" capability section: three offers only.
// Kept separate from src/data/process.js (the /services/web-development
// five-service list), which stays untouched.
export const whatIBuild = {
  eyebrow: 'What I Build',
  heading: 'What does your business need?',
  offers: [
    {
      prompt: 'Need your first website?',
      title: 'Business Websites',
      description:
        'A website built around your business, your services, and what your customers need to know. Something that represents your business clearly and gives people an easy way to take the next step.',
    },
    {
      prompt: 'Has your current website fallen behind?',
      title: 'Website Rebuilds',
      description:
        'If your website feels outdated, no longer represents your business, or has become difficult to work with, I can rebuild it around what you need today.',
    },
    {
      prompt: 'Need one page for something specific?',
      title: 'Landing Pages',
      description:
        'A focused page for a service, campaign, product, or offer, built around one clear message and one clear action.',
    },
  ],
  cta: {
    label: 'Explore web development',
    href: '/services/web-development',
  },
}
