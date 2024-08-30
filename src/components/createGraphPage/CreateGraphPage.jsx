import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGraph } from "../../context/graphContext";
import "./CreateGraphPage.css";

const CreateGraphPage = () => {
  const navigate = useNavigate();
  const { addGraph } = useGraph();
  const [graphData, setGraphData] = useState([]);
  const [graphName, setGraphName] = useState("");
  const [description, setDescription] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editDate, setEditDate] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    data: "",
  });

  const handleAddData = () => {
    if (currentValue && currentDate) {
      setGraphData([...graphData, { value: currentValue, date: currentDate }]);
      setCurrentValue("");
      setCurrentDate("");
      setErrors((prevErrors) => ({ ...prevErrors, data: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", data: "" };

    if (graphName.trim() === "") {
      newErrors.name = "Graph name is required.";
      valid = false;
    }

    if (graphData.length < 3) {
      newErrors.data = "At least 3 data entries are required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRemoveData = (index) => {
    setGraphData(graphData?.filter((_, i) => i !== index));
  };

  const isFormValid = useMemo(validateForm, [graphName, graphData]);

  const handleEditData = (index) => {
    setEditingIndex(index);
    setEditValue(graphData[index]?.value);
    setEditDate(graphData[index]?.date);
  };

  const handleSaveEdit = () => {
    const updatedData = graphData.map((data, index) =>
      index === editingIndex ? { value: editValue, date: editDate } : data
    );
    setGraphData(updatedData);
    setEditingIndex(null);
    setEditValue("");
    setEditDate("");
  };

  const handleSaveGraph = () => {
    if (isFormValid) {
      const newGraph = {
        graphName,
        description,
        data: graphData,
      };

      addGraph(newGraph);
      navigate("/main");
      setGraphName("");
      setDescription("");
      setGraphData([]);
    }
  };

  return (
    <div className="graph-container">
      <div className="header">
        <button onClick={() => navigate("/main")} className="back-button">
          Back
        </button>
        <h2>Create Graph</h2>
      </div>
      <div className="create-graph-container">
        <div className="create-graph-form">
          <div className="top-section">
            <input
              type="text"
              placeholder="Graph Name"
              value={graphName}
              onChange={(e) => setGraphName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
            />
          </div>
          <hr />
          <div className="value-date-section">
            <input
              type="number"
              placeholder="Value"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="input-field"
            />
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="input-field"
            />
            <button onClick={handleAddData} className="add-button">
              +
            </button>
          </div>
          <div className="data-list">
            {graphData.map((data, index) => (
              <div key={index} className="data-item">
                {editingIndex === index ? (
                  <>
                    <input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="input-field"
                    />
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="input-field"
                    />
                    <button onClick={handleSaveEdit} className="save-button">
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>{`Value: ${data?.value}, Date: ${data?.date}`}</span>
                    <div>
                      <button
                        onClick={() => handleEditData(index)}
                        className="edit-button"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleRemoveData(index)}
                        className="remove-button"
                      >
                        -
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="error-create-message">
            {errors.name && !errors.data ? (
              <div className="error-create-message">{errors.name}</div>
            ) : errors.data && !errors.name ? (
              <div className="error-create-message">{errors.data}</div>
            ) : errors.name && errors.data ? (
              <div className="error-create-message">
                <div>{errors.name}</div>
              </div>
            ) : null}
          </div>
          <button
            onClick={handleSaveGraph}
            className="save-button"
            disabled={!isFormValid}
          >
            Save Graph
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGraphPage;
