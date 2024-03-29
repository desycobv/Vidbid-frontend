import React,{ createContext, useState, useEffect} from 'react';

import cardanoService from '../services/CardanoService';

export const WalletContext = createContext();


export function WalletProvider({children}) {

    const [isWalletConnected, setIsWalletConnected] =  useState(false)
    const [walletInfo, setWalletInfo] =  useState("")

    const connectWallet = async () =>{
        await cardanoService.connectWallet();
    }

    const disconnectWallet = async () =>{
        await cardanoService.disconnectWallet();
    }

    useEffect(()=>{
        const fetchItems = async () => {
            const isConnected = await cardanoService.isWalletConnected();
            setIsWalletConnected(isConnected);

            if(isConnected){
                const walletVar = await cardanoService.getWalletInfo();
                console.log(walletVar)
                setWalletInfo(walletVar)
            }

            // console.log(isWalletConnected, connectWallet, disconnectWallet, walletAddress, balances, walletNetwork, walletId)
            // await logYoroiKeys();
        }
        fetchItems().catch( e => console.log(e));
    },[isWalletConnected]);

    return (
        <WalletContext.Provider value={{isWalletConnected, connectWallet, disconnectWallet, walletInfo, cardanoService}}>
            {children}
        </WalletContext.Provider>
    );
}