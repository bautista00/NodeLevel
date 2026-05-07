/**
 * Meta editorial que aparece al inicio de cada sección — número + tag.
 *  NODE / 003   ▸ EL PROBLEMA
 */
export default function SectionMeta({
  index,
  tag,
}: {
  index: string;
  tag: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-[0.3em]">
      <span className="text-dim">NODE / {index}</span>
      <span className="h-px w-8 bg-border2" />
      <span className="text-lime">▸ {tag}</span>
    </div>
  );
}
