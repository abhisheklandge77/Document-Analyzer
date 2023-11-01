import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Person, OpenWith, Delete } from "@mui/icons-material";
import nodocumentsFoundImg from "../../assets/no-documents.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DocumentInfoModal from "../DocumentInfoModal/DocumentInfoModal";
import { deleteDocument } from "../../services";

function Profile({ setShowLoader }) {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [document, setDocument] = useState(null);

  const navigate = useNavigate();
  console.log("UserData:::", userData);

  useEffect(() => {
    if (!userData) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      setUserData(userDetails);
    }
  }, [localStorage.getItem("userDetails")]);

  const handleDeleteBtnClick = async (documentObj) => {
    if (
      !confirm(
        `Are you sure you want to delete document '${documentObj?.documentName}'?`
      )
    ) {
      return;
    }

    try {
      setShowLoader(true);
      const payload = {
        userId: userData?._id,
        document: documentObj,
      };
      const response = await deleteDocument(payload);
      console.log("save Doc:::", response);
      if (response?.data) {
        localStorage.setItem("userDetails", JSON.stringify(response?.data));
        alert("Document Deleted Successfully");
        setShowLoader(false);
      } else {
        alert(response?.error);
      }
    } catch (err) {
      console.log("Error: ", err);
      alert("Failed to delete document !");
      setShowLoader(false);
    }
  };

  const handleOpenDocumentbtnClick = async (documentObj) => {
    setShowModal(true);
    setDocument(documentObj);
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <div className="profile-image">
          {userData?.userName ? (
            <p className="user-initial">{userData?.userName[0]}</p>
          ) : (
            <Person />
          )}
        </div>
        <h2 className="profile-user-name">
          {userData?.userName || "Not Signed In"}
        </h2>
        {userData?.userName && (
          <span
            className="update-profile-link"
            onClick={() => navigate("/update-profile")}
          >
            Update Profile
          </span>
        )}
      </div>
      <div className="documents-wrapper">
        <h2 className="my-documents-header">My Documents</h2>
        <div className="documents-container">
          {userData?.documents?.length ? (
            userData?.documents.map((documentObj) => {
              return (
                <div className="document-card" key={documentObj._id}>
                  <div className="document-image">
                    <OpenWith
                      className="expand-icon"
                      titleAccess="Open document"
                      onClick={() => handleOpenDocumentbtnClick(documentObj)}
                    />
                  </div>
                  <div className="document-info">
                    <p className="document-name">{documentObj.documentName}</p>
                    <Delete
                      className="delete-icon"
                      titleAccess="Delete document"
                      onClick={() => handleDeleteBtnClick(documentObj)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-documents-container">
              <img src={nodocumentsFoundImg} alt="No Documents Found !" />
              <h2>You don't have any documents yet !</h2>
            </div>
          )}
        </div>
      </div>
      <DocumentInfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        document={document}
      />
    </div>
  );
}
export default Profile;
