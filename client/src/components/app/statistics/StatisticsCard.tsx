import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const styles = cva("", {
  variants: {
    container: {
      dark: "bg-darkest",
      accent: "bg-accent",
      light: "bg-white shadow-lg shadow-accent/10",
    },
    title: {
      dark: "text-white",
      accent: "text-white",
      light: "text-darkest",
    },
    subtitle: {
      dark: "text-lightest",
      accent: "text-lightest",
      light: "text-dark",
    },
  },
});

export default function StatisticsCard({
  children,
  variant,
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  variant: VariantProps<typeof styles>["container"];
}) {
  return (
    <li
      className={twMerge(
        styles({ container: variant }),
        "px-10 py-8 rounded-md"
      )}
    >
      <div className="mb-6">
        <h3 className={twMerge(styles({ title: variant }), "text-md")}>
          {title}
        </h3>
        <p className={twMerge(styles({ subtitle: variant }), "")}>{subtitle}</p>
      </div>
      {children}
    </li>
  );
}
