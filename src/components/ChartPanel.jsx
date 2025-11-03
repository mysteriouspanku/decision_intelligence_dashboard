import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Line, Bar } from 'react-chartjs-2'
import { selectRevenue } from '../slices/workflowSlice'
import 'chart.js/auto'


export default function ChartPanel() {
const revenue = useSelector(selectRevenue)


const timeLabels = useMemo(() => revenue.map(r => new Date(r.time).toLocaleString()), [revenue])
const values = useMemo(() => revenue.map(r => r.value), [revenue])


const lineData = useMemo(() => ({
labels: timeLabels,
datasets: [{ label: 'Revenue', data: values, tension: 0.3 }]
}), [timeLabels, values])


// simple decision outcome counts from last N points (mock)
const successCount = useMemo(() => values.filter(v => v > 1000000).length, [values])
const failCount = useMemo(() => values.length - successCount, [values, successCount])


const barData = useMemo(() => ({
labels: ['Trigger Expansion', 'Hold'],
datasets: [{ label: 'Outcome count', data: [successCount, failCount] }]
}), [successCount, failCount])


return (
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
<div>
<h4>Revenue (time-series)</h4>
<Line data={lineData} />
</div>
<div>
<h4>Decision Outcomes</h4>
<Bar data={barData} />
</div>
</div>
)
}