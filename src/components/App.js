import React, { Component } from 'react'
import Web3 from 'web3'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WalletConnectProvider from "@walletconnect/web3-provider";

import SystemCoin from '../abis/SystemCoin.json'
// import LiquidityStakingV1 from '../abis/LiquidityStakingV1.json'
import LiquidityStakingV1 from '../abis/LiquidityStakingV2.json'
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
    await this.loadBlockchainData()
    // while (this.state.wallet == false || this.state.walletConnect == false) {
    while (this.state.wallet == false || this.state.wallet == true) {
      if ((this.state.wallet || this.state.walletConnect) == true) {
        await this.delay(20000);
        await this.loadBlockchainData()
        await this.loadBlockchainUserData()
      } else {
        await this.delay(20000);
        await this.loadBlockchainData()
      }
    }
  }


  // async loadGecko() {
  //   let responseGecko = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=joe%2Cwrapped-avax%2Cpangolin%2Cweth%2Cbaklava%2Cusd-coin%2Ctether%2Cbenqi%2Cterra-luna&vs_currencies=usd`);
  //   const geckoPrice = await responseGecko.json();
  //   return geckoPrice
  // }


  async loadBlockchainData() {
    const web3Eth = window.web3Eth
    const networkId = process.env.REACT_APP_networkid
    this.setState({ networkId })
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
    const fxToken = new web3Eth.eth.Contract(SystemCoin.abi, process.env.REACT_APP_fxtoken_address)
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
    let response4 = this.loadTimeRemainingNextBlackout()
    let response5 = this.loadPoolEpochParam()
    let response6 = this.loadPoolStartOfCurrentEpoch()
    let response7 = this.loadBlackoutWindow()

    let poolSize = await response0
    let poolRewardRate = await response1
    let poolTimeRemainingInCurrentEpoch = await response2
    let treasuryRewardRemaining = await response3
    let timeRemainingNextBlackout = await response4
    let poolEpochInterval = await response5
    let poolStartOfCurrentEpoch = await response6
    let poolBlackoutWindow = await response7

    let poolEndOfCurrentEpoch = parseInt(poolStartOfCurrentEpoch) + parseInt(poolEpochInterval)

    this.setState({ poolSize })
    this.setState({ poolRewardRate })
    this.setState({ poolTimeRemainingInCurrentEpoch })
    this.setState({ treasuryRewardRemaining })
    this.setState({ timeRemainingNextBlackout })
    this.setState({ poolEpochInterval })
    this.setState({ poolEndOfCurrentEpoch })
    this.setState({ poolBlackoutWindow })

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

  async loadTimeRemainingNextBlackout() {
    let timeRemainingNextBlackout = 0
    let blackoutWindow = await this.state.liquidityStakingV1.methods.getBlackoutWindow().call()
    let poolTimeRemainingInCurrentEpoch = await this.state.liquidityStakingV1.methods.getTimeRemainingInCurrentEpoch().call()
    if (parseInt(poolTimeRemainingInCurrentEpoch) >= parseInt(blackoutWindow)) {
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

  async loadPoolStartOfCurrentEpoch() {
    let currentEpochNum = await this.state.liquidityStakingV1.methods.getCurrentEpoch().call()
    let startOfCurrentRpoch = await this.state.liquidityStakingV1.methods.getStartOfEpoch(currentEpochNum).call()
    return startOfCurrentRpoch
  }

  async loadBlackoutWindow() {
    let blackoutWindow = await this.state.liquidityStakingV1.methods.getBlackoutWindow().call()
    return blackoutWindow
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
    let userResponse6 = this.loadUserActiveBalanceNextEpoch()

    let userUSDTBalance = await userResponse0
    let userStakedBalance = await userResponse1
    let userUSDTStakingAllowance = await userResponse2
    let userEarnedRewardAmount = await userResponse3
    let userWithdrawableAmount = await userResponse4
    let userInactiveBalanceNextEpoch = await userResponse5
    let userActiveBalanceNextEpoch = await userResponse6

    this.setState({ userUSDTBalance })
    this.setState({ userStakedBalance })
    this.setState({ userUSDTStakingAllowance })
    this.setState({ userEarnedRewardAmount })
    this.setState({ userWithdrawableAmount })
    this.setState({ userInactiveBalanceNextEpoch })
    this.setState({ userActiveBalanceNextEpoch })

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
    let userReward = await this.state.liquidityStakingV1.methods.getStakerReward(this.state.account).call()
    return userReward
  }

  async loadUserWithdrawableAmount() {
    let withdrawableAmount = await this.state.liquidityStakingV1.methods.getStakeAvailableToWithdraw(this.state.account).call()
    return withdrawableAmount
  }

  async loadUserInactiveBalanceNextEpoch() {
    let inactiveBalanceNextEpoch = await this.state.liquidityStakingV1.methods.getInactiveBalanceNextEpoch(this.state.account).call()
    return inactiveBalanceNextEpoch
  }

  async loadUserActiveBalanceNextEpoch() {
    let activeBalanceNextEpoch = await this.state.liquidityStakingV1.methods.getActiveBalanceNextEpoch(this.state.account).call()
    return activeBalanceNextEpoch
  }

  // ***********************************************************************************************************************************************
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    window.web3Eth = new Web3(`https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_alchemy_goerli}`);
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
    // window.web3Eth = new Web3(`https://rpc.ankr.com/eth_goerli`);
    window.web3Eth = new Web3(`https://rpc.ankr.com/eth`);

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
    const first4Account = this.state.account.substring(0, 5)
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
      const first4Account = this.state.account.substring(0, 5)
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

  addFXTokenWallet = async () => {
    // We recommend reloading the page, unless you must do otherwise
    window.ethereum
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: process.env.REACT_APP_fxtoken_address,
            symbol: 'FX',
            decimals: 18,
            image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3884.png',
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

  setWalletTrigger = async (state) => {
    if (state == false) {
      await this.setState({ wallet: state })
      this.setState({ accountLoading: state })
    } else {
      const accounts = await window.web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      const first4Account = this.state.account.substring(0, 5)
      const last4Account = this.state.account.slice(-4)
      this.setState({ first4Account: first4Account })
      this.setState({ last4Account: last4Account })
      this.setState({ wallet: state })
    }
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




  /* ============================== Smart Contract function ==============================
  */
  stake = async (amount) => {
    let liquidityStaking
    let intWeb3

    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    liquidityStaking = new intWeb3.eth.Contract(LiquidityStakingV1.abi, process.env.REACT_APP_liquiditystakingV1_address)
    await liquidityStaking.methods.stake(amount).send({ from: this.state.account }).then(async (result) => {
      await this.loadBlockchainData()
      await this.loadBlockchainUserData()
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

  approve = async () => {
    let usdtToken
    let intWeb3

    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    let spenderAddress = process.env.REACT_APP_liquiditystakingV1_address
    usdtToken = new intWeb3.eth.Contract(SystemCoin.abi, process.env.REACT_APP_usdt_address)
    await usdtToken.methods.approve(spenderAddress, "115792089237316195423570985008687907853269984665640564039457584007913129639935").send({ from: this.state.account }).then(async (result) => {
      await this.loadBlockchainUserData()
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

  withdraw = async (amount) => {
    let liquidityStaking
    let intWeb3

    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    liquidityStaking = new intWeb3.eth.Contract(LiquidityStakingV1.abi, process.env.REACT_APP_liquiditystakingV1_address)
    await liquidityStaking.methods.withdrawStake(this.state.account, amount).send({ from: this.state.account }).then(async (result) => {
      await this.loadBlockchainData()
      await this.loadBlockchainUserData()
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

  requestWithdraw = async (amount) => {
    let liquidityStaking
    let intWeb3

    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    liquidityStaking = new intWeb3.eth.Contract(LiquidityStakingV1.abi, process.env.REACT_APP_liquiditystakingV1_address)
    await liquidityStaking.methods.requestWithdrawal(amount).send({ from: this.state.account }).then(async (result) => {
      await this.loadBlockchainData()
      await this.loadBlockchainUserData()
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

  claimReward = async () => {
    let liquidityStaking
    let intWeb3

    if (this.state.walletConnect == true) {
      intWeb3 = window.web3Con
    } else if (this.state.wallet == true) {
      intWeb3 = window.web3
    }

    liquidityStaking = new intWeb3.eth.Contract(LiquidityStakingV1.abi, process.env.REACT_APP_liquiditystakingV1_address)
    await liquidityStaking.methods.claimRewards(this.state.account).send({ from: this.state.account }).then(async (result) => {
      await this.loadBlockchainUserData()
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


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: false,
      blockchainLoading: false,
      wallet: false,
      walletConnect: false,
      accountLoading: false,
      userUSDTBalance: "0",
      userStakedBalance: "0",
      userWithdrawableAmount: '0',
      userEarnedRewardAmount: '0',
      poolEndOfCurrentEpoch: '0',
      poolBlackoutWindow: '150'

    }
  }

  render() {
    let stakeContent
    let stakeLiquidityContent
    let navMenuContent
    let footerContent


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
    footerContent = <Footer
    />
    stakeContent = <Stake
      poolSize={this.state.poolSize}
      poolRewardRate={this.state.poolRewardRate}
      poolTimeRemainingInCurrentEpoch={this.state.poolTimeRemainingInCurrentEpoch}
      treasuryRewardRemaining={this.state.treasuryRewardRemaining}
      timeRemainingNextBlackout={this.state.timeRemainingNextBlackout}
      poolEpochInterval={this.state.poolEpochInterval}
      poolEndOfCurrentEpoch={this.state.poolEndOfCurrentEpoch}
      poolBlackoutWindow={this.state.poolBlackoutWindow}

      userUSDTBalance={this.state.userUSDTBalance}
      userStakedBalance={this.state.userStakedBalance}
      userUSDTStakingAllowance={this.state.userUSDTStakingAllowance}
      userEarnedRewardAmount={this.state.userEarnedRewardAmount}
      userWithdrawableAmount={this.state.userWithdrawableAmount}
      userInactiveBalanceNextEpoch={this.state.userInactiveBalanceNextEpoch}

      wallet={this.state.wallet}
      walletConnect={this.state.walletConnect}
      accountLoading={this.state.accountLoading}
      blockchainLoading={this.state.blockchainLoading}
      connectMetamask={this.connectMetamask}
      mobileWalletConnect={this.mobileWalletConnect}
      connectCoin98={this.connectCoin98}
      stake={this.stake}
      approve={this.approve}
      withdraw={this.withdraw}
      requestWithdraw={this.requestWithdraw}
      claimReward={this.claimReward}
    />
    stakeLiquidityContent = <StakeLiquidity
      poolSize={this.state.poolSize}
      poolRewardRate={this.state.poolRewardRate}
      poolTimeRemainingInCurrentEpoch={this.state.poolTimeRemainingInCurrentEpoch}
      treasuryRewardRemaining={this.state.treasuryRewardRemaining}
      timeRemainingNextBlackout={this.state.timeRemainingNextBlackout}
      poolEpochInterval={this.state.poolEpochInterval}
      poolEndOfCurrentEpoch={this.state.poolEndOfCurrentEpoch}
      poolBlackoutWindow={this.state.poolBlackoutWindow}

      userUSDTBalance={this.state.userUSDTBalance}
      userStakedBalance={this.state.userStakedBalance}
      userUSDTStakingAllowance={this.state.userUSDTStakingAllowance}
      userEarnedRewardAmount={this.state.userEarnedRewardAmount}
      userWithdrawableAmount={this.state.userWithdrawableAmount}
      userInactiveBalanceNextEpoch={this.state.userInactiveBalanceNextEpoch}
      userActiveBalanceNextEpoch={this.state.userActiveBalanceNextEpoch}

      accountLoading={this.state.accountLoading}
      blockchainLoading={this.state.blockchainLoading}
      wallet={this.state.wallet}
      walletConnect={this.state.walletConnect}
      connectMetamask={this.connectMetamask}
      mobileWalletConnect={this.mobileWalletConnect}
      connectCoin98={this.connectCoin98}
      stake={this.stake}
      approve={this.approve}
      withdraw={this.withdraw}
      requestWithdraw={this.requestWithdraw}
      claimReward={this.claimReward}
    />

    return (
      <Router>
        <ScrollToTop>
          <div>
            <Switch>
              <Route path="/" exact > {navMenuContent} </Route>
              <Route path="/liquidity/" exact > {navMenuContent} </Route>
            </Switch>
            <div className="container-fluid" style={{ position: "relative", paddingTop: "100px", paddingLeft: '15px', paddingRight: '15px' }}>
              <main role="main" className="content ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
                <Switch>
                  <Route path="/" exact > {stakeContent} </Route>
                  <Route path="/liquidity" exact > {stakeLiquidityContent} </Route>
                </Switch>
              </main>
            </div>
            <div className="container-fluid" style={{ padding: '0px', marginTop: "150px", position: "relative" }}>
              {footerContent}
            </div>
          </div>
        </ScrollToTop>
      </Router>
    );
  }
}

export default App;