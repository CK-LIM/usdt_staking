import React, { Component } from 'react'
import './App.css';
import baklava from './images/baklava.webp';
import { Link } from 'react-router-dom';
import discord from './images/discord.svg'
import twitter from './images/twitter.svg'
import medium from './images/medium.svg'
import git from './images/github.svg'
import gitbook from './images/docs.svg'

class Footer extends Component {

    render() {
        return (
            <footer id="content">
                <div style={{ marginTop: '0px' }}>
                    <br />
                    <div className="rowS center">
                        <img className="center" src={baklava} width="25" alt="" />&nbsp;&nbsp;
                        <div className="center" style={{ color: "black", fontSize: '16px' }}><b>BAKLAVA.SPACE © 2022</b></div>
                    </div>
                    {/* <div className="center" style={{ color: "black", fontSize: '14px', marginTop: "5px" }}>Tools for defi users.</div> */}
                    {/* <div className="center" style={{ color: "black", fontSize: '14px', marginTop: "5px" }}>Baklava Farms autocompound farm rewards.</div> */}
                    <div className="center" style={{ color: "black", fontSize: '14px', marginTop: "5px" }}>Synthetic asset creation and exchange platform.</div>


                    <div className="center rowS" style={{ marginTop: "10px" }}>
                        <div className="exLink0 " style={{ fontSize: "14px", height: "22px", marginRight: '20px', color: 'black' }} onClick={() => {
                            window.open(`https://baklavaspace.gitbook.io/main/guides/litepaper`, '_blank')
                        }}><div className="hover" style={{ fontSize: "14px", padding: "0" }}>Litepaper</div>
                        </div>
                        <div style={{ fontSize: "14px", height: "22px", marginRight: '20px', color: 'black' }}>
                            <div className="" style={{ fontSize: "14px", padding: "0" }}>|</div></div>
                        <div className="exLink0" style={{ fontSize: "14px", height: "22px", color: 'black' }}>
                            <div className="hover" style={{ fontSize: "14px", padding: "0" }} ><Link className='hover1' to='/disclaimer/' style={{ fontSize: "14px", padding: "0" }}>Disclaimer</Link></div>
                        </div>
                    </div>


                    <div className="center rowS" style={{ marginTop: "15px" }}>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://baklavaspace.gitbook.io/`, '_blank')
                        }}><div className="mb-1"><img src={gitbook} width="20" height="20" align="left" alt="" /></div>
                        </div>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://twitter.com/baklavaspace`, '_blank')
                        }}><div className="mb-1"><img src={twitter} width="20" height="20" align="left" alt="" /></div>
                        </div>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://medium.com/@baklavaspace`, '_blank')
                        }}><div className="mb-1"><img src={medium} width="20" height="20" align="left" alt="" /></div>
                        </div>
                        <div className="exLink0" style={{ marginRight: '40px' }} onClick={() => {
                            window.open(`https://github.com/baklavaspace`, '_blank')
                        }}><div className="mb-1"><img src={git} width="20" height="20" align="left" alt="" /></div>
                        </div>
                        <div className="exLink0" style={{ marginRight: '0px' }} onClick={() => {
                            window.open(`https://discord.gg/E6aYX5ukAw`, '_blank')
                        }}><div className="mb-1"><img src={discord} width="20" height="20" align="left" alt="" /></div>
                        </div>
                    </div>
                </div><br /><br />
            </footer>
        );
    }
}

export default Footer;