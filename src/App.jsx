import React, { useEffect } from 'react'
import FlowEditor from './components/FlowEditor'
import ChartPanel from './components/ChartPanel'
import useMockData from './hooks/useMockData'
import { useDispatch, useSelector } from 'react-redux'
import { selectRevenue, setHighlightedPath, selectNodes, selectEdges } from './slices/workflowSlice'
import { evalRule } from './utils/conditionalEval'


export default function App() {
// start mock stream
useMockData(3000)


const revenue = useSelector(selectRevenue)
const nodes = useSelector(selectNodes)
const edges = useSelector(selectEdges)
const dispatch = useDispatch()


// whenever latest revenue point arrives, re-evaluate workflow and highlight path
useEffect(() => {
if (!revenue.length) return
const latest = revenue[revenue.length - 1]
// compute path using a simple evaluator similar to FlowEditor.applyMockContext
const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))
const edgeList = edges
const highlighted = []
const visit = (nid) => {
highlighted.push(nid)
const outs = edgeList.filter(e => e.source === nid)
for (const e of outs) {
const target = nodeMap[e.target]
if (target?.data?.rule) {
const res = evalRule(target.data.rule, { revenue: latest.value })
const chosen = edgeList.find(ed => ed.source === target.id && ((res && (ed.label === 'true' || ed.label === 'yes')) || (!res && (ed.label === 'false' || ed.label === 'no'))))
if (chosen) visit(chosen.target)
} else {
if (outs.length) visit(outs[0].target)
}
}
}
const start = nodes.find(n => n.type === 'start') || nodes[0]
if (start) visit(start.id)
dispatch(setHighlightedPath(highlighted))
}, [revenue, nodes, edges, dispatch])


return (
<div style={{ padding: 20 }}>
<h2>Decision Intelligence Dashboard</h2>
<div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 20 }}>
<div>
<FlowEditor />
{/* small legend */}
<div style={{ marginTop: 12 }}>
<strong>Legend:</strong> Decision node rules take form `revenue &gt; 1000000`.
</div>
</div>
<div>
<ChartPanel />
</div>
</div>
</div>
)
}