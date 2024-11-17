import { Type } from '@sinclair/typebox'
import { StatusCode } from './StatusCode.js'

/**
 * Problem Details Object
 *
 * @see https://datatracker.ietf.org/doc/draft-ietf-httpapi-rfc7807bis/
 */
export const ProblemDetail = Type.Object(
	{
		'@context': Type.Literal(
			'https://datatracker.ietf.org/doc/draft-ietf-httpapi-rfc7807bis/',
		),
		'@id': Type.Optional(Type.String()),
		type: Type.Optional(Type.String()),
		status: Type.Optional(StatusCode),
		title: Type.String(),
		detail: Type.Optional(Type.String()),
	},
	{
		title: 'Problem Detail',
		description:
			'See see https://datatracker.ietf.org/doc/draft-ietf-httpapi-rfc7807bis/',
	},
)
