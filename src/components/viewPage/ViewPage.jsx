import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useGraph } from "../../context/graphContext";
import "./ViewPage.css";

const ViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { graphs } = useGraph();
  const graph = graphs[id];

  if (!graph) {
    return <div>Graph not found</div>;
  }

  const totalValue = graph?.data?.reduce(
    (total, item) => total + parseFloat(item?.value),
    0
  );
  const avgValue = (totalValue / graph?.data?.length)?.toFixed(2);

  return (
    <div className="view-graph-page">
      <div className="header">
        <button onClick={() => navigate("/main")} className="back-button">
          Back
        </button>
        <h2>{graph?.graphName}</h2>
      </div>
      <div className="content">
        <div className="chart-container">
          <div className="chart-box">
            {" "}
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
        </div>
        <div className="data-info">
          <div>
            <h3>Graph Data Info</h3>
            <p>Total Data Value: {totalValue}</p>
            <p>Average Data Value: {avgValue}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
