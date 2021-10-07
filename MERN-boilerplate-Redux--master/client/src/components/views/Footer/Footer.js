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
                <a target="_blank " href="https://github.com/ant-design/ant-design">
                  Bharath
                </a>
              </div>
              <div>
                <a href="http://pro.ant.design">Vishnuvardhan</a>
              </div>
              <div>
                <a href="http://mobile.ant.design">Sadiq Pasha</a>
              </div>
              <div>
                <a target="_blank " href="https://github.com/websemantics/awesome-ant-design">
                  RaviTeja
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2 style={{color:'white'}}>Twitter</h2>
              <div>
                <a href="http://scaffold.ant.design">Bharath</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva">Vishnuvardhan</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva-cli">Sadiq Pasha</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="http://motion.ant.design">RaviTeja</a>
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
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/wiki/FAQ">
                  Careers
                </a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://gitter.im/ant-design/ant-design">
                  Releases
                </a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="https://gitter.im/ant-design/ant-design-english">
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
                <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">Help</a>

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