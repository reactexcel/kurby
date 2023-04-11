import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outlined" | "plain";
  className?: string;
}

export const Button = ({ children, onClick, variant = "filled", className }: ButtonProps) => {
  return (
    <button className={`${className || ""} ${styles[variant]}`} onClick={() => onClick?.()}>
      {children}
    </button>
  );
};
