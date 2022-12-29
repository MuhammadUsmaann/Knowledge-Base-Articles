import React, { Component } from 'react';
import { connect } from 'react-redux';
import MetisMenu from 'react-metismenu';
import { Switch, Route, NavLink } from 'react-router-dom';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import DefaultLink from './DefaultLink';


import {
	darkModeAction, darkHeaderAction, fixNavbarAction,
	darkMinSidebarAction, darkSidebarAction, iconColorAction,
	gradientColorAction, rtlAction, fontAction,
	subMenuIconAction,
	menuIconAction,
	boxLayoutAction,
	statisticsAction, friendListAction,
	statisticsCloseAction, friendListCloseAction, toggleLeftMenuAction
} from '../../actions/settingsAction';
import Routes from '../Route';


const masterNone = {
	display: 'none',
};

const masterBlock = {
	display: 'block',
};

class Menu extends Component {
	constructor(props) {
		super(props);
		this.toggleLeftMenu = this.toggleLeftMenu.bind(this);
		this.toggleUserMenu = this.toggleUserMenu.bind(this);
		this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
		this.toggleSubMenu = this.toggleSubMenu.bind(this);
		this.handleDarkMode = this.handleDarkMode.bind(this);
		this.handleFixNavbar = this.handleFixNavbar.bind(this);
		this.handleDarkHeader = this.handleDarkHeader.bind(this);
		this.handleMinSidebar = this.handleMinSidebar.bind(this);
		this.handleSidebar = this.handleSidebar.bind(this);
		this.handleIconColor = this.handleIconColor.bind(this);
		this.handleGradientColor = this.handleGradientColor.bind(this);
		this.handleRtl = this.handleRtl.bind(this);
		this.handleFont = this.handleFont.bind(this);
		this.handleStatistics = this.handleStatistics.bind(this);
		this.handleFriendList = this.handleFriendList.bind(this);
		this.closeFriendList = this.closeFriendList.bind(this);
		this.closeStatistics = this.closeStatistics.bind(this);
		this.handleBoxLayout = this.handleBoxLayout.bind(this);
		this.handler = this.handler.bind(this);
		this.state = {
			isToggleLeftMenu: false,
			isOpenUserMenu: false,
			isOpenRightSidebar: false,
			isBoxLayout: false,
			parentlink: null,
			childlink: null,
		};
	}

	componentDidMount() {
		const { location } = this.props;
		const links = location.pathname.substring(1).split(/-(.+)/);
		const parentlink = links[0];
		const nochildlink = links[1];

		if (parentlink && nochildlink && nochildlink === 'dashboard') {
			this.handler(parentlink, `${parentlink}${nochildlink}`);
		} else if (parentlink && nochildlink && nochildlink !== 'dashboard') {
			this.handler(parentlink, nochildlink);
		} else if (parentlink) {
			this.handler(parentlink, '');
		} else {
			this.handler('hr', 'dashboard');
		}
	}

	componentDidUpdate(prevprops, prevstate) {
		const { location } = this.props;
		const links = location.pathname.substring(1).split(/-(.+)/);
		const parentlink = links[0];
		const nochildlink = links[1];
		if (prevprops.location !== location) {
			if (parentlink && nochildlink && nochildlink === 'dashboard') {
				this.handler(parentlink, `${parentlink}${nochildlink}`);
			} else if (parentlink && nochildlink && nochildlink !== 'dashboard') {
				this.handler(parentlink, nochildlink);
			} else if (parentlink) {
				this.handler(parentlink, '');
			} else {
				this.handler('hr', 'dashboard');
			}
		}
	}

	handler(parentlink, nochildlink) {
		this.setState({
			parentlink: parentlink,
			childlink: nochildlink,
		});
	}

	handleDarkMode(e) {
		this.props.darkModeAction(e.target.checked)
	}
	handleFixNavbar(e) {
		this.props.fixNavbarAction(e.target.checked)
	}
	handleDarkHeader(e) {
		this.props.darkHeaderAction(e.target.checked)
	}
	handleMinSidebar(e) {
		this.props.darkMinSidebarAction(e.target.checked)
	}
	handleSidebar(e) {
		this.props.darkSidebarAction(e.target.checked)
	}
	handleIconColor(e) {
		this.props.iconColorAction(e.target.checked)
	}
	handleGradientColor(e) {
		this.props.gradientColorAction(e.target.checked)
	}
	handleRtl(e) {
		this.props.rtlAction(e.target.checked)
	}
	handleFont(e) {
		this.props.fontAction(e)
	}
	handleFriendList(e) {
		this.props.friendListAction(e)
	}
	handleStatistics(e) {
		this.props.statisticsAction(e)
	}
	closeFriendList(e) {
		this.props.friendListCloseAction(e)
	}
	closeStatistics(e) {
		this.props.statisticsCloseAction(e)
	}
	handleSubMenuIcon(e) {
		this.props.subMenuIconAction(e)
	}
	handleMenuIcon(e) {
		this.props.menuIconAction(e)
	}
	handleBoxLayout(e) {
		this.props.boxLayoutAction(e.target.checked)
	}
	toggleLeftMenu(e) {
		console.log(e, 'asdasdada')
		this.props.toggleLeftMenuAction(e)
	}
	toggleRightSidebar() {
		this.setState({ isOpenRightSidebar: !this.state.isOpenRightSidebar })
	}
	toggleUserMenu() {
		this.setState({ isOpenUserMenu: !this.state.isOpenUserMenu })
	}
	toggleSubMenu(e) {
		let menucClass = ''
		if (e.itemId) {
			const subClass = e.items.map((menuItem, i) => {
				if (menuItem.to === this.props.location.pathname) {
					menucClass = "in";
				} else {
					menucClass = "collapse";
				}
				return menucClass
			})
			return subClass
			// return "collapse";
		} else {
			return e.visible ? "collapse" : "metismenu";
		}
	}

	render() {
		const content = [
			{
				"id": 'Directories',
				"label": "Directories"
			},
			{
				"id": 1,
				"icon": "icon-rocket",
				"label": "HRMS",
				"to": "#!",
				content: [
					{
						"id": 3,
						"label": "Dashboard",
						"to": "/"
					},
					{
						"id": 4,
						"label": "Users",
						"to": "/hr-users"
					},
					{
						"id": 5,
						"label": "Department",
						"to": "/hr-department"
					},
					{
						"id": 6,
						"label": "Employee",
						"to": "/hr-employee"
					},
					{
						"id": 7,
						"label": "Activities",
						"to": "/hr-activities"
					},
					{
						"id": 8,
						"label": "Holidays",
						"to": "/hr-holidays"
					},
					{
						"id": 9,
						"label": "Events",
						"to": "/hr-events"
					},
					{
						"id": 10,
						"label": "Payroll",
						"to": "/hr-payroll"
					},
					{
						"id": 11,
						"label": "Accounts",
						"to": "/hr-accounts"
					},
					{
						"id": 12,
						"label": "Report",
						"to": "/hr-report"
					}
				]
			},
			{
				"id": 13,
				"icon": "icon-cup",
				"label": "Project",
				content: [
					{
						"id": 14,
						"label": "Dashboard",
						"to": "/project-dashboard"
					},
					{
						"id": 15,
						"label": "Project List",
						"to": "/project-list"
					},
					{
						"id": 16,
						"label": "Taskboard",
						"to": "/project-taskboard"
					},
					{
						"id": 17,
						"label": "Ticket List",
						"to": "/project-ticket"
					},
					{
						"id": 18,
						"label": "Ticket Details",
						"to": "/project-ticket-details"
					},
					{
						"id": 19,
						"label": "Clients",
						"to": "/project-clients"
					},
					{
						"id": 20,
						"label": "Todo List",
						"to": "/project-todo"
					}
				]
			},
			{
				"id": 21,
				"icon": "icon-briefcase",
				"label": "Job Portal",
				content: [
					{
						"id": 22,
						"label": "Job Dashboard",
						"to": "/jobportal-dashboard"
					},
					{
						"id": 23,
						"label": "Positions",
						"to": "/jobportal-positions"
					},
					{
						"id": 24,
						"label": "Applicant",
						"to": "/jobportal-applicants"
					},
					{
						"id": 25,
						"label": "Resumes",
						"to": "/jobportal-resumes"
					},
					{
						"id": 26,
						"label": "Settings",
						"to": "/jobportal-settings"
					}
				]
			},
			{
				"id": 27,
				"icon": "icon-lock",
				"label": "Authentication",
				content: [
					{
						"id": 28,
						"label": "Login",
						"to": "/login"
					},
					{
						"id": 29,
						"label": "Register",
						"to": "/signup"
					},
					{
						"id": 30,
						"label": "Forgot Password",
						"to": "/forgotpassword"
					},
					{
						"id": 31,
						"label": "404 error",
						"to": "/notfound"
					},
					{
						"id": 32,
						"label": "500 Error",
						"to": "/internalserver"
					}
				]
			},
			{
				"id": 'UiElements',
				"label": "Ui Elements"
			},
			{
				"id": 33,
				"icon": "icon-tag",
				"label": "Icons",
				"to": "/icons",
			},
			{
				"id": 34,
				"icon": "icon-bar-chart",
				"label": "Charts",
				"to": "/charts",
			},
			{
				"id": 35,
				"icon": "icon-layers",
				"label": "Forms",
				"to": "/forms",
			},
			{
				"id": 36,
				"icon": "icon-tag",
				"label": "Tables",
				"to": "/tables",
			},
			{
				"id": 37,
				"icon": "icon-puzzle",
				"label": "Widgets",
				"to": "/widgets",
			},
			{
				"id": 38,
				"icon": "icon-map",
				"label": "Maps",
				"to": "/maps",
			},
			{
				"id": 39,
				"icon": "icon-picture",
				"label": "Gallery",
				"to": "/gallery",
			},
		];
		const { isOpenRightSidebar, isOpenUserMenu } = this.state
		const { darkMinSidebar, istoggleLeftMenu, friendListOpen, statisticsOpen, statisticsClose, friendListClose } = this.props
		const pageHeading = Routes.filter((route) => route.path === this.props.location.pathname)
		
		return (
			<>
				<div className={`${istoggleLeftMenu ? "offcanvas-active" : ""}`}>
					<div style={this.state.parentlink === 'login' ? masterNone : masterBlock}>
						<div className="theme_div">
							<div className="card">
								<div className="card-body">
									<ul className="list-group list-unstyled">
										<li className="list-group-item mb-2">
											<p>Default Theme</p>
											<a href="../main/index.html">
												<img
													src="/assets/images/themes/default.png"
													className="img-fluid"
													alt="fake_url"
												/>
											</a>
										</li>
										<li className="list-group-item mb-2">
											<p>Night Mode Theme</p>
											<a href="../dark/index.html">
												<img
													src="/assets/images/themes/dark.png"
													className="img-fluid"
													alt="fake_url"
												/>
											</a>
										</li>
										<li className="list-group-item mb-2">
											<p>RTL Version</p>
											<a href="../rtl/index.html">
												<img
													src="/assets/images/themes/rtl.png"
													className="img-fluid"
													alt="fake_url"
												/>
											</a>
										</li>
										<li className="list-group-item mb-2">
											<p>Theme Version2</p>
											<a href="../theme2/index.html">
												<img
													src="/assets/images/themes/theme2.png"
													className="img-fluid"
													alt="fake_url"
												/>
											</a>
										</li>
										<li className="list-group-item mb-2">
											<p>Theme Version3</p>
											<a href="../theme3/index.html">
												<img
													src="/assets/images/themes/theme3.png"
													className="img-fluid"
													alt="fake_url"
												/>
											</a>
										</li>
										<li className="list-group-item mb-2">
											<p>Theme Version4</p>
											<a href="../theme4/index.html">
												<img
													src="/assets/images/themes/theme4.png"
													className="img-fluid"
													alt="fake_url"
												/>
											</a>
										</li>
										<li className="list-group-item mb-2">
											<p>Horizontal Version</p>
											<a href="../horizontal/index.html">
												<img
													src="/assets/images/themes/horizontal.png"
													className="img-fluid"
													alt="fake_url"
												/>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						
						<div id="left-sidebar" className="sidebar ">
							<h5 className="brand-name">KB Articles</h5>
							<nav id="left-sidebar-nav" className="sidebar-nav">
								<MetisMenu className=""
									content={content}
									noBuiltInClassNames={true}
									classNameContainer={(e) => this.toggleSubMenu(e)}
									classNameContainerVisible="in"
									classNameItemActive="active"
									classNameLinkActive="active"
									// classNameItemHasActiveChild="active"
									classNameItemHasVisibleChild="active"
									classNameLink="has-arrow arrow-c"
									// classNameIcon
									// classNameStateIcon

									iconNamePrefix=""
									// iconNameStateHidden=""
									LinkComponent={(e) => <DefaultLink itemProps={e} />}
								// toggleSubMenu={this.toggleSubMenu}
								/>

							</nav>
						</div>
					</div>

					<div className="page">
						<Header dataFromParent={this.props.dataFromParent} dataFromSubParent={pageHeading[0].pageTitle} />
						<Switch>
							{Routes.map((layout, i) => {
								return <Route key={i} exact={layout.exact} path={layout.path} component={layout.component}></Route>
							})}
							{/* <Dashboard action={this.handler} dataFromParent={'dark'} /> */}
							{/* <Route exact path="/hr-users" component={Users}>
					</Route>
					<Route exact path="/hr-department">
						<Departments dataFromParent={'dark'} />
					</Route>
					<Route exact path="/hr-employee">
						<Employee dataFromParent={'dark'} />
					</Route>
					<Route exact path="/hr-events">
						<Events dataFromParent={'dark'} />
					</Route>
					<Route exact path="/hr-holidays">
						<Holidays dataFromParent={'dark'} />
					</Route>
					<Route exact path="/hr-activities">
						<Activities dataFromParent={'dark'} />
					</Route>
					<Route exact path="/hr-payroll">
						<Payroll dataFromParent={'dark'} />
					</Route>
					<Route exact path="/hr-accounts">
						<Accounts dataFromParent={'dark'} />
					</Route>
					<Route exact path="/hr-report">
						<Report dataFromParent={'dark'} />
					</Route>

					<Route exact path="/project-dashboard">
						<ProjectDashboard dataFromParent={'dark'} />
					</Route>
					<Route exact path="/project-list">
						<ProjectList dataFromParent={'dark'} />
					</Route>
					<Route exact path="/project-taskboard">
						<Taskboard dataFromParent={'dark'} />
					</Route>
					<Route exact path="/project-ticket">
						<TicketList dataFromParent={'dark'} />
					</Route>
					<Route exact path="/project-ticket-details">
						<TicketDetails dataFromParent={'dark'} />
					</Route>
					<Route exact path="/project-clients">
						<Clients dataFromParent={'dark'} />
					</Route>
					<Route exact path="/project-todo">
						<TodoList dataFromParent={'dark'} />
					</Route>

					<Route exact path="/jobportal-dashboard">
						<JobPortalDashboard dataFromParent={'dark'} />
					</Route>
					<Route exact path="/jobportal-applicants">
						<Applicants dataFromParent={'dark'} />
					</Route>
					<Route exact path="/jobportal-positions">
						<Positions dataFromParent={'dark'} />
					</Route>
					<Route exact path="/jobportal-resumes">
						<Resumes dataFromParent={'dark'} />
					</Route>
					<Route exact path="/jobportal-settings">
						<Settings dataFromParent={'dark'} />
					</Route>

					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
					<Route path="/forgotpassword" component={ForgotPassword} />
					<Route path="/notfound" component={NotFound} />
					<Route path="/internalserver" component={InternalServer} />

					<Route exact path="/icons">
						<Icons dataFromParent={''} />
					</Route>
					<Route exact path="/icons-feather">
						<IconsFeather dataFromParent={''} />
					</Route>
					<Route exact path="/icons-line">
						<IconsLine dataFromParent={''} />
					</Route>
					<Route exact path="/icons-flag">
						<IconsFlags dataFromParent={''} />
					</Route>
					<Route exact path="/icons-payments">
						<IconsPayments dataFromParent={''} />
					</Route>

					<Route exact path="/charts">
						<Charts dataFromParent={''} />
					</Route>
					<Route exact path="/charts-e">
						<ChartsE dataFromParent={''} />
					</Route>
					<Route exact path="/charts-c3">
						<ChartsC3 dataFromParent={''} />
					</Route>
					<Route exact path="/charts-knob">
						<ChartsKnob dataFromParent={''} />
					</Route>
					<Route exact path="/charts-sparkline">
						<ChartsSparkline dataFromParent={''} />
					</Route>

					<Route exact path="/forms">
						<Forms dataFromParent={''} />
					</Route>
					<Route exact path="/form-advanced">
						<FormAdvanced dataFromParent={''} />
					</Route>
					<Route exact path="/form-validation">
						<FormValidation dataFromParent={''} />
					</Route>
					<Route exact path="/form-wizard">
						<FormWizard dataFromParent={''} />
					</Route>
					<Route exact path="/form-summernote">
						<FormSummernote dataFromParent={''} />
					</Route>

					<Route exact path="/gallery">
						<Gallery dataFromParent={'dark'} />
					</Route>
					<Route exact path="/maps">
						<Maps dataFromParent={'dark'} />
					</Route> */}

							{/* <Route exact path="/tables">
						<Tables dataFromParent={''} />
					</Route>
					<Route exact path="/tables-datatable">
						<DataTables dataFromParent={''} />
					</Route>
					<Route exact path="/tables-color">
						<TablesColor dataFromParent={''} />
					</Route>
					<Route exact path="/tables-basic">
						<TablesBasic dataFromParent={''} />
					</Route>

					<Route exact path="/widgets">
						<Widgets dataFromParent={'dark'} />
					</Route>
					<Route exact path="/w-card">
						<WCard dataFromParent={'dark'} />
					</Route>
					<Route exact path="/w-statistics">
						<WStatistics dataFromParent={'dark'} />
					</Route>
					<Route exact path="/w-data">
						<WData dataFromParent={'dark'} />
					</Route>
					<Route exact path="/w-social">
						<WSocial dataFromParent={'dark'} />
					</Route>
					<Route exact path="/w-other">
						<WOther dataFromParent={'dark'} />
					</Route>

					<Route exact path="/page-search">
						<Search dataFromParent={''} />
					</Route>
					<Route exact path="/profile">
						<Profile dataFromParent={'dark'} />
					</Route>

					<Route exact path="/app-calendar">
						<AppCalender dataFromParent={'dark'} />
					</Route>
					<Route exact path="/app-contact">
						<AppContact dataFromParent={'dark'} />
					</Route>
					<Route exact path="/app-chat">
						<AppChart dataFromParent={'dark'} />
					</Route>
					<Route exact path="/app-filemanager">
						<AppFileManager dataFromParent={'dark'} />
					</Route>
					<Route exact path="/app-setting">
						<AppSetting dataFromParent={'dark'} />
					</Route> */}
						</Switch>
						<Footer />
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => ({
	darkMinSidebar: state.settings.isMinSidebar,
	statisticsOpen: state.settings.isStatistics,
	friendListOpen: state.settings.isFriendList,
	statisticsClose: state.settings.isStatisticsClose,
	friendListClose: state.settings.isFriendListClose,
	istoggleLeftMenu: state.settings.isToggleLeftMenu
})

const mapDispatchToProps = dispatch => ({
	darkModeAction: (e) => dispatch(darkModeAction(e)),
	darkHeaderAction: (e) => dispatch(darkHeaderAction(e)),
	fixNavbarAction: (e) => dispatch(fixNavbarAction(e)),
	darkMinSidebarAction: (e) => dispatch(darkMinSidebarAction(e)),
	darkSidebarAction: (e) => dispatch(darkSidebarAction(e)),
	iconColorAction: (e) => dispatch(iconColorAction(e)),
	gradientColorAction: (e) => dispatch(gradientColorAction(e)),
	rtlAction: (e) => dispatch(rtlAction(e)),
	fontAction: (e) => dispatch(fontAction(e)),
	subMenuIconAction: (e) => dispatch(subMenuIconAction(e)),
	menuIconAction: (e) => dispatch(menuIconAction(e)),
	boxLayoutAction: (e) => dispatch(boxLayoutAction(e)),
	statisticsAction: (e) => dispatch(statisticsAction(e)),
	friendListAction: (e) => dispatch(friendListAction(e)),
	statisticsCloseAction: (e) => dispatch(statisticsCloseAction(e)),
	friendListCloseAction: (e) => dispatch(friendListCloseAction(e)),
	toggleLeftMenuAction: (e) => dispatch(toggleLeftMenuAction(e))
})
export default connect(mapStateToProps, mapDispatchToProps)(Menu);