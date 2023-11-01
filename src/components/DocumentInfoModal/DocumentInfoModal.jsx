import React from "react";
import "./DocumentInfoModal.scss";
import { Modal } from "@mui/material";

function DocumentInfoModal({ setShowModal, showModal, document }) {
  return (
    <Modal
      className="document-modal"
      open={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className="document-form-container">
        <h3>Document Name: {document?.documentName}</h3>
        <h3>Keywords:</h3>
        <div className="document-keywords">
          {document?.keywords &&
            document.keywords.map((keyword) => (
              <span className="keyword">{keyword}</span>
            ))}
        </div>
      </div>
    </Modal>
  );
}

export default DocumentInfoModal;
