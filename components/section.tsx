import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  heading?: "h1" | "h2";
  className?: string;
  children: ReactNode;
};

export function Section({
  title,
  heading = "h2",
  className,
  children,
}: SectionProps) {
  const headingClasses = "text-2xl font-bold mb-4";

  return (
    <section className={className}>
      {heading === "h1" ? (
        <h1 className={headingClasses}>{title}</h1>
      ) : (
        <h2 className={headingClasses}>{title}</h2>
      )}
      <div>{children}</div>
    </section>
  );
}
