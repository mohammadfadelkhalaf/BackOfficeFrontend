import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

interface CustomConfirmationDialogProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomConfirmationToast: React.FC<CustomConfirmationDialogProps> = ({
  open,
  message,
  onConfirm,
  onCancel,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#ececff",
    borderRadius: "0.5rem",
    boxShadow: 24,
    p: 4,
    width: "50%",
    maxWidth: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
    >
      <Box sx={style}>
        <Typography id="confirmation-dialog-title" variant="h6" component="h2">
          {message}
        </Typography>
        <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={onConfirm}
            fullWidth
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onCancel}
            fullWidth
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomConfirmationToast;
