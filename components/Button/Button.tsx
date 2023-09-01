import styles from "./Button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outlined" | "plain";
  className?: string;
  disabled?: boolean;
}

export const Button = ({ disabled, children, onClick, variant = "filled", className }: ButtonProps) => {
  return (
    <button style={disabled ? { opacity: 0.5 } : {}} disabled={disabled} className={`${className || ""} ${styles[variant]}`} onClick={() => onClick?.()}>
      {children}
    </button>
  );
};
