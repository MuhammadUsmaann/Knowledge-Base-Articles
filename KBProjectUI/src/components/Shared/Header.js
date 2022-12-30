import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Header extends Component {
	render() {
		const { fixNavbar, darkHeader } = this.props;
		return (
			<>
				<div
					id="page_top"
					// className={isFixNavbar ? "sticky-top" : "" + this.props.dataFromParent === 'dark' ? 'section-body top_dark' : 'section-body'}
					className={`section-body ${fixNavbar ? "sticky-top" : ""} ${darkHeader ? "top_dark" : ""}`}
				>
					<div className="container-fluid">
						<div className="page-header justify-content-between justify-content-sm-start position-relative	">
							<div className="left">
								<NavLink to="/">
									<h1 className="page-title">KB-Articles</h1>
								</NavLink>

							</div>

							<nav class="navbar navbar-expand-sm navbar-light">
								<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
									<span class="navbar-toggler-icon"></span>
								</button>
								<div class="collapse navbar-collapse navbar-show" id="navbarTogglerDemo01">
									<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
										<li className="nav-item">
											<NavLink to="/" class="nav-link"> <i class="dropdown-icon icon-home"></i>  Home</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/users" class="nav-link"> <i class="dropdown-icon icon-user"></i> Users</NavLink>
										</li>
										<li className="nav-item">
											<NavLink to="/articles" class="nav-link"> <i class="dropdown-icon icon-briefcase"></i>  Articles</NavLink>
										</li>
										<li className="nav-item d-block d-sm-none">
											<NavLink to="/profile" className="">
												<i className="dropdown-icon fe fe-user" /> Profile
											</NavLink>										</li>
										<li className="nav-item d-block d-sm-none">
											<NavLink to="/login" className="">
												<i className="dropdown-icon fe fe-log-out" /> Sign out
											</NavLink>										</li>
									</ul>
									<ul className="nav nav-pills">

									</ul>
								</div>
							</nav>
							<div className="right d-sm-block d-none">
								<div className="notification d-flex">
									<div className="dropdown d-flex">
										<a
											href="/#"
											className="nav-link icon btn btn-default btn-icon ml-1"
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
			</>
		);
	}
}


const mapDispatchToProps = dispatch => ({})
export default connect(mapDispatchToProps)(Header);