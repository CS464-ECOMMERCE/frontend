import { Snackbar, Button, Alert } from "@mui/material";

export default function CustomSnackbar({ message, open, onClose, severity }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} className="items-center">{message}</Alert>
    </Snackbar>
  );
}
