import "./Button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  title?: string;
}
export const Button = ({
  variant = "primary",
  children,
  title,
  ...props
}: ButtonProps) => {
  return (
    <button className={`button button--${variant}`} {...props} title={title}>
      {children}
    </button>
  );
};
