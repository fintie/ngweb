import React from 'react';
import {Link} from 'react-router-dom';
import Header from 'components/Header/Header.jsx';
import Footer from 'components/Footer/Footer.jsx';
import Seo from 'components/Seo/Seo.jsx';
import {buildOrganizationSchema} from 'components/Seo/schema';
export function Button({to,children,secondary}){return <Link className={'ng-button'+(secondary?' ng-secondary':'')} to={to}>{children}</Link>;}
export function Intro({eyebrow,title,children}){return <div className="ng-section-intro"><span className="ng-eyebrow">{eyebrow}</span><h2>{title}</h2>{children&&<p>{children}</p>}</div>;}
export function Layout({title,description,path,children}){return <div className="ng-site"><Seo title={title+' | NextGenius'} description={description} path={path} schema={buildOrganizationSchema()}/><Header/><main id="main-content" tabIndex="-1">{children}</main><Footer/></div>;}
export function Hero({eyebrow,title,children}){return <section className="ng-hero ng-compact"><div className="ng-wrap"><span className="ng-eyebrow">{eyebrow}</span><h1>{title}</h1><p>{children}</p></div></section>;}
