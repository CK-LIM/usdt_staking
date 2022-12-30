import React, { useState, useEffect } from 'react'
import MediaQuery from 'react-responsive';
import Buttons from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import ImgNextGen from '../ImgNextGen';
import { slide as Menu } from 'react-burger-menu'
import Dropdown from 'react-bootstrap/Dropdown'
import 'reactjs-popup/dist/index.css';
import '../App.css';

import marginx_logo_white from '../images/marginx_logo_white.png';
import coin98 from '../images/coin98.webp';
import logo from '../images/logo.webp';
import fox from '../images/metamask-fox.svg';
import walletconnectlogo from '../images/walletconnect-logo.svg';


function NavbMenu(props) {

  const [show, showDropdown] = useState(false);
  const [show2, show2Dropdown] = useState(false);

  const contentStyle = { background: '#fffae6', border: "1px solid #596169", width: "30%", borderRadius: "15px", minWidth: "320px" };



  return (
    <Navbar className="navbar top" style={{ height: "70px", position: "fixed", width: "100%", top: "0", zIndex: "999", backgroundColor: "black" }}>
      <Nav>
        <MediaQuery maxWidth={1050}>
          <Menu>
            <div className='dropdown0'><NavLink className='dropdown' to='/menu/v2/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Farm</NavLink></div>
            <div className='dropdown0'><NavLink className='dropdown' to='/stake/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Stake</NavLink></div>
            <div className='dropdown0'><NavLink className='dropdown' to='/collateral/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Collateral</NavLink></div>
            <div className='dropdown0'><NavLink className='dropdown' to='/synthetic/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Synthetic</NavLink></div>
            <div className='dropdown0'><NavLink className='dropdown' to='/swap/' activeStyle={{ fontWeight: "bold", color: "#ffae00" }}>Swap</NavLink></div>
          </Menu>
        </MediaQuery>

        <MediaQuery minWidth={151}>
          <NavLink className="" to="/staking/">
            <ImgNextGen
              srcWebp={marginx_logo_white}
              height="50" alt=""
            />
          </NavLink>
        </MediaQuery>

        {/* <div className="rowC topleft2" style={{ textDecoration: 'none' }}>
          <MediaQuery minWidth={1051}>
            <div
              style={{ marginLeft: "10px", color: "grey" }}
            ><NavLink className="textSmallBold1" activeClassName="gradient-text" to="/staking/">Staking</NavLink></div>
            <div style={{ marginLeft: "20px" }}>
              <div className="textSmallBold1" onClick={() => {
                window.open(`https://forum.starscan.io/c/marginx/51`, '_blank')
              }}>Forums</div></div>
            <div
              style={{ marginLeft: "20px" }}
            ><div className="textSmallBold1" onClick={() => {
              window.open(`https://trade.marginx.io/`, '_blank')
            }}>Trade</div></div>
          </MediaQuery>
        </div> */}


        <div >
          <ul className="topright rowC">
            <div className="rowC mr-4" style={{ textDecoration: 'none' }}>
              <MediaQuery minWidth={1051}>
                <div
                  style={{ marginLeft: "10px", color: "grey" }}
                ><NavLink className="textSmallBold1" activeClassName="gradient-text" to="/staking/">Staking</NavLink></div>
                <div style={{ marginLeft: "20px" }}>
                  <div className="textSmallBold1" onClick={() => {
                    window.open(`https://forum.starscan.io/c/marginx/51`, '_blank')
                  }}>Forums</div></div>
                <div
                  style={{ marginLeft: "20px" }}
                ><div className="textSmallBold1" onClick={() => {
                  window.open(`https://trade.marginx.io/`, '_blank')
                }}>Trade</div></div>
              </MediaQuery>
            </div>
            {/* <MediaQuery minWidth={1301}>
              <div className="center textGrey exLink0" style={{ marginTop: '2px', marginRight: '12px', color: "#ffae00", textDecorationLine: 'underline' }} onClick={async () => {
                await props.addUSBTokenWallet()
              }}>Add USB to Metamask
              </div>
              <div className="center textGrey exLink0" style={{ marginTop: '2px', marginRight: '12px', color: "#ffae00", textDecorationLine: 'underline' }} onClick={async () => {
                await props.addBAVATokenWallet()
              }}>Add BAVA to Metamask
              </div>
            </MediaQuery> */}

            {/* <MediaQuery minWidth={401}>
              <div className="center" style={{ marginTop: '2px', marginRight: '12px' }}>
                <ImgNextGen
                  srcWebp={logo}
                  style={{ marginRight: '5px' }} width="25" height="25" alt=""
                />
                <div className="textbavaPriceBold" onClick={() => {
                  window.open(`https://kyberswap.com/swap/avalanche/avax-to-bava`, '_blank')
                }}><b>${parseFloat(props.BAVAPrice).toLocaleString('en-US', { maximumFractionDigits: 4 })}</b></div>
              </div>
            </MediaQuery> */}
            {/* <MediaQuery minWidth={601}>
              <div>
                <Buttons className="textWhiteLarge center" style={{ height: '30px', marginRight: '8px' }} variant="secondary" size="lg">&nbsp;Avalanche&nbsp;</Buttons>
              </div>
            </MediaQuery> */}

            <div>
              {props.wallet || props.walletConnect ?
                <Dropdown
                  onMouseEnter={() => show2Dropdown(true)}
                  onMouseLeave={() => show2Dropdown(false)}
                  show={show2}
                  autoClose="outside"
                  style={{ padding: '0px', paddingBottom: "5px" }}
                >
                  <Dropdown.Toggle className='textWhiteLarge center cell2' variant="warning" size="sm" style={{ backgroundColor: "#ffc107", width: '110px', height: '30px' }}>
                    <div>{props.first4Account}...{props.last4Account}</div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ backgroundColor: "#fffae6", margin: "0px", padding: '5px', minWidth: '110px', maxWidth: '110px' }}>
                    <Dropdown.Item className="cell2 dropdown0" style={{ margin: '0px', padding: '5px', fontSize: '16px' }}>
                      <div onClick={() => {
                        window.open(`https://snowtrace.io/address/${props.account}`, '_blank')
                      }}>Wallet</div>
                    </Dropdown.Item>
                    <Dropdown.Item className="cell2 dropdown" style={{ margin: '0px', padding: '5px', fontSize: '16px' }}>
                      <div onClick={async () => {
                        props.setWalletTrigger(false)
                        if (props.walletConnect == true) {
                          await props.WalletDisconnect()
                        }
                        await show2Dropdown(false)
                      }}>Disconnect</div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                : <div>
                  <Popup trigger={open => (<Buttons className="textWhiteLarge center" style={{ height: '32px', width: '100%', color: 'black', padding: "5px 16px", backgroundImage: "linear-gradient(90deg, #18eed8 1%, #a6f616 100%)", borderRadius: '22px' }} size="lg" >Connect Wallet</Buttons>)} modal {...{ contentStyle }}>
                    {close => (
                      <div>
                        <Buttons className="close cell2" style={{ background: "#fffae6", borderRadius: "12px", padding: "2px 5px", fontSize: "18px" }} onClick={close}>
                          &times;
                        </Buttons>
                        <div className="textWhiteMedium mb-2" style={{ borderBottom: "1px Solid Gray", padding: "10px" }}> Connect a Wallet </div>
                        <div className="center mt-4 mb-2">
                          <Buttons type="button" variant="secondary" style={{ height: "50px", width: "100%", minWidth: "150px", maxWidth: "300px", padding: "6px 25px" }} onClick={async () => {
                            await props.connectMetamask()
                          }}><img src={fox} width="23" height="23" className="float-right" alt="" /><span className="float-left">Metamask</span></Buttons>
                        </div>
                        <div className="center mt-2 mb-2">
                          <Buttons type="button" variant="secondary" style={{ height: "50px", width: "100%", minWidth: "150px", maxWidth: "300px", padding: "6px 25px" }} onClick={async () => {
                            await props.connectCoin98()
                          }}>
                            <ImgNextGen
                              srcWebp={coin98}
                              width="23" height="23" className="float-right" alt=""
                            />
                            <span className="float-left">Coin98</span></Buttons>
                        </div>
                        <div className="center mt-2 mb-4">
                          <Buttons type="button" variant="secondary" style={{ height: "50px", width: "100%", minWidth: "150px", maxWidth: "300px", padding: "6px 25px" }} onClick={async () => {
                            await props.mobileWalletConnect()
                          }}><img src={walletconnectlogo} width="26" height="23" className="float-right" alt="" /><span className="float-left">WalletConnect</span></Buttons>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>}
            </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </ul>
        </div>
      </Nav>
    </Navbar>
  );
}

export default NavbMenu;
