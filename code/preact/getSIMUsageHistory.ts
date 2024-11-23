import { Type, type Static } from '@sinclair/typebox'
import { validatingFetch } from '../validatingFetch/validatingFetch.js'
export const ts = Type.String({
	minLength: 1,
	title: 'Timestamp',
	description: 'The time when the usage data was last updated',
	examples: ['2024-07-01T12:11:43.066Z'],
})
export const usedBytes = Type.Integer({
	minimum: 0,
	title: 'Used bytes',
	description: 'The amount of data used in bytes',
	examples: [0, 2000],
})

/**
 * @see https://github.com/hello-nrfcloud/backend/blob/5d50043e4f643d56ba1dad7ee9d816ad52f13fd5/historicalData/HistoricalDataTimeSpans.ts
 */

export enum TimeSpan {
	lastHour = 'lastHour',
	lastDay = 'lastDay',
	lastWeek = 'lastWeek',
	lastMonth = 'lastMonth',
}

const UsageHistory = Type.Object({
	ts,
	usedBytes,
})
export const SIMHistory = Type.Object({
	measurements: Type.Array(UsageHistory),
})

export type SIMHistoryType = Static<typeof SIMHistory>
export type SIMUsageHistoryType = Static<typeof UsageHistory>

export const getSIMHistory =
	(simDetailsAPIURL: URL) => (iccid: string, timespan: TimeSpan) =>
		validatingFetch(SIMHistory)(
			new URL(
				`./sim/${iccid}/history?${new URLSearchParams({ timespan }).toString()}`,
				simDetailsAPIURL,
			),
		)
