interface TypeScriptIconProps {
  className?: string;
}

export function TypeScriptIcon({ className }: TypeScriptIconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
      <path fill="#0288d1" d="M16 16v96h96V16zm32 48h24v8H64v32H56V72H48zm40 0h16v8H88v8h8a8.024 8.024 0 0 1 8 8v8a8.024 8.024 0 0 1-8 8H80v-8h16v-8h-8a8.024 8.024 0 0 1-8-8V72a8.024 8.024 0 0 1 8-8" />
    </svg>
  );
}
