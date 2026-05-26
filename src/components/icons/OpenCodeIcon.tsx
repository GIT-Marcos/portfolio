interface OpenCodeIconProps {
  className?: string;
}

export function OpenCodeIcon({ className }: OpenCodeIconProps) {
  return (
    <svg viewBox="0 0 240 300" className={className} aria-hidden="true">
      <g clipPath="url(#oc-clip)">
        <mask id="oc-mask" mask-type="luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="300">
          <path d="M240 0H0v300h240V0z" fill="#fff" />
        </mask>
        <g mask="url(#oc-mask)">
          <path d="M180 240H60V120h120v120z" fill="#4B4646" />
          <path d="M180 60H60v180h120V60zM240 300H0V0h240v300z" fill="#F1ECEC" />
        </g>
      </g>
      <defs>
        <clipPath id="oc-clip">
          <rect width="240" height="300" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
