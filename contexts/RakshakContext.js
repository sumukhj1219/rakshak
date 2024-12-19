"use client";
import { ethers } from "ethers";
import React, { createContext, useState, useEffect, useContext } from 'react';

const RakshakContext = createContext();

const contractAddress = "0xc5b84215a5cf29106a625be78e68141909431bbe";
const abi=[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
				"internalType": "uint256",
				"name": "amountTransferred",
				"type": "uint256"
			}
		],
		"name": "CampCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "FundsTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
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
		"stateMutability": "payable",
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
				"name": "campId",
				"type": "string"
			}
		],
		"name": "getAmmunition",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_camp_id",
				"type": "string"
			}
		],
		"name": "getSoldierCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
		"name": "raiseAlert",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recipient",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
		"name": "resetAlert",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newRecipient",
				"type": "address"
			}
		],
		"name": "setRecipient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
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
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

export const RakshakProvider = ({ children }) => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        const connectWallet = async () => {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner(); 
                const accountAddress = await signer.getAddress(); 
                const contract = new ethers.Contract(contractAddress, abi, signer); 
                setProvider(provider);
                setSigner(signer);
                setAccount(accountAddress);
                setContract(contract);
            } catch (error) {
                console.log("Error connecting to wallet:", error);
            }
        };
        connectWallet();
    }, []);

	const transferOwnership = async (newOwnerAddress) => {
        if (!contract) {
            console.log("Contract not loaded");
            return;
        }
        try {
            const trx = await contract.transferOwnership(newOwnerAddress);
            await trx.wait();
            console.log("Ownership transferred successfully.");
        } catch (error) {
            console.log("Error in transferring ownership", error);
        }
    };

    const setRecipient = async (newRecipientAddress) => {
        if (!contract) {
            console.log("Contract not loaded");
            return;
        }
        try {
            const trx = await contract.setRecipient(newRecipientAddress);
            await trx.wait();
            console.log("Recipient set successfully.");
        } catch (error) {
            console.log("Error in setting recipient", error);
        }
    };

    const createCamp = async (camp_id, camp_name, camp_location, camp_creation_date) => {
        if (!contract) {
            console.log("Contract not loaded");
            return;
        }
        try {
            const trx = await contract.createCamp(camp_id, camp_name, camp_location, camp_creation_date, {
                value: ethers.utils.parseEther("0.1")
            });
            await trx.wait();
            console.log("Camp created successfully.");
        } catch (error) {
            console.log("Error while creating the camp", error);
        }
    };

    const getCampData = async (camp_id) => {
        if (!contract) {
            console.log("Contract not loaded");
            return [];
        }
        try {
            const camp = await contract.getCampData(camp_id);
            console.log("Camp data retrieved successfully:", camp);
            return camp || [];
        } catch (error) {
            console.error("Error retrieving camp data:", error);
            return [];
        }
    };

    const addSoldier = async (camp_id, id, name, city, dob, reported_date, rank, ammunitions) => {
        if (!contract) {
            console.log("Contract not loaded");
            return;
        }
        try {
            const trx = await contract.addSoldier(camp_id, id, name, city, dob, reported_date, rank, ammunitions);
            await trx.wait();
            console.log("Soldier added successfully");
        } catch (error) {
            console.log("Error adding soldier", error);
        }
    };

    const getAllCamps = async () => {
        if (!contract) {
            console.log("Contract not loaded");
            return [];
        }
        try {
            const camps = await contract.getAllCampData();
            console.log("All camps data:", camps);
            return camps || [];
        } catch (error) {
            console.log("Error retrieving all camps", error);
            return [];
        }
    };

    const raiseAlert = async (campId) => {
        if (!contract) {
            console.log("Contract not loaded yet");
            return;
        }
        try {
            const trx = await contract.raiseAlert(campId);
            await trx.wait();
            console.log("Alert raised successfully");
        } catch (error) {
            console.log("Error while raising alert", error);
        }
    };

    const resetAlert = async (campId) => {
        if (!contract) {
            console.log("Contract not loaded yet");
            return;
        }
        try {
            const trx = await contract.resetAlert(campId);
            await trx.wait();
            console.log("Alert reset successfully");
        } catch (error) {
            console.log("Error while resetting alert", error);
        }
    };

    const addCampAmmunitions = async (
        campId,
        guns,
        smgs,
        launchers,
        grenades,
        assaults,
        snipers,
        bombs,
        melee
    ) => {
        if (!contract) {
            console.log("Contract not loaded yet");
            return;
        }
        try {
            const trx = await contract.updateAmmunition(
                campId,
                guns,
                smgs,
                launchers,
                grenades,
                assaults,
                snipers,
                bombs,
                melee
            );
            await trx.wait();
            console.log("Ammunition updated successfully");
        } catch (error) {
            console.log("Error while updating ammunition", error);
        }
    };

	const getSoldierCount=async(campId)=>{
		if(!contract)
		{
			console.log("Contract not loaded")
		}
		try {
			const trx = await contract.getSoldierCount(campId)
			console.log(trx)
			return trx || []
		} catch (error) {
			console.log("Error in getting soldier count", error)
		}
	}

	const getAmmunition = async (campId) => {
		if (!contract) {
		  console.log("Contract instance not loaded");
		  return null;
		}
	  
		try {
		  const ammoDetails = await contract.getAmmunition(campId);
		  return {
			guns: parseInt(ammoDetails[0]._hex, 16),
			smgs: parseInt(ammoDetails[1]._hex, 16),
			launchers: parseInt(ammoDetails[2]._hex, 16),
			grenades: parseInt(ammoDetails[3]._hex, 16),
			assaults: parseInt(ammoDetails[4]._hex, 16),
			snipers: parseInt(ammoDetails[5]._hex, 16),
			bombs: parseInt(ammoDetails[6]._hex, 16),
			melee: parseInt(ammoDetails[7]._hex, 16),
		  };
		} catch (error) {
		  console.log("Error fetching ammunition details:", error);
		  return null;
		}
	  };
	  

    return (
        <RakshakContext.Provider
            value={{
                provider,
                signer,
                account,
                contract,
                createCamp,
                getCampData,
                addSoldier,
                getAllCamps,
                raiseAlert,
                resetAlert,
                addCampAmmunitions,
				setRecipient,
				transferOwnership,
				getSoldierCount,
				getAmmunition
            }}
        >
            {children}
        </RakshakContext.Provider>
    );
};

export const useRakshakContext = () => {
    return useContext(RakshakContext);
};
