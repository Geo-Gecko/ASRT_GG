import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Link from "@material-ui/core/Link";
import Form from "./Form";
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Link color="primary" onClick={handleClickOpen}>
        <span style={{ color: "#fff" }}>Feedback</span>
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Form />
      </Dialog>
    </div>
  );
}
