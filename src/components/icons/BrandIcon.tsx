import { BRAND_PATHS, type BrandPathName } from "./brand-paths";

/** Drawn locally: not available in simple-icons. */
type CustomIconName = "reactNative" | "jotai" | "linkedin";

export type BrandIconName = BrandPathName | CustomIconName;

interface BrandIconProps {
  name: BrandIconName;
  className?: string;
}

function isBrandPath(name: BrandIconName): name is BrandPathName {
  return Object.hasOwn(BRAND_PATHS, name);
}

function CustomIcon({ name }: { name: CustomIconName }) {
  switch (name) {
    case "reactNative":
      return (
        <>
          <rect
            x="5"
            y="1"
            width="14"
            height="22"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M10 20h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <g transform="translate(7 6.5) scale(0.4167)">
            <path d={BRAND_PATHS.react} />
          </g>
        </>
      );
    case "jotai":
      return (
        <>
          <rect
            x="1.75"
            y="1.75"
            width="20.5"
            height="20.5"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <text
            x="12"
            y="16.5"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fontFamily="inherit"
          >
            Jt
          </text>
        </>
      );
    case "linkedin":
      return (
        <path
          fillRule="evenodd"
          d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm3 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3zM5.5 10v8.5h3V10zm5 0v8.5h3v-4.3c0-1.1.5-1.9 1.6-1.9s1.4.8 1.4 1.9v4.3h3v-4.9c0-2.3-.7-3.8-3.1-3.8-1.4 0-2.5.6-3 1.5V10z"
        />
      );
  }
}

/** Single-colour brand icon that inherits `currentColor`. Always decorative. */
export default function BrandIcon({ name, className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {isBrandPath(name) ? <path d={BRAND_PATHS[name]} /> : <CustomIcon name={name} />}
    </svg>
  );
}
