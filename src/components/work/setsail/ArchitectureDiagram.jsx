// Simplified architecture, drawn as inline SVG so it stays crisp and readable on a phone.
// The same information is available as a plain list for assistive tech. The integration is
// drawn dashed on purpose: it is built but switched off by default, not a live workflow.
export default function ArchitectureDiagram({ label, nodes }) {
  return (
    <figure className="cs-arch">
      <svg
        viewBox="0 0 360 470"
        role="img"
        aria-label={`${label}: ${nodes.join('; ')}.`}
        className="cs-arch-svg"
      >
        <defs>
          <marker id="cs-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>

        <g className="cs-arch-box">
          <rect x="30" y="10" width="300" height="52" rx="12" />
          <rect x="30" y="112" width="300" height="60" rx="12" />
          <rect x="18" y="222" width="324" height="170" rx="16" className="cs-arch-group" />
        </g>
        <g className="cs-arch-box cs-arch-box--soft">
          <rect x="34" y="262" width="88" height="44" rx="10" />
          <rect x="136" y="262" width="100" height="44" rx="10" />
          <rect x="250" y="262" width="76" height="44" rx="10" />
          <rect x="34" y="330" width="292" height="46" rx="10" />
        </g>
        <g className="cs-arch-box cs-arch-box--dashed">
          <rect x="30" y="424" width="300" height="42" rx="12" />
        </g>

        <g className="cs-arch-line" markerEnd="url(#cs-arrow)">
          <path d="M180 62 V108" markerEnd="url(#cs-arrow)" />
          <path d="M180 172 V218" markerEnd="url(#cs-arrow)" />
        </g>
        <path className="cs-arch-line cs-arch-line--dashed" d="M180 376 V420" markerEnd="url(#cs-arrow)" />

        <g className="cs-arch-text" textAnchor="middle">
          <text x="180" y="42">Clients, coordinators, admins</text>
          <text x="180" y="138">React + TypeScript app</text>
          <text x="180" y="158" className="cs-arch-sub">Vite, hosted on Vercel</text>
          <text x="180" y="248" className="cs-arch-title">Supabase</text>
          <text x="78" y="289">Auth</text>
          <text x="186" y="289">Postgres + RLS</text>
          <text x="288" y="289">Storage</text>
          <text x="180" y="358">Edge Functions on Deno</text>
          <text x="180" y="450" className="cs-arch-sub">Cloud Campaign, flags off by default</text>
        </g>
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  )
}
