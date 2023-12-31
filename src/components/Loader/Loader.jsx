import React from "react";
import { CircularProgress, Modal, Stack } from "@mui/material";
import "./Loader.scss";

function Loader({ showLoader }) {
  return (
    <Modal
      open={showLoader}
      aria-labelledby="loading"
      aria-describedby="loading"
      className="loading-container"
    >
      <Stack sx={{ color: "#c70039" }} spacing={2} direction="row">
        <CircularProgress color="inherit" />
      </Stack>
    </Modal>
  );
}

export default Loader;
