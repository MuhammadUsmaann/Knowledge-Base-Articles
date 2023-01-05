import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUserName, getUserRole, removeTokenInLocalStorage, withRouter } from '../../lib/common';
import { APP_ROUTES } from '../../lib/constants';


class Header extends Component {

	constructor(props) {
		super(props);

		this.state = {
			Name: getUserName(),
			Role: getUserRole()
		}
	}
	handleLogout = async () => {
		try {
			removeTokenInLocalStorage();
			this.props.router.navigate(APP_ROUTES.SIGN_IN)
		}
		catch (err) {

		}
	};
	render() {

		return (
			<>
				<div
					id="page_top"
					className={`section-body`}
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
										{(this.state.Role === "SME" || this.state.Role === "ADMIN") &&
											<li className="nav-item">
												<NavLink to="/articles" class="nav-link"> <i class="dropdown-icon icon-briefcase"></i>  Articles</NavLink>
											</li>
										}
										{this.state.Role === "ADMIN" &&
											<li className="nav-item">
												<NavLink to="/users" class="nav-link"> <i class="dropdown-icon icon-user"></i> Users</NavLink>
											</li>
										}

										<li className="nav-item d-block d-sm-none">
											<span onClick={this.handleLogout} className="">
												<i className="dropdown-icon fe fe-log-out" /> Sign out
											</span>
										</li>
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
											<i className="fa fa-user" /> {this.state.Name}
										</a>
										<div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
											<span onClick={this.handleLogout} className="dropdown-item">
												<i className="dropdown-icon fe fe-log-out" /> Sign out
											</span>
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


export default withRouter(Header);