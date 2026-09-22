export default function Logo({ size = 30, color = "#F5F4F0" }) {
  const height = size * (132 / 100);
  return (
    <svg width={size} height={height} viewBox="0 0 100 132" aria-hidden="true">
      <path
        d="M24 124 V16 H62 a24 24 0 0 1 0 48 H24"
        fill="none"
        stroke={color}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="43" cy="40" r="9" fill={color} />
    </svg>
  );
}
