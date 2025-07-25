import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

interface PageHeaderProps {
  title?: string;
  actions?: ReactNode; 
}

export default function PageHeader({ title, actions }: PageHeaderProps) {
  if (!title && !actions) return null;

  return (
    <Stack
      sx={{ mb: 2, justifyContent: "space-between", width: "100%" }}
      direction="row"
      alignItems="center"
    >
      {title && (
        <Typography component="h2" variant="h6">
          {title}
        </Typography>
      )}
      {actions && (
        <Stack direction="row" spacing={2}>
          {actions}
        </Stack>
      )}
    </Stack>
  );
}
