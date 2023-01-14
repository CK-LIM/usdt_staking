import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Buttons from 'react-bootstrap/Button'
import 'reactjs-popup/dist/index.css';
import '../App.css';

import PopupDeposit from './PopupDeposit'
import PopupRequestWithdraw from './PopupRequestWithdraw'
import PopupWithdraw from './PopupWithdraw'
import CountdownTimer from '../CountdownTimer';
import ImgNextGen from '../ImgNextGen';
import usdt from '../images/usdt.svg';
import fx from '../images/fx.svg';


function StakeLiquidity(props) {

    const NOW_IN_MS = new Date().getTime();

    return (
        <div id="content" style={{ margin: "0", color: '#ff9a04' }}>
            <MediaQuery minWidth={1001}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" className='exLink0'>
                        <div className='backButton center mr-3'>&#8592;</div>
                    </Link>
                    <div style={{ width: '100%' }}>
                        <label className="textWhite" style={{ marginTop: '25px', fontSize: '22px', color: 'white' }}><big><b>Liquidity Pool</b></big></label>
                        <div className="" style={{ color: 'grey' }}>Deposit and earn rewards for contributing to MarginX exchange liquidity.</div>
                    </div>
                </div>
            </MediaQuery>

            <MediaQuery maxWidth={1000}>
                <Link to="/" className='exLink0'>
                    <div className='backButton center mr-3'>&#8592;</div>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '100%' }}>
                        <label className="textWhite" style={{ marginTop: '5px', fontSize: '22px', color: 'white' }}><big><b>Liquidity Pool</b></big></label>
                        <div className="" style={{ color: 'grey' }}>Deposit and earn rewards for contributing to MarginX exchange liquidity.</div>
                    </div>
                </div>
            </MediaQuery>


            <MediaQuery minWidth={601}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                    <div style={{ flex: '0 0 34rem', display: 'flex', flexDirection: 'column', width: 'calc(50% - 1rem)' }}>
                        <div className="blackBox">
                            <div className="card cardbody" style={{ marginBottom: '12px', height: '160px', maxWidth: '265px', color: 'white' }}>
                                <div className="card-body">
                                    <div style={{ marginBottom: "65px" }}>
                                        <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                            Pool Size</div>
                                    </div>
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
                                            </tr>
                                        </thead>
                                        <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">currently being deposited</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div className="card cardbody" style={{ marginBottom: '12px', height: '160px', maxWidth: '265px', color: 'white' }}>
                                <div className="card-body">
                                    <div style={{ marginBottom: "65px" }}>
                                        <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                            Yield</div>
                                    </div>
                                    <table>
                                        <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">
                                                    {props.blockchainLoading ?
                                                        <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                            <div>{parseFloat(window.web3Eth.utils.fromWei(props.poolRewardRate, 'Ether') * 86400).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                            <div className="JYkOF">
                                                                <ImgNextGen
                                                                    srcWebp={fx}
                                                                    style={{ marginLeft: '6px', marginRight: '0px' }} width="25px" alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                        : <span class="loader"></span>}</td>
                                            </tr>
                                        </thead>
                                        <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">Estimated yield/ day</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div className="blackBox">
                            <div class="lkBtSA" style={{ borderRadius: '20px', marginBottom: '20px' }}>
                                <div className="ml-auto mr-auto card cardbody mr-2" style={{ height: '160px', maxWidth: '265px', color: 'white' }}>
                                    <div className="card-body">
                                        <div style={{ marginBottom: "65px" }}>
                                            <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                Deposited</div>
                                        </div>
                                        <table>
                                            <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                                <tr>
                                                    <td style={{ textAlign: "start" }} scope="col" width="120">
                                                        {props.accountLoading ?
                                                            <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                <div>{parseFloat(window.web3Eth.utils.fromWei(props.userStakedBalance, 'mWei')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                                <div className="JYkOF">
                                                                    <ImgNextGen
                                                                        srcWebp={usdt}
                                                                        style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            : <div>-</div>}</td>
                                                </tr>
                                            </thead>
                                            <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                <tr>
                                                    <td style={{ textAlign: "start" }} scope="col" width="120"> This pool accepts USDC</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {
                                    (props.wallet || props.walletConnect) ?
                                        <div className='iqmhrC'>
                                            {props.userActiveBalanceNextEpoch > 0 ?
                                                <PopupDeposit
                                                    userUSDTBalance={props.userUSDTBalance}
                                                    userStakedBalance={props.userStakedBalance}
                                                    userUSDTStakingAllowance={props.userUSDTStakingAllowance}
                                                    stake={props.stake}
                                                    approve={props.approve}
                                                />
                                                : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '40px', width: '80px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Deposit</Buttons>
                                            }
                                        </div> : null
                                }
                            </div>

                            <div class="lkBtSA" style={{ borderRadius: '20px', marginBottom: '20px' }}>
                                <div className="ml-auto mr-auto card cardbody" style={{ height: '160px', maxWidth: '265px', color: 'white' }}>
                                    <div className="card-body">
                                        <div style={{ marginBottom: "65px" }}>
                                            <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                Earned</div>
                                        </div>
                                        <table>
                                            <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                                <tr>
                                                    <td style={{ textAlign: "start" }} scope="col" width="120">
                                                        {props.accountLoading ?
                                                            <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                <div>{parseFloat(window.web3Eth.utils.fromWei(props.userEarnedRewardAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                                                                <div className="JYkOF">
                                                                    <ImgNextGen
                                                                        srcWebp={fx}
                                                                        style={{ marginLeft: '6px', marginRight: '0px' }} width="25px" alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            : <div>-</div>}</td>
                                                </tr>
                                            </thead>
                                            <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                <tr>
                                                    <td style={{ textAlign: "start" }} scope="col" width="120"> Deposit to earn rewards</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {(props.wallet || props.walletConnect) ?
                                    <div className='iqmhrC'>
                                        {props.userEarnedRewardAmount == 0 ?
                                            <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '80px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Claim</Buttons>
                                            : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '80px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
                                                props.claimReward()
                                            }}>Claim</Buttons>
                                        }
                                    </div> : null
                                }

                            </div>
                        </div>



                        <div style={{ marginTop: '2.5rem', display: 'block' }}>
                            <label className="textWhite" style={{ marginTop: '5px', fontSize: '22px', color: 'white' }}><big><b>Withdraws</b></big></label>
                            <div className="mb-4" style={{ color: 'grey' }}>View and manage your pending and available withdraws.</div>
                            <div style={{ marginTop: '1.5rem', display: 'block' }}>
                                <div className="blackBox">
                                    <div class="lkBtSA" style={{ borderRadius: '20px', marginBottom: '12px' }}>
                                        <div className="ml-auto mr-auto card cardbody" style={{ height: '160px', maxWidth: '265px', color: 'white' }}>
                                            <div className="card-body">
                                                <div style={{ marginBottom: "65px" }}>
                                                    <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                        Pending</div>
                                                </div>
                                                <table>
                                                    <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                                        <tr>
                                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                                {props.accountLoading ?
                                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.userInactiveBalanceNextEpoch, 'mWei')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                                        <div className="JYkOF">
                                                                            <ImgNextGen
                                                                                srcWebp={usdt}
                                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    : <div>-</div>}</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                        <tr>
                                                            <td style={{ textAlign: "start" }} scope="col" width="120">in requested withdraws</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {(props.wallet || props.walletConnect) ?
                                            <div className='iqmhrC'>
                                                {props.userActiveBalanceNextEpoch > 0 && parseInt(props.poolTimeRemainingInCurrentEpoch) > parseInt(props.poolBlackoutWindow) ?
                                                    <PopupRequestWithdraw
                                                        poolEndOfCurrentEpoch={props.poolEndOfCurrentEpoch}
                                                        poolSize={props.poolSize}
                                                        userUSDTBalance={props.userUSDTBalance}
                                                        userStakedBalance={props.userStakedBalance}
                                                        userUSDTStakingAllowance={props.userUSDTStakingAllowance}
                                                        userActiveBalanceNextEpoch={props.userActiveBalanceNextEpoch}
                                                        requestWithdraw={props.requestWithdraw}
                                                        poolTimeRemainingInCurrentEpoch={props.poolTimeRemainingInCurrentEpoch}
                                                        poolBlackoutWindow={props.poolBlackoutWindow}
                                                    />
                                                    : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '40px', width: '100px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Request</Buttons>
                                                }
                                            </div> : null
                                        }
                                    </div>

                                    <div class="lkBtSA" style={{ borderRadius: '20px', marginBottom: '12px' }}>
                                        <div className="ml-auto mr-auto card cardbody" style={{ height: '160px', maxWidth: '265px', color: 'white' }}>
                                            <div className="card-body">
                                                <div style={{ marginBottom: "65px" }}>
                                                    <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                        Available</div>
                                                </div>
                                                <table>
                                                    <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                                        <tr>
                                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                                {props.accountLoading ?
                                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.userWithdrawableAmount, 'mWei')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                                        <div className="JYkOF">
                                                                            <ImgNextGen
                                                                                srcWebp={usdt}
                                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    : <div>-</div>}</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                        <tr>
                                                            <td style={{ textAlign: "start" }} scope="col" width="120">ready to withdraw</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {(props.wallet || props.walletConnect) ?
                                            <div className='iqmhrC'>
                                                {props.userWithdrawableAmount > 0 ?
                                                    <PopupWithdraw
                                                        poolEndOfCurrentEpoch={props.poolEndOfCurrentEpoch}
                                                        poolSize={props.poolSize}
                                                        userUSDTBalance={props.userUSDTBalance}
                                                        userStakedBalance={props.userStakedBalance}
                                                        userUSDTStakingAllowance={props.userUSDTStakingAllowance}
                                                        userWithdrawableAmount={props.userWithdrawableAmount}
                                                        withdraw={props.withdraw}
                                                    />
                                                    : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '40px', width: '100px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Withdraw</Buttons>
                                                }
                                            </div> : null
                                        }
                                    </div>
                                </div>

                                <div className="blackBox">
                                    <div className="card cardbody" style={{ marginBottom: '12px', height: '160px', maxWidth: '265px', color: 'white' }}>
                                        <div className="card-body">
                                            <div style={{ marginBottom: "65px" }}>
                                                <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                    Blackout Window</div>
                                            </div>
                                            <table>
                                                <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                                    <tr>
                                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                                            {props.blockchainLoading ?
                                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                    <CountdownTimer targetDate={NOW_IN_MS + props.timeRemainingNextBlackout * 1000} />
                                                                </div>
                                                                : <div className='loader'></div>}</td>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                    <tr>
                                                        <td style={{ textAlign: "start" }} scope="col" width="120">until next blackout window.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="card cardbody" style={{ marginBottom: '12px', height: '160px', maxWidth: '265px', color: 'white' }}>
                                        <div className="card-body">
                                            <div style={{ marginBottom: "65px" }}>
                                                <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                    Next Epoch</div>
                                            </div>
                                            <table>
                                                <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                                    <tr>
                                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                                            {props.blockchainLoading ?
                                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                    <CountdownTimer targetDate={NOW_IN_MS + parseInt(props.poolTimeRemainingInCurrentEpoch * 1000)} />
                                                                </div>
                                                                : <div className='loader'></div>}</td>
                                                    </tr>
                                                </thead>
                                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                    <tr>
                                                        <td style={{ textAlign: "start" }} scope="col" width="120">until the next epoch.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                    <MediaQuery minWidth={1001}>
                        <div className="mr-auto card cardbody" style={{ marginLeft: '15px', marginBottom: '12px', height: '100%', color: 'white', width: 'calc(50% - 1rem)' }}>
                            <div className="card-body">
                                <div style={{ paddingBottom: '10px' }}>
                                    <div className="textBlackSmall" style={{ color: 'white', marginBottom: '10px' }}>
                                        <div style={{ textAlign: "start", fontSize: '12px', color: 'silver' }} width="120">ABOUT</div>
                                    </div>
                                    <div className="textBlackSmall" style={{ color: 'white' }}>
                                        <div style={{ textAlign: "start" }} width="120">
                                            Liquidity, especially when used properly, is a core component of any successful exchange. To further liquidity network effects and incentivize professional market makers, $FX will be distributed to users who deposit USDC to the liquidity pool. Known and approved market makers will use the deposited USDC to make markets on the Protocol, furthering liquidity available across the markets. The market makers will not be able to withdraw the USDC from the Protocol, requiring them to use it only in the Protocol. Only private blockchain wallets can participate. Please do not send funds from an exchange.
                                        </div>
                                    </div>
                                </div>

                                <div className='borderTop'>
                                    <div className="textBlackSmall" style={{ color: 'white', paddingTop: '15px', marginBottom: '10px' }}>
                                        <div style={{ textAlign: "start", fontSize: '12px', color: 'silver' }} width="120">RISKS</div>
                                    </div>
                                    <div className="textBlackSmall" style={{ color: 'white' }}>
                                        <div style={{ textAlign: "start" }} width="120">
                                            A portion of deposited USDC could be lost if a market maker were to lose funds (via unprofitable trading) and be unable to replenish the liquidity pool.
                                        </div>
                                    </div>
                                </div>

                                <div className='borderTop'>
                                    <div className="textBlackSmall" style={{ color: 'white', paddingTop: '15px', marginBottom: '10px' }}>
                                        <div scope="col" style={{ textAlign: "start", fontSize: '12px', color: 'silver' }} width="120">REWARDS</div>
                                    </div>
                                    <div className="textBlackSmall" style={{ color: 'white' }}>
                                        <div scope="col" style={{ textAlign: "start" }} width="120">
                                            Users will receive $FX, distributed continuously according to each user's portion of the total USDC in the pool. Users must request to withdraw USDC at least 7 days before the current epoch ends in order to be able to withdraw their USDC in the next epoch. If users do not request to withdraw, their deposited USDC is rolled over into the next epoch.
                                        </div>
                                    </div>
                                </div>

                                <div className='borderTop'>
                                    <div className="textBlackSmall" style={{ color: 'white', paddingTop: '15px', marginBottom: '10px' }}>
                                        <div scope="col" style={{ textAlign: "start", fontSize: '12px', color: 'silver' }} width="120">DISCUSS</div>
                                    </div>
                                    <div className="textBlackSmall" style={{ color: 'white' }}>
                                        <div scope="col" style={{ textAlign: "start" }} width="120">
                                            Have thought about this pool? Discuss with others
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'start', marginTop: '15px' }}>
                                            <Buttons className="textWhiteLargeButton cell2 center mr-2" style={{ height: '32px', width: '30%', maxWidth: '122px', border: '0px', color: 'black', padding: "5px 16px", backgroundColor: "white", borderRadius: '22px' }} size="lg" onClick={() => {
                                                window.open(`https://forum.starscan.io/c/marginx/51`, '_blank')
                                            }}>&#8599; Forums</Buttons>
                                            <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '32px', width: '30%', maxWidth: '122px', border: '0px solid white', color: 'white', padding: "5px 16px", backgroundColor: "#3a3c44", borderRadius: '22px' }} size="lg" onClick={() => {
                                                window.open(`https://discord.com/invite/7yUjqadZFq`, '_blank')
                                            }}>&#8599; Discord</Buttons>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MediaQuery>
                </div>
            </MediaQuery>

            <MediaQuery maxWidth={600}>
                <div style={{ justifyContent: 'space-between', marginTop: '32px' }}>
                    <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '160px', width: '100%', color: 'white' }}>
                        <div className="card-body">
                            <div style={{ marginBottom: "65px" }}>
                                <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                    Pool Size</div>
                            </div>
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
                                    </tr>
                                </thead>
                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                    <tr>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">currently being deposited</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '160px', width: '100%', color: 'white' }}>
                        <div className="card-body">
                            <div style={{ marginBottom: "65px" }}>
                                <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                    Yield</div>
                            </div>
                            <table>
                                <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                    <tr>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                            {props.blockchainLoading ?
                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                    <div>{parseFloat(window.web3Eth.utils.fromWei(props.poolRewardRate, 'Ether') * 86400).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                    <div className="JYkOF">
                                                        <ImgNextGen
                                                            srcWebp={fx}
                                                            style={{ marginLeft: '6px', marginRight: '0px' }} width="25px" alt=""
                                                        />
                                                    </div>
                                                </div>
                                                : <span class="loader"></span>}</td>
                                    </tr>
                                </thead>
                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                    <tr>
                                        <td style={{ textAlign: "start" }} scope="col" width="120">Estimated yield/ day</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="lkBtSA" style={{ borderRadius: '20px', marginBottom: '12px' }}>
                        <div className="ml-auto mr-auto card cardbody mr-2" style={{ height: '160px', width: '100%', color: 'white' }}>
                            <div className="card-body">
                                <div style={{ marginBottom: "65px" }}>
                                    <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                        Deposited</div>
                                </div>
                                <table>
                                    <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.accountLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.userStakedBalance, 'mWei')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={usdt}
                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    : <div>-</div>}</td>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120"> This pool accepts USDC</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {
                            (props.wallet || props.walletConnect) ?
                                <div className='iqmhrC'>
                                    {props.userActiveBalanceNextEpoch > 0 ?
                                        <PopupDeposit
                                            userUSDTBalance={props.userUSDTBalance}
                                            userStakedBalance={props.userStakedBalance}
                                            userUSDTStakingAllowance={props.userUSDTStakingAllowance}
                                            stake={props.stake}
                                            approve={props.approve}
                                        />
                                        : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '40px', width: '80px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Deposit</Buttons>
                                    }
                                </div> : null
                        }
                    </div>
                    <div class="lkBtSA" style={{ borderRadius: '20px', marginBottom: '12px' }}>
                        <div className="ml-auto mr-auto card cardbody" style={{ height: '160px', width: '100%', color: 'white' }}>
                            <div className="card-body">
                                <div style={{ marginBottom: "65px" }}>
                                    <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                        Earned</div>
                                </div>
                                <table>
                                    <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120">
                                                {props.accountLoading ?
                                                    <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                        <div>{parseFloat(window.web3Eth.utils.fromWei(props.userEarnedRewardAmount, 'Ether')).toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
                                                        <div className="JYkOF">
                                                            <ImgNextGen
                                                                srcWebp={fx}
                                                                style={{ marginLeft: '6px', marginRight: '0px' }} width="25px" alt=""
                                                            />
                                                        </div>
                                                    </div>
                                                    : <div>-</div>}</td>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td style={{ textAlign: "start" }} scope="col" width="120"> Deposit to earn rewards</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {(props.wallet || props.walletConnect) ?
                            <div className='iqmhrC'>
                                {props.userEarnedRewardAmount == 0 ?
                                    <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '80px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Claim</Buttons>
                                    : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '38px', width: '80px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" onClick={() => {
                                        props.claimReward()
                                    }}>Claim</Buttons>
                                }
                            </div> : null
                        }
                    </div>


                    <div style={{ marginTop: '2.5rem', display: 'block' }}>
                        <label className="textWhite" style={{ marginTop: '5px', fontSize: '22px', color: 'white' }}><big><b>Withdraws</b></big></label>
                        <div className="mb-4" style={{ color: 'grey' }}>View and manage your pending and available withdraws.</div>
                        <div style={{ marginTop: '1.5rem', display: 'block' }}>
                            <div class="lkBtSA" style={{ borderRadius: '20px', marginBottom: '12px' }}>
                                <div className="ml-auto mr-auto card cardbody" style={{ height: '160px', width: '100%', color: 'white' }}>
                                    <div className="card-body">
                                        <div style={{ marginBottom: "65px" }}>
                                            <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                Pending</div>
                                        </div>
                                        <table>
                                            <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                                <tr>
                                                    <td style={{ textAlign: "start" }} scope="col" width="120">
                                                        {props.accountLoading ?
                                                            <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                <div>{parseFloat(window.web3Eth.utils.fromWei(props.userInactiveBalanceNextEpoch, 'mWei')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                                <div className="JYkOF">
                                                                    <ImgNextGen
                                                                        srcWebp={usdt}
                                                                        style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            : <div>-</div>}</td>
                                                </tr>
                                            </thead>
                                            <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                <tr>
                                                    <td style={{ textAlign: "start" }} scope="col" width="120">in requested withdraws</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {(props.wallet || props.walletConnect) ?
                                    <div className='iqmhrC'>
                                        {props.userActiveBalanceNextEpoch > 0 ?
                                            <PopupRequestWithdraw
                                                poolEndOfCurrentEpoch={props.poolEndOfCurrentEpoch}
                                                poolSize={props.poolSize}
                                                userUSDTBalance={props.userUSDTBalance}
                                                userStakedBalance={props.userStakedBalance}
                                                userUSDTStakingAllowance={props.userUSDTStakingAllowance}
                                                userActiveBalanceNextEpoch={props.userActiveBalanceNextEpoch}
                                                requestWithdraw={props.requestWithdraw}
                                            />
                                            : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '40px', width: '100px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Request</Buttons>
                                        }
                                    </div> : null
                                }
                            </div>

                            <div class="lkBtSA" style={{ borderRadius: '20px', marginBottom: '12px' }}>
                                <div className="ml-auto mr-auto card cardbody" style={{ height: '160px', width: '100%', color: 'white' }}>
                                    <div className="card-body">
                                        <div style={{ marginBottom: "65px" }}>
                                            <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                Available</div>
                                        </div>
                                        <table>
                                            <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                                <tr>
                                                    <td style={{ textAlign: "start" }} scope="col" width="120">
                                                        {props.accountLoading ?
                                                            <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                <div>{parseFloat(window.web3Eth.utils.fromWei(props.userWithdrawableAmount, 'mWei')).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                                <div className="JYkOF">
                                                                    <ImgNextGen
                                                                        srcWebp={usdt}
                                                                        style={{ marginLeft: '6px', marginRight: '0px' }} width="24px" alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                            : <div>-</div>}</td>
                                                </tr>
                                            </thead>
                                            <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                <tr>
                                                    <td style={{ textAlign: "start" }} scope="col" width="120">ready to withdraw</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {(props.wallet || props.walletConnect) ?
                                    <div className='iqmhrC'>
                                        {props.userWithdrawableAmount > 0 ?
                                            <PopupWithdraw
                                                poolEndOfCurrentEpoch={props.poolEndOfCurrentEpoch}
                                                poolSize={props.poolSize}
                                                userUSDTBalance={props.userUSDTBalance}
                                                userStakedBalance={props.userStakedBalance}
                                                userUSDTStakingAllowance={props.userUSDTStakingAllowance}
                                                userWithdrawableAmount={props.userWithdrawableAmount}
                                                withdraw={props.withdraw}
                                            />
                                            : <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '40px', width: '100px', border: '0px', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px', cursor: 'not-allowed', opacity: '0.5', }} >Withdraw</Buttons>
                                        }
                                    </div> : null
                                }
                            </div>

                            <div className="ml-auto mr-auto card cardbody mr-2" style={{ marginBottom: '12px', height: '160px', width: '100%', color: 'white' }}>
                                <div className="card-body">
                                    <div style={{ marginBottom: "65px" }}>
                                        <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                            Blackout Window</div>
                                    </div>
                                    <table>
                                        <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">
                                                    {props.blockchainLoading ?
                                                        <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                            <CountdownTimer targetDate={NOW_IN_MS + props.timeRemainingNextBlackout * 1000} />
                                                        </div>
                                                        : <div className='loader'></div>}</td>
                                            </tr>
                                        </thead>
                                        <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">until next blackout window.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '160px', width: '100%', color: 'white' }}>
                                <div className="card-body">
                                    <div style={{ marginBottom: "65px" }}>
                                        <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                            Next Epoch</div>
                                    </div>
                                    <table>
                                        <thead className="textBlackSmall" style={{ color: 'white', height: "35px" }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">
                                                    {props.blockchainLoading ?
                                                        <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                            <CountdownTimer targetDate={NOW_IN_MS + parseInt(props.poolTimeRemainingInCurrentEpoch * 1000)} />
                                                        </div>
                                                        : <div className='loader'></div>}</td>
                                            </tr>
                                        </thead>
                                        <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">until the next epoch.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </MediaQuery>



            <MediaQuery maxWidth={1000}>
                <div className="mr-auto card cardbody" style={{ marginTop: '20px', marginBottom: '12px', height: '100%', color: 'white' }}>
                    <div className="card-body">
                        <div style={{ paddingBottom: '10px' }}>
                            <div className="textBlackSmall" style={{ color: 'white', marginBottom: '10px' }}>
                                <div style={{ textAlign: "start", fontSize: '12px', color: 'silver' }} width="120">ABOUT</div>
                            </div>
                            <div className="textBlackSmall" style={{ color: 'white' }}>
                                <div style={{ textAlign: "start" }} width="120">
                                    Liquidity, especially when used properly, is a core component of any successful exchange. To further liquidity network effects and incentivize professional market makers, $FX will be distributed to users who deposit USDC to the liquidity pool. Known and approved market makers will use the deposited USDC to make markets on the Protocol, furthering liquidity available across the markets. The market makers will not be able to withdraw the USDC from the Protocol, requiring them to use it only in the Protocol. Only private blockchain wallets can participate. Please do not send funds from an exchange.
                                </div>
                            </div>
                        </div>

                        <div className='borderTop'>
                            <div className="textBlackSmall" style={{ color: 'white', paddingTop: '15px', marginBottom: '10px' }}>
                                <div style={{ textAlign: "start", fontSize: '12px', color: 'silver' }} width="120">RISKS</div>
                            </div>
                            <div className="textBlackSmall" style={{ color: 'white' }}>
                                <div style={{ textAlign: "start" }} width="120">
                                    A portion of deposited USDC could be lost if a market maker were to lose funds (via unprofitable trading) and be unable to replenish the liquidity pool.
                                </div>
                            </div>
                        </div>

                        <div className='borderTop'>
                            <div className="textBlackSmall" style={{ color: 'white', paddingTop: '15px', marginBottom: '10px' }}>
                                <div scope="col" style={{ textAlign: "start", fontSize: '12px', color: 'silver' }} width="120">REWARDS</div>
                            </div>
                            <div className="textBlackSmall" style={{ color: 'white' }}>
                                <div scope="col" style={{ textAlign: "start" }} width="120">
                                    Users will receive $FX, distributed continuously according to each user's portion of the total USDC in the pool. Users must request to withdraw USDC at least 7 days before the current epoch ends in order to be able to withdraw their USDC in the next epoch. If users do not request to withdraw, their deposited USDC is rolled over into the next epoch.
                                </div>
                            </div>
                        </div>

                        <div className='borderTop'>
                            <div className="textBlackSmall" style={{ color: 'white', paddingTop: '15px', marginBottom: '10px' }}>
                                <div scope="col" style={{ textAlign: "start", fontSize: '12px', color: 'silver' }} width="120">DISCUSS</div>
                            </div>
                            <div className="textBlackSmall" style={{ color: 'white' }}>
                                <div scope="col" style={{ textAlign: "start" }} width="120">
                                    Have thought about this pool? Discuss with others
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'start', marginTop: '15px' }}>
                                    <Buttons className="textWhiteLargeButton cell2 center mr-2" style={{ height: '32px', width: '30%', maxWidth: '122px', border: '0px', color: 'black', padding: "5px 16px", backgroundColor: "white", borderRadius: '22px' }} size="lg" onClick={() => {
                                        window.open(`https://forum.starscan.io/c/marginx/51`, '_blank')
                                    }}>&#8599; Forums</Buttons>
                                    <Buttons className="textWhiteLargeButton cell2 center" style={{ height: '32px', width: '30%', maxWidth: '122px', border: '0px solid white', color: 'white', padding: "5px 16px", backgroundColor: "#3a3c44", borderRadius: '22px' }} size="lg" onClick={() => {
                                        window.open(`https://discord.com/invite/7yUjqadZFq`, '_blank')
                                    }}>&#8599; Discord</Buttons>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MediaQuery>
        </div >
    );
}

export default StakeLiquidity;
