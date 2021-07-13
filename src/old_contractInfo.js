import web3 from './web3';
const contract_address = '0xDE63779e8C841E5443De959CF9b9041F4921FB76';
const abi = [
	{
		"inputs": [],
		"name": "getRegistrationInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "pk_user",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "piiHash",
						"type": "string"
					},
					{
						"internalType": "string[4]",
						"name": "Ka_user",
						"type": "string[4]"
					},
					{
						"internalType": "string[4][5]",
						"name": "Ka",
						"type": "string[4][5]"
					}
				],
				"indexed": false,
				"internalType": "struct Contract.Registration",
				"name": "regInfo",
				"type": "tuple"
			}
		],
		"name": "ReturnRegistrationInfo",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "pk_user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "piiHash",
				"type": "string"
			},
			{
				"internalType": "string[4]",
				"name": "Ka_user",
				"type": "string[4]"
			},
			{
				"internalType": "string[4][5]",
				"name": "Ka",
				"type": "string[4][5]"
			}
		],
		"name": "setRegistrationInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export default new web3.eth.Contract(abi, contract_address);