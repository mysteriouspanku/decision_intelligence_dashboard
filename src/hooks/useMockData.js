import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { pushRevenuePoint } from '../slices/workflowSlice'


// Simulate real-time revenue data (pushes new points every N ms)
export default function useMockData(intervalMs = 2500) {
const dispatch = useDispatch()
const t = useRef(0)


useEffect(() => {
const id = setInterval(() => {
t.current += 1
// synthetic revenue random walk
const base = 900000 + (t.current * 20000)
const jitter = (Math.random() - 0.5) * 100000
const value = Math.max(0, Math.round(base + jitter))
dispatch(pushRevenuePoint({ time: new Date().toISOString(), value }))
}, intervalMs)


return () => clearInterval(id)
}, [dispatch, intervalMs])
}