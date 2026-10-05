// "The Move" hero scene: a port of the approved "Website Machine" prototype (Claude Design).
// The geometry, camera, motion and timing below are the prototype's own and are kept as written, so
// the choreography (an 11 second loop driven by one clock `t`, with a wipe that resets the board)
// matches the approved piece. Only the drawing layer differs: the prototype rebuilt an SVG string for
// every frame; this module paints the same polygons, halftone dots, multiply shadows and wipe straight
// onto a 2D canvas, which is far cheaper per frame. Nothing here touches the DOM except pattern tiles.

// ---------------------------------------------------------------------------------------------
const L = 11, T_STATIC = 4.3, T_RESET = 10.1;
const COL = { bg: '#2A3F73', y: '#FEEEA6', red: '#D82C31', night: '#111A35', ink: '#1B2A52' };
const MAT = {
  cream: ['#FEEEA6', '#F4DC94', '#E8C57A', '#C99350'],
  navy: ['#FEEEA6', '#3E5590', '#24356A', '#141F40'],
  red: ['#F27A60', '#D82C31', '#A61F27', '#6A1420']
};
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = a => mul(a, 1 / (Math.hypot(a[0], a[1], a[2]) || 1));
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const E = {
  io: p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  sine: p => 0.5 - 0.5 * Math.cos(Math.PI * p),
  out3: p => 1 - (1 - p) ** 3,
  out2: p => 1 - (1 - p) ** 2
};
const LD = norm([-0.62, 0.45, 0.36]);
const rotZ = a => { const c = Math.cos(a), s = Math.sin(a); return o => [o[0] * c - o[1] * s, o[0] * s + o[1] * c, o[2]]; };
const rotY = a => { const c = Math.cos(a), s = Math.sin(a); return o => [o[0] * c + o[2] * s, o[1], -o[0] * s + o[2] * c]; };
function rodr(v, k, th) { const c = Math.cos(th), s = Math.sin(th); return add(add(mul(v, c), mul(cross(k, v), s)), mul(k, dot(k, v) * (1 - c))); }
function newell(p) {
  const n = [0, 0, 0];
  for (let i = 0; i < p.length; i++) { const c = p[i], d = p[(i + 1) % p.length]; n[0] += (c[1] - d[1]) * (c[2] + d[2]); n[1] += (c[2] - d[2]) * (c[0] + d[0]); n[2] += (c[0] - d[0]) * (c[1] + d[1]); }
  return n;
}

// ---- camera (perspective, tiny truck drift)
const CAM0 = { C: [-150, -60, 165], T: [190, 380, 55], F: 1150, cx: 1070, cy: 470 };
const CF = norm(sub(CAM0.T, CAM0.C)), CR = norm(cross(CF, [0, 0, 1])), CU = cross(CR, CF);
let CAMC = CAM0.C.slice();
function setCam(t) { const ph = (((t - T_RESET) % L) + L) % L / L; const d = -30 + 60 * ph; CAMC = add(CAM0.C, [d * 0.8, d * 0.6, 0]); }
function P(p) {
  const d = sub(p, CAMC); const z = Math.max(dot(d, CF), 20);
  return [CAM0.cx + CAM0.F * dot(d, CR) / z, CAM0.cy - CAM0.F * dot(d, CU) / z, z];
}

function hull(pts) {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}
const shp = p => [p[0] - LD[0] * p[2] / LD[2], p[1] - LD[1] * p[2] / LD[2], 0.3];

// ---- geometry (built once, reused)
function mkLathe(prof, N = 26) {
  const verts = [], faces = [];
  prof.forEach(([r, z]) => { for (let k = 0; k < N; k++) { const a = k / N * Math.PI * 2; verts.push([r * Math.cos(a), r * Math.sin(a), z]); } });
  for (let i = 0; i < prof.length - 1; i++) for (let k = 0; k < N; k++) { const k2 = (k + 1) % N; faces.push([i * N + k, i * N + k2, (i + 1) * N + k2, (i + 1) * N + k]); }
  return { verts, faces, N, rings: prof.length };
}
const BOXF = [[0, 2, 3, 1], [4, 5, 7, 6], [0, 1, 5, 4], [2, 6, 7, 3], [0, 4, 6, 2], [1, 3, 7, 5]];
function addBox(g, c, h, R) {
  const base = g.verts.length;
  for (let i = 0; i < 8; i++) g.verts.push(add(c, R([(i & 1 ? 1 : -1) * h[0], (i & 2 ? 1 : -1) * h[1], (i & 4 ? 1 : -1) * h[2]])));
  for (const f of BOXF) g.faces.push(f.map(i => i + base));
}
function mkExtrude(sil, T) {
  const n = sil.length, verts = [];
  sil.forEach(([x, z]) => verts.push([x, -T, z])); sil.forEach(([x, z]) => verts.push([x, T, z]));
  let front = [...Array(n).keys()], back = front.map(i => i + n);
  if (newell(front.map(i => verts[i]))[1] > 0) front.reverse();
  if (newell(back.map(i => verts[i]))[1] < 0) back.reverse();
  let A2 = 0; for (let k = 0; k < n; k++) { const p = sil[k], q = sil[(k + 1) % n]; A2 += p[0] * q[1] - q[0] * p[1]; }
  const faces = [];
  for (let k = 0; k < n; k++) {
    const k2 = (k + 1) % n; let f = [k, k2, k2 + n, k + n];
    const dx = sil[k2][0] - sil[k][0], dz = sil[k2][1] - sil[k][1];
    const out = A2 > 0 ? [dz, 0, -dx] : [-dz, 0, dx];
    if (dot(newell(f.map(i => verts[i])), out) < 0) f = f.reverse();
    faces.push(f);
  }
  faces.push(front, back);
  return { verts, faces, sil, T };
}
const sphereCap = (cz, r, from) => { const o = []; for (let a = from; a <= 90.01; a += 18) o.push([r * Math.cos(a * Math.PI / 180), cz + r * Math.sin(a * Math.PI / 180)]); return o; };
const G_PAWN = mkLathe([[36, 0], [36, 6], [31, 9], [32, 13], [25, 17], [17, 24], [13, 42], [11, 52], [20, 55], [20, 59], [11, 62]].concat(sphereCap(77, 17, -54)));
const G_KBASE = mkLathe([[42, 0], [42, 6], [37, 9], [38, 14], [32, 18], [28, 24], [27, 30], [31, 33], [31, 37], [26, 40]]);
const KSIL = [[-26, 38], [-31, 50], [-24, 64], [-36, 76], [-52, 82], [-63, 90], [-63, 99], [-55, 106], [-41, 114], [-27, 123], [-18, 131], [-13, 149], [-3, 135], [8, 132], [18, 125], [27, 119], [22, 113], [30, 107], [25, 101], [33, 95], [28, 89], [35, 83], [30, 77], [36, 71], [31, 63], [35, 52], [31, 38]];
const G_KHEAD = mkExtrude(KSIL, 17);
const K_DECO = [
  { p: [[-37, 77], [-23, 66], [-5, 82], [-14, 104], [-33, 108]], c: 'facet' },
  { p: [[-31, 110], [-25, 114.5], [-18, 111], [-25, 107.5]], c: 'ink' },
  { p: [[-59, 97], [-55.5, 99.5], [-53, 96], [-56.5, 93.5]], c: 'ink' },
  { p: [[-63, 90], [-47, 88.5], [-46, 90.5], [-61, 92]], c: 'ink' }
];
const G_ROOK = mkLathe([[40, 0], [40, 6], [35, 9], [36, 14], [29, 18], [23, 26], [20, 72], [25, 78], [30, 80], [30, 100], [22, 100], [22, 95], [0, 95]]);
for (let k = 0; k < 4; k++) { const a = Math.PI / 4 + k * Math.PI / 2; addBox(G_ROOK, [26 * Math.cos(a), 26 * Math.sin(a), 107], [6, 11, 7], rotZ(a)); }

function band(n, mat) {
  const d = dot(norm(n), LD);
  let i = d > 0.5 ? 0 : d > 0.15 ? 1 : d > -0.2 ? 2 : 3;
  if (mat === 'navy' && i === 0 && d < 0.72) i = 1;
  return i;
}

function shadowPolys(g, xf, isLathe) {
  const W = g.verts.map(xf);
  if (isLathe) { const pts = []; for (let i = 0; i < W.length; i += 2) pts.push(P(shp(W[i]))); return [hull(pts)]; }
  return g.faces.map(f => f.map(i => P(shp(W[i]))));
}

// ---- motion
const SQ = 100, A = [150, 450], B = [50, 250], CTRL = [150, 250];
const PUSH = norm([0.45, -1, 0]);
const PP0 = [250, 250, 0];
const YAW0 = 141 * Math.PI / 180;
function knightS(t) {
  let pos = A, z = 0, yaw = YAW0, lean = 0;
  const yawEnd = YAW0 + 0.16 * Math.PI / 2;
  if (t >= T_RESET || t < 3.0) { /* resting pose */ }
  else if (t < 3.7) lean = -3.2 * E.io(clamp((t - 3.0) / 0.6));
  else if (t < 5.0) {
    const p = (t - 3.7) / 1.3, s = E.sine(p), u = 1 - s;
    pos = [u * u * A[0] + 2 * u * s * CTRL[0] + s * s * B[0], u * u * A[1] + 2 * u * s * CTRL[1] + s * s * B[1]];
    z = 92 * Math.sin(Math.PI * Math.pow(p, 0.92));
    const tx = 2 * u * (CTRL[0] - A[0]) + 2 * s * (B[0] - CTRL[0]), ty = 2 * u * (CTRL[1] - A[1]) + 2 * s * (B[1] - CTRL[1]);
    let d = Math.atan2(ty, tx) + Math.PI / 2; while (d < -Math.PI) d += 2 * Math.PI; while (d > Math.PI) d -= 2 * Math.PI;
    yaw = YAW0 + 0.16 * d;
    lean = p < 0.45 ? -3.2 + 9.2 * E.io(p / 0.45) : 6 * (1 - E.io((p - 0.45) / 0.55));
  } else {
    pos = B; yaw = yawEnd;
    const q = clamp((t - 5.0) / 0.5); lean = 2.2 * Math.sin(Math.PI * q) * (1 - q);
  }
  return { pos, z: z + 40 * Math.sin(Math.abs(lean) * Math.PI / 180), yaw, lean };
}
function knightXF(k) {
  const Ry = rotY(-k.lean * Math.PI / 180), Rz = rotZ(k.yaw), o = [k.pos[0], k.pos[1], k.z];
  return v => add(o, Rz(Ry(v)));
}
function pawnXF(t) {
  if (t < 5.1 || t >= T_RESET) return v => add(PP0, v);
  const q = clamp((t - 5.1) / 0.9);
  const th = 80 * Math.PI / 180 * Math.pow(clamp((t - 5.1) / 0.62), 2.2);
  const slide = mul(PUSH, 34 * E.out3(q));
  const piv = [PUSH[0] * 36, PUSH[1] * 36, 0], k = norm(cross([0, 0, 1], PUSH));
  return v => add(add(PP0, slide), add(piv, rodr(sub(v, piv), k, th)));
}
function shakeY(t) { const d = t - 5.0; return d > 0 && d < 0.5 ? 2.2 * Math.exp(-d * 11) * Math.sin(d * 55) : 0; }

const STN = (() => { setCam(T_RESET); return P([110, 360, 80]); })();
function viewFor(w, h) {
  const a = w / h;
  if (a < 0.8) { const vw = 520, vh = vw / a; const y0 = STN[1] - vh * 0.26; return { vb: [STN[0] - vw * 0.52, y0, vw, vh], mode: 'm', cutY: y0 + vh * 0.58 }; }
  if (a < 1.45) { const vw = 1250, vh = vw / a; return { vb: [STN[0] - vw * 0.64, STN[1] - vh * 0.5, vw, vh], mode: 't' }; }
  const vw = 1600, vh = vw / a; return { vb: [0, 450 - vh / 2, vw, vh], mode: 'd' };
}

export { L, T_STATIC, viewFor }


// ---------------------------------------------------------------------------------------------
// Canvas drawing (replaces the prototype's SVG string builder)

const TAU = Math.PI * 2
const HALFTONE_ANGLE = 28

function tracePoly(ctx, pts) {
  ctx.beginPath()
  ctx.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1])
  ctx.closePath()
}

// Flat polygon; a hairline stroke in the same colour hides the seams between neighbouring faces.
function fillPoly(ctx, pts, fill, stroke, lineWidth) {
  tracePoly(ctx, pts)
  ctx.fillStyle = fill
  ctx.fill()
  if (stroke) {
    ctx.strokeStyle = stroke
    ctx.lineWidth = lineWidth
    ctx.lineJoin = 'round'
    ctx.stroke()
  }
}

function dotPattern(unitPx, radius, color) {
  const size = Math.max(6, Math.round(5 * unitPx))
  const k = size / 5
  const tile = document.createElement('canvas')
  tile.width = tile.height = size
  const x = tile.getContext('2d')
  x.fillStyle = color
  x.beginPath()
  x.arc(size / 2, size / 2, radius * k, 0, TAU)
  x.fill()
  const pattern = x.createPattern(tile, 'repeat')
  // The prototype's 5 unit tile, rotated 28 degrees, anchored in scene space.
  pattern.setTransform(new DOMMatrix().rotate(HALFTONE_ANGLE).scale(5 / size))
  return pattern
}

// Halftone tiles for the current scale (device pixels per scene unit).
export function makePatterns(unitPx) {
  return {
    h2: dotPattern(unitPx, 0.95, COL.ink),
    h3: dotPattern(unitPx, 1.6, COL.ink),
    hc: dotPattern(unitPx, 1.3, '#FEEEA6'),
    hs: dotPattern(unitPx, 1.25, '#5A3418')
  }
}

// Maps a scene viewBox onto a w x h CSS pixel box the way SVG's "xMidYMid slice" does.
export function viewMatrix(vb, w, h, dpr) {
  const s = Math.max(w / vb[2], h / vb[3])
  const tx = (w - vb[2] * s) / 2 - vb[0] * s
  const ty = (h - vb[3] * s) / 2 - vb[1] * s
  return { m: [s * dpr, 0, 0, s * dpr, tx * dpr, ty * dpr], unitPx: s * dpr }
}

const applyMatrix = (ctx, m) => ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5])

function drawFaces(ctx, g, xf, mat, pats) {
  const W = g.verts.map(xf), S2 = W.map(P), list = []
  for (const f of g.faces) {
    const pts = f.map(i => W[i]); const n = newell(pts)
    if (Math.hypot(n[0], n[1], n[2]) < 1e-6) continue
    const ctr = mul(pts.reduce((a, b) => add(a, b), [0, 0, 0]), 1 / pts.length)
    if (dot(n, sub(CAMC, ctr)) <= 0) continue
    list.push([dot(sub(ctr, CAMC), CF), f, band(n, mat)])
  }
  list.sort((a, b) => b[0] - a[0])
  for (const [, f, s] of list) {
    const sp = f.map(i => S2[i]); const c = MAT[mat][s]
    fillPoly(ctx, sp, c, c, 0.7)
    if (s >= 2 && mat !== 'navy') fillPoly(ctx, sp, pats['h' + s])
  }
}

function drawKnightDeco(ctx, xf, pats) {
  for (const side of [-1, 1]) {
    const nrm = sub(xf([0, side * 10, 0]), xf([0, 0, 0]))
    const ctr = xf([0, side * 18, 100])
    if (dot(nrm, sub(CAMC, ctr)) <= 0) continue
    const capBand = band(nrm, 'cream')
    for (const d of K_DECO) {
      const sp = d.p.map(([x, z]) => P(xf([x, side * 17.6, z])))
      if (d.c === 'ink') fillPoly(ctx, sp, COL.night)
      else {
        const b = Math.min(3, capBand + 1)
        fillPoly(ctx, sp, MAT.cream[b])
        if (b >= 2) fillPoly(ctx, sp, pats['h' + b])
      }
    }
  }
}

function drawBoard(ctx) {
  const N = 8, s = SQ, th = 26
  const c = (x, y, z = 0) => P([x, y, z])
  fillPoly(ctx, [c(0, 0), c(N * s, 0), c(N * s, 0, -th), c(0, 0, -th)], '#B9763A')
  fillPoly(ctx, [c(0, 0), c(0, N * s), c(0, N * s, -th), c(0, 0, -th)], '#8C4E24')
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    const col = (i + j) % 2 === 1 ? '#FEEEA6' : '#1D2B54'
    fillPoly(ctx, [c(i * s, j * s), c((i + 1) * s, j * s), c((i + 1) * s, (j + 1) * s), c(i * s, (j + 1) * s)], col, col, 0.6)
  }
  const a = c(0, N * s), b = c(0, 0), d = c(N * s, 0)
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(d[0], d[1])
  ctx.strokeStyle = '#FEEEA6'; ctx.lineWidth = 1.6; ctx.lineJoin = 'round'; ctx.stroke()
}

function drawWipe(ctx, t, pats) {
  if (t < 9.35 || t > 10.85) return
  const cx = 800 + (T_RESET - t) * 4200, RW = 1750
  const tones = [COL.y, '#22336A', '#1D2C5D', '#192751', '#152146', '#121C3D', '#0F1834', '#0D152D']
  const K = 28; let prev = cx - RW
  for (let i = 1; i <= K; i++) {
    const ph = -Math.PI / 2 + Math.PI * i / K, x = cx + Math.sin(ph) * RW
    const d = -Math.sin(ph) * 0.75 + 0.25
    const idx = i === 1 ? 0 : d > 0.85 ? 1 : d > 0.6 ? 2 : d > 0.35 ? 3 : d > 0.1 ? 4 : d > -0.2 ? 5 : d > -0.5 ? 6 : 7
    ctx.fillStyle = tones[idx]
    ctx.fillRect(prev, -3000, x - prev + 1, 8000)
    if (idx >= 1 && idx <= 2) {
      ctx.save(); ctx.globalAlpha = 0.3 - idx * 0.1; ctx.fillStyle = pats.hc
      ctx.fillRect(prev, -3000, x - prev + 1, 8000); ctx.restore()
    }
    prev = x
  }
}

// Paints the whole scene at time `t`. `layer` is an offscreen canvas of the same pixel size, used to
// composite the unioned cast shadows (the prototype blended them as groups with multiply).
export function drawScene(ctx, layer, t, view, m, pats) {
  setCam(t)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'
  applyMatrix(ctx, m)
  ctx.fillStyle = COL.bg; ctx.fillRect(-4000, -4000, 10000, 10000)
  fillPoly(ctx, [[560, -4000], [6000, -4000], [6000, 6000], [2100, 6000]], '#2D4380')
  const shake = shakeY(t)
  ctx.save(); ctx.translate(0, shake)
  drawBoard(ctx)
  const k = knightS(t), kx = knightXF(k), px = pawnXF(t)
  const pieces = [
    { id: 'k', pos: [k.pos[0], k.pos[1], 0], z: k.z, geos: [[G_KBASE, true], [G_KHEAD, false]], xf: kx, mat: 'cream', r: 42 },
    { id: 'p', pos: px([0, 0, 0]), z: 0, geos: [[G_PAWN, true]], xf: px, mat: 'red', r: 36, tipped: t >= 5.3 && t < T_RESET }
  ]
  if (view.mode !== 'm') pieces.push({ id: 'n', pos: [450, 650, 0], z: 0, geos: [[G_PAWN, true]], xf: v => add([450, 650, 0], v), mat: 'navy', r: 36 })
  if (view.mode === 'd') pieces.push({ id: 'r', pos: [550, 450, 0], z: 0, geos: [[G_ROOK, true]], xf: v => add([550, 450, 0], v), mat: 'navy', r: 40 })
  // Cast shadows from the single light, unioned in an offscreen layer, then multiplied onto the board.
  const shadows = []
  for (const pc of pieces) for (const [g, lat] of pc.geos) for (const s of shadowPolys(g, pc.xf, lat)) shadows.push(s)
  const lc = layer.getContext('2d')
  const compose = (alpha, fill) => {
    lc.setTransform(1, 0, 0, 1, 0, 0); lc.clearRect(0, 0, layer.width, layer.height)
    applyMatrix(lc, m); lc.translate(0, shake)
    for (const s of shadows) fillPoly(lc, s, fill)
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.globalAlpha = alpha; ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(layer, 0, 0)
    ctx.restore()
  }
  compose(0.58, '#7E4A22')
  compose(0.35, pats.hs)
  // Contact shadows under each piece, fading as the piece lifts.
  for (const pc of pieces) {
    if (pc.tipped) continue
    const o = clamp(1 - pc.z / 40); if (o <= 0) continue
    const ring = []
    for (let i = 0; i < 20; i++) { const a = i / 20 * TAU; ring.push(P([pc.pos[0] + Math.cos(a) * (pc.r + 3), pc.pos[1] + Math.sin(a) * (pc.r + 3), 0.4])) }
    ctx.save(); ctx.globalAlpha = 0.55 * o; ctx.globalCompositeOperation = 'multiply'
    fillPoly(ctx, ring, COL.night); ctx.restore()
  }
  pieces.sort((a, b) => dot(sub(b.pos, CAMC), CF) - dot(sub(a.pos, CAMC), CF))
  for (const pc of pieces) {
    for (const [g] of pc.geos) drawFaces(ctx, g, pc.xf, pc.mat, pats)
    if (pc.id === 'k') drawKnightDeco(ctx, pc.xf, pats)
  }
  ctx.restore()
  if (view.cutY != null) { ctx.fillStyle = COL.bg; ctx.fillRect(-4000, view.cutY, 10000, 6000) }
  drawWipe(ctx, t, pats)
}
