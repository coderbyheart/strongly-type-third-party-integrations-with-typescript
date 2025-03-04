import { Type, type Static } from '@sinclair/typebox'
import { addSeconds } from 'date-fns'
import nock from 'nock'
import assert from 'node:assert'
import { describe, it } from 'node:test'
import {
	validatingFetch,
	type FetchProblem,
	type ResponseWithDetails,
} from './validatingFetch.js'

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

export const SIMDetails = Type.Object(
	{
		totalBytes: Type.Integer({
			minimum: 0,
			title: 'Total bytes',
			description: 'The amount of data available for usage in bytes',
			examples: [10000000, 4000000],
		}),
		usedBytes,
		ts,
	},
	{
		title: 'SIM Details',
		description:
			'Describes the data usage details of a SIM. See https://github.com/bifravst/sim-details?tab=readme-ov-file#usage',
	},
)

void describe('validatingFetch', async () => {
	void it('should return the cache headers', async () => {
		const now = new Date()
		const scope = nock('https://api.sim-details.nordicsemi.cloud/')
		scope.get(`/2024-07-01/sim/89457300000022396157`).reply(
			200,
			{
				ts: now.toISOString(),
				usedBytes: 0,
				totalBytes: 10000000,
			},
			{
				'content-type': 'application/json',
				'content-length': '76',
				'cache-control': 'public, max-age=300',
				expires: addSeconds(new Date(), 300).toUTCString(),
			},
		)

		const [sim, { response, cacheControl }] = await new Promise<
			[Static<typeof SIMDetails>, ResponseWithDetails]
		>((resolve, reject) => {
			validatingFetch(SIMDetails)(
				new URL(
					'https://api.sim-details.nordicsemi.cloud/2024-07-01/sim/89457300000022396157',
				),
			)
				.ok((...args) => resolve(args))
				.problem(reject)
		})

		assert.deepEqual(
			cacheControl,
			{
				public: true,
				maxAge: 300,
			},
			'It should have parsed the cache-control header',
		)
		assert.equal(response.status, 200, 'It should return the status code')
		assert.deepEqual(sim, {
			ts: now.toISOString(),
			usedBytes: 0,
			totalBytes: 10000000,
		})
		assert.equal(nock.isDone(), true)
	})

	void it('should return the cache headers on errors', async () => {
		const scope = nock('https://api.sim-details.nordicsemi.cloud/')
		scope.get(`/2024-07-01/sim/89457300000022396158`).reply(409, '', {
			'content-length': '760',
			'cache-control': 'public, max-age=60',
			expires: new Date().toUTCString(),
		})

		const [problem, responseDetails] = await new Promise<
			[details: FetchProblem, response?: ResponseWithDetails]
		>((resolve, reject) => {
			validatingFetch(SIMDetails)(
				new URL(
					'https://api.sim-details.nordicsemi.cloud/2024-07-01/sim/89457300000022396158',
				),
			)
				.ok(() => reject(new Error('Should not be ok')))
				.problem((...args) => resolve(args))
		})

		assert.deepEqual(problem, {
			problem: {
				'@context':
					'https://datatracker.ietf.org/doc/draft-ietf-httpapi-rfc7807bis/',
				status: 409,
				title: '', // response body
			},
			url: new URL(
				'https://api.sim-details.nordicsemi.cloud/2024-07-01/sim/89457300000022396158',
			),
		})

		assert.equal(
			responseDetails !== undefined,
			true,
			'It should return the response details',
		)

		const { cacheControl, response } = responseDetails!
		assert.equal(response.status, 409, 'It should return the status code')
		assert.deepEqual(
			cacheControl,
			{
				public: true,
				maxAge: 60,
			},
			'It should have parsed the cache-control header',
		)

		assert.equal(nock.isDone(), true)
	})
})
