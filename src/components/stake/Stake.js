import React from 'react'
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import MediaQuery from 'react-responsive';
import Buttons from 'react-bootstrap/Button'
import 'reactjs-popup/dist/index.css';
import '../App.css';
import ImgNextGen from '../ImgNextGen';
import PopupDeposit from './PopupDeposit';

import nftBackground from '../images/dots-bg.png';
import usdt from '../images/usdt.svg';
import fx from '../images/fx.svg';
import marginxLogo from '../images/marginx-title.svg';
import CountdownTimer from '../CountdownTimer';
import bigInt from 'big-integer';


function StakeMenu(props) {

    const convertTimeStamp = (event) => {
        var timestamp = event;
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var date = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
        return date
    }

    const NOW_IN_MS = new Date().getTime();
    const contentStyle = { background: '#1e1f23', border: "0px solid #596169", padding: '20px', width: "380px", borderRadius: "15px", minWidth: "320px" };

    return (
        <div id="content" style={{ margin: "0", color: '#ff9a04', maxWidth: "1000px" }}>
            <MediaQuery minWidth={981}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', width: '100%' }}>
                    <div className="card cardbody badgebody" style={{ marginBottom: '30px', marginRight: '20px', color: 'white', width: '485px', height: '220px', borderRadius: "25px" }}>
                        <div className="card-body" style={{ marginLeft: "10px", padding: '10px' }}>
                            <div className="textWhite rowC" style={{ fontSize: '20px', color: 'white' }}>
                                <ImgNextGen
                                    srcWebp={marginxLogo}
                                    style={{ marginLeft: '0px', marginRight: '18px' }} width="110" alt=""
                                />
                                <div>
                                    <div className='bzThwT mb-2 mt-3'><b>USDT (ERC20)</b></div>
                                    <div className='kXLvz mb-3'><b>MarginX Market Maker Liquidity Pool</b></div>
                                    <ButtonGroup>
                                        <div>
                                            <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
                                                window.open(`https://forum.starscan.io/t/proposal-of-maker-liquidity-pool-usdt-erc-20-beta/4955`, '_blank')
                                            }}>&#8599; Learn more</Buttons>
                                        </div>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mr-auto card cardbody" style={{ marginLeft: '0px', color: 'white', height: '220px', width: '485px', borderRadius: "25px", backgroundImage: `url(${nftBackground})`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="card-body" style={{ padding: '15px' }}>
                            <div className="ml-auto mr-auto card cardbodyBlack float-right" style={{ marginBottom: '12px', color: 'white', maxWidth: '400px' }}>
                                <div className="card-body" style={{ padding: '15px' }}>
                                    <div className="ePxacs">
                                        <div className="ctBHOr">+</div>Rewards</div>
                                    <div className="textWhite rowC mb-2" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                            {props.accountLoading ?
                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                    <div>
                                                        {props.accountLoading ?
                                                            <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                <div>{parseFloat(window.web3Eth.utils.fromWei(props.userEarnedRewardAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 2 })} </div>
                                                            </div>
                                                            : <span>-</span>}
                                                    </div>
                                                </div>
                                                : <span>-</span>}
                                        </td>
                                        <div style={{ textAlign: "end" }}>
                                            <ImgNextGen
                                                srcWebp={fx}
                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="28px" alt=""
                                            />
                                        </div>
                                    </div>
                                    {
                                        props.userEarnedRewardAmount == 0 ?
                                            <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Claim</Buttons>
                                            : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
                                                props.claimReward()
                                            }}>Claim</Buttons>
                                    }

                                </div>
                            </div>

                            <div className="textWhite" style={{ fontSize: '20px', color: 'white' }}>
                                <big><b>Portfolio</b></big></div>
                            <div style={{ color: 'grey' }}>Track balances</div>

                            <div>
                                <table>
                                    <thead className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.accountLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.userUSDTBalance, 'mwei')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={usdt}
                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    : <span>-</span>}
                                            </td>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.accountLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.userStakedBalance, 'mwei')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={usdt}
                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    : <span>-</span>}
                                            </td>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.accountLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.userWithdrawableAmount, 'mwei')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={usdt}
                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    : <span>-</span>}
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody className="" style={{ color: 'white' }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">Wallet</td>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">Deposited</td>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">Available</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery maxWidth={980}>
                <div className="card cardbody badgebody" style={{ marginBottom: '20px', color: 'white', height: '100%', minWidth: '300px', maxWidth: '485px', borderRadius: "25px" }}>
                    <div className="card-body" style={{ marginLeft: "10px", padding: '10px' }}>
                        <MediaQuery minWidth={451}>
                            <div className="textWhite rowC" style={{ fontSize: '20px', color: 'white' }}>
                                <ImgNextGen
                                    srcWebp={marginxLogo}
                                    style={{ marginLeft: '0px', marginRight: '18px' }} width="105" alt=""
                                />
                                <div>
                                    <div className='bzThwT mb-2 mt-3'><b>USDT (ERC20)</b></div>
                                    <div className='kXLvz mb-3' style={{ fontSize: '22px', lineHeight: '2rem' }} ><b>MarginX Market Maker Liquidity Pool</b></div>
                                    <ButtonGroup>
                                        <div>
                                            <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '100%', marginBottom: '10px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
                                                window.open(`https://forum.starscan.io/c/marginx/51`, '_blank')
                                            }}>&#8599; Learn more</Buttons>
                                        </div>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </MediaQuery>
                        <MediaQuery maxWidth={450}>
                            <div className='bzThwT mb-2 mt-3'><b>USDT (ERC20)</b></div>
                            <div className='kXLvz mb-3' style={{ fontSize: '22px', lineHeight: '2rem' }}><b>MarginX Market Maker Liquidity Pool</b></div>
                            <ButtonGroup>
                                <div>
                                    <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '100%', marginBottom: '10px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
                                        window.open(`https://forum.starscan.io/c/marginx/51`, '_blank')
                                    }}>&#8599; Learn more</Buttons>
                                </div>
                            </ButtonGroup>
                        </MediaQuery>
                    </div>
                </div>


                <div className="mr-auto card cardbody" style={{ marginBottom: '20px', marginLeft: '0px', color: 'white', height: '220px', minWidth: '300px', maxWidth: '485px', borderRadius: "25px", backgroundImage: `url(${nftBackground})`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <div className="card-body" style={{ padding: '15px' }}>
                        <div className="ml-auto mr-auto card cardbodyBlack float-right" style={{ marginBottom: '12px', color: 'white', maxWidth: '400px' }}>
                            <div className="card-body" style={{ padding: '15px' }}>
                                <div className="ePxacs">
                                    <div className="ctBHOr">+</div>Rewards</div>
                                <div className="textWhite rowC mb-2" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                    <td style={{ textAlign: "start" }} scope="col" width="120">
                                        {props.accountLoading ?
                                            <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                <div>
                                                    {props.accountLoading ?
                                                        <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                            <div>{parseFloat(window.web3Eth.utils.fromWei(props.userEarnedRewardAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 2 })} </div>
                                                        </div>
                                                        : <span>-</span>}
                                                </div>
                                            </div>
                                            : <span>-</span>}
                                    </td>
                                    <div>
                                        <ImgNextGen
                                            srcWebp={fx}
                                            style={{ marginLeft: '6px', marginRight: '0px' }} width="28px" alt=""
                                        />
                                    </div>
                                </div>
                                {bigInt(props.userEarnedRewardAmount).value > 0 ?
                                    <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
                                        props.claimReward()
                                    }}>Claim</Buttons>
                                    : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Claim</Buttons>
                                }
                            </div>
                        </div>

                        <div className="textWhite" style={{ fontSize: '20px', color: 'white' }}>
                            <big><b>Portfolio</b></big></div>
                        <div style={{ color: 'grey' }}>Track balances</div>

                        <div>
                            <table>
                                <thead className="textBlackSmall" style={{ color: 'white' }}>
                                    <tr>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                            {props.accountLoading ?
                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                    <div>{parseFloat(window.web3Eth.utils.fromWei(props.userUSDTBalance, 'mwei')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>
                                                    <div className="JYkOF">
                                                        <ImgNextGen
                                                            srcWebp={usdt}
                                                            style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                        />
                                                    </div>
                                                </div>
                                                : <span>-</span>}
                                        </td>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                            {props.accountLoading ?
                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                    <div>{parseFloat(window.web3Eth.utils.fromWei(props.userStakedBalance, 'mwei')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>
                                                    <div className="JYkOF">
                                                        <ImgNextGen
                                                            srcWebp={usdt}
                                                            style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                        />
                                                    </div>
                                                </div>
                                                : <span>-</span>}
                                        </td>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                            {props.accountLoading ?
                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                    <div>{parseFloat(window.web3Eth.utils.fromWei(props.userWithdrawableAmount, 'mwei')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>
                                                    <div className="JYkOF">
                                                        <ImgNextGen
                                                            srcWebp={usdt}
                                                            style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                        />
                                                    </div>
                                                </div>
                                                : <span>-</span>}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody className="" style={{ color: 'white' }}>
                                    <tr>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">Wallet</td>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">Deposited</td>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">Available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MediaQuery>



            <div className="mr-auto" style={{ marginTop: '10px', color: 'white' }}>
                <div className="card-body">
                    <div className="textWhite mb-1" style={{ fontSize: '1.5rem', color: 'white' }}><b>Maker LP Incentives</b></div>
                    <div style={{ color: 'grey' }}>Earn rewards for verified market makers to enhance the order book depth on MarginX.</div>
                </div>
            </div>

            <div className="lkBtSA" style={{ borderRadius: '20px' }}>
                <Link to="/liquidity" className='exLink0'>
                    <div className="card cardbody cell3" style={{ height: '100%', color: 'white', minWidth: '300px', maxWidth: '400px', }}>
                        <div className="card-body">
                            <div style={{ marginBottom: "80px" }}>
                                <div className="float-left textWhite" style={{ fontSize: '1.25rem', color: 'white' }}>
                                    Liquidity Pool</div>
                                <div className="float-right" style={{ marginLeft: "10px" }}>
                                    <ImgNextGen
                                        srcWebp={usdt}
                                        width="32px" height="32px" alt=""
                                    />
                                </div>
                            </div>
                            <div>
                                <table>
                                    <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.blockchainLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.poolSize, 'mwei')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={usdt}
                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    : <span className="loader"></span>}
                                            </td>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.blockchainLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.poolRewardRate, 'Ether') * 86400).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={fx}
                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="28px" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    : <span className="loader"></span>}
                                            </td>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.accountLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.userStakedBalance, 'mwei')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={usdt}
                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    : <span>-</span>}</td>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">Pool Size</td>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">Yield / day</td>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">Your Deposit</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Link>

                {(props.wallet || props.walletConnect) ?
                    <div className='iqmhrB'>
                        <div className="OYMUv">
                            <div className='eWMWa-D'>
                                <span>{parseFloat(window.web3Eth.utils.fromWei(props.userEarnedRewardAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 2 })}</span>
                                <div><ImgNextGen
                                    srcWebp={fx}
                                    style={{ marginLeft: '6px', marginRight: '15px' }} width="28px" alt=""
                                /></div>
                            </div>
                            <div className='iddTJh'>
                                Your rewards
                            </div>
                        </div>
                        <div className="rowC">
                            {props.userEarnedRewardAmount == 0 ?
                                <Buttons className="buttonGradientBorder cell3 center" style={{ height: '38px', width: '80px', marginRight: '10px', cursor: 'not-allowed', opacity: '0.5', }} >Claim</Buttons>
                                : <Buttons className="buttonGradientBorder cell3 center" style={{ height: '38px', width: '80px', marginRight: '10px' }} size="lg" onClick={() => {
                                    props.claimReward()
                                }} ><div className='linearGradientText center'>Claim</div></Buttons>
                            }
                            {props.userUSDTBalance > 0 ?
                                <PopupDeposit
                                    userUSDTBalance={props.userUSDTBalance}
                                    userStakedBalance={props.userStakedBalance}
                                    userUSDTStakingAllowance={props.userUSDTStakingAllowance}
                                    stake={props.stake}
                                    approve={props.approve}
                                />
                                : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '40px', width: '80px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Deposit</Buttons>
                            }
                        </div>
                    </div> : null
                }

            </div >

            <MediaQuery minWidth={981}>
                <div className="mr-auto" style={{ marginTop: '40px', olor: 'white', maxWidth: '400px' }}>
                    <div className="card-body">
                        <div className="textWhite mb-1" style={{ fontSize: '1.5rem', color: 'white' }}><b>Epoch</b></div>
                        <div style={{ color: 'grey' }}>Each Epoch last 28 days.</div>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery maxWidth={980}>
                <div className="mr-auto" style={{ marginTop: '30px', olor: 'white', maxWidth: '400px' }}>
                    <div className="card-body">
                        <div className="textWhite mb-1" style={{ fontSize: '1.5rem', color: 'white' }}><b>Epoch</b></div>
                        <div style={{ color: 'grey' }}>Each Epoch last 28 days.</div>
                    </div>
                </div>
            </MediaQuery>



            <MediaQuery minWidth={981}>
                <div className="cCeSgm">
                    <div className="card cardbody" style={{ marginBottom: '12px', height: '180px', color: 'white' }}>
                        <div className="card-body">
                            <div style={{ marginBottom: "80px" }}>
                                <div className="float-left textBlackLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                    Countdown</div>
                            </div>
                            <div>
                                <table>
                                    <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.blockchainLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <CountdownTimer targetDate={NOW_IN_MS + parseInt(props.poolTimeRemainingInCurrentEpoch * 1000)} />
                                                    </div>
                                                    : <span className='loader' ></span>}</td>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">until the next epoch on {props.blockchainLoading ? <span>{convertTimeStamp(props.poolEndOfCurrentEpoch)}</span> : <span>-</span>}.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mr-auto card cardbody" style={{ marginBottom: '12px', height: '180px', color: 'white' }}>
                            <div className="card-body">
                                <div style={{ marginBottom: "80px" }}>
                                    <div className="float-left textBlackLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                        Reward Pool</div>
                                </div>
                                <div className="center">
                                    <table>
                                        <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">
                                                    {props.blockchainLoading ?
                                                        <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                            <div>{parseFloat(window.web3Eth.utils.fromWei(props.poolRewardRate, 'Ether') * props.poolEpochInterval).toLocaleString('en-US', { maximumFractionDigits: 3 })} </div>
                                                            <div className="JYkOF">
                                                                <ImgNextGen
                                                                    srcWebp={fx}
                                                                    style={{ marginLeft: '6px', marginRight: '0px' }} width="28px" alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                        : <span className='loader'></span>}
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">will be distributed this epoch.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery maxWidth={980}>
                <div className="card cardbody" style={{ marginBottom: '12px', height: '180px', minWidth: '300px', maxWidth: '400px', color: 'white' }}>
                    <div className="card-body">
                        <div style={{ marginBottom: "80px" }}>
                            <div className="float-left textBlackLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                Countdown</div>
                        </div>
                        <div>
                            <table>
                                <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                    <tr>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                            {props.blockchainLoading ?
                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                    <CountdownTimer targetDate={NOW_IN_MS + parseInt(props.poolTimeRemainingInCurrentEpoch * 1000)} />
                                                </div>
                                                : <span className='loader' ></span>}</td>
                                    </tr>
                                </thead>
                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                    <tr>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">until the next epoch on {props.blockchainLoading ? <span>{convertTimeStamp(props.poolEndOfCurrentEpoch)}</span> : <span>-</span>}.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="mr-auto card cardbody" style={{ marginBottom: '12px', height: '180px', minWidth: '300px', maxWidth: '400px', color: 'white' }}>
                    <div className="card-body">
                        <div style={{ marginBottom: "80px" }}>
                            <div className="float-left textBlackLarge">
                                Reward Pool</div>
                        </div>
                        <div className="center">
                            <table>
                                <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                    <tr>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                            {props.blockchainLoading ?
                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                    <div>{parseFloat(window.web3Eth.utils.fromWei(props.poolRewardRate, 'Ether') * props.poolEpochInterval).toLocaleString('en-US', { maximumFractionDigits: 3 })} </div>
                                                    <div className="JYkOF">
                                                        <ImgNextGen
                                                            srcWebp={fx}
                                                            style={{ marginLeft: '6px', marginRight: '0px' }} width="28px" alt=""
                                                        />
                                                    </div>
                                                </div>
                                                : <span className='loader'></span>}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                    <tr>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">will be distributed this epoch.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MediaQuery>
            <div style={{ marginTop: '15px', color: 'grey', fontSize: '12px' }}>** ONLY private blockchain wallets can participate. Please DO NOT send funds from an exchange.</div>
        </div >
    );
}


export default StakeMenu;
