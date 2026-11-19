import type { ReactNode } from 'react';

const ROSE = 'var(--c-flare)';
const ROSE_DEEP = 'var(--c-rose-deep)';
const CHALK = 'var(--c-chalk)';
const GROUND = 'var(--c-ground)';
const DEEP = 'var(--c-ground-deep)';

function Frame({ viewBox, children }: { viewBox: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="100%" height="100%" fill={DEEP} />
      {children}
    </svg>
  );
}

const rad = (deg: number) => (deg * Math.PI) / 180;

export function ArtEco() {
  const cx = 1130;
  const cy = 300;
  const r = 205;
  const arcs = [0, 120, 240].map((start) => {
    const a0 = start + 14;
    const a1 = start + 96;
    const p = (a: number, rr = r) => [cx + rr * Math.cos(rad(a)), cy + rr * Math.sin(rad(a))];
    const [x0, y0] = p(a0);
    const [x1, y1] = p(a1);
    const tangent = a1 + 90;
    const head = [
      [x1 + 34 * Math.cos(rad(tangent)), y1 + 34 * Math.sin(rad(tangent))],
      [x1 + 26 * Math.cos(rad(a1)), y1 + 26 * Math.sin(rad(a1))],
      [x1 - 26 * Math.cos(rad(a1)), y1 - 26 * Math.sin(rad(a1))],
    ];
    return {
      d: `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`,
      head: head.map((h) => h.join(',')).join(' '),
    };
  });
  const dots = [
    [150, 120],
    [260, 210],
    [90, 300],
    [380, 90],
    [470, 250],
    [610, 140],
    [720, 330],
    [840, 90],
    [900, 230],
    [560, 410],
    [330, 330],
    [700, 480],
  ];

  return (
    <Frame viewBox="0 0 1600 700">
      {[480, 400].map((rr, i) => (
        <circle
          key={rr}
          cx={cx}
          cy={cy}
          r={rr}
          fill="none"
          stroke={CHALK}
          strokeOpacity={0.1 - i * 0.03}
          strokeWidth="2"
        />
      ))}
      <circle cx={cx} cy={cy} r="330" fill={ROSE} />
      <circle cx={cx} cy={cy} r="262" fill={ROSE_DEEP} fillOpacity="0.55" />
      {arcs.map((a, i) => (
        <g key={i}>
          <path d={a.d} fill="none" stroke={CHALK} strokeWidth="22" strokeLinecap="round" />
          <polygon points={a.head} fill={CHALK} />
        </g>
      ))}
      <circle cx={cx} cy={cy} r="64" fill={GROUND} />
      <circle cx={cx} cy={cy} r="22" fill={ROSE} />
      {dots.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 3 === 0 ? 9 : 5}
          fill={i % 3 === 0 ? ROSE : CHALK}
          fillOpacity={i % 3 === 0 ? 1 : 0.35}
        />
      ))}
      <path
        d="M150 120 L260 210 L470 250 L610 140 L840 90"
        fill="none"
        stroke={CHALK}
        strokeOpacity="0.2"
        strokeWidth="2"
        strokeDasharray="6 10"
      />
    </Frame>
  );
}

export function ArtCity() {
  const cols = [0, 1, 2, 3, 4];
  return (
    <Frame viewBox="0 0 900 600">
      <rect x="36" y="64" width="220" height="12" rx="6" fill={CHALK} fillOpacity="0.28" />
      <rect x="36" y="94" width="160" height="12" rx="6" fill={CHALK} fillOpacity="0.14" />
      <rect x="36" y="124" width="190" height="12" rx="6" fill={CHALK} fillOpacity="0.14" />
      <polygon points="470,90 860,90 665,10" fill={ROSE} transform="translate(0 90)" />
      <rect x="470" y="196" width="390" height="22" fill={CHALK} />
      {cols.map((i) => (
        <rect
          key={i}
          x={494 + i * 76}
          y="226"
          width="40"
          height="232"
          fill={CHALK}
          fillOpacity={i % 2 ? 0.82 : 1}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={460 - i * 20}
          y={462 + i * 26}
          width={410 + i * 40}
          height="24"
          fill={ROSE_DEEP}
          fillOpacity={0.9 - i * 0.2}
        />
      ))}
      <circle cx="665" cy="118" r="22" fill={GROUND} transform="translate(0 90)" />
    </Frame>
  );
}

function Gear({
  cx,
  cy,
  r,
  teeth,
  fill,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  r: number;
  teeth: number;
  fill: string;
  opacity?: number;
}) {
  const w = (2 * Math.PI * r) / teeth / 1.9;
  return (
    <g fill={fill} fillOpacity={opacity}>
      {Array.from({ length: teeth }, (_, i) => (
        <rect
          key={i}
          x={cx - w / 2}
          y={cy - r - r * 0.16}
          width={w}
          height={r * 0.3}
          rx={w * 0.18}
          transform={`rotate(${(360 / teeth) * i} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r={r} />
      <circle cx={cx} cy={cy} r={r * 0.42} fill={DEEP} />
      <circle cx={cx} cy={cy} r={r * 0.14} fill={fill} />
    </g>
  );
}

export function ArtRent() {
  return (
    <Frame viewBox="0 0 600 900">
      <Gear cx={400} cy={280} r={190} teeth={14} fill={ROSE} />
      <Gear cx={120} cy={520} r={118} teeth={10} fill={CHALK} opacity={0.92} />
      <Gear cx={470} cy={640} r={70} teeth={8} fill={ROSE_DEEP} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x="36"
            y={64 + i * 40}
            width={i === 1 ? 150 : 110}
            height="12"
            rx="6"
            fill={CHALK}
            fillOpacity="0.22"
          />
        </g>
      ))}
    </Frame>
  );
}

function contour(cx: number, cy: number, base: number, k: number) {
  const pts = Array.from({ length: 73 }, (_, i) => {
    const a = (i / 72) * Math.PI * 2;
    const rr = base * (1 + 0.14 * Math.sin(3 * a + k * 0.7) + 0.07 * Math.sin(5 * a + k));
    return `${i ? 'L' : 'M'}${(cx + rr * 1.22 * Math.cos(a)).toFixed(1)} ${(cy + rr * 0.86 * Math.sin(a)).toFixed(1)}`;
  });
  return pts.join(' ') + ' Z';
}

export function ArtMap() {
  return (
    <Frame viewBox="0 0 600 600">
      {Array.from({ length: 10 }, (_, i) => (
        <path
          key={i}
          d={contour(340, 230, 28 + i * 30, i)}
          fill="none"
          stroke={i === 3 ? ROSE : CHALK}
          strokeOpacity={i === 3 ? 0.9 : 0.16}
          strokeWidth={i === 3 ? 3 : 1.6}
        />
      ))}
      <path
        d="M60 420 C 180 330, 220 470, 340 300 S 520 180, 560 90"
        fill="none"
        stroke={CHALK}
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeDasharray="4 12"
        strokeLinecap="round"
      />
      <circle cx="60" cy="420" r="9" fill={CHALK} />
      <g transform="translate(340 230)">
        <circle r="46" fill={ROSE} fillOpacity="0.25" />
        <path d="M0 40 L-26 -4 A30 30 0 1 1 26 -4 Z" fill={ROSE} />
        <circle cy="-24" r="11" fill={GROUND} />
      </g>
    </Frame>
  );
}

export function ArtFood() {
  return (
    <Frame viewBox="0 0 600 600">
      <circle
        cx="350"
        cy="250"
        r="230"
        fill="none"
        stroke={CHALK}
        strokeOpacity="0.1"
        strokeWidth="2"
      />
      <circle cx="350" cy="250" r="190" fill={ROSE} />
      <circle
        cx="350"
        cy="250"
        r="150"
        fill="none"
        stroke={CHALK}
        strokeOpacity="0.6"
        strokeWidth="5"
      />
      <circle cx="350" cy="250" r="104" fill={ROSE_DEEP} />
      <circle cx="350" cy="250" r="40" fill={CHALK} fillOpacity="0.92" />
      <g transform="rotate(-10 120 150)">
        <rect x="44" y="52" width="150" height="214" rx="10" fill={CHALK} />
        <g fill={GROUND} fillOpacity="0.8">
          <rect x="64" y="80" width="84" height="10" rx="5" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x="64"
              y={116 + i * 28}
              width={i % 2 ? 100 : 64}
              height="8"
              rx="4"
              fillOpacity="0.35"
            />
          ))}
        </g>
        <rect x="64" y="232" width="110" height="14" rx="7" fill={ROSE} />
      </g>
    </Frame>
  );
}
