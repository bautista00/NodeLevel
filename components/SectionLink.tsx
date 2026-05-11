"use client";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  "data-magnetic"?: boolean;
};

export default function SectionLink({ href, children, className, ...rest }: Props) {
  const isExternal = href.startsWith("mailto:") || href.startsWith("http");

  if (isExternal) {
    return <a href={href} className={className} {...rest}>{children}</a>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("hero-skip", { detail: { href } }));
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
