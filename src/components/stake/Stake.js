import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import MediaQuery from 'react-responsive';
import bigInt from 'big-integer'
import Buttons from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../App.css';
import ImgNextGen from '../ImgNextGen';
import PopupDeposit from './PopupDeposit';

// import nftBackground from '../images/nft-background.svg';
import nftBackground from '../images/dots-bg.png';
import usdt from '../images/usdt.svg';
import fx from '../images/fx.svg';
import marginxLogo from '../images/marginx-title.svg';
import CountdownTimer from '../CountdownTimer';


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
            <MediaQuery minWidth={901}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', width: '100%' }}>
                    <div className="card cardbody badgebody" style={{ marginBottom: '30px', marginRight: '20px', color: 'white', width: '485px', height: '220px', borderRadius: "25px" }}>
                        <div className="card-body" style={{ marginLeft: "10px", padding: '10px' }}>
                            <div className="textWhite rowC" style={{ fontSize: '20px', color: 'white' }}>
                                <ImgNextGen
                                    srcWebp={marginxLogo}
                                    style={{ marginLeft: '0px', marginRight: '18px' }} width="115" alt=""
                                />
                                <div>
                                    <div className='kXLvz mb-3 mt-3'><b>Welcome to MarginX Staking Program</b></div>
                                    <ButtonGroup>
                                        {/* <div className='mr-3'>
                                        <Link to="/staking/liquidity">
                                            <Buttons className="textWhiteLarge center" style={{ height: '40px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" >Start Earning</Buttons>
                                        </Link>
                                    </div> */}
                                        <div>
                                            <Buttons className="textWhiteLarge cell2 center" style={{ height: '40px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
                                                window.open(`https://starscan.io/fxcore/proposals/`, '_blank')
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
                                    <div class="ePxacs">
                                        <div class="ctBHOr">+</div>Rewards</div>
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
                                    {props.userEarnedRewardAmount == 0 ?
                                        <Buttons className="textWhiteLarge cell2 center" style={{ height: '38px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Claim</Buttons>
                                        : <Buttons className="textWhiteLarge cell2 center" style={{ height: '38px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
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
                                            <td style={{ textAlign: "start" }} scope="col" width="120">Staked</td>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">Withdrawable</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery maxWidth={900}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', width: '100%' }}>
                    <div className="card cardbody badgebody" style={{ marginBottom: '30px', marginRight: '20px', color: 'white', width: '485px', minWidth: '400px', height: '220px', borderRadius: "25px" }}>
                        <div className="card-body" style={{ marginLeft: "10px", padding: '10px' }}>
                            <div className="textWhite rowC" style={{ fontSize: '20px', color: 'white' }}>
                                <ImgNextGen
                                    srcWebp={marginxLogo}
                                    style={{ marginLeft: '0px', marginRight: '18px' }} width="115" alt=""
                                />
                                <div>
                                    <div className='kXLvz mb-3 mt-3'><b>Welcome to MarginX Staking Program</b></div>
                                    <ButtonGroup>
                                        {/* <div className='mr-3'>
                                        <Link to="/staking/liquidity">
                                            <Buttons className="textWhiteLarge center" style={{ height: '40px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" >Start Earning</Buttons>
                                        </Link>
                                    </div> */}
                                        <div>
                                            <Buttons className="textWhiteLarge cell2 center" style={{ height: '40px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
                                                window.open(`https://starscan.io/fxcore/proposals/`, '_blank')
                                            }}>&#8599; Learn more</Buttons>
                                        </div>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mr-auto card cardbody" style={{ marginLeft: '0px', color: 'white', height: '220px', width: '100%', minWidth: '400px', borderRadius: "25px", backgroundImage: `url(${nftBackground})`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                    <div className="card-body" style={{ padding: '15px' }}>
                        <div className="ml-auto mr-auto card cardbodyBlack float-right" style={{ marginBottom: '12px', color: 'white', maxWidth: '400px' }}>
                            <div className="card-body" style={{ padding: '15px' }}>
                                <div class="ePxacs">
                                    <div class="ctBHOr">+</div>Rewards</div>
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
                                {props.userEarnedRewardAmount == 0 ?
                                    <Buttons className="textWhiteLarge cell2 center" style={{ height: '38px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Claim</Buttons>
                                    : <Buttons className="textWhiteLarge cell2 center" style={{ height: '38px', width: '100%', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
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
                                        <td style={{ textAlign: "start" }} scope="col" width="120">Staked</td>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">Withdrawable</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </MediaQuery>



            <div className="mr-auto" style={{ marginBottom: '12px', marginTop: '10px', color: 'white', maxWidth: '400px' }}>
                <div className="card-body">
                    <div className="textWhite" style={{ fontSize: '1.5rem', color: 'white' }}><big><b>Staking</b></big></div>
                    <div style={{ color: 'grey' }}>Earn rewards for contributing stability</div>
                </div>
            </div>

            <div class="lkBtSA" style={{ borderRadius: '20px' }}>
                <Link to="/staking/liquidity" className='exLink0'>
                    <div className="card cardbody cell3" style={{ height: '100%', color: 'white', width: '400px' }}>
                        <div className="card-body">
                            <div style={{ marginBottom: "80px" }}>
                                <div className="float-left textWhite" style={{ fontSize: '1.25rem', color: 'white' }}>
                                    Liquidity Pool</div>
                                <div className="float-right" style={{ marginLeft: "10px" }}>
                                    <ImgNextGen
                                        srcWebp={usdt}
                                        // className="iconLeft"
                                        width="32px" height="32px" alt=""
                                    />
                                    {/* <ImgNextGen
                                            srcWebp={usdt}
                                            className="iconRight"
                                            width="27px" height="27px" alt=""
                                        /> */}
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
                                                    : <span class="loader"></span>}
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
                                                    : <span class="loader"></span>}
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
                                            <td style={{ textAlign: "start" }} scope="col" width="120">Your Stake</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Link>

                {(props.wallet || props.walletConnect) ?
                    <div className='iqmhrB'>
                        <div class="OYMUv">
                            <div class='eWMWa-D'>
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
                        <div class="rowC">
                            {props.userEarnedRewardAmount == 0 ?
                                <Buttons className="buttonGradientBorder cell3 center" style={{ height: '40px', width: '80px', marginRight: '10px', cursor: 'not-allowed', opacity: '0.5', }} >Claim</Buttons>
                                : <Buttons className="buttonGradientBorder cell3 center" style={{ height: '40px', width: '80px',  marginRight: '10px' }} size="lg" onClick={() => {
                                    props.claimReward()
                                }} ><div className='linearGradientText center'>Claim</div></Buttons>
                            }
                            {/* <Buttons className="buttonGradientBorder cell3 center" style={{ width: '80px', height: '40px', marginRight: '10px' }} size="lg" onClick={() => {
                                props.claimReward()
                            }} ><div className='linearGradientText center'>Claim</div></Buttons> */}

                            <PopupDeposit
                                userUSDTBalance={props.userUSDTBalance}
                                userStakedBalance={props.userStakedBalance}
                                userUSDTStakingAllowance={props.userUSDTStakingAllowance}
                                stake={props.stake}
                                approve={props.approve}
                            />
                        </div>
                    </div> : null
                }

            </div >


            <div className="mr-auto" style={{ marginBottom: '12px', marginTop: '40px', olor: 'white', maxWidth: '400px' }}>
                <div className="card-body">
                    <div className="textWhite" style={{ fontSize: '1.5rem', color: 'white' }}><big><b>Epoch</b></big></div>
                    <div style={{ color: 'grey' }}>Earn rewards for contributing stability</div>
                </div>
            </div>




            <MediaQuery minWidth={901}>

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
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery maxWidth={901}>
                <div className="card cardbody" style={{ marginBottom: '12px', height: '180px', width: '400px', color: 'white' }}>
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
                <div className="mr-auto card cardbody" style={{ marginBottom: '12px', height: '180px', width: '400px', color: 'white' }}>
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

            <br /><br /><br /><br /><br /><br /><br /><br />
        </div >
    );
}


export default StakeMenu;
