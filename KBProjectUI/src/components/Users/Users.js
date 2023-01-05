
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SendGetRequest, SendPostRequest } from '../../lib/common';
import { API_ROUTES, APP_ROUTES } from '../../lib/constants';
import AddUsers from './Addusers';


class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datalist: [''],
			firstName: "",
			lastName: "",
			email: "",
			mobileNo: "",
			role: "",
			id: 0,
			users: [],
			showResult: [],
			associatedUsers: [],
			smeUsers: [],
			isOpened:false

		}
	}

	async deletehandle(id) {
		const response = await SendGetRequest(API_ROUTES.DELETE_USER + "?id=" + id);

		if (response?.authenticated) {
			this.props.router.navigate(APP_ROUTES.SIGN_IN)
			return;
		}
		else {
			this.setState({
				users: this.state.users.filter(obj => {
					return obj.Id !== id;
				}),
				showResult: this.state.users.filter(obj => {
					return obj.Id !== id;
				})
			})
		}
	}
	handleRoleChange = event => {
		this.setState({
			role: event.target.value
		})
	};
	handleMobileNoChange = event => {
		this.setState({
			mobileNo: event.target.value
		})
	};
	handleEmailChange = event => {
		this.setState({
			email: event.target.value
		})
	};
	handleLastNameChange = event => {
		this.setState({
			lastName: event.target.value
		})
	};
	handleFirstNameChange = event => {
		this.setState({
			firstName: event.target.value
		})
	};
	handleSearchTextOnChange = async (event) => {

		if (event !== null && event !== undefined) {
			this.setState({
				showResult: this.state.users.filter(user => {
					return user.FirstName.toLowerCase().includes(event.target.value.toLowerCase().trim())
						|| user.LastName.toLowerCase().includes(event.target.value.toLowerCase().trim())
						|| user.Email.toLowerCase().includes(event.target.value.toLowerCase().trim())
						|| user.Role.toLowerCase().includes(event.target.value.toLowerCase().trim());
					//|| employee.CreatedBy.toLowerCase().includes(event.target.value.toLowerCase());
				})
			});
		}
		else {
			this.setState({
				showResult: this.state.users
			});
		}
	};
	async componentWillMount() {
		this.LoadUsersList();

	}

	async LoadUsersList() {
		const response = await SendGetRequest(API_ROUTES.GET_USERS);

		if (response?.authenticated) {
			this.props.router.navigate(APP_ROUTES.SIGN_IN)
			return;
		}
		else {
			this.setState({
				users: response,
				showResult: response,
			})
		}
	}

	handleChangeTabs = async () => {
		this.setState({
			firstName: "",
			lastName: "",
			email: "",
			mobileNo: "",
			role: "",
			id: 0,
			associatedUsers: []
		})
	}
	saveUserAndClose = async () => {
		await this.saveUser();
		this.closeUserDetail();
		this.LoadUsersList();
		
	}
	closeUserDetail = async () => {
		document.getElementById("user-list-tab").click();
		this.handleChangeTabs();
		this.setState({
			isOpened:false
		});
	}
	saveUser = async () => {
		try {
			const response = await SendPostRequest(API_ROUTES.SAVE_USER, {
				FirstName: this.state.firstName,
				LastName: this.state.lastName,
				Email: this.state.email,
				MobileNo: this.state.mobileNo,
				Role: this.state.role,
				Id: this.state.id
			});

			if (response?.authenticated) {
				this.props.router.navigate(APP_ROUTES.SIGN_IN)
				return;
			}
			else {
				alert("saved");
			}
		}
		catch (err) {
			console.log('Some error occured during signing in: ', err);
		}
		finally {
			//setIsLoading(false);
		}
	};
	handleDeleteAssociateUser = async(id)=>{
		const response = await SendGetRequest(API_ROUTES.DELETE_ASSOCIATE_USER + "?id=" + id + "&userid=" + this.state.id);

		if (response?.authenticated) {
			this.props.router.navigate(APP_ROUTES.SIGN_IN)
			return;
		}
		this.setState({
			associatedUsers: this.state.associatedUsers.filter(obj => {
				return obj.Id !== id;
			})
		})
		
	}
	LoadUserData = async (event) => {
		try {
			let id = event.target.id;
			if (event.target.tagName === "I") {
				id = event.target.parentElement.id
			}

			const response = await SendGetRequest(API_ROUTES.GET_USER + "?id=" + id);

			if (response?.authenticated) {
				this.props.router.navigate(APP_ROUTES.SIGN_IN)
				return;
			}
			else {
				this.setState({
					firstName: response.FirstName,
					lastName: response.LastName,
					email: response.Email,
					mobileNo: response.MobileNo,
					role: response.Role,
					id: response.Id,
					associatedUsers: response.AssociatedUsers ?? [],
					isOpened : true
				})
				setTimeout(function(){
					document.getElementById("user-tab").click();
				}, 100)
				
			}
		}
		catch (err) {
			console.log('Some error occured during signing in: ', err);
		}
		finally {
			//setIsLoading(false);
		}
	};

	render() {
		return (
			<>
				<div>
					<div class="section-body">
						<div className="container-fluid">
							<div className="d-flex justify-content-between align-items-center">
								<ul className="nav nav-tabs page-header-tab">
									<li className="nav-item">
										<a
											className="nav-link active"
											id="user-list-tab"
											data-toggle="tab"
											href="#user-list"
											// onClick={this.handleChangeTabs}
										>
											List
										</a>
									</li>
									{this.state.isOpened === true &&
										<li className="nav-item">
											<a className="nav-link" id="user-tab" data-toggle="tab" href="#user-add">
												Edit New
											</a>
										</li>
									}
									
								</ul>

							</div>
						</div>
					</div>
					<div className="section-body mt-3">
						<div className="container-fluid">
							<div className="tab-content mt-3">
								<div className="tab-pane fade show active" id="user-list" role="tabpanel">
									<div className="card">
										<div className="card-header">
											<h3 className="card-title">User List</h3>
											<div className="card-options">
												<form>
													<div className="input-group">
														<input
															type="text"
															className="form-control form-control-sm"
															placeholder="Search something..."
															name="s"
															onChange={this.handleSearchTextOnChange}
														/>
														{/* <span className="input-group-btn ml-2">
															<button className="btn btn-sm btn-default" type="submit">
																<span className="fe fe-search" />
															</button>
														</span> */}
													</div>
												</form>
											</div>
										</div>
										<div className="card-body">
											<div className="table-responsive">
												<table className="table table-striped table-hover table-vcenter text-nowrap mb-0">
													<thead>
														<tr>
															<th className="w60">Name</th>
															<th />
															<th>Created Date</th>
															<th>Role</th>
															<th className="w100">Action</th>
														</tr>
													</thead>
													<tbody>
														{this.state.showResult.map((user, i) => {
															return <tr key={i}>
																<td className="width45">
																	<span
																		className="avatar avatar-blue"
																		data-toggle="tooltip"
																		data-placement="top"
																		data-original-title="Avatar Name"
																	>
																		{user.Role}
																	</span>
																</td>
																<td>
																	<h6 className="mb-0">{user.FirstName} {user.LastName}</h6>
																	<span>{user.Email}</span>
																</td>
																<td>{user.Role}</td>
																<td>{user.Role}</td>
																<td>
																	<button
																		type="button"
																		className="btn btn-icon"
																		title="Edit"
																		id={user.Id} onClick={this.LoadUserData}
																	>
																		<i className="fa fa-edit" />
																	</button>
																	<button
																		type="button"
																		className="btn btn-icon js-sweetalert"
																		title="Delete"
																		data-type="confirm"
																		onClick={() => this.deletehandle(user.Id)}
																	>
																		<i className="fa fa-trash-o text-danger" />
																	</button>
																</td>
															</tr>
														})}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
								<div className="tab-pane fade" id="user-add" role="tabpanel">
									<div className="card">
										<div className="card-body">
											<div className="row clearfix">
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="First Name *"
															// onChange={this.handleFirstNameChange}
															value={this.state.firstName}
															disabled
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Last Name"
															// onChange={this.handleLastNameChange}
															disabled
															value={this.state.lastName}
														/>
													</div>
												</div>
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Email ID *"
															// onChange={this.handleEmailChange}
															disabled
															value={this.state.email}
														/>
													</div>
												</div>
												{/* <div className="col-md-4 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Mobile No"
															onChange={this.handleMobileNoChange}
															value={this.state.mobileNo}
														/>
													</div>
												</div> */}
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<select className="form-control show-tick"
															// onChange={this.handleRoleChange} 
															value={this.state.role} disabled>
															<option value="">Select Role Type</option>
															<option value="SME">SME</option>
															<option value="USER">User</option>
														</select>
													</div>
												</div>
												{this.state.role === "USER" &&
													<div className="col-12">
														<hr className="mt-4" />
														<div class="row col-12 mt-2" style={{ display: 'block' }}>
															<h6 class="pull-left">Module Permission</h6>
															<AddUsers userid={this.state.id} />
														</div>

														<div className="table-responsive">
															<table className="table table-striped table-hover table-vcenter text-nowrap mb-0">
																<thead>
																	<tr>
																		<th >Name</th>
																		<th >Email</th>
																		<th>Created Articles</th>
																		<th className="w100">Action</th>
																	</tr>
																</thead>
																<tbody>
																	{this.state.associatedUsers.map((auser, i) => {
																		return (
																			<tr key={i}>
																				<td>
																					<h6 className="mb-0">{auser.FirstName} {auser.LastName}</h6>
																				</td>
																				<td><span>{auser.Email}</span></td>
																				<td>{auser.Count}</td>

																				<td >
																				<button
																					type="button"
																					className="btn btn-icon js-sweetalert"
																					title="Delete"
																					data-type="confirm"
																					onClick={() => this.handleDeleteAssociateUser(auser.Id)}
																				>
																					<i className="fa fa-trash-o text-danger" />
																				</button>
																				</td>
																			</tr>
																		)
																	}
																	)}


																</tbody>
															</table>
														</div>


													</div>
												}
												<div class="row col-12 mt-5">
													<button type="button" className="btn btn-primary" onClick={this.saveUser}>
														Save
													</button>
													<button type="button" className="btn btn-primary ml-3" onClick={this.saveUserAndClose}>
														Save & Close
													</button>
													<button
														type="button"
														className="btn btn-secondary ml-2"
														onClick={this.closeUserDetail}
													>
														CLOSE
													</button>
												</div>
											</div>
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
const mapStateToProps = state => ({
	fixNavbar: state.settings.isFixNavbar
})

const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Users);