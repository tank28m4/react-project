import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer" style={{backgroundColor: '#f5f9fc'}}>
      <div className="container">
        <div className="w-layout-grid footer-grid">
          <div id="w-node-_67f7db32-28d2-9f37-8b84-a159dcc6da5a-dcc6da57" className="footer-column">
            <img src="https://cdn.prod.website-files.com/5e865e09d8efa3310676b585/5e865e09d8efa341ab76b5e7_Logo.svg" width="40" alt="" className="footer-logo"/>
            <p>Takeaway &amp; Delivery template<br/>for small - medium businesses. </p>
          </div>
          <div id="w-node-_67f7db32-28d2-9f37-8b84-a159dcc6da5e-dcc6da57" className="footer-column">
            <div className="title">company</div>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/" className="footer-link">Order</Link>
            <Link to="/" className="footer-link">FAQ</Link>
            <a href="mailto:hello@website.com?subject=Hi" className="footer-link">Contact</a>
          </div>
          <div id="w-node-_67f7db32-28d2-9f37-8b84-a159dcc6da69-dcc6da57" className="footer-column">
            <div className="title">TEMPLATE</div>
            <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="footer-link">Style Guide</a>
            <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="footer-link">Changelog</a>
            <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="footer-link">Licence</a>
            <a href="https://www.google.com/" target="_blank" rel="noreferrer" className="footer-link">Webflow University</a>
          </div>
          <div id="w-node-_67f7db32-28d2-9f37-8b84-a159dcc6da72-dcc6da57" className="footer-column">
            <div className="title">FLOWBASE </div>
            <Link to="/" className="footer-link">More Cloneables</Link>
          </div>
        </div>
        <div className="footer-legal">
          <div className="footer-detail-left">
            <div className="legal">Built by <Link to="/" className="webflow-link">Flowbase</Link> · Powered by <Link to="/" className="webflow-link">Webflow</Link></div>
          </div>
          <div className="footer-detail-right">
            <div className="social-icon-wrap">
              <Link to="/" className="social-link w-inline-block">
                <img src="https://cdn.prod.website-files.com/5e360a99f4dd53fd793925af/5e362b9c121267b0fabbef18_social-instagram.svg" alt="" className="social-icon"/>
              </Link>
              <Link to="/" className="social-link w-inline-block">
                <img src="https://cdn.prod.website-files.com/5e360a99f4dd53fd793925af/5e362b9cf4dd53d8073a05cd_social-twitter.svg" alt="" className="social-icon"/>
              </Link>
              <Link to="/" className="social-link w-inline-block">
                <img src="https://cdn.prod.website-files.com/5e360a99f4dd53fd793925af/5e362b9c7c077b1740e27d28_social-youtube.svg" alt="" className="social-icon"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer; 