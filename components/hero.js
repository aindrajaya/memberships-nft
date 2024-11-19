import {React, useEffect, useState} from "react";
import {
    useAddress, 
    useClaimedNFTSupply, 
    useBalance, 
    useConnect, 
    metamaskWallet, 
    useContract 
} from '@thirdweb-dev/react';
import {CrossmintPayButton} from "@crossmint/client-sdk-react-ui";

const metamaskConfig = metamaskWallet();

export default function Hero() { // Use the hooks thirdweb give us.
    const address = useAddress();
    const { data } = useBalance();
    console.log("Balance User: ",data)
    
    const connect = useConnect();

    console.log(address)

    // Initialize our editionDrop contract
    const {contract} = useContract(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS, "edition-drop");
    console.log("Contract : ", contract)
    const { data: nfts, isLoading, } = useClaimedNFTSupply(contract);
    console.log("Data NFT: ", nfts)
    
    // State variable for us to know if user has our NFT.
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
    // isClaiming lets us easily keep a loading state while the NFT is minting.
    const [isClaiming, setIsClaiming] = useState(false);

    useEffect(() => { // If they don't have a connected wallet, exit!
        if (! address) {
            return;
        }

        const checkBalance = async () => {
            try {
                const balance = await contract.balanceOf(address, 0);
                console.log("Condition balance: ", balance)
                if (balance.gt(0)) {
                    setHasClaimedNFT(true);
                    console.log("🌟 this user has a membership NFT!");
                } else {
                    setHasClaimedNFT(false);
                    console.log("😭 this user doesn't have a membership NFT.");
                }
            } catch (error) {
                setHasClaimedNFT(false);
                console.error("Failed to get balance", error);
            }
        };
        checkBalance();
    }, [address, contract]);

    const mintNft = async () => {
        try {
            setIsClaiming(true);
            await contract.claim("0", 1);
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/sepolia/${
                contract.getAddress()
            }/0`);
            setHasClaimedNFT(true);
        } catch (error) {
            setHasClaimedNFT(false);
            console.error("Failed to mint NFT", error);
        } finally {
            setIsClaiming(false);
        }
    };

    // This is the case where the user hasn't connected their wallet
    // to your web app. Let them call connectWallet.
    if (!address) {
        return (
            <div className="bg-[#ee0e6f]">
                <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10 font-mono">
                        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white text-glow font-black leading-7 md:leading-10">
                            Welcome to
                            <span className="text-[#11136c] mx-3">
                            Artopologi Membership
                            </span>
                            Club.
                        </h1>
                        <p className="mt-5 sm:mt-10 lg:w-10/12 text-white font-normal text-center text-2xl sm:text-xl ">Connect your wallet to mint your Artopologi Membership or you can buy it with your credit card.
                        </p>
                    </div>
                    <div className="flex sm:flex-row flex-col justify-center items-center">
                        <button 
                            onClick={async () => {
                                const wallet = await connect(metamaskConfig);
                                console.log("connected to ", wallet);
                            }}
                            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#11136c] bg-[#11136c] transition duration-150 ease-in-out hover:bg-white hover:text-[#11136c] lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-[#11136c] py-2 sm:py-4 text-sm btn text-center btnneon">
                            Connect your wallet</button>
                        <CrossmintPayButton collectionTitle="Artopologi Membership" collectionDescription="Artopologi NFT Membership"
                            className="xmint-btn"
                            collectionId={process.env.NEXT_PUBLIC_CROSSMINT_COLLECTION_ID}
                            clientId={process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID}
                            projectId={process.env.NEXT_PUBLIC_CROSSMINT_PROJECT_ID}
                            environment="staging"
                            checkoutProps={{"paymentMethods":["fiat"]}}
                            mintTo={address}
                            mintConfig={
                                {
                                    "type": "erc-1155",
                                    "price": "0.0001",
                                    "quantity": "1",
                                    "tokenId": "0",
                                    "_currency": "USD",
                                }
                            }
                            getButtonText={(connecting, paymentMethod) =>
                                connecting ? "Connecting" : `PAY WITH FIAT`
                            }
                        />
                    </div>
                </div>
            </div>


        );
    }

    if (hasClaimedNFT) {
        return (
            <div className="bg-[#ee0e6f]">
                <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10 font-mono">
                        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white text-glow font-black leading-7 md:leading-10">
                            Welcome to
                            <span className="text-[#11136c] mx-3">
                                Artopologi Membership
                            </span>
                            Club.
                        </h1>
                        <p className="mt-5 sm:mt-10 lg:w-10/12 text-white font-normal text-center text-2xl sm:text-xl ">Congratulations on being a member
                        </p>
                    </div>
                    <div className="flex sm:flex-row flex-col justify-center items-center">
                        <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#11136c] bg-[#11136c] transition duration-150 ease-in-out hover:bg-white hover:text-[#11136c] lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-[#11136c] py-2 sm:py-4 text-sm btn text-center btnneon">
                            Go into community</button>
                        <button className="ml-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-transparent transition duration-150 ease-in-out hover:border-indigo-600 lg:text-xl lg:font-bold  hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-4 sm:px-10 py-2 sm:py-4 text-sm  btn-glow">Join Discord</button>
                    </div>
                </div>
            </div>

        );
    };

    // This is the case where we have the user's address
    // which means they've connected their wallet to our site!
    return (
        <div className="bg-[#ee0e6f]">
            <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10 font-mono">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-white text-glow font-black leading-7 md:leading-10">
                        Welcome to
                        <span className="text-[#11136c] mx-3">
                            Artopologi Membership
                        </span>
                        Club.
                    </h1>
                    <p className="mt-5 sm:mt-10 lg:w-10/12 text-white font-normal text-center text-2xl sm:text-xl ">Buy your Membership Artopologi Ecosystem.
                    </p>
                </div>
                <div className="flex sm:flex-row flex-col justify-center items-center">

                    <button disabled={isClaiming}
                        onClick={mintNft}
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#11136c] bg-[#11136c] transition duration-150 ease-in-out hover:bg-white hover:text-[#11136c] lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-[#11136c] py-2 sm:py-4 text-sm btn text-center btnneon">
                            Buy it</button>
                    <CrossmintPayButton collectionTitle="Artopologi Membership" collectionDescription="Artopologi NFT Membership"
                        className="xmint-btn"
                        collectionId={process.env.NEXT_PUBLIC_CROSSMINT_COLLECTION_ID}
                        clientId={process.env.NEXT_PUBLIC_CROSSMINT_CLIENT_ID}
                        projectId={process.env.NEXT_PUBLIC_CROSSMINT_PROJECT_ID}
                        environment="staging"
                        checkoutProps={{"paymentMethods":["fiat"]}}
                        mintTo={address}
                        mintConfig={
                            {
                                "type": "erc-1155",
                                "price": "0.0001",
                                "quantity": "1",
                                "tokenId": "0",
                                "_currency": "USD",
                            }
                        }
                        getButtonText={(connecting, paymentMethod) =>
                            connecting ? "Connecting" : `PAY WITH FIAT`
                        }
                    />
                </div>
                {
                isClaiming ? (
                    <p className=" animate-bounce text-white text-2xl text-semibold">Minting...</p>
                ) : ""
            } </div>

        </div>
    );
}
