export default function HeroStat({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex flex-col items-start">
      <div className="font-display text-[44px] leading-none text-lime">{num}</div>
      <div className="mt-2 font-mono text-[9px] tracking-[0.2em] text-dim">{label}</div>
    </div>
  );
}
