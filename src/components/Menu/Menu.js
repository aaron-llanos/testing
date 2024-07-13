'use client';

import './menu.scss'

import { useState } from "react";

import Link from 'next/link'

import Nav from '../Nav/Nav';
import Social from "@/components/Social/Social";

import { dynamicClass } from '@/helpers/dynamic-class';

export default function Menu({ children, onMenu, css }) {

  // Menu animation
  const [showMenu, setShowMenu] = useState(onMenu || false);
  const [translateMenu, setTranslateMenu] = useState('100');
  const [translatePage, setTranslatePage] = useState('100');
  const [zIndex, setZIndex] = useState('0');
  const [time, setTime] = useState('1');
  const [showPortfolio, setShowPortfolio] = useState(false);

  const closeMenu = () => {
    setShowMenu(false)
    setTimeout(() => {
      setTime('0')
      setTranslateMenu('100')
      setTranslatePage('20')
      setZIndex('1')
    }, 1000);
    setTime(1)
  }

  const openMenu = () => {
    setShowMenu(true)
    setTimeout(() => {
      setTime('0')
      setTranslateMenu('20')
      setTranslatePage('100')
      setZIndex('0')
    }, 1000);
    setTime(1)
  }

  return (
    <div className="menu-principal">
      <div className="animation-reference"></div>

      <div
        className="complete-menu"
        style={{
          zIndex: zIndex,
          transitionDuration: `${time}s`,
          transform: showMenu ? 'none' : `translate(${translateMenu}%, 0px)`
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/">
            <img
              atl="Agador logo"
              className="menu-agador"
              src="/agador-white-logo.png"
              style={{ 'width': '250px' }}
          />
          </Link>
          <img
            alt="close"
            width="30"
            src="/close.png"
            onClick={closeMenu}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <ul>
          <li><h2><Link href="/our-history">About Us</Link></h2></li>

          <li className="accordion">
            <div className="accordion__title" onClick={() => setShowPortfolio(!showPortfolio)}>
              <h2>Portfolio</h2>
              <img
                alt="arrow"
                width="18px"
                height="12px"
                src="/mini-arrow.png"
                className={dynamicClass(!showPortfolio, 'rotate')}
              />
            </div>
            <div className={`links ${dynamicClass(showPortfolio, 'show')}`}>
              <Link href="/portfolio/us"><p>U.S</p></Link>
              <Link href="/portfolio/mx"><p>México</p></Link>
            </div>
          </li>

          <li><h2><Link href="/investors">Investors login</Link></h2></li>
          {/* <li><h2><Link href="/team">Team</Link></h2></li> */}
          {/* <li><h2><Link href="/news">News</Link></h2></li> */}
          <li><h2><Link href="/contact">Contact</Link></h2>
          </li>
        </ul>

        <div className="details">
          <div className="contact">
            <h3>CONTACT DETAILS</h3>
            <p>EMAIL: INFO@ASDEVGROUP.COM</p>
            <p>PHONE: <span style={{ textDecoration: 'underline' }}>(305)-974-2418</span></p>
          </div>
          <Social />
        </div>
      </div>

      <div
        className={`container-principal ${dynamicClass(css, css)}`}
        style={{
          transform: showMenu ? `translate(-${translatePage}%, 0px)` : 'none',
          transitionDuration: `${time}s`
        }}
      >
        <Nav openMenu={openMenu} />

        {children}
      </div>
    </div>
  );
}

