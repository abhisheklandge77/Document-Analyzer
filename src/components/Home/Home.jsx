import React, { useEffect, useState } from "react";
import "./Home.scss";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { parseFileContent } from "../../services";
import noDataFoundImg from "../../assets/no-data.svg";
import SaveDocumentModal from "../SaveDocumentModal/SaveDocumentModal";

function Home({ setShowLoader }) {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState(null);
  const [documentList, setDocumentList] = useState([]);
  const [keywordsList, setKeywordsList] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [matchPercent, setMatchPercent] = useState(0);
  const [showModal, setShowModal] = useState(false);

  console.log("File:::", file, documentType, keywordsList);
  console.log("Analysis result:::", analysisResult);

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

  const documents = [
    {
      documentName: "Synopsis",
      keywords: [
        "introduction",
        "problem",
        "statement",
        "working",
        "existing",
        "system",
        "scope",
        "objective",
        "methodology",
        "flow",
        "functional",
        "requirements",
        "technical",
        "software",
        "hardware",
        "outcome",
        "conclusion",
      ],
    },
    {
      documentName: "Seminar Report",
      keywords: [
        "abstract",
        "keyword",
        "introduction",
        "purpose",
        "motivation",
        "scope",
        "related",
        "work",
        "literature",
        "review",
        "discussion",
        "result",
        "comparison",
        "conclusion",
        "references",
        "bibliography",
      ],
    },
  ];

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails?.documents?.length) {
      setDocumentList([...documents, ...userDetails?.documents]);
    } else {
      setDocumentList([...documents]);
    }
  }, [localStorage.getItem("userDetails")]);

  const handleAnalyzeDocumentClick = async () => {
    if (!keywordsList?.length) {
      alert("Please select document type !");
      return;
    }
    if (!file) {
      alert("Please upload file !");
      return;
    }
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("keywords", JSON.stringify(keywordsList));
      const response = await parseFileContent(formData);
      console.log("Resposne:::", response);
      if (response) {
        setAnalysisResult(response);

        if (response?.wordsCountMap) {
          let numOfMatchWords = 0;
          const wordsArr = Object.keys(response?.wordsCountMap);

          wordsArr.forEach((word) => {
            if (response?.wordsCountMap[word] > 0) {
              numOfMatchWords++;
            }
          });

          setMatchPercent((numOfMatchWords / wordsArr.length) * 100);
        }
      }
      setShowLoader(false);
    } catch (error) {
      console.log("Error: ", error);
      setShowLoader(false);
      alert("Failed to analyze document !");
    }
  };

  const handleSaveDocument = () => {
    console.log("Keywords:::", keywordsList);
    setShowModal(true);
  };

  return (
    <div className="home-container">
      <div className="document-analyzer-container">
        <div className="document-configuration-card">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Document Type</InputLabel>
            <Select
              labelId="document-type-label-id"
              id="document-type-select"
              value={documentType}
              sx={customStyle}
              label="Document Type"
              className="document-type-dropdown"
              onChange={(e, value) => {
                console.log("Value:::", value);
                setDocumentType(value?.props?.value);
                setKeywordsList([]);
                if (value?.props?.value?.keywords?.length) {
                  setKeywordsList(value?.props?.value?.keywords);
                }
              }}
            >
              {documentList.map((doc, index) => (
                <MenuItem key={`doc-${index}`} value={doc}>
                  {doc.documentName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
            className="save-doc-btn doc-btn"
            variant="contained"
            onClick={handleSaveDocument}
          >
            Add New Document
          </Button>
        </div>
        <div className="document-analyzer">
          <div className="doc-input-field">
            <TextField
              variant="outlined"
              className="input-field"
              type="file"
              accept=".pdf"
              sx={customStyle}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              className="analyze-doc-btn doc-btn"
              variant="contained"
              onClick={handleAnalyzeDocumentClick}
            >
              Analyze Document
            </Button>
          </div>

          {analysisResult &&
            analysisResult !== "Error: Invalid PDF structure" && (
              <div className="analysis-result">
                <div className="analysis-header">
                  <div>
                    <h2>Document Metrics:</h2>

                    <p className="content-length">
                      Content Length:{" "}
                      <span className="words-number">
                        {analysisResult?.contentLength} words
                      </span>
                    </p>
                  </div>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      variant="determinate"
                      value={matchPercent}
                      size={80}
                      color={
                        matchPercent > 70
                          ? "success"
                          : matchPercent > 40
                          ? "warning"
                          : "error"
                      }
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="h3"
                        sx={{
                          fontSize: 20,
                        }}
                      >
                        {`${Math.round(matchPercent)}%`}
                      </Typography>
                    </Box>
                  </Box>
                </div>

                <hr />

                <h4>Keywords Count:</h4>
                {analysisResult?.wordsCountMap &&
                  Object.keys(analysisResult?.wordsCountMap).map((word) => (
                    <div className="word-count">
                      <p>{word}</p>
                      <Chip
                        label={analysisResult?.wordsCountMap[word]}
                        color={
                          analysisResult?.wordsCountMap[word] > 0
                            ? "success"
                            : "error"
                        }
                        className="count"
                      />
                    </div>
                  ))}
              </div>
            )}
          {analysisResult === "Error: Invalid PDF structure" && (
            <div className="no-data-container">
              <img src={noDataFoundImg} alt="No Documents Found !" />
              <h2>No Data Found or Wrong File Format</h2>
            </div>
          )}
        </div>
      </div>

      <SaveDocumentModal
        showModal={showModal}
        setShowModal={setShowModal}
        keywords={keywordsList}
        documentId={documentType?._id || ""}
      />
    </div>
  );
}

export default Home;
