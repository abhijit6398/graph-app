import React, { createContext, useState, useContext } from "react";

const GraphContext = createContext();

export const useGraph = () => useContext(GraphContext);

export const GraphProvider = ({ children }) => {
  const [graphs, setGraphs] = useState([
    {
      graphName: "Crude Oil",
      description: "Oil prices over time",
      data: [
        { value: 10, date: "2024-08-01" },
        { value: 20, date: "2024-08-02" },
        { value: 30, date: "2024-08-03" },
        { value: 40, date: "2024-08-05" },
      ],
    },
    {
      graphName: "Stock Prices",
      description: "Daily stock prices",
      data: [
        { value: 150, date: "2024-08-01" },
        { value: 200, date: "2024-08-02" },
        { value: 250, date: "2024-08-03" },
        { value: 300, date: "2024-08-05" },
      ],
    },
  ]);

  const addGraph = (graph) => {
    setGraphs((prevGraphs) => [...prevGraphs, graph]);
  };

  const updateGraph = (index, updatedGraph) => {
    setGraphs((prevGraphs) =>
      prevGraphs?.map((graph, i) => (i === index ? updatedGraph : graph))
    );
  };

  const removeGraph = (index) => {
    setGraphs((prevGraphs) => prevGraphs?.filter((_, i) => i !== index));
  };

  return (
    <GraphContext.Provider
      value={{ graphs, addGraph, updateGraph, removeGraph }}
    >
      {children}
    </GraphContext.Provider>
  );
};
