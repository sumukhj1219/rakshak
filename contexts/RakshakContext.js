"use client"
import { ethers } from "ethers";
import  { useContext } from "react";
import React, { createContext, useState, useEffect } from 'react';


const RakshakContext = createContext()

const contractAddress = "0x7daaa4bcef3f1fd74638ae9a081c95e3910bd68e"
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_camp_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dob",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_reported_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_rank",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ammunitions",
				"type": "string"
			}
		],
		"name": "addSoldier",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "camp_id",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "camp_name",
				"type": "string"
			}
		],
		"name": "AlertRaised",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "camp_id",
				"type": "string"
			}
		],
		"name": "AmmunitionUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_camp_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_camp_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_camp_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_camp_creation_date",
				"type": "string"
			}
		],
		"name": "createCamp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_camp_id",
				"type": "string"
			}
		],
		"name": "raiseAlert",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_camp_id",
				"type": "string"
			}
		],
		"name": "resetAlert",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "camp_id",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "soldierId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "soldierName",
				"type": "string"
			}
		],
		"name": "SoldierAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_camp_id",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_guns",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_smgs",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_launchers",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_grenades",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_assaults",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_snipers",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_bombs",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_melee",
				"type": "uint256"
			}
		],
		"name": "updateAmmunition",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "campIds",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "camps",
		"outputs": [
			{
				"internalType": "string",
				"name": "camp_id",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "camp_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "camp_location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "camp_creation_date",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "inDanger",
				"type": "bool"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "guns",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "smgs",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "launchers",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "grenades",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "assaults",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "snipers",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bombs",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "melee",
						"type": "uint256"
					}
				],
				"internalType": "struct CampManager.Ammunition",
				"name": "ammunition",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCampData",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "bool[]",
				"name": "",
				"type": "bool[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_camp_id",
				"type": "string"
			}
		],
		"name": "getCampData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "id",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dob",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "reported_date",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "rank",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ammunitions",
						"type": "string"
					}
				],
				"internalType": "struct CampManager.Soldier[]",
				"name": "",
				"type": "tuple[]"
			},
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "guns",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "smgs",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "launchers",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "grenades",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "assaults",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "snipers",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bombs",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "melee",
						"type": "uint256"
					}
				],
				"internalType": "struct CampManager.Ammunition",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const RakshakProvider=({children})=>{
    const [provider, setProvider] = useState("")
    const [signer, setSigner] = useState("")
    const [account, setAccount] = useState("")
    const [contract, setContract] = useState("")

    useEffect(()=>{
        const connectWallet=async()=>{
            try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send("eth_requestAccounts", [])
            const signer = provider.getSigner()
            setProvider(provider)
            setSigner(signer)
            const accountAddress = await signer.getAddress()
            setAccount(accountAddress)
            const contract = new ethers.Contract(contractAddress, abi, signer)
            setContract(contract)
            } catch (error) {
                console.log("Error in connecting account", error)
            }
        }
        connectWallet()
    }, [])

    const createCamp=async(camp_id, camp_name, camp_location, camp_creation_date)=>{
            if(!contract)
            {
                console.log("Contract not loaded")
                return ;
            }
            try {
                const trx = await contract.createCamp(camp_id, camp_name, camp_location, camp_creation_date)
                await trx.wait()
                console.log("Camp created successfully.")
            } catch (error) {
                console.log("Error while creating the camp", error)
            }
    }

	const getCampData = async (camp_id) => {
		if (!contract) {
		  console.log("Contract not loaded")
		  return []
		}
		try {
		  const camps = contract.getCampData(camp_id)
		  await camps.wait()
		  console.log("Camp data retrieved successfully", camps)
		  return Array.isArray(camps) ? camps : []
		} catch (error) {
		  console.error("Error retrieving camps:", error)
		  return []
		}
	  }
	  

	const addSoldier=async(camp_id, id, name, city, dob, reported_date, rank, ammunitions)=>{
		if(!contract)
		{
			console.log("Contract not loaded")
			return ;
		}
		try {
			const trx = await contract.addSoldier(camp_id, id, name, city, dob, reported_date, rank, ammunitions)
			await trx.wait()
		} catch (error) {
			console.log("Error in adding soldier", error)
		}
	}

	const getAllCamps=async()=>{
		if(!contract)
		{
			console.log("Contract not loaded")
			return ;
		}
		try {
			const trx = await contract.getAllCampData()
			console.log(trx)
			return trx
		} catch (error) {
			console.log("Couldnt retrice data", error)
		}
	}

    return(
        <RakshakContext.Provider value={{provider, signer, account, contract, createCamp, getCampData, addSoldier, getAllCamps}}>
            {children}
        </RakshakContext.Provider>
    )
}

export const useRakshakContext = () => {
    return useContext(RakshakContext);
};