import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { Person, OpenWith, Delete } from "@mui/icons-material";
import nodocumentsFoundImg from "../../assets/no-documents.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile({ setShowLoader }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  console.log("UserData:::", userData);

  useEffect(() => {
    if (!userData) {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      setUserData(userDetails);
    }
  }, [localStorage.getItem("userDetails")]);

  const handleDeleteBtnClick = async (document) => {
    if (
      !confirm(
        `Are you sure you want to delete document '${document?.documentName}'?`
      )
    ) {
      return;
    } else {
      setShowLoader(true);
      const url = "/delete-document";
      await axios
        .post(url, {
          userId: userData?._id,
          document,
        })
        .then((res) => {
          if (res) {
            setShowLoader(false);
            alert(`document '${document.documentName}' Deleted Successfully`);
            validateUser();
            const documentId = JSON.parse(
              localStorage.getItem("devcode-documentId")
            );
            if (documentId === document._id) {
              setHtmlCode("");
              setCssCode("");
              setJsCode("");
              setdocumentId("");
              setdocumentName("Untitled");
            }
          }
        })
        .catch((error) => {
          setShowLoader(false);
          alert(
            error.response.data.error ||
              `Failed to delete document '${document.documentName}' !`
          );
          console.log("Error::::", error);
        });
    }
  };

  // const handleOpendocumentbtnClick = async (document) => {
  //   if (htmlCode || cssCode || jsCode) {
  //     setShowLoader(true);
  //     const url = "/save-document";
  //     await axios
  //       .post(url, {
  //         id: userData._id,
  //         documentName: documentName || "Untitled",
  //         htmlCode,
  //         cssCode,
  //         jsCode,
  //         documentId,
  //       })
  //       .then((res) => {
  //         if (res) {
  //           setShowLoader(false);
  //           navigate("/code-editor");
  //         }
  //       })
  //       .catch((error) => {
  //         setShowLoader(false);
  //         alert(`Your current document '${documentName}' is not saved yet !`);
  //         console.log("Error::::", error);
  //       });
  //   } else {
  //     navigate("/code-editor");
  //   }
  // };

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
            userData?.documents.map((document) => {
              return (
                <div className="document-card" key={document._id}>
                  <div className="document-image">
                    <OpenWith
                      className="expand-icon"
                      titleAccess="Open document"
                      // onClick={() => handleOpendocumentbtnClick(document)}
                    />
                  </div>
                  <div className="document-info">
                    <p className="document-name">{document.documentName}</p>
                    <Delete
                      className="delete-icon"
                      titleAccess="Delete document"
                      onClick={() => handleDeleteBtnClick(document)}
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
    </div>
  );
}
export default Profile;
