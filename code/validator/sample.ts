import { Type } from '@sinclair/typebox'
import { validateWithTypeBox } from './validateWithTypeBox.js'

const stringOfMinLength = (minLength: number) =>
	Type.String({ minLength: minLength })

const NonEmptyString = stringOfMinLength(1)

const LoginForm = Type.Object(
	{
		email: NonEmptyString,
		password: stringOfMinLength(8),
		rememberMe: Type.Optional(
			Type.Boolean({
				description: 'If checked will create a sticky session',
				examples: [true],
				title: 'Remember Me',
			}),
		),
	},
	{
		additionalProperties: false,
	},
)

console.log(
	JSON.stringify(
		validateWithTypeBox(LoginForm)({
			email: 'm@coderbyheart.com',
			password: 'BartJS42!',
			remember_me: true,
		}),
		null,
		2,
	),
)
