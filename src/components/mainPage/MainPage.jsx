import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGraph } from "../../context/graphContext";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import "./MainPage.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MainPage = () => {
  const { graphs, removeGraph } = useGraph();
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <div className="mainHeader">
        <h1>Graph List</h1>
        <div className="create-button-container">
          <Link to="/create">
            <button className="create-graph-button">Create Graph</button>
          </Link>
        </div>
      </div>
      {graphs.length === 0 ? (
        <div className="no-graphs">
          <p>No graphs available</p>
        </div>
      ) : (
        <div className="graphs-container">
          {graphs?.map((graph, index) => (
            <div key={index} className="graph-card">
              <div className="card-header">
                <h3>{graph.graphName}</h3>
                <div className="button-group">
                  <button
                    onClick={() => navigate(`/view/${index}`)}
                    className="view-button"
                  >
                    <RemoveRedEyeOutlinedIcon />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => removeGraph(index)}
                    className="delete-button"
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                </div>
              </div>
              <p>{graph?.description}</p>
              <Line
                data={{
                  labels: graph?.data?.map((item) => item?.date),
                  datasets: [
                    {
                      label: graph?.graphName,
                      data: graph?.data?.map((item) => item?.value),
                      borderColor: "rgba(75,192,192,1)",
                      borderWidth: 2,
                      pointBackgroundColor: "rgba(75,192,192,1)",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      type: "category",
                      labels: graph?.data?.map((item) => item?.date),
                    },
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
