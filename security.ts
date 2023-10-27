// implementation of the security schemes in the openapi specification

export class Security {
	async initialize(schemes: any) {
		// schemes will contain securitySchemes as found in the openapi specification
		console.log("Initialize:", JSON.stringify(schemes));
	}

	// Security scheme: petstore_auth
	// Type: oauth2
	async petstore_auth(_req: any, _reply: any, _params: any) {
		console.log("petstore_auth: Authenticating request");
		// If validation fails: throw new Error('Could not authenticate request')
		// Else, simply return.

		// The request object can also be mutated here (e.g. to set 'req.user')
	}

	// Security scheme: api_key
	// Type: apiKey
	async api_key(_req: any, _reply: any, _params: any) {
		console.log("api_key: Authenticating request");
		// If validation fails: throw new Error('Could not authenticate request')
		// Else, simply return.

		// The request object can also be mutated here (e.g. to set 'req.user')
	}
}
