import React, { Component } from 'react'
import './App.css';
import MediaQuery from 'react-responsive';
import discord from './images/Discord.svg'
import twitter from './images/Twitter.svg'
import git from './images/Github.svg'
import email from './images/Email.svg'
import telegram from './images/Telegram.svg'
import youtube from './images/YouTube.svg'

class Footer extends Component {

    render() {
        return (
            <footer className="bottom" style={{ height: "30px", position: "fixed", width: "100%", bottom: "0", zIndex: "999", backgroundColor: "black" }}>
                <div style={{ height: '30px', padding: '0 32px' }}>
                    <p className="copyright" style={{ marginBottom: '0px' }}>Copyright © 2023 MarginX. All Rights Reserved. Powered by Function X.</p>
                    <MediaQuery minWidth={1201}>
                        <p className="link rowS" style={{ marginBottom: '0px' }}>
                            <span className='footer-link-item'>
                                <a href="https://t.me/+GiT9MPWQaPU2ZGU9" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://t.me/+GiT9MPWQaPU2ZGU9`, '_blank')
                                }}><img src={telegram} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="https://www.youtube.com/channel/UCJ8ggaUjfS5at6_toTJM8yg" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://www.youtube.com/channel/UCJ8ggaUjfS5at6_toTJM8yg`, '_blank')
                                }}><img src={youtube} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="https://twitter.com/marginx_io" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://twitter.com/marginx_io`, '_blank')
                                }}><img src={twitter} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="https://discord.com/invite/7yUjqadZFq" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://discord.com/invite/7yUjqadZFq`, '_blank')
                                }}><img src={discord} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="https://github.com/marginxio" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://github.com/marginxio`, '_blank')
                                }}><img src={git} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="mailto:hello@marginx.io" style={{ cursor: 'pointer', marginRight: '0px' }} onClick={() => {
                                    window.open(`https://outlook.live.com/mail/0/deeplink/compose?mailtouri=mailto%3ahello%40marginx.io`, '_blank')
                                }}><img src={email} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                        </p>
                    </MediaQuery>
                    <MediaQuery maxWidth={1200}>
                        <p className="linkCenter rowS" style={{ marginBottom: '0px' }}>
                            <span className='footer-link-item'>
                                <a href="https://t.me/+GiT9MPWQaPU2ZGU9" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://t.me/+GiT9MPWQaPU2ZGU9`, '_blank')
                                }}><img src={telegram} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="https://www.youtube.com/channel/UCJ8ggaUjfS5at6_toTJM8yg" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://www.youtube.com/channel/UCJ8ggaUjfS5at6_toTJM8yg`, '_blank')
                                }}><img src={youtube} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="https://twitter.com/marginx_io" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://twitter.com/marginx_io`, '_blank')
                                }}><img src={twitter} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="https://discord.com/invite/7yUjqadZFq" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://discord.com/invite/7yUjqadZFq`, '_blank')
                                }}><img src={discord} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="https://github.com/marginxio" style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => {
                                    window.open(`https://github.com/marginxio`, '_blank')
                                }}><img src={git} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                            <span className='footer-link-item'>
                                <a href="mailto:hello@marginx.io" style={{ cursor: 'pointer', marginRight: '0px' }} onClick={() => {
                                    window.open(`https://outlook.live.com/mail/0/deeplink/compose?mailtouri=mailto%3ahello%40marginx.io`, '_blank')
                                }}><img src={email} width="20" height="20" align="left" alt="" />
                                </a>
                            </span>
                        </p>
                    </MediaQuery>
                </div>
            </footer>
        );
    }
}

export default Footer;