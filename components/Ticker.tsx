type Item = {
  name: string;
  price: number;
  delta: number;
};

const ITEMS: Item[] = [
  { name: "JORDAN 1 RETRO HIGH OG", price: 312_000, delta: 8.2 },
  { name: "YEEZY 350 V2 ZEBRA", price: 228_000, delta: -1.4 },
  { name: "SUPREME BOX LOGO TEE", price: 485_000, delta: 5.8 },
  { name: "NEW BALANCE 990V4", price: 195_000, delta: 0.9 },
  { name: "TRAVIS SCOTT JORDAN 1 LOW", price: 890_000, delta: 12.4 },
  { name: "DUNK LOW PANDA", price: 145_000, delta: 2.1 },
  { name: "AIR FORCE 1 '07", price: 132_000, delta: -0.6 },
  { name: "STÜSSY × NB 530", price: 410_000, delta: 4.7 },
  { name: "CORTEIZ ALCATRAZ CARGO", price: 218_000, delta: 7.3 },
];

const ARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export default function Ticker() {
  // duplicado para loop seamless
  const items = [...ITEMS, ...ITEMS];

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-[color:var(--color-border)] bg-[color:var(--color-surface)] py-3"
    >
      <div
        className="flex w-max gap-12 whitespace-nowrap"
        style={{ animation: "tickerSlide 60s linear infinite" }}
      >
        {items.map((it, i) => (
          <div
            key={`${it.name}-${i}`}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.05em] text-[color:var(--color-muted)]"
          >
            <span className="h-1 w-1 rounded-full bg-[color:var(--color-lime)]" />
            <span>{it.name}</span>
            <span className="text-[color:var(--color-text)]">
              {ARS.format(it.price)}
            </span>
            <span
              className={
                it.delta >= 0
                  ? "text-[color:var(--color-lime)]"
                  : "text-[color:var(--color-danger)]"
              }
            >
              {it.delta >= 0 ? "▲" : "▼"} {Math.abs(it.delta).toFixed(1)}%
            </span>
            <span className="ml-3 inline-block h-1 w-1 rounded-full bg-[color:var(--color-border2)]" />
          </div>
        ))}
      </div>

      {/* edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{
          background:
            "linear-gradient(to right, var(--color-surface), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{
          background:
            "linear-gradient(to left, var(--color-surface), transparent)",
        }}
      />
    </div>
  );
}
