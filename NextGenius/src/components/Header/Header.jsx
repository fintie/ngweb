import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import logo from 'assets/img/logo.png';
const links=[['/service','Solutions'],['/use-cases','Projects'],['/opc','Start an OPC'],['/community','Community'],['/about','About']];
class Header extends React.Component {
  state={open:false};
  componentDidMount(){window.scrollTo({top:0,left:0,behavior:"instant"});}
  componentDidUpdate(prev){if(prev.location.pathname!==this.props.location.pathname){window.scrollTo({top:0,left:0,behavior:"instant"});if(this.state.open)this.setState({open:false});}}
  skipToContent=e=>{e.preventDefault();const target=document.getElementById("main-content")||document.querySelector("h1,h2");if(target){target.setAttribute("tabindex","-1");target.focus();target.scrollIntoView({block:"start"});}};
  render(){return <header className="ng-header"><a className="ng-skip" href="#main-content" onClick={this.skipToContent}>Skip to content</a><div className="ng-nav"><Link to="/" aria-label="NextGenius home"><img src={logo} alt="NextGenius" width="150" height="60"/></Link><button className="ng-menu" aria-expanded={this.state.open} aria-controls="ng-navigation" onClick={()=>this.setState({open:!this.state.open})}>{this.state.open?'Close':'Menu'}</button><nav id="ng-navigation" aria-label="Main navigation" className={this.state.open?'is-open':''}>{links.map(([to,label])=><Link key={to} to={to} aria-current={this.props.location.pathname===to?'page':undefined}>{label}</Link>)}<Link className="ng-button" to="/contact">Request a call <span aria-hidden="true">↗</span></Link></nav></div></header>;}
}
export default withRouter(Header);
