import { Button } from "./Button.styled.jsx";

export const StyledButton = ({
  onClick,
  children,
  type = "button",
  active = false,
  disabled = false,
  borderColor,
  variant,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      $active={active}
      $borderColor={borderColor}
      $variant={variant}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
