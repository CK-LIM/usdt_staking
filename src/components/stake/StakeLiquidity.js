import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import bigInt from 'big-integer'
import Buttons from 'react-bootstrap/Button'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../App.css';

import CountdownTimer from '../CountdownTimer';
import ImgNextGen from '../ImgNextGen';
import usdt from '../images/usdt.svg';
import fx from '../images/fx.svg';
import coin98 from '../images/coin98.webp';
import fox from '../images/metamask-fox.svg';
import walletconnectlogo from '../images/walletconnect-logo.svg';

      {/* userUSDTBalance={this.state.userUSDTBalance}
      userStakedBalance={this.state.userStakedBalance}
      userUSDTStakingAllowance={this.state.userUSDTStakingAllowance}
      userEarnedRewardAmount={this.state.userEarnedRewardAmount}
      userWithdrawableAmount={this.state.userWithdrawableAmount} */}

function StakeLiquidity(props) {

    const NOW_IN_MS = new Date().getTime();
    const contentStyle = { background: '#fffae6', border: "1px solid #596169", width: "30%", borderRadius: "15px", minWidth: "320px" };
    return (
        <div id="content" style={{ margin: "0", color: '#ff9a04' }}>
            <label className="textWhite mb-3" style={{ marginTop: '0px', fontSize: '30px', color: 'white' }}><big><b>Liquidity Pool</b></big></label>
            <Buttons className="textWhiteLarge center float-right" style={{ height: '40px', width: '10%', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" >Stake</Buttons>

            <div className="mb-4" style={{ color: 'grey' }}>Stake and earn rewards for contributing to MarginX exchange liquidity.</div>
            <MediaQuery minWidth={201}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: '0 0 34rem', display: 'flex', flexDirection: 'column', width: 'calc(50% - 1rem)' }}>
                        <div className="blackBox">
                            <div className="ml-auto mr-auto card cardbody mr-2" style={{ marginBottom: '12px', height: '140px', maxWidth: '260px', color: 'white' }}>
                                <div className="card-body">
                                    <div style={{ marginBottom: "50px" }}>
                                        <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                            Pool Size</div>
                                    </div>
                                    <table>
                                        <tbody className="textBlackSmall" style={{ color: 'white' }}>
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
                                                    currently being staked</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '140px', maxWidth: '260px', color: 'white' }}>
                                <div className="card-body">
                                    <div style={{ marginBottom: "50px" }}>
                                        <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                            Yield</div>
                                    </div>
                                    <table>
                                        <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                            <tr>
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
                                                        : <span class="loader"></span>} Estimated yield/ day</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div className="blackBox">
                            <div className="ml-auto mr-auto card cardbody mr-2" style={{ marginBottom: '12px', height: '140px', maxWidth: '260px', color: 'white' }}>
                                <div className="card-body">
                                    <div style={{ marginBottom: "50px" }}>
                                        <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                            Staked</div>
                                    </div>
                                    <table>
                                        <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">
                                                    {props.accountLoading ?
                                                        <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                            <div>{parseFloat(window.web3Eth.utils.fromWei(props.userStakedBalance, 'Ether') * 86400).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                            <div className="JYkOF">
                                                                <ImgNextGen
                                                                    srcWebp={usdt}
                                                                    style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                        : <div>-</div>} This pool accepts USDC</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '140px', maxWidth: '260px', color: 'white' }}>
                                <div className="card-body">
                                    <div style={{ marginBottom: "50px" }}>
                                        <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                            Earned</div>
                                    </div>
                                    <table>
                                        <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                            <tr>
                                                <td style={{ textAlign: "start" }} scope="col" width="120">
                                                    {props.accountLoading ?
                                                        <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                            <div>{parseFloat(window.web3Eth.utils.fromWei(props.userEarnedRewardAmount, 'Ether') * 86400).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                            <div className="JYkOF">
                                                                <ImgNextGen
                                                                    srcWebp={fx}
                                                                    style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
                                                                />
                                                            </div>
                                                        </div>
                                                        : <div>-</div>} Stake to earn rewards</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div style={{ marginTop: '2.5rem', display: 'block' }}>
                            <label className="textWhite mb-3" style={{ marginTop: '20px', fontSize: '30px', color: 'white' }}><big><b>Withdraws</b></big></label>
                            <div className="mb-4" style={{ color: 'grey' }}>View and manage your pending and available withdraws.</div>
                            <div style={{ marginTop: '1.5rem', display: 'block' }}>
                                <div className="blackBox">
                                    <div className="ml-auto mr-auto card cardbody mr-2" style={{ marginBottom: '12px', height: '140px', maxWidth: '260px', color: 'white' }}>
                                        <div className="card-body">
                                            <div style={{ marginBottom: "50px" }}>
                                                <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                    Pending</div>
                                            </div>
                                            <table>
                                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                    <tr>
                                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                                            {props.accountLoading ?
                                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                    <div>{parseFloat(window.web3Eth.utils.fromWei(props.userInactiveBalanceNextEpoch, 'Ether') * 86400).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                                    <div className="JYkOF">
                                                                        <ImgNextGen
                                                                            srcWebp={usdt}
                                                                            style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                                : <div>-</div>} in requested withdraws</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '140px', maxWidth: '260px', color: 'white' }}>
                                        <div className="card-body">
                                            <div style={{ marginBottom: "50px" }}>
                                                <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                    Available</div>
                                            </div>
                                            <table>
                                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                    <tr>
                                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                                            {props.accountLoading ?
                                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                    <div>{parseFloat(window.web3Eth.utils.fromWei(props.userWithdrawableAmount, 'Ether') * 86400).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                                                                    <div className="JYkOF">
                                                                        <ImgNextGen
                                                                            srcWebp={usdt}
                                                                            style={{ marginLeft: '0.2rem', marginRight: '0px' }} width="25px" alt=""
                                                                        />
                                                                    </div>
                                                                </div>
                                                                : <div>-</div>} ready to withdraw</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="blackBox">
                                    <div className="ml-auto mr-auto card cardbody mr-2" style={{ marginBottom: '12px', height: '140px', maxWidth: '260px', color: 'white' }}>
                                        <div className="card-body">
                                            <div style={{ marginBottom: "50px" }}>
                                                <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                    Blackout Window</div>
                                            </div>
                                            <table>
                                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                    <tr>
                                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                                            {props.blockchainLoading ?
                                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                    <CountdownTimer targetDate={NOW_IN_MS + props.poolBlackoutWindow * 1000} />
                                                                </div>
                                                                : <div className='loader'></div>} until next blackout window.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="ml-auto mr-auto card cardbody" style={{ marginBottom: '12px', height: '140px', maxWidth: '260px', color: 'white' }}>
                                        <div className="card-body">
                                            <div style={{ marginBottom: "50px" }}>
                                                <div className="float-left textWhiteLarge" style={{ fontSize: '1.25rem', color: 'white' }}>
                                                    Next Epoch</div>
                                            </div>
                                            <table>
                                                <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                                    <tr>
                                                        <td style={{ textAlign: "start" }} scope="col" width="120">
                                                            {props.blockchainLoading ?
                                                                <div className="eWMWa-D" style={{ fontSize: '1.25rem', color: 'white', lineHeight: '1.5rem' }}>
                                                                    <CountdownTimer targetDate={NOW_IN_MS + parseInt(props.poolTimeRemainingInCurrentEpoch * 1000)} />
                                                                </div>
                                                                : <div className='loader'></div>} until the next epoch.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>



                    <div className="mr-auto card cardbody" style={{ marginBottom: '12px', height: '100%', color: 'white' }}>
                        <div className="card-body">
                            <div className="center">
                                <table>
                                    <thead className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <th scope="col" style={{ textAlign: "start" }} width="120">ABOUT</th>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td scope="col" style={{ textAlign: "start" }} width="120">
                                                Liquidity, especially when used properly, is a core component of any successful exchange. To further liquidity network effects and incentivize professional market makers, $FX will be distributed to users who stake USDC to the liquidity staking pool. Known and approved market makers will use the staked USDC to make markets on the Protocol, furthering liquidity available across the markets. The market makers will not be able to withdraw the USDC from the Protocol, requiring them to use it only in the Protocol.
                                            </td>
                                        </tr>
                                    </tbody>

                                    <thead className="textBlackSmall borderTop" style={{ color: 'white' }}>
                                        <tr>
                                            <th scope="col" style={{ textAlign: "start", marginTop: '30px' }} width="120">RISKS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td scope="col" style={{ textAlign: "start" }} width="120">
                                                A portion of staked USDC could be lost if a market maker were to lose funds (via unprofitable trading) and be unable to replenish the liquidity staking pool.
                                            </td>
                                        </tr>
                                    </tbody>

                                    <thead className="textBlackSmall borderTop" style={{ color: 'white' }}>
                                        <tr>
                                            <th scope="col" style={{ textAlign: "start" }} width="120">REWARDS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td scope="col" style={{ textAlign: "start" }} width="120">
                                                Stakers will receive $FX, distributed continuously according to each staker's portion of the total USDC in the pool. Stakers must request to unstake USDC at least 7 days before the current epoch ends in order to be able to withdraw their USDC in the next epoch. If stakers do not request to withdraw, their staked USDC is rolled over into the next epoch.
                                            </td>
                                        </tr>
                                    </tbody>
                                    <thead className="textBlackSmall borderTop" style={{ color: 'white' }}>
                                        <tr>
                                            <th scope="col" style={{ textAlign: "start" }} width="120">DISCUSS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="textBlackSmall" style={{ color: 'white' }}>
                                        <tr>
                                            <td scope="col" style={{ textAlign: "start" }} width="120">
                                                Have thought about this pool? Discuss with others
                                            </td>
                                        </tr>
                                        <div style={{ display: 'flex', justifyContent: 'start', marginTop: '10px' }}>
                                            <Buttons className="textWhiteLarge center mr-2" style={{ height: '32px', width: '30%', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" >Forums</Buttons>
                                            <Buttons className="textWhiteLarge center" style={{ height: '32px', width: '30%', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" >Discord</Buttons>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </MediaQuery>
















            <br /><br /><br /><br /><br /><br />
        </div >
    );
}

export default StakeLiquidity;
