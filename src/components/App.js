import React, { Component } from 'react'
import Web3 from 'web3'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WalletConnectProvider from "@walletconnect/web3-provider";

import LpToken from '../abis/Interface/LpToken.json'
import IPancakePair from '../abis/Interface/IPancakePair.json'
import BavaToken from '../abis/BavaToken.json'
import BavaMasterFarmerV2_1 from '../abis/BavaMasterFarmerV2.json'
import BavaMasterFarmerV1 from '../abis/BavaMasterFarmerV1.json'
import BavaMasterFarmerV2_2 from '../abis/BavaMasterFarmerV2_2.json'
import BavaMasterFarmerV2_3 from '../abis/BavaMasterFarmerV2_3.json'
import BavaMasterFarmerUpgradeable from '../abis/BavaMasterFarmerUpgradeable.json'
import BavaAirdrop from '../abis/BavaAirdrop.json'
import StakingRewards from '../abis/StakingRewards.json'

import BavaCompoundPool from '../abis/BavaCompoundPool.json'
import BavaCompoundPoolVariable from '../abis/BavaCompoundPoolVariable.json'
import BavaCompoundVault_VariableUpgradeable from '../abis/BavaCompoundVault_VariableUpgradeable.json'
import CollateralVault from '../abis/CollateralVault.json'
import SyntheticPool from '../abis/SyntheticPool.json'
import USBLiquidityPool from '../abis/USBLiquidityPool.json'
import USBSwapLocker from '../abis/USBSwapLocker.json'
import SystemCoin from '../abis/SystemCoin.json'
import AvaxChainlinkOracle from '../abis/AvaxChainlinkOracle.json'
import LiquidityStakingV1 from '../abis/LiquidityStakingV1.json'
import Treasury from '../abis/Treasury.json'


import NavbMenu from './navbar/NavbarMenu'
import Stake from './stake/Stake'
import StakeLiquidity from './stake/StakeLiquidity'
import ScrollToTop from './ScrollToTop'
import Footer from './Footer';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadFarmData()
    await this.loadBlockchainData()
    while (this.state.wallet == false || this.state.walletConnect == false) {
      if ((this.state.wallet || this.state.walletConnect) == true) {
        await this.loadBlockchainUserData()
      }
      await this.delay(30000);
    }
  }

  async loadFarmData() {

    // let responseMongo = this.loadMongo()
    // let responseGecko = this.loadGecko()

    // const myJsonMongo = await responseMongo
    // const myJsonGecko = await responseGecko
    // this.setState({ myJsonMongo })

    // let AVAXPrice = myJsonGecko["wrapped-avax"]["usd"]
    // let BAVAPrice = myJsonGecko["baklava"]["usd"]
    // let PNGPrice = myJsonGecko["pangolin"]["usd"]
    // let JOEPrice = myJsonGecko["joe"]["usd"]
    // let QIPrice = myJsonGecko["benqi"]["usd"]

    // this.setState({ AVAXPrice: AVAXPrice.toFixed(5) })
    // this.setState({ BAVAPrice: BAVAPrice.toFixed(5) })
    // this.setState({ PNGPrice: PNGPrice.toFixed(5) })
    // this.setState({ JOEPrice: JOEPrice.toFixed(5) })
    // this.setState({ QIPrice: QIPrice.toFixed(5) })
  }

  // async loadMongo() {
  //   let responseMongo = await fetch(`https://ap-southeast-1.aws.data.mongodb-api.com/app/bdl-uyejj/endpoint/tvl`);
  //   const mongoDB = await responseMongo.json();
  //   return mongoDB
  // }

  // async loadGecko() {
  //   let responseGecko = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=joe%2Cwrapped-avax%2Cpangolin%2Cweth%2Cbaklava%2Cusd-coin%2Ctether%2Cbenqi%2Cterra-luna&vs_currencies=usd`);
  //   const geckoPrice = await responseGecko.json();
  //   return geckoPrice
  // }


  async loadBlockchainData() {
    const web3Eth = window.web3Eth
    const networkId = process.env.REACT_APP_networkid
    this.setState({ networkId })
    const farmNetworkId = process.env.REACT_APP_farmnetworkid
    this.setState({ farmNetworkId })
    const farmNetwork = process.env.REACT_APP_farmnetwork
    this.setState({ farmNetwork })

    if (window.ethereum) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      this.setState({ chainId })

      if (this.state.chainId == "0x61") {
        this.setState({ networkName: "BSC Testnet" })
      } else if (this.state.chainId == "0x38") {
        this.setState({ networkName: "BSC" })
      } else if (this.state.chainId == "0x1") {
        this.setState({ networkName: "Ethereum" })
      } else if (this.state.chainId == "0x3") {
        this.setState({ networkName: "Ropsten" })
      } else if (this.state.chainId == "0x4") {
        this.setState({ networkName: "Rinkeby" })
      } else if (this.state.chainId == "0x2a") {
        this.setState({ networkName: "Kovan" })
      } else if (this.state.chainId == "0x89") {
        this.setState({ networkName: "Polygon" })
      } else if (this.state.chainId == "0x13881") {
        this.setState({ networkName: "Mumbai" })
      } else if (this.state.chainId == "0xa869") {
        this.setState({ networkName: "Fuji" })
      } else if (this.state.chainId == "0xa86a") {
        this.setState({ networkName: "Avalanche" })
      }

      window.ethereum.on('chainChanged', this.handleChainChanged);
      window.ethereum.on('accountsChanged', this.handleAccountsChanged);

    } else {
      this.setState({ chainID: "0x" })
      this.setState({ networkName: "Unavailable" })
    }

    // Load contract
    const fxToken = new web3Eth.eth.Contract(BavaToken.abi, process.env.REACT_APP_fxtoken_address)
    const liquidityStakingV1 = new web3Eth.eth.Contract(LiquidityStakingV1.abi, process.env.REACT_APP_liquiditystakingV1_address)
    const treasury = new web3Eth.eth.Contract(Treasury.abi, process.env.REACT_APP_treasury_address)
    const usdtToken = new web3Eth.eth.Contract(SystemCoin.abi, process.env.REACT_APP_usdt_address)

    this.setState({ fxToken })
    this.setState({ liquidityStakingV1 })
    this.setState({ treasury })
    this.setState({ usdtToken })

    let response0 = this.loadPoolSize()
    let response1 = this.loadPoolRewardRate()
    let response2 = this.loadPoolTimeRemainingInCurrentEpoch()
    let response3 = this.loadTreasuryRewardAmount()
    let response4 = this.loadPoolBlackoutWindow()
    let response5 = this.loadPoolEpochParam()

    let poolSize = await response0
    let poolRewardRate = await response1
    let poolTimeRemainingInCurrentEpoch = await response2
    let treasuryRewardRemaining = await response3
    let poolBlackoutWindow = await response4
    let poolEpochInterval = await response5


    this.setState({ poolSize })
    this.setState({ poolRewardRate })
    this.setState({ poolTimeRemainingInCurrentEpoch })
    this.setState({ treasuryRewardRemaining })
    this.setState({ poolBlackoutWindow })
    this.setState({ poolEpochInterval })

    this.setState({ blockchainLoading: true })
  }

  // Pool length
  async loadPoolSize() {
    let poolSize = await this.state.liquidityStakingV1.methods.getTotalActiveBalanceCurrentEpoch().call()
    return poolSize
  }

  async loadPoolRewardRate() {
    let poolRewardRate = await this.state.liquidityStakingV1.methods.getRewardsPerSecond().call()
    return poolRewardRate
  }

  async loadPoolTimeRemainingInCurrentEpoch() {
    let poolTimeRemainingInCurrentEpoch = await this.state.liquidityStakingV1.methods.getTimeRemainingInCurrentEpoch().call()
    return poolTimeRemainingInCurrentEpoch
  }

  async loadTreasuryRewardAmount() {
    let treasuryRemainingAmount = await this.state.fxToken.methods.balanceOf(process.env.REACT_APP_treasury_address).call()
    return treasuryRemainingAmount
  }

  async loadPoolBlackoutWindow() {
    let timeRemainingNextBlackout = 0
    let blackoutWindow = await this.state.liquidityStakingV1.methods.getBlackoutWindow().call()
    let poolTimeRemainingInCurrentEpoch = await this.state.liquidityStakingV1.methods.getTimeRemainingInCurrentEpoch().call()
    if (poolTimeRemainingInCurrentEpoch >= blackoutWindow) {
      timeRemainingNextBlackout = poolTimeRemainingInCurrentEpoch - blackoutWindow
    } else {
      timeRemainingNextBlackout = 0
    }
    return timeRemainingNextBlackout
  }

  async loadPoolEpochParam() {
    let poolEpochParam = await this.state.liquidityStakingV1.methods.getEpochParameters().call()
    return poolEpochParam[0]
  }


  /* **************************************************************************************************************
  * ************** Load User blockchain data **********************************************************************
  * ***************************************************************************************************************/

  async loadBlockchainUserData() {
    let userResponse0 = this.loadUserUSDTBalance()
    let userResponse1 = this.loadUserStakedBalance()
    let userResponse2 = this.loadUserUSDTStakingAllowance()
    let userResponse3 = this.loadUserEarnedRewardAmount()
    let userResponse4 = this.loadUserWithdrawableAmount()
    let userResponse5 = this.loadUserInactiveBalanceNextEpoch()


    let userUSDTBalance = await userResponse0
    let userStakedBalance = await userResponse1
    let userUSDTStakingAllowance = await userResponse2
    let userEarnedRewardAmount = await userResponse3
    let userWithdrawableAmount = await userResponse4
    let userInactiveBalanceNextEpoch = await userResponse5

    this.setState({ userUSDTBalance })
    this.setState({ userStakedBalance })
    this.setState({ userUSDTStakingAllowance })
    this.setState({ userEarnedRewardAmount })
    this.setState({ userWithdrawableAmount })
    this.setState({ userInactiveBalanceNextEpoch })

    this.setState({ accountLoading: true })
  }


  //  Async User Info Function
  async loadUserUSDTBalance() {
    let usdtTokenBalance = await this.state.usdtToken.methods.balanceOf(this.state.account).call()
    return usdtTokenBalance
  }

  async loadUserStakedBalance() {
    let stakedBalance = await this.state.liquidityStakingV1.methods.getActiveBalanceCurrentEpoch(this.state.account).call()
    return stakedBalance
  }

  async loadUserUSDTStakingAllowance() {
    let usdtStakingAllowance = await this.state.usdtToken.methods.allowance(this.state.account, process.env.REACT_APP_liquiditystakingV1_address).call()
    return usdtStakingAllowance
  }

  async loadUserEarnedRewardAmount() {
    let earnedAmount = "0"
    return earnedAmount
  }

  async loadUserWithdrawableAmount() {
    let withdrawableAmount = await this.state.liquidityStakingV1.methods.getStakeAvailableToWithdraw(this.state.account).call()
    return withdrawableAmount
  }

  async loadUserInactiveBalanceNextEpoch() {
    let inactiveBalanceNextEpoch = await this.state.liquidityStakingV1.methods.getInactiveBalanceNextEpoch(this.state.account).call()
    return inactiveBalanceNextEpoch
  }

  // ***********************************************************************************************************************************************
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    window.web3Eth = new Web3(`https://eth-goerli.g.alchemy.com/v2/oVlBkzgZrAVhL6zvDAB73MtQK7EiiRhH`);
    try {
      let id = await window.web3Eth.eth.net.isListening()
    } catch (e) {
      console.log(e)
      await this.loadWeb3_2()
    }
    this.setState({ loading: true })
  }

  async loadWeb3_2() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    window.web3Eth = new Web3(`https://rpc.ankr.com/eth_goerli`);
    // window.web3Eth = new Web3(`http://mainnet-useast1-avax-dataseed1.functionx.io:9650/ext/bc/C/rpc`);

    this.setState({ loading: true })
  }

  connectMetamask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(async () => {
          await this.switchNetwork()
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId == process.env.REACT_APP_chainid) {
            // await this.WalletDisconnect()
            await this.setWalletTrigger(true)
            this.loadBlockchainUserData()
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
    } else {
      alert("No wallet provider was found")
    }
  }

  connectCoin98 = () => {
    if (window.coin98) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then(async (accounts) => {
          let chainId = await window.ethereum.request({ method: 'eth_chainId' });
          if (chainId == "0xa86a") {
            if (accounts[0]) {
              this.WalletDisconnect()
              this.setWalletTrigger(true)
            } else {
              alert("No wallet found, please create wallet")
            }
          } else {
            alert("Wrong Network, please switch to Avalanche network")
          }
        })
        .catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
    } else {
      alert("No wallet provider was found")
    }
  }

  mobileWalletConnect = async () => {
    window.provider = new WalletConnectProvider({
      rpc: {
        // 530: "https://fx-json-web3.functionx.io:8545"
        43114: "https://api.avax.network/ext/bc/C/rpc"
        // 56: `https://bsc-dataseed.binance.org/`
        // 1: "https://api.avax.network/ext/bc/C/rpc"
      },
      // chainId: 530,
      chainId: 43114,
      // chainId: 56,
    });
    await window.provider.enable();
    window.web3Con = await new Web3(window.provider);
    const accounts = await window.web3Con.eth.getAccounts();
    const chainId = await window.provider.request('eth_chainId');
    this.setState({ account: accounts[0] })
    const first4Account = this.state.account.substring(0, 4)
    const last4Account = this.state.account.slice(-4)
    this.setState({ first4Account: first4Account })
    this.setState({ last4Account: last4Account })
    this.setState({ walletConnect: true })
    this.setWalletTrigger(false)
    this.loadBlockchainUserData()

    // Subscribe to accounts change
    window.provider.on("accountsChanged", this.handleAccountsChanged);
    // Subscribe to session disconnection
    window.provider.on("disconnect", (code, reason) => {
      // console.log(code, reason);
      this.WalletDisconnect()
    });
    window.provider.on("chainChanged", async () => {
      this.WalletDisconnect()
      alert("You're connected to an unsupported network.")
    });
  }

  WalletDisconnect = async () => {
    if (window.provider.connected == true) {
      await window.provider.disconnect()
      this.setState({ walletConnect: false })
      this.setState({ accountLoading: false })
    }
    this.loadBlockchainUserData()
  }

  switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: process.env.REACT_APP_chainid }],
      })
    }
    catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          // console.log(switchError.code)
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xa86a', rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'], chainName: 'Avalanche Mainnet C-Chain',
              nativeCurrency: {
                name: 'AVAX',
                symbol: 'AVAX', // 2-6 characters long
                decimals: 18
              }, blockExplorerUrls: ['https://snowtrace.io/']
            }],
          });
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          this.setState({ chainId })
          if (this.state.chainId == "0x61") {
            this.setState({ networkName: "BSC Testnet" })
          } else if (this.state.chainId == "0x38") {
            this.setState({ networkName: "BSC" })
          } else if (this.state.chainId == "0x1") {
            this.setState({ networkName: "Ethereum" })
          } else if (this.state.chainId == "0x3") {
            this.setState({ networkName: "Ropsten" })
          } else if (this.state.chainId == "0x4") {
            this.setState({ networkName: "Rinkeby" })
          } else if (this.state.chainId == "0x2a") {
            this.setState({ networkName: "Kovan" })
          } else if (this.state.chainId == "0x89") {
            this.setState({ networkName: "Polygon" })
          } else if (this.state.chainId == "0x13881") {
            this.setState({ networkName: "Mumbai" })
          } else if (this.state.chainId == "0xa869") {
            this.setState({ networkName: "Fuji" })
          } else if (this.state.chainId == "0xa86a") {
            this.setState({ networkName: "Avalanche" })
          }
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }

  handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      this.setWalletTrigger(false)
    } else if (accounts[0] !== this.state.account) {
      const accounts = await window.web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const first4Account = this.state.account.substring(0, 4)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      this.setState({ airdropCheck: false })
      this.setState({ collRatioChangeUpdate: [] })
      this.loadBlockchainUserData()
      // Do any other work!
    }
  }

  handleChainChanged = async () => {
    // We recommend reloading the page, unless you must do otherwise
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    this.setState({ chainId })
    if (chainId != process.env.REACT_APP_chainid) {
      this.setWalletTrigger(false)
    }
    if (this.state.chainId == "0x61") {
      this.setState({ networkName: "BSC Testnet" })
    } else if (this.state.chainId == "0x38") {
      this.setState({ networkName: "BSC" })
    } else if (this.state.chainId == "0x1") {
      this.setState({ networkName: "Ethereum" })
    } else if (this.state.chainId == "0x3") {
      this.setState({ networkName: "Ropsten" })
    } else if (this.state.chainId == "0x4") {
      this.setState({ networkName: "Rinkeby" })
    } else if (this.state.chainId == "0x2a") {
      this.setState({ networkName: "Kovan" })
    } else if (this.state.chainId == "0x89") {
      this.setState({ networkName: "Polygon" })
    } else if (this.state.chainId == "0x13881") {
      this.setState({ networkName: "Mumbai" })
    } else if (this.state.chainId == "0xa869") {
      this.setState({ networkName: "Fuji" })
    } else if (this.state.chainId == "0xa86a") {
      this.setState({ networkName: "Avalanche" })
    }
    this.switchNetwork()
    // Run any other necessary logic...
  }

  addTokenWallet = async (i) => {
    let brtAddress = this.state.poolSegmentInfoUpgradeable[i].vaultAddresses[this.state.farmNetworkId]
    let brtSymbol = this.state.poolSegmentInfoUpgradeable[i].lpTokenPairSymbol
    // We recommend reloading the page, unless you must do otherwise
    window.ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: brtAddress,
            symbol: `BRT2-${brtSymbol}`,
            decimals: 18,
            // image: 'https://foo.io/token-image.svg',
          },
        },
      })
      .then((success) => {
        if (success) {
          console.log('Successfully added to wallet!');
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch(console.error);
    // Run any other necessary logic...
  }

  addBAVATokenWallet = async () => {
    // We recommend reloading the page, unless you must do otherwise
    window.ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: process.env.REACT_APP_bavatoken_address,
            symbol: 'BAVA',
            decimals: 18,
            image: 'https://assets.coingecko.com/coins/images/23780/small/200x200_BAVA_LOGO_%282%29.png?1645435712',
          },
        },
      })
      .then((success) => {
        if (success) {
          console.log('Successfully added to wallet!');
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch(console.error);
    // Run any other necessary logic...
  }

  addUSBTokenWallet = async () => {
    // We recommend reloading the page, unless you must do otherwise
    window.ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: process.env.REACT_APP_usb_address,
            symbol: 'USB',
            decimals: 18,
            image: "https://baklava.space/static/media/usb.a711545a.webp",
          },
        },
      })
      .then((success) => {
        if (success) {
          console.log('Successfully added to wallet!');
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch(console.error);
    // Run any other necessary logic...
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    var min = a.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    var sec = a.getSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
  }





  deposit = async (i, amount, v) => {
    let bavaMasterFarmer
    let bavaCompoundPool
    let intWeb3
    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    if (v == 1) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
    } else if (v == 2) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV2_1.abi, process.env.REACT_APP_bavamasterfarmv2_1address)
    } else if (v == 3) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV2_2.abi, process.env.REACT_APP_bavamasterfarmv2_2address)
    } else if (v == 4) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV2_3.abi, process.env.REACT_APP_bavamasterfarmv2_3address)
      let poolAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).poolContract
      bavaCompoundPool = new intWeb3.eth.Contract(BavaCompoundPool.abi, poolAddress)
    } else if (v == 5) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerUpgradeable.abi, process.env.REACT_APP_upgradeablebavamasterfarm_address)
      let poolAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).vaultAddress
      bavaCompoundPool = new intWeb3.eth.Contract(BavaCompoundVault_VariableUpgradeable.abi, poolAddress)
    }

    if (v == 4 || v == 5) {
      await bavaCompoundPool.methods.deposit(amount).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    } else {
      await bavaMasterFarmer.methods.deposit(i, amount).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  approve = async (i, v) => {
    let lpTokenAddress
    let bavaVaultAddress
    let lpToken
    let intWeb3

    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    if (v == 1) {
      lpTokenAddress = this.state.poolSegmentInfoV1[i].lpAddresses[this.state.farmNetworkId]
      bavaVaultAddress = this.state.bavaMasterFarmerV1._address
    } else if (v == 2) {
      lpTokenAddress = this.state.poolSegmentInfo[i].lpAddresses[this.state.farmNetworkId]
      bavaVaultAddress = this.state.bavaMasterFarmer._address
    } else if (v == 3) {
      lpTokenAddress = this.state.poolSegmentInfoV2_2[i].lpAddresses[this.state.farmNetworkId]
      bavaVaultAddress = this.state.bavaMasterFarmerV2_2._address
    } else if (v == 4) {
      let bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV2_3.abi, process.env.REACT_APP_bavamasterfarmv2_3address)
      lpTokenAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).lpToken
      bavaVaultAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).poolContract
    } else if (v == 5) {
      let bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerUpgradeable.abi, process.env.REACT_APP_upgradeablebavamasterfarm_address)
      lpTokenAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).lpToken
      bavaVaultAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).vaultAddress
    }

    lpToken = new intWeb3.eth.Contract(LpToken.abi, lpTokenAddress)
    await lpToken.methods.approve(bavaVaultAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  withdraw = async (i, amount, v) => {
    let bavaMasterFarmer
    let bavaCompoundPool
    let intWeb3

    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    if (v == 1) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
    } else if (v == 2) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV2_1.abi, process.env.REACT_APP_bavamasterfarmv2_1address)
    } else if (v == 3) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV2_2.abi, process.env.REACT_APP_bavamasterfarmv2_2address)
    } else if (v == 4) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV2_3.abi, process.env.REACT_APP_bavamasterfarmv2_3address)
      let poolAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).poolContract
      bavaCompoundPool = new intWeb3.eth.Contract(BavaCompoundPool.abi, poolAddress)
    } else if (v == 5) {
      bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerUpgradeable.abi, process.env.REACT_APP_upgradeablebavamasterfarm_address)
      let poolAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).vaultAddress
      bavaCompoundPool = new intWeb3.eth.Contract(BavaCompoundVault_VariableUpgradeable.abi, poolAddress)
    }

    if (v == 4 || v == 5) {
      await bavaCompoundPool.methods.withdraw(amount).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    } else {
      await bavaMasterFarmer.methods.withdraw(i, amount).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  harvest = async (i, v) => {
    let bavaMasterFarmer
    let bavaCompoundPool
    let intWeb3

    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (v == 1) {
        bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV1.abi, process.env.REACT_APP_bavamasterfarmv1_address)
        if (this.state.pendingSegmentRewardV1[i] <= 0) {
          alert("No token to harvest! Please deposit LP to earn BAVA")
          return
        }
      } else if (v == 2) {
        bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV2_1.abi, process.env.REACT_APP_bavamasterfarmv2_1address)
        if (this.state.pendingSegmentRewardV2_1[i] <= 0) {
          alert("No token to harvest! Please deposit LP to earn BAVA")
          return
        }
      } else if (v == 3) {
        bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV2_2.abi, process.env.REACT_APP_bavamasterfarmv2_2address)
        if (this.state.pendingSegmentRewardV2_2[i] <= 0) {
          alert("No token to harvest! Please deposit LP to earn BAVA")
          return
        }
      } else if (v == 4) {
        bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerV2_3.abi, process.env.REACT_APP_bavamasterfarmv2_3address)
        let poolAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).poolContract
        bavaCompoundPool = new intWeb3.eth.Contract(BavaCompoundPool.abi, poolAddress)
        if (this.state.pendingSegmentRewardV2_3[i] <= 0) {
          alert("No token to harvest! Please deposit LP to earn BAVA")
          return
        }
      } else if (v == 5) {
        bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerUpgradeable.abi, process.env.REACT_APP_upgradeablebavamasterfarm_address)
        let poolAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).vaultAddress
        bavaCompoundPool = new intWeb3.eth.Contract(BavaCompoundVault_VariableUpgradeable.abi, poolAddress)
        if (this.state.pendingSegmentRewardUpgradeable[i] <= 0) {
          alert("No token to harvest! Please deposit LP to earn BAVA")
          return
        }
      }

      if (v == 4 || v == 5) {
        bavaCompoundPool.methods.claimReward().send({ from: this.state.account }).then(async (result) => {
          this.loadBlockchainUserData()
        }).catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
      } else {
        bavaMasterFarmer.methods.claimReward(i).send({ from: this.state.account }).then(async (result) => {
          this.loadBlockchainUserData()
        }).catch((err) => {
          if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
      }
    }
  }

  reinvest = async (i, v) => {
    let bavaMasterFarmer
    let bavaCompoundPool
    let intWeb3

    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (v == 4) {
        bavaMasterFarmer = new window.web3.eth.Contract(BavaMasterFarmerV2_3.abi, process.env.REACT_APP_bavamasterfarmv2_3address)
        let poolAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).poolContract
        bavaCompoundPool = new window.web3.eth.Contract(BavaCompoundPool.abi, poolAddress)
      } else if (v == 5) {
        bavaMasterFarmer = new intWeb3.eth.Contract(BavaMasterFarmerUpgradeable.abi, process.env.REACT_APP_upgradeablebavamasterfarm_address)
        let poolAddress = (await bavaMasterFarmer.methods.poolInfo(i).call()).vaultAddress
        bavaCompoundPool = new intWeb3.eth.Contract(BavaCompoundVault_VariableUpgradeable.abi, poolAddress)
      }

      await bavaCompoundPool.methods.reinvest().send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainData()
      }).catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }


  checkAirdrop = async (address) => {
    let checksum = window.web3Eth.utils.toChecksumAddress(address)
    if (checksum in this.state.airdropList) {
      this.setState({ validAirdrop: true })
    } else {
      this.setState({ validAirdrop: false })
    }
    this.setState({ airdropCheck: true })
  }

  claimAirdrop = async () => {
    let bavaAirdrop
    if (this.state.walletConnect == true) {
      bavaAirdrop = new window.web3Con.eth.Contract(BavaAirdrop.abi, process.env.REACT_APP_airdrop_address)
    } else if (this.state.wallet == true) {
      bavaAirdrop = new window.web3.eth.Contract(BavaAirdrop.abi, process.env.REACT_APP_airdrop_address)
    }
    if ((Date.now() / 1000).toFixed(0) < this.state.airdropStart) {
      alert("Distribution not started yet")
    } else if ((Date.now() / 1000).toFixed(0) > this.state.airdropEnd) {
      alert("Distribution already end")
    } else {
      if ((this.state.account in this.state.airdropList) == true) {
        let processed = await bavaAirdrop.methods.processedAirdrops(this.state.account, this.state.airdropIteration).call()
        if (processed == false) {
          let hash = this.state.airdropList[this.state.account]
          await bavaAirdrop.methods.claimTokens(hash).send({ from: this.state.account }).then(async (result) => {
          }).catch((err) => {
            if (err.code === 4001) {
              // EIP-1193 userRejectedRequest error
              // If this happens, the user rejected the connection request.
              alert("Something went wrong...Code: 4001 User rejected the request.")
            } else {
              console.error(err);
            }
          });
        } else {
          alert("Airdrop already claimed from this address")
        }
      }
    }
  }

  approveStake = async () => {
    let bavaToken
    if (this.state.walletConnect == true) {
      bavaToken = new window.web3Con.eth.Contract(BavaToken.abi, process.env.REACT_APP_bavatoken_address)
    } else if (this.state.wallet == true) {
      bavaToken = new window.web3.eth.Contract(BavaToken.abi, process.env.REACT_APP_bavatoken_address)
    }
    await bavaToken.methods.approve(process.env.REACT_APP_staking_rewards_address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  stake = async (amount) => {
    let bavaStake
    if (this.state.walletConnect == true) {
      bavaStake = new window.web3Con.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    } else if (this.state.wallet == true) {
      bavaStake = new window.web3.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    }
    await bavaStake.methods.stake(amount).send({ from: this.state.account }).then((result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  unstake = async (amount) => {
    let bavaStake
    if (this.state.walletConnect == true) {
      bavaStake = new window.web3Con.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    } else if (this.state.wallet == true) {
      bavaStake = new window.web3.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    }
    await bavaStake.methods.withdraw(amount).send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  getReward = async () => {
    let bavaStake
    if (this.state.walletConnect == true) {
      bavaStake = new window.web3Con.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    } else if (this.state.wallet == true) {
      bavaStake = new window.web3.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    }
    await bavaStake.methods.getReward().send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  exit = async (amount) => {
    let bavaStake
    if (this.state.walletConnect == true) {
      bavaStake = new window.web3Con.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    } else if (this.state.wallet == true) {
      bavaStake = new window.web3.eth.Contract(StakingRewards.abi, process.env.REACT_APP_staking_rewards_address)
    }
    await bavaStake.methods.exit().send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  /**
   * @description - Collateral pool function
   * @param {*} i - pool index
   * @param {*} collAmount - BRT amount
   * @param {*} borrowAmount - USB amount
   */

  depositAndBorrow = async (i, collAmount, borrowAmount) => {
    let collaVault
    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (this.state.walletConnect == true) {
        collaVault = new window.web3Con.eth.Contract(CollateralVault.abi, process.env.REACT_APP_collateral_vault_address)
      } else if (this.state.wallet == true) {
        collaVault = new window.web3.eth.Contract(CollateralVault.abi, process.env.REACT_APP_collateral_vault_address)
      }
      collaVault.methods.joinAndBorrow(i, collAmount, borrowAmount).send({ from: this.state.account }).then(async (result) => {
        await this.loadBlockchainData()
        await this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  repayUSB = async (i, repayAmount) => {
    let collaVault
    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (this.state.walletConnect == true) {
        collaVault = new window.web3Con.eth.Contract(CollateralVault.abi, process.env.REACT_APP_collateral_vault_address)
      } else if (this.state.wallet == true) {
        collaVault = new window.web3.eth.Contract(CollateralVault.abi, process.env.REACT_APP_collateral_vault_address)
      }
      collaVault.methods.repaySystemCoin(i, this.state.account, repayAmount).send({ from: this.state.account }).then(async (result) => {
        await this.loadBlockchainData()
        await this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  withdrawBRTColl = async (i, withdrawAmount) => {
    let collaVault
    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (this.state.walletConnect == true) {
        collaVault = new window.web3Con.eth.Contract(CollateralVault.abi, process.env.REACT_APP_collateral_vault_address)
      } else if (this.state.wallet == true) {
        collaVault = new window.web3.eth.Contract(CollateralVault.abi, process.env.REACT_APP_collateral_vault_address)
      }
      collaVault.methods.exit(i, this.state.account, withdrawAmount).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  collateralApprove = async (i) => {
    let collTokenAddress
    let collToken

    let collateralVault = new window.web3.eth.Contract(CollateralVault.abi, process.env.REACT_APP_collateral_vault_address)
    collTokenAddress = (await collateralVault.methods.poolInfo(i).call()).collateralToken

    if (this.state.walletConnect == true) {
      collToken = new window.web3Con.eth.Contract(LpToken.abi, collTokenAddress)
    } else if (this.state.wallet == true) {
      collToken = new window.web3.eth.Contract(LpToken.abi, collTokenAddress)
    }
    await collToken.methods.approve(this.state.collateralVault._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  systemCoinCollApprove = async () => {
    let systemCoin

    if (this.state.walletConnect == true) {
      systemCoin = new window.web3Con.eth.Contract(LpToken.abi, process.env.REACT_APP_usb_address)
    } else if (this.state.wallet == true) {
      systemCoin = new window.web3.eth.Contract(LpToken.abi, process.env.REACT_APP_usb_address)
    }
    await systemCoin.methods.approve(this.state.collateralVault._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  systemCoinSyntheticApprove = async () => {
    let systemCoin
    if (this.state.walletConnect == true) {
      systemCoin = new window.web3Con.eth.Contract(LpToken.abi, process.env.REACT_APP_usb_address)
    } else if (this.state.wallet == true) {
      systemCoin = new window.web3.eth.Contract(LpToken.abi, process.env.REACT_APP_usb_address)
    }
    await systemCoin.methods.approve(this.state.syntheticPool._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  synTokenSyntheticApprove = async (i) => {
    let synTokenAddress
    let synToken

    let syntheticPool = new window.web3.eth.Contract(SyntheticPool.abi, process.env.REACT_APP_synthetic_pool_address)
    synTokenAddress = (await syntheticPool.methods.poolInfo(i).call()).syntheticToken

    if (this.state.walletConnect == true) {
      synToken = new window.web3Con.eth.Contract(LpToken.abi, synTokenAddress)
    } else if (this.state.wallet == true) {
      synToken = new window.web3.eth.Contract(LpToken.abi, synTokenAddress)
    }
    await synToken.methods.approve(this.state.syntheticPool._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  synOpenMarketOrder = async (i, orderType, synTokenAmount) => {
    console.log(i, orderType, synTokenAmount)
    let syntheticPool
    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (this.state.walletConnect == true) {
        syntheticPool = new window.web3Con.eth.Contract(SyntheticPool.abi, process.env.REACT_APP_synthetic_pool_address)
      } else if (this.state.wallet == true) {
        syntheticPool = new window.web3.eth.Contract(SyntheticPool.abi, process.env.REACT_APP_synthetic_pool_address)
      }
      if (orderType == 0) {
        syntheticPool.methods.openMarketOrder(i, "0", synTokenAmount).send({ from: this.state.account }).then(async (result) => {
          await this.loadBlockchainData()
          this.loadBlockchainUserData()
        }).catch((err) => {
          if (err.code === 4001) {
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
      } else if (orderType == 1) {
        syntheticPool.methods.openMarketOrder(i, "1", synTokenAmount).send({ from: this.state.account }).then(async (result) => {
          await this.loadBlockchainData()
          this.loadBlockchainUserData()
        }).catch((err) => {
          if (err.code === 4001) {
            alert("Something went wrong...Code: 4001 User rejected the request.")
          } else {
            console.error(err);
          }
        });
      }
    }
  }

  synOpenLimitOrder = async (i, orderType, synTokenAmount, synTokenLimitPrice) => {
    let syntheticPool
    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (this.state.walletConnect == true) {
        syntheticPool = new window.web3Con.eth.Contract(SyntheticPool.abi, process.env.REACT_APP_synthetic_pool_address)
      } else if (this.state.wallet == true) {
        syntheticPool = new window.web3.eth.Contract(SyntheticPool.abi, process.env.REACT_APP_synthetic_pool_address)
      }
      syntheticPool.methods.openLimitOrder(i, orderType, synTokenAmount, synTokenLimitPrice).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  synCancelOrder = async (i, orderId) => {
    let syntheticPool
    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (this.state.walletConnect == true) {
        syntheticPool = new window.web3Con.eth.Contract(SyntheticPool.abi, process.env.REACT_APP_synthetic_pool_address)
      } else if (this.state.wallet == true) {
        syntheticPool = new window.web3.eth.Contract(SyntheticPool.abi, process.env.REACT_APP_synthetic_pool_address)
      }
      syntheticPool.methods.cancelOrder(i, orderId).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  synCancelAllOrder = async (i) => {
    let syntheticPool
    if (this.state.walletConnect == false && this.state.wallet == false) {
      alert("Wallet is not connected")
    } else {
      if (this.state.walletConnect == true) {
        syntheticPool = new window.web3Con.eth.Contract(SyntheticPool.abi, process.env.REACT_APP_synthetic_pool_address)
      } else if (this.state.wallet == true) {
        syntheticPool = new window.web3.eth.Contract(SyntheticPool.abi, process.env.REACT_APP_synthetic_pool_address)
      }
      syntheticPool.methods.cancelAllOrders(i).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  stableCoinSwapApprove = async (i) => {
    let stableCoinAddress
    let stableCoin

    stableCoinAddress = this.state.usbLiqPool[i].usdTokenAddresses[this.state.farmNetworkId]
    console.log(stableCoinAddress)
    if (this.state.walletConnect == true) {
      stableCoin = new window.web3Con.eth.Contract(LpToken.abi, stableCoinAddress)
    } else if (this.state.wallet == true) {
      stableCoin = new window.web3.eth.Contract(LpToken.abi, stableCoinAddress)
    }
    await stableCoin.methods.approve(this.state.usbLiquidityPool._address, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  stableCoinSwap = async (inputID, input2tID, inputAmount) => {
    let usbPool

    if (this.state.walletConnect == true) {
      usbPool = new window.web3Con.eth.Contract(USBLiquidityPool.abi, process.env.REACT_APP_usb_liquidity_pool_address)
    } else if (this.state.wallet == true) {
      usbPool = new window.web3.eth.Contract(USBLiquidityPool.abi, process.env.REACT_APP_usb_liquidity_pool_address)
    }
    if (inputID == 4) {
      let sellUSBAmount = window.web3Eth.utils.toWei(inputAmount, this.state.usbLiqPool[inputID].decimalUnit)
      await usbPool.methods.sellUSB(input2tID, sellUSBAmount).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    } else {
      let buyUSBAmount = window.web3Eth.utils.toWei(inputAmount, this.state.usbLiqPool[inputID].decimalUnit)
      await usbPool.methods.buyUSB(inputID, buyUSBAmount).send({ from: this.state.account }).then(async (result) => {
        this.loadBlockchainUserData()
      }).catch((err) => {
        if (err.code === 4001) {
          alert("Something went wrong...Code: 4001 User rejected the request.")
        } else {
          console.error(err);
        }
      });
    }
  }

  claimAllSwapTokens = async () => {
    let usbSwapLocker

    if (this.state.walletConnect == true) {
      usbSwapLocker = new window.web3Con.eth.Contract(USBSwapLocker.abi, process.env.REACT_APP_usb_swap_locker_address)
    } else if (this.state.wallet == true) {
      usbSwapLocker = new window.web3.eth.Contract(USBSwapLocker.abi, process.env.REACT_APP_usb_swap_locker_address)
    }

    let arrayToken = []
    for (let i = 0; i < this.state.stableCoinPoolLength; i++) {
      if (this.state.unlockedSwapTokens[i] > 0) {
        arrayToken.push(this.state.usbLiqPoolAddresses[i])
      }
    }

    await usbSwapLocker.methods.vestCompletedSchedulesForMultipleTokens(arrayToken).send({ from: this.state.account }).then(async (result) => {
      this.loadBlockchainUserData()
    }).catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Something went wrong...Code: 4001 User rejected the request.")
      } else {
        console.error(err);
      }
    });
  }

  setConsentTrigger = async (state) => {
    await this.setState({ consent: state })
  }

  // state: 0: HOT, 1: TVL, 2: APR
  sortFarm = async (state) => {
    let sortItemV2_3 = [...this.state.poolSegmentInfoV2_3]
    let sortItemUpgradeable = [...this.state.poolSegmentInfoUpgradeable]

    if (state == 0) {
      sortItemUpgradeable.sort(({ defaultSequence: a }, { defaultSequence: b }) => {
        let c = parseInt(a, 10) - parseInt(b, 10)
        return c;
      });
      sortItemV2_3.sort(({ defaultSequence: a }, { defaultSequence: b }) => {
        let c = parseInt(a, 10) - parseInt(b, 10)
        return c;
      });
    } else if (state == 1) {
      sortItemUpgradeable.sort(({ tvl: a }, { tvl: b }) => {
        let c = parseInt(b, 10) - parseInt(a, 10)
        return c;
      });
      sortItemV2_3.sort(({ tvl: a }, { tvl: b }) => {
        let c = parseInt(b, 10) - parseInt(a, 10)
        return c;
      });
    } else if (state == 2) {
      sortItemUpgradeable.sort(({ totalAPR: a }, { totalAPR: b }) => {
        let c = parseInt(b, 10) - parseInt(a, 10)
        return c;
      });
      sortItemV2_3.sort(({ totalAPR: a }, { totalAPR: b }) => {
        let c = parseInt(b, 10) - parseInt(a, 10)
        return c;
      });
    }

    this.setState({ poolSegmentInfoUpgradeable: sortItemUpgradeable })
    this.setState({ poolSegmentInfoV2_3: sortItemV2_3 })
  }


  setWalletTrigger = async (state) => {
    if (state == false) {
      await this.setState({ wallet: state })
      this.setState({ accountLoading: state })
    } else {
      const accounts = await window.web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const first4Account = this.state.account.substring(0, 4)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      this.setState({ wallet: state })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: false,
      blockchainLoading: false,
      wallet: false,
      walletConnect: false,
      accountLoading: false,

    }
  }

  render() {
    let stakeContent
    let stakeLiquidityContent
    let navMenuContent


    navMenuContent = <NavbMenu
      account={this.state.account}
      first4Account={this.state.first4Account}
      last4Account={this.state.last4Account}
      wallet={this.state.wallet}
      networkName={this.state.networkName}
      walletConnect={this.state.walletConnect}
      BAVAPrice={this.state.BAVAPrice}
      setWalletTrigger={this.setWalletTrigger}
      connectMetamask={this.connectMetamask}
      mobileWalletConnect={this.mobileWalletConnect}
      connectCoin98={this.connectCoin98}
      WalletDisconnect={this.WalletDisconnect}
      addUSBTokenWallet={this.addUSBTokenWallet}
      addBAVATokenWallet={this.addBAVATokenWallet}
      sortFarm={this.sortFarm}
    />
    stakeContent = <Stake
      poolSize={this.state.poolSize}
      poolRewardRate={this.state.poolRewardRate}
      poolTimeRemainingInCurrentEpoch={this.state.poolTimeRemainingInCurrentEpoch}
      treasuryRewardRemaining={this.state.treasuryRewardRemaining}
      poolBlackoutWindow={this.state.poolBlackoutWindow}
      poolEpochInterval={this.state.poolEpochInterval}
      userUSDTBalance={this.state.userUSDTBalance}
      userStakedBalance={this.state.userStakedBalance}
      userUSDTStakingAllowance={this.state.userUSDTStakingAllowance}
      userEarnedRewardAmount={this.state.userEarnedRewardAmount}
      userWithdrawableAmount={this.state.userWithdrawableAmount}
      userInactiveBalanceNextEpoch={this.state.userInactiveBalanceNextEpoch}
      accountLoading={this.state.accountLoading}
      blockchainLoading={this.state.blockchainLoading}
      connectMetamask={this.connectMetamask}
      mobileWalletConnect={this.mobileWalletConnect}
      connectCoin98={this.connectCoin98}
      approveStake={this.approveStake}
      stake={this.stake}
      unstake={this.requestWithdraw}
      withdraw={this.withdraw}
      getReward={this.getReward}
    />
    stakeLiquidityContent = <StakeLiquidity
      poolSize={this.state.poolSize}
      poolRewardRate={this.state.poolRewardRate}
      poolTimeRemainingInCurrentEpoch={this.state.poolTimeRemainingInCurrentEpoch}
      treasuryRewardRemaining={this.state.treasuryRewardRemaining}
      poolBlackoutWindow={this.state.poolBlackoutWindow}
      poolEpochInterval={this.state.poolEpochInterval}
      userUSDTBalance={this.state.userUSDTBalance}
      userStakedBalance={this.state.userStakedBalance}
      userUSDTStakingAllowance={this.state.userUSDTStakingAllowance}
      userEarnedRewardAmount={this.state.userEarnedRewardAmount}
      userWithdrawableAmount={this.state.userWithdrawableAmount}
      userInactiveBalanceNextEpoch={this.state.userInactiveBalanceNextEpoch}
      accountLoading={this.state.accountLoading}
      blockchainLoading={this.state.blockchainLoading}
      connectMetamask={this.connectMetamask}
      mobileWalletConnect={this.mobileWalletConnect}
      connectCoin98={this.connectCoin98}
      approveStake={this.approveStake}
      stake={this.stake}
      unstake={this.requestWithdraw}
      withdraw={this.withdraw}
      getReward={this.getReward}
    />

    return (
      <Router>
        <ScrollToTop>
          <div>
            <Switch>
              <Route path="/" exact > {navMenuContent} </Route>
              <Route path="/staking/" exact > {navMenuContent} </Route>
              <Route path="/staking/liquidity/" exact > {navMenuContent} </Route>
            </Switch>
            <div className="container-fluid" style={{ position: "relative", paddingTop: "100px" }}>
              <main role="main" className="content ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
                <Switch>
                  <Route path="/" exact > {stakeContent} </Route>
                  <Route path="/staking/" exact > {stakeContent} </Route>
                  <Route path="/staking/liquidity" exact > {stakeLiquidityContent} </Route>
                </Switch>
              </main>
            </div>
            {/* <div className="footerBackground"><div className="container-fluid" style={{ marginTop: "150px", position: "relative", maxWidth: '1000px' }}>
              <Footer />
            </div></div> */}
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;