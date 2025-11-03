import { createSlice } from '@reduxjs/toolkit'
import sample from '../sample_data.json'


const initialState = {
nodes: sample.workflowNodes || [],
edges: sample.workflowEdges || [],
revenue: sample.revenueData || [],
highlightedPath: []
}


const workflowSlice = createSlice({
name: 'workflow',
initialState,
reducers: {
setNodes(state, action) { state.nodes = action.payload },
setEdges(state, action) { state.edges = action.payload },
pushRevenuePoint(state, action) { state.revenue.push(action.payload) },
setRuleForNode(state, action) {
const { nodeId, rule } = action.payload
const node = state.nodes.find(n => n.id === nodeId)
if (node) node.data = { ...node.data, rule }
},
setHighlightedPath(state, action) { state.highlightedPath = action.payload },
clearHighlightedPath(state) { state.highlightedPath = [] }
}
})


export const { setNodes, setEdges, pushRevenuePoint, setRuleForNode, setHighlightedPath, clearHighlightedPath } = workflowSlice.actions


// selectors optimized for re-renders
export const selectNodes = state => state.workflow.nodes
export const selectEdges = state => state.workflow.edges
export const selectRevenue = state => state.workflow.revenue
export const selectHighlightedPath = state => state.workflow.highlightedPath


export default workflowSlice.reducer