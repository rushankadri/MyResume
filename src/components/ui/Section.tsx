import clsx from "clsx";

interface SectionProps {
    id: string;
    children: React.ReactNode;
    className?: string;
}

export function Section({ id, children, className }: SectionProps) {
    return (
        <section id={id} className={clsx("py-20 md:py-32", className)}>
            {children}
        </section>
    );
}
