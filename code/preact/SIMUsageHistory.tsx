import { createContext, type ComponentChildren } from 'preact'
import { useContext, useEffect, useState } from 'preact/hooks'
import {
	getSIMHistory,
	TimeSpan,
	type SIMUsageHistoryType,
} from './getSIMUsageHistory.js'

export const Provider = ({ children }: { children: ComponentChildren }) => {
	const [history, setHistory] = useState<SIMUsageHistoryReadings>([])

	// This is from another context
	const iccid = '89457300000022396157' // The ICCID of the SIM card
	const timeSpan = TimeSpan.lastDay

	useEffect(() => {
		getSIMHistory(new URL('https://api.example.com/'))(iccid, timeSpan)
			.ok(({ measurements }) =>
				setHistory(measurements.map(toHistory).sort(byTs)),
			)
			.problem(({ problem }, response) => {
				if (response?.response.status === 404) {
					setHistory([]) // In case the SIM was changed
				} else {
					console.error(`[SIMUsageHistory]`, problem, response)
				}
			})
	}, [])

	return (
		<SIMUsageHistoryContext.Provider
			value={{
				history,
			}}
		>
			{children}
		</SIMUsageHistoryContext.Provider>
	)
}

export const SIMUsageHistoryContext = createContext<{
	history: SIMUsageHistoryReadings
}>({
	history: [],
})

export const Consumer = SIMUsageHistoryContext.Consumer

export const useSIMUsageHistory = () => useContext(SIMUsageHistoryContext)

const toHistory = ({
	ts,
	usedBytes,
}: SIMUsageHistoryType): SIMUsageHistory => ({ ts: new Date(ts), usedBytes })

type SIMUsageHistory = {
	ts: Date
	usedBytes: number
}

type SIMUsageHistoryReadings = Array<SIMUsageHistory>

const byTs = ({ ts: t1 }: { ts: Date }, { ts: t2 }: { ts: Date }): number =>
	t2.getTime() - t1.getTime()
