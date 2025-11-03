#  Decision Intelligence Dashboard

This project is an interactive dashboard that visualizes a decision-making workflow using **React**, **Redux**, and **React Flow**.  
It lets you build simple decision trees (like *“If revenue > $1M → trigger expansion”*) and see related data visualized on charts in real time.

---

##  Features

- **Workflow Builder:**  
  Drag, drop, and connect decision nodes to design your logic flow.  
  The first node is a “Start” node, and you can add more nodes dynamically.

- **Real-Time Charts:**  
  Each node can show dynamic data or outcomes using **Chart.js**.

- **Redux State Management:**  
  All node data, selections, and updates are managed via Redux.

- **Clean UI:**  
  Simple layout using modular components — `FlowEditor`, `ChartPanel`, and `Sidebar`.

---

##  Tech Stack

- **Frontend:** React.js, Redux Toolkit  
- **Workflow Engine:** React Flow  
- **Charts:** react-chartjs-2 + chart.js  
- **Styling:** Tailwind CSS  
- **Build Tool:** Vite / CRA (based on setup)

---

##  Folder Structure

decision-intelligence-dashboard/
├── public/
│ ├── index.html
│ └── favicon.ico
│
├── src/
│ ├── assets/
│ │ └── logo.svg
│ │
│ ├── components/
│ │ ├── FlowEditor.jsx # Handles drag-and-drop workflow (React Flow)
│ │ ├── ChartPanel.jsx # Displays time-series & bar charts
│ │ ├── Sidebar.jsx # Sidebar for adding/managing nodes
│ │ └── NodeConfigModal.jsx # Optional: Modal for conditional logic editing
│ │
│ ├── redux/
│ │ ├── store.js # Redux store configuration
│ │ ├── flowSlice.js # Handles workflow state (nodes/edges)
│ │ └── chartSlice.js # Manages chart data and real-time updates
│ │
│ ├── utils/
│ │ ├── conditionalEval.js # Evaluates conditional rules between nodes
│ │ └── mockData.js # Contains mock workflow & revenue data
│ │
│ ├── styles/
│ │ ├── App.css
│ │ ├── FlowEditor.css
│ │ └── ChartPanel.css
│ │
│ ├── App.jsx # Root component (flows + charts)
│ ├── index.js # React entry point
│ └── setupTests.js # Optional: Testing setup
│
├── package.json
├── README.md
├── .gitignore
└── vite.config.js / webpack.config.js



##  How It Works

1. The app starts with a **Start Node** on the canvas.  
2. Click **“Add Node”** in the sidebar to create a new decision node.  
3. Drag and connect nodes using React Flow’s built-in connectors.  
4. Selecting a node updates the right-side **Chart Panel** with mock data or conditional insights.  


## Example Use Case

Let’s say you’re analyzing business growth:

Node 1: Start → “Check Revenue”

Node 2: If revenue > $1M → “Expand Team”

Node 3: If revenue < $1M → “Cut Costs”

You can visually connect these and view mock performance data for each step.


## Author

Pankaj Kumar Das
Decision Intelligence Dashboard | React + Redux + React Flow Project
YouTube Channel – DecodePankaj

