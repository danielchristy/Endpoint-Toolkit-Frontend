import React from 'react';
import './Hero.css';
import bccaLogo from '../../static/bcca-logos/standard-logo-with-title-transparent.png';
import wwgLogo from '../../static/wwg-logos/wwg-logo.png';

function Hero() {
  return (
    <section className='hero-container'>
      <h4>devWaypoint was made possible thanks to the support of:</h4>

      <div className='sponsors'>
        <div className='sponsor-section'>
          <div className='bcca-content'>
            <img src={bccaLogo} alt='basecamp-logo' className='basecamp-logo' />
            <a href='https://basecampcodingacademy.org/' 
            target='_blank'
            rel='noopener noreferrer'
            className='bcca-link'>
              <u>Check Out Base Camp Coding Academy Here!</u></a>
          </div>
          <div className='bcca-about'>
            <p>Base Camp Coding Academy is a non-profit organization that enable recent high school graduates 
              and adults who are working towards a career transition, or want to learn new skills.</p>
            <p>As of 2025, Base Camp has graduated six classes of recent high school graduates,
              three classes of adults, and has hosted 50+ current high school junior and senior females
              through their annual, two-day Pioneer Program.
            </p>
            <></>
            <p>Their network of 150+ graduates have connections at top companies like <b>CoreLogic</b>, <b>ADSi</b>,
              <b>C Spire</b>, <b>FedEx</b>, <b>Trustmark Bank</b>, <b>Tallahatchie Valley Electric Power Association</b>, and many more!
            </p>
            <></>
            <p>Due to their generous sponsors, all students recieve a <strong>100% scholarship</strong></p>
          </div>
        </div>
          
        <div className='sponsor-section'>
          <div className='wwg-content'>
            <img src={wwgLogo} alt='wherewego-logo' className='wherewego-logo' />
            <a href='https://wherewego.org/' 
            target='_blank'
            rel='noopener noreferrer'
            className='wwg-link'
            style={{ display: 'inline-block !important' }}>
              <u>Check Out WhereWeGo Here!</u></a>
          </div>
          <div className='wwg-about'>
            <p>WhereWeGo crafts technology solutions to advance workers and the organizations that seek to serve them.</p>
            <p>They consist of a 12-person powerhouse that is dedicated to discovering, designing, developing, and deploying transformative user experiences with emerging technologies.
            </p>
            <p>They have partnered with organizations like <b>SkillUp</b>, <b>IREC</b>, and the <b>Greater New Orleans Regional Economic Development Inc.</b> to deliver impactful solutions for enabling and providing job resources.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Hero;
