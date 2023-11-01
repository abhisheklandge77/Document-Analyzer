import React, { useState } from "react";
import "./SaveDocumentModal.scss";
import { Autocomplete, Button, Chip, Modal, TextField } from "@mui/material";
import { saveDocument } from "../../services";

function SaveDocumentModal({ setShowModal, showModal, documentId }) {
  const [documentName, setDocumentName] = useState("");
  const [keywordsList, setKeywordsList] = useState([]);

  const customStyle = {
    "& label.Mui-focused": {
      color: "#2D3843",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#2D3843",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2D3843",
      },
    },
  };

  const handleSaveClick = async () => {
    try {
      if (!documentName) {
        alert("Please Enter Document Name !");
      } else {
        const user = JSON.parse(localStorage.getItem("userDetails"));
        const payload = {
          id: user?._id,
          documentName,
          keywords: keywordsList,
        };
        const response = await saveDocument(payload);
        console.log("save Doc:::", response);
        if (response?.data) {
          localStorage.setItem("userDetails", JSON.stringify(response?.data));
          alert("Document Saved Successful");
          setShowModal(false);
        } else {
          alert(response?.error);
        }
        setDocumentName("");
      }
    } catch (err) {
      console.log("Error: ", err);
      alert("Failed to save document !");
    }
  };

  return (
    <Modal
      className="document-modal"
      open={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className="document-form-container">
        <h2>Add New Document</h2>
        <TextField
          label="Document Name"
          variant="outlined"
          className="input-field"
          type="text"
          sx={customStyle}
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        <Autocomplete
          multiple
          key={Math.random()}
          id="tags-filled"
          options={keywordsList.map((option) => option)}
          defaultValue={[...keywordsList]}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={`tag-${index}`}
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={(e, value) => {
            console.log("Value:::", value);
            setKeywordsList(value);
          }}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Keywords"
              sx={customStyle}
              placeholder="Keywords"
            />
          )}
        />
        <Button
          className="doc-btn"
          variant="contained"
          onClick={handleSaveClick}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default SaveDocumentModal;
