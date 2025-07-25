import React from "react";
import { styled } from "@mui/material/styles";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  padding?: string;
  hoverColor?: string;
  fullWidth?: boolean;
}

const StyledButton = styled("button")<CustomButtonProps>(
  ({
    backgroundColor = "#254A46",
    textColor = "#ffffff",
    borderRadius = "8px",
    padding = "12px 20px",
    hoverColor = "#18424A",
    fullWidth = false,
  }) => ({
    backgroundColor,
    color: textColor,
    border: "none",
    borderRadius,
    padding,
    cursor: "pointer",
    width: fullWidth ? "100%" : "auto",
    fontWeight: 600,
    fontSize: "1rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px", // spacing between icon and text
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: hoverColor,
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(1px)",
    },
  })
);

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  startIcon,
  endIcon,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      {startIcon && <span style={{ display: "flex" }}>{startIcon}</span>}
      {children}
      {endIcon && <span style={{ display: "flex" }}>{endIcon}</span>}
    </StyledButton>
  );
};

export default CustomButton;
