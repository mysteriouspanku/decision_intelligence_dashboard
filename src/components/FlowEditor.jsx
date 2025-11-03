// import React, { useState, useCallback, useEffect } from "react";
// import ReactFlow, {
//   addEdge,
//   MiniMap,
//   Controls,
//   Background,
//   useEdgesState,
//   useNodesState,
// } from "reactflow";
// import "reactflow/dist/style.css";

// const FlowEditor = () => {
//   const [nodes, setNodes] = useNodesState([
//     {
//       id: "1",
//       type: "input",
//       data: { label: "Start" },
//       position: { x: 250, y: 5 },
//     },
//   ]);

//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const [selectedNode, setSelectedNode] = useState(null);

//   // Handle connecting edges between nodes
//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

//   // Handle node click
//   const onNodeClick = useCallback((_, node) => {
//     setSelectedNode(node);
//   }, []);

//   // Example effect: could trigger when a node is selected
//   useEffect(() => {
//     if (selectedNode) {
//       console.log("Selected Node:", selectedNode);
//     }
//   }, [selectedNode]); // ✅ keep dependency since it's a state variable

//   return (
//     <div style={{ height: "100vh", width: "100%" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onConnect={onConnect}
//         onEdgesChange={onEdgesChange}
//         onNodeClick={onNodeClick}
//         fitView
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// };

// export default FlowEditor;


import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 50 },
  },
];

export default function FlowEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [nodeCount, setNodeCount] = useState(2);

  // Handle new node creation
  const handleAddNode = useCallback(() => {
    const newNode = {
      id: `${nodeCount}`,
      data: { label: `Decision ${nodeCount - 1}` },
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeCount((prev) => prev + 1);
  }, [nodeCount]);

  // Handle connection between nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ padding: "10px", background: "#f3f4f6" }}>
        <button
          onClick={handleAddNode}
          style={{
            padding: "6px 12px",
            borderRadius: "6px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          ➕ Add Decision Node
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        fitView
        style={{ background: "#f8fafc" }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
