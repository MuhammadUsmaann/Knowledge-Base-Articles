import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

class Header extends Component {
	render() {
		const { fixNavbar, darkHeader } = this.props;
		return (
			<div>
				<div
					id="page_top"
					// className={isFixNavbar ? "sticky-top" : "" + this.props.dataFromParent === 'dark' ? 'section-body top_dark' : 'section-body'}
					className={`section-body ${fixNavbar ? "sticky-top" : ""} ${darkHeader ? "top_dark" : ""}`}
				>
					<div className="container-fluid">
						<div className="page-header">
							<div className="left">
								<h1 className="page-title">KB-Articles :: {this.props.dataFromSubParent}</h1>
							</div>
							<div className="right">  
							<ul className="nav nav-pills">
									<li className="nav-item">
										<Link to="/" class="nav-link"> <i class="icon-home"></i>  Home</Link>
										
									</li>
									<li className="nav-item">
										<Link to="/users" class="nav-link"> <i class="icon-user"></i> Users</Link>
									</li>
									<li className="nav-item">
										<Link to="/articles" class="nav-link"> <i class="icon-briefcase"></i>  Articles</Link>
										
									</li>
								</ul>
								<div className="notification d-flex">
									<div className="dropdown d-flex">
										<a
											href="/#"
											className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1"
											data-toggle="dropdown"
										>
											<i className="fa fa-user" />
										</a>
										<div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
											<NavLink to="/profile" className="dropdown-item">
												<i className="dropdown-icon fe fe-user" /> Profile
											</NavLink>
											<NavLink to="/login" className="dropdown-item">
												<i className="dropdown-icon fe fe-log-out" /> Sign out
											</NavLink>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	fixNavbar: state.settings.isFixNavbar,
	darkHeader: state.settings.isDarkHeader
})

const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Header);