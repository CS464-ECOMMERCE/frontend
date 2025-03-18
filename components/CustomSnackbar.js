import { Snackbar, SnackbarContent, Button } from "@mui/material";

export default function CustomSnackbar({
  message,
  actionText,
  onActionClick,
  open,
  onClose,
  severity,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      severity={severity}
    >
      <SnackbarContent
        message={message}
        action={
          actionText && (
            <Button color="secondary" size="small" onClick={onActionClick}>
              {actionText}
            </Button>
          )
        }
      />
    </Snackbar>
  );
}
