import React, { Component } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import MediaQuery from 'react-responsive';
import bigInt from 'big-integer'
import Buttons from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../App.css';
import ImgNextGen from '../ImgNextGen';
import logo from '../images/logo.webp';
import usdt from '../images/usdt.svg';
import fx from '../images/fx.svg';
import marginxLogo from '../images/marginx-title.svg';
import CountdownTimer from '../CountdownTimer';
import coin98 from '../images/coin98.webp';
import fox from '../images/metamask-fox.svg';
import walletconnectlogo from '../images/walletconnect-logo.svg';

import { Link } from 'react-router-dom';
import joe from '../images/joe.webp';

function StakeMenu(props) {

    const NOW_IN_MS = new Date().getTime();
    const contentStyle = { background: '#fffae6', border: "1px solid #596169", width: "30%", borderRadius: "15px", minWidth: "320px" };

    return (
        <div id="content" style={{ margin: "0", color: '#ff9a04', maxWidth: "1000px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', width: '100%' }}>
                <div className="card cardbody badgebody" style={{ marginBottom: '30px', color: 'white', maxWidth: '480px', height: '220px', borderRadius: "25px" }}>
                    <div className="card-body" style={{ marginLeft: "10px", padding: '10px' }}>
                        <div className="textWhite rowC" style={{ fontSize: '20px', color: 'white' }}>
                            <ImgNextGen
                                srcWebp={marginxLogo}
                                style={{ marginLeft: '0px', marginRight: '15px' }} width="115" alt=""
                            />
                            <div>
                                <div className='kXLvz mb-4 mt-4'><b>Welcome to MarginX Staking Program</b></div>
                                <ButtonGroup>
                                    <div className='mr-3'>
                                        <Buttons className="textWhiteLarge center" style={{ height: '40px', width: '100%', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" >Start Earning</Buttons>
                                    </div>
                                    <div>
                                        <Buttons className="textWhiteLarge center" style={{ height: '40px', width: '100%', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" >Learnt more</Buttons>
                                    </div>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card cardbody" style={{ marginLeft: '1.25rem', color: 'white', height: '220px', maxWidth: '480px', borderRadius: "25px" }}>
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
                                                            <div>{parseFloat(window.web3Eth.utils.fromWei(props.userEarnedRewardAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>

                                                        </div>
                                                        : <span>-</span>}
                                                </div>
                                            </div>
                                            : <span>-</span>}
                                    </td>
                                    <div>
                                        <ImgNextGen
                                            srcWebp={fx}
                                            style={{ marginLeft: '0.375rem', marginRight: '0px' }} width="28px" alt=""
                                        />
                                    </div>
                                </div>
                                <Buttons className="textWhiteLarge center" style={{ height: '32px', width: '100%', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '10px' }} size="lg" >Claim</Buttons>
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
                                                            style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
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
                                                            style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
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
                                                            style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
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





            <div className="mr-auto" style={{ marginBottom: '12px', color: 'white', maxWidth: '400px' }}>
                <div className="card-body">
                    <div className="textWhite" style={{ fontSize: '1.5rem', color: 'white' }}><big><b>Staking</b></big></div>
                    <div style={{ color: 'grey' }}>Earn rewards for contributing stability</div>
                </div>
            </div>
            <MediaQuery minWidth={401}>

                <div className="card cardbody" style={{ marginBottom: '12px', height: '100%', color: 'white', maxWidth: '400px' }}>
                    <Link to="/staking/liquidity">
                        <div className="card-body">
                            <div style={{ marginBottom: "50px" }}>
                                <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                    Liquidity Pool</div>
                                <div className="float-right" style={{ marginLeft: "10px" }}>
                                    <ImgNextGen
                                        srcWebp={usdt}
                                        style={{ marginLeft: '0px', marginRight: '15px' }} width="35" height="35" alt=""
                                    />
                                </div>
                            </div>
                            <div>
                                <table>
                                    <thead className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.blockchainLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.poolSize, 'mwei')).toLocaleString('en-US', { maximumFractionDigits: 0 })} </div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={usdt}
                                                                style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
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
                                                                style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
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
                                                                style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
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
                    </Link>
                </div>

            </MediaQuery>


            <div className="mr-auto" style={{ marginBottom: '12px', color: 'white', maxWidth: '400px' }}>
                <div className="card-body">
                    <div className="textWhite" style={{ fontSize: '1.5rem', color: 'white' }}><big><b>Epoch</b></big></div>
                    <div style={{ color: 'grey' }}>Earn rewards for contributing stability</div>
                </div>
            </div>

            <div className="cCeSgm">
                <div className="card cardbody" style={{ marginBottom: '12px', height: '180px', color: 'white' }}>
                    <div className="card-body">
                        <div style={{ marginBottom: "80px" }}>
                            <div className="float-left textBlackLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                Countdown</div>
                        </div>
                        <div>
                            <table>
                                <thead className="textBlackSmall" style={{ color: 'white' }}>
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
                                        <td style={{ textAlign: "start" }} scope="col" width="120">until the next epoch on January 17.</td>
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
                                    <thead className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.blockchainLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.poolRewardRate, 'Ether') * props.poolEpochInterval).toLocaleString('en-US', { maximumFractionDigits: 3 })} </div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={fx}
                                                                style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
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

            <br /><br /><br /><br /><br /><br /><br /><br />
        </div>
    );
}


export default StakeMenu;
