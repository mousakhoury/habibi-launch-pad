import { BlockchainContext } from "./BlockchainContext";

export const BlockchainProvider = ({ children }) => {
    // TestNet
    const chainIdRequired = 97; // 97 is bsc testnet && 56 is bsc mainnet
    const mainnetRpc = "https://bsc-testnet-rpc.publicnode.com";

    const FusdtAddress = "0xc5725068779BEf29222F3dF14cc509F406E78BC4";
    const FtokAddress = "0x6e567fd76F6a7BC84F599aCe93Bdc7F7fa6Be43b";
    const FMTAddress = "0x14D8626D620A7E742c3993d1D8C777f61a755CBA";

    const StakeV1 = "0xbd9Ea54c04c43da13D8e5D1a9Fb418DCD77f47cA";
    const LaunchPadV1 = "0xdE4F3C8579Ed6a1d69e67AceA5aC09434781e9b8";

    const StakeAddress = "0xB5E4e0E77F2A979eBc117e0Ef1288B0A5D27a6D7";
    const LaunchPadAddress = "0xaD09b2454B1A53cb909378E866F08F1132E20799";

    const GiftCardAddress = "0x5AbEAcBB62A34C57A80c26D3B657EE15Dc49EbBb";
    // MainNet
    // const chainIdRequired = 56;
    // const mainnetRpc = "https://bsc-dataseed1.binance.org/";

    // const FusdtAddress = "0x55d398326f99059ff775485246999027b3197955";
    // const FtokAddress = "0x61221f03E788F1BB8669e9C60549555b5a38d765";

    // const StakeV1 = "0x5e56D2302De03034794330f96F003a7F50F8eFb6";
    // const LaunchPadV1 = "0xCcA3D89186B901B89a8C5c9595496EdEd7f29B9b";

    // const StakeAddress = "0xEae4fbF0CF2FF7ADc67a3545680Bf47b5595021d";
    // const LaunchPadAddress = "0x875dC2CC185417a4618023C612e9f201A48a9CBF";

    const stakeV1ABI = [
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "_token",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_lockPeriod",
                    type: "uint256",
                },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "launchpadAddress",
                    type: "address",
                },
            ],
            name: "LaunchpadSetted",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "user",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "Staked",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "user",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "Unstaked",
            type: "event",
        },
        {
            inputs: [],
            name: "TIERS1AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS2AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS3AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS4AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS5AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TOKEN",
            outputs: [
                {
                    internalType: "contract IERC20",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
            ],
            name: "canUserUnstake",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_snapNb",
                    type: "uint256",
                },
            ],
            name: "getInvestorsDatas",
            outputs: [
                {
                    internalType: "uint256",
                    name: "tiersNb",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "amountStaked",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "index",
                    type: "uint256",
                },
            ],
            name: "getStakerAtIndex",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "getStakerNumber",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "getTiersStaked",
            outputs: [
                {
                    internalType: "uint256[6]",
                    name: "",
                    type: "uint256[6]",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
            ],
            name: "getUserData",
            outputs: [
                {
                    components: [
                        {
                            internalType: "uint256",
                            name: "staked",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "unlockDate",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "tiers",
                            type: "uint256",
                        },
                    ],
                    internalType: "struct Stake.UserData",
                    name: "",
                    type: "tuple",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
            ],
            name: "getUserStakedAmount",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "launchPadContract",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "lockPeriod",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_launchPad",
                    type: "address",
                },
            ],
            name: "setLaunchpadContract",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "snapShotPool",
            outputs: [
                {
                    internalType: "uint256[6]",
                    name: "tiersStaked",
                    type: "uint256[6]",
                },
                {
                    internalType: "uint256",
                    name: "snapShotNb",
                    type: "uint256",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                },
            ],
            name: "stake",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                },
            ],
            name: "unStake",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const launchPadV1ABI = [
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "_stable",
                    type: "address",
                },
                {
                    internalType: "contract IStake",
                    name: "_stakingContract",
                    type: "address",
                },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "maxFcfsAmount",
                    type: "uint256",
                },
            ],
            name: "MaxFcfsAmountUpdated",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "string",
                    name: "poolName",
                    type: "string",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "poolId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amountTarget",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "startingDate",
                    type: "uint256",
                },
            ],
            name: "PoolCreated",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "string",
                    name: "poolName",
                    type: "string",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amountTarget",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amountRaised",
                    type: "uint256",
                },
            ],
            name: "PoolFinished",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "roundDuration",
                    type: "uint256",
                },
            ],
            name: "RoundDurationUpdated",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256[5]",
                    name: "allocsPercentage",
                    type: "uint256[5]",
                },
            ],
            name: "TiersAllocSetted",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "investor",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "poolId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "UserInvest",
            type: "event",
        },
        {
            inputs: [],
            name: "PRECISION",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "STABLE",
            outputs: [
                {
                    internalType: "contract IERC20",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "STAKINGCONTRACT",
            outputs: [
                {
                    internalType: "contract IStake",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "string",
                    name: "_poolName",
                    type: "string",
                },
                {
                    internalType: "uint256",
                    name: "_amountTarget",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "_startingDate",
                    type: "uint256",
                },
            ],
            name: "createPool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "currentPoolId",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "_token",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                },
            ],
            name: "emergencyWithdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "firstRoundDuration",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_poolId",
                    type: "uint256",
                },
            ],
            name: "getPoolDatas",
            outputs: [
                {
                    components: [
                        {
                            internalType: "uint256",
                            name: "amountTarget",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "amountRaised",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256[6]",
                            name: "allocByTokenForTiers",
                            type: "uint256[6]",
                        },
                        {
                            internalType: "uint256",
                            name: "startingDate",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "snapShotNb",
                            type: "uint256",
                        },
                        {
                            internalType: "bool",
                            name: "isFinished",
                            type: "bool",
                        },
                        {
                            internalType: "bool",
                            name: "foundWithdrawed",
                            type: "bool",
                        },
                        {
                            internalType: "string",
                            name: "poolName",
                            type: "string",
                        },
                    ],
                    internalType: "struct LaunchPad.PoolData",
                    name: "",
                    type: "tuple",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_poolId",
                    type: "uint256",
                },
            ],
            name: "getUserAllocForPool",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_pool",
                    type: "uint256",
                },
            ],
            name: "getUserInvestForPool",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_poolId",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                },
            ],
            name: "investInPool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "maxFcfsAmount",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_maxFcfsAmount",
                    type: "uint256",
                },
            ],
            name: "setMaxFcfsAmount",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_firstRoundDuration",
                    type: "uint256",
                },
            ],
            name: "setRoundDuration",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256[5]",
                    name: "_allocs",
                    type: "uint256[5]",
                },
            ],
            name: "setTiersAllocs",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_poolId",
                    type: "uint256",
                },
            ],
            name: "snapShotPool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            name: "tiersAllocs",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_poolId",
                    type: "uint256",
                },
            ],
            name: "withdrawPoolFound",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const stakeABI = [
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "_token",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_lockPeriod",
                    type: "uint256",
                },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "launchpadAddress",
                    type: "address",
                },
            ],
            name: "LaunchpadSet",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "user",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "Staked",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "user",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "Unstaked",
            type: "event",
        },
        {
            inputs: [],
            name: "TIERS1AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS2AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS3AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS4AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS5AMOUNT",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TOKEN",
            outputs: [
                {
                    internalType: "contract IERC20",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
            ],
            name: "canUserUnstake",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "_snapNb",
                    type: "uint256",
                },
            ],
            name: "getInvestorsDatas",
            outputs: [
                {
                    internalType: "uint256",
                    name: "tiersNb",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "amountStaked",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "index",
                    type: "uint256",
                },
            ],
            name: "getStakerAtIndex",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "getStakerNumber",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "getTiersStaked",
            outputs: [
                {
                    internalType: "uint256[6]",
                    name: "",
                    type: "uint256[6]",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
            ],
            name: "getUserData",
            outputs: [
                {
                    components: [
                        {
                            internalType: "uint256",
                            name: "staked",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "unlockDate",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "tiers",
                            type: "uint256",
                        },
                    ],
                    internalType: "struct Stake.UserData",
                    name: "",
                    type: "tuple",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_user",
                    type: "address",
                },
            ],
            name: "getUserStakedAmount",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "launchPadContract",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "lockPeriod",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [
                {
                    internalType: "address",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "_launchPad",
                    type: "address",
                },
            ],
            name: "setLaunchpadContract",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "snapShotPool",
            outputs: [
                {
                    internalType: "uint256[6]",
                    name: "tiersStaked",
                    type: "uint256[6]",
                },
                {
                    internalType: "uint256",
                    name: "snapShotNb",
                    type: "uint256",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                },
            ],
            name: "stake",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_amount",
                    type: "uint256",
                },
            ],
            name: "unStake",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const launchPadABI = [
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "_stable",
                    type: "address",
                },
                {
                    internalType: "contract IStake",
                    name: "_stakingContract",
                    type: "address",
                },
            ],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            inputs: [
                { internalType: "address", name: "owner", type: "address" },
            ],
            name: "OwnableInvalidOwner",
            type: "error",
        },
        {
            inputs: [
                { internalType: "address", name: "account", type: "address" },
            ],
            name: "OwnableUnauthorizedAccount",
            type: "error",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "fcfsDuration",
                    type: "uint256",
                },
            ],
            name: "FcfsDurationUpdated",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "pauseDuration",
                    type: "uint256",
                },
            ],
            name: "PauseDurationUpdated",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "string",
                    name: "poolName",
                    type: "string",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "poolId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amountTarget",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "startingDate",
                    type: "uint256",
                },
            ],
            name: "PoolCreated",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "string",
                    name: "poolName",
                    type: "string",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amountTarget",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amountRaised",
                    type: "uint256",
                },
            ],
            name: "PoolFinished",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "roundDuration",
                    type: "uint256",
                },
            ],
            name: "RoundDurationUpdated",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint256[8]",
                    name: "allocsPercentage",
                    type: "uint256[8]",
                },
            ],
            name: "TiersAllocSet",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "investor",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "poolId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "UserInvest",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "user",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "poolId",
                    type: "uint256",
                },
            ],
            name: "UserRegisteredToPool",
            type: "event",
        },
        {
            inputs: [],
            name: "PRECISION",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "STABLE",
            outputs: [
                { internalType: "contract IERC20", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "STAKINGCONTRACT",
            outputs: [
                { internalType: "contract IStake", name: "", type: "address" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS1AMOUNT",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS2AMOUNT",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS3AMOUNT",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS4AMOUNT",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS5AMOUNT",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "TIERS6AMOUNT",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_poolId", type: "uint256" },
            ],
            name: "closePool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "string", name: "_poolName", type: "string" },
                {
                    internalType: "uint256",
                    name: "_amountTarget",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "_fcfs1MaxAmount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "_fcfs2MaxAmount",
                    type: "uint256",
                },
                {
                    internalType: "uint256",
                    name: "_startingDate",
                    type: "uint256",
                },
            ],
            name: "createPool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "currentPoolId",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "contract IERC20",
                    name: "_token",
                    type: "address",
                },
                { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "emergencyWithdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "fcfs1Duration",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "firstRoundDuration",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_poolId", type: "uint256" },
            ],
            name: "getPoolDatas",
            outputs: [
                {
                    components: [
                        {
                            internalType: "uint256",
                            name: "amountTarget",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "amountRaised",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "fcfs1MaxAmount",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "fcfs2MaxAmount",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "startingDate",
                            type: "uint256",
                        },
                        {
                            internalType: "bool",
                            name: "isFinished",
                            type: "bool",
                        },
                        {
                            internalType: "bool",
                            name: "fundWithdrawn",
                            type: "bool",
                        },
                        {
                            internalType: "string",
                            name: "poolName",
                            type: "string",
                        },
                    ],
                    internalType: "struct LaunchPadV2.PoolData",
                    name: "",
                    type: "tuple",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "_user", type: "address" },
                { internalType: "uint256", name: "_poolId", type: "uint256" },
            ],
            name: "getUserAllocForPool",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "_user", type: "address" },
                { internalType: "uint256", name: "_poolId", type: "uint256" },
            ],
            name: "getUserDatasForPool",
            outputs: [
                {
                    components: [
                        {
                            internalType: "uint256",
                            name: "userAllocRound1",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "userAllocFcfs1",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "userAllocFcfs2",
                            type: "uint256",
                        },
                        {
                            internalType: "uint256",
                            name: "userInvest",
                            type: "uint256",
                        },
                    ],
                    internalType: "struct LaunchPadV2.UserPoolDatas",
                    name: "",
                    type: "tuple",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "_user", type: "address" },
                { internalType: "uint256", name: "_pool", type: "uint256" },
            ],
            name: "getUserInvestForPool",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_poolId", type: "uint256" },
                { internalType: "uint256", name: "_amount", type: "uint256" },
            ],
            name: "investInPool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "pauseDurationBetweenRound",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_fcfs1Duration",
                    type: "uint256",
                },
            ],
            name: "setFcfs1Duration",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_pauseDuration",
                    type: "uint256",
                },
            ],
            name: "setPauseDuration",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_firstRoundDuration",
                    type: "uint256",
                },
            ],
            name: "setRoundDuration",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "uint256[8]",
                    name: "_allocs",
                    type: "uint256[8]",
                },
            ],
            name: "setTiersAllocs",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            name: "tiersAllocs",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_id", type: "uint256" },
                { internalType: "uint256", name: "_fcfs1", type: "uint256" },
                { internalType: "uint256", name: "_fcfs2", type: "uint256" },
            ],
            name: "updateFCFS",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "_poolId", type: "uint256" },
            ],
            name: "withdrawPoolFund",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address[]",
                    name: "_users",
                    type: "address[]",
                },
                { internalType: "uint256", name: "_poolId", type: "uint256" },
            ],
            name: "wlAddressesToPool",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const ERC20ABI = [
        {
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "owner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Approval",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "from",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "to",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "value",
                    type: "uint256",
                },
            ],
            name: "Transfer",
            type: "event",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "owner",
                    type: "address",
                },
                {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
            ],
            name: "allowance",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "approve",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "account",
                    type: "address",
                },
            ],
            name: "balanceOf",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "decimals",
            outputs: [
                {
                    internalType: "uint8",
                    name: "",
                    type: "uint8",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "subtractedValue",
                    type: "uint256",
                },
            ],
            name: "decreaseAllowance",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "addedValue",
                    type: "uint256",
                },
            ],
            name: "increaseAllowance",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "name",
            outputs: [
                {
                    internalType: "string",
                    name: "",
                    type: "string",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "symbol",
            outputs: [
                {
                    internalType: "string",
                    name: "",
                    type: "string",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "totalSupply",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "to",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "transfer",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "address",
                    name: "from",
                    type: "address",
                },
                {
                    internalType: "address",
                    name: "to",
                    type: "address",
                },
                {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
            ],
            name: "transferFrom",
            outputs: [
                {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                },
            ],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const giftCardABI = [
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "uint8",
                    name: "version",
                    type: "uint8",
                },
            ],
            name: "Initialized",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "address",
                    name: "previousOwner",
                    type: "address",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "newOwner",
                    type: "address",
                },
            ],
            name: "OwnershipTransferred",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: false,
                    internalType: "address",
                    name: "owner",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "address",
                    name: "paymentToken",
                    type: "address",
                },
            ],
            name: "PaymentTokenSet",
            type: "event",
        },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true,
                    internalType: "uint256",
                    name: "index",
                    type: "uint256",
                },
                {
                    indexed: true,
                    internalType: "address",
                    name: "buyer",
                    type: "address",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "cardId",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "orderID",
                    type: "uint256",
                },
                {
                    indexed: false,
                    internalType: "uint256",
                    name: "timestamp",
                    type: "uint256",
                },
            ],
            name: "Purchased",
            type: "event",
        },
        {
            inputs: [],
            name: "initialize",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "cardId", type: "uint256" },
            ],
            name: "isPurchased",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "paymentToken",
            outputs: [
                {
                    internalType: "contract IERC20Upgradeable",
                    name: "",
                    type: "address",
                },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "amount", type: "uint256" },
                { internalType: "uint256", name: "cardId", type: "uint256" },
                { internalType: "uint256", name: "orderID", type: "uint256" },
            ],
            name: "purchase",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                { internalType: "uint256", name: "cardId", type: "uint256" },
            ],
            name: "purchases",
            outputs: [
                { internalType: "address", name: "buyer", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
                { internalType: "uint256", name: "cardId", type: "uint256" },
                { internalType: "uint256", name: "orderID", type: "uint256" },
                { internalType: "uint256", name: "timestamp", type: "uint256" },
            ],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "renounceOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [
                {
                    internalType: "contract IERC20Upgradeable",
                    name: "_paymentToken",
                    type: "address",
                },
            ],
            name: "setPaymentToken",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "totalPurchases",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "newOwner", type: "address" },
            ],
            name: "transferOwnership",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const contextValue = {
        chainIdRequired,
        FusdtAddress,
        FtokAddress,
        FMTAddress,
        StakeAddress,
        LaunchPadAddress,
        GiftCardAddress,
        stakeABI,
        launchPadABI,
        giftCardABI,
        ERC20ABI,
        LaunchPadV1,
        StakeV1,
        stakeV1ABI,
        launchPadV1ABI,
        mainnetRpc,
        // ... any other data you want to include ...
    };

    return (
        <BlockchainContext.Provider value={contextValue}>
            {children}
        </BlockchainContext.Provider>
    );
};
