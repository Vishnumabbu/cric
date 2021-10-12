import React from 'react';
import { Row, Col } from 'antd';
import './Footer.css';

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-wrap">
        <Row>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2 style={{color:'white'}}>Instagram</h2>
              <div>
                <a target="_blank " href="https://www.instagram.com/bharath_veldi/">
                  Bharath
                </a>
              </div>
              <div>
                <a target="_blank " href="https://www.instagram.com/vishnuvardhan_1111/">Vishnuvardhan</a>
              </div>
              <div>
                <a target="_blank " href="https://www.instagram.com/_sadiq_pasha/">Sadiq Pasha</a>
              </div>
              <div>
                <a target="_blank " href="https://www.instagram.com/____ravi__teja_____/">
                  RaviTeja
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2 style={{color:'white'}}>Facebook</h2>
              <div>
                <a target="_blank" href="https://www.facebook.com/veldi.kuchulu">Bharath</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/vishnuvardhan.reddy.9461">Vishnuvardhan</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/sadiqpasha0102">Sadiq Pasha</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/raviteja.madipadiga">RaviTeja</a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2 style={{color:'white'}}>Get to know Us</h2>
              <div>
                <a href="/changelog">
                  About Us
                </a>
              </div>
              <div>
                <a rel="noopener noreferrer" href="/changelog">
                  Careers
                </a>
              </div>
              <div>
                <a rel="noopener noreferrer" href="/changelog">
                  Releases
                </a>
              </div>
              <div>
                <a rel="noopener noreferrer" href="/changelog">
                  Gifts
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2 style={{color:'white'}}>
                <img className="title-icon" src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg" alt="" />
                Help
              </h2>
              <div>
                <a rel="noopener noreferrer"href="/changelog">Help</a>

              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className="bottom-bar" style={{marginTop:30}}>
        <Col lg={4} sm={24} />
        <Col lg={20} sm={24}>          
          <span style={{ marginRight: 270 }}>Copyright © ecsports</span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;