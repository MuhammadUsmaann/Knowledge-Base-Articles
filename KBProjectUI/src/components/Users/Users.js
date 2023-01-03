import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { API_ROUTES } from '../../lib/constants';
import AddUsers from './Addusers';


class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datalist: [''],
			firstName:"",
			lastName : "",
			email:"",
			mobileNo:"",
			role:"",
			id:"",
			users:[]

		}
	}
	
	deletehandle(id) {
		this.setState({
			datalist: this.state.datalist.filter(obj => {
				return obj.id !== id;
			})
		})
	};
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
	async componentWillMount() {
		this.LoadUsersList()
	}
	async LoadUsersList(){
		const response = await axios({
			method: 'get',
			url: API_ROUTES.GET_USERS
		});
		if (!response?.data?.Success) {
			console.log('Something went wrong during signing in: ', response);
			return;
		}
		else{
			this.setState({
				users:response?.data?.Result
			})
		}
	}
	render() {
		const { fixNavbar } = this.props;
		const handleChangeTabs = async () => {
			this.setState({
				firstName:"",
				lastName : "",
				email:"",
				mobileNo:"",
				role:"",
				id:0,
			})
		}
		const saveUser = async () => {
			try {
				this.state.isLoading = true;
				const response = await axios({
					method: 'post',
					url: API_ROUTES.SAVE_USER,
					data: {
						FirstName:this.state.firstName,
						LastName : this.state.lastName,
						Email:this.state.email,
						MobileNo:this.state.mobileNo,
						Role:this.state.role,
						Id:this.state.id
					}
				});

				if (!response?.data?.Success) {
					console.log('Something went wrong during signing in: ', response);
					return;
				}
				else{
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
		const LoadUserData = async (id) => {
			try {
				const response = await axios({
					method: 'get',
					url: API_ROUTES.GET_USER + "/"  + id
				});

				if (!response?.data?.Success) {
					console.log('Something went wrong during signing in: ', response);
					return;
				}
				else{
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
											id="user-tab"
											data-toggle="tab"
											href="#user-list"
											onClick={handleChangeTabs}
										>
											List
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="user-tab" onClick={handleChangeTabs} data-toggle="tab" href="#user-add">
											Add New
										</a>
									</li>
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
														/>
														<span className="input-group-btn ml-2">
															<button className="btn btn-sm btn-default" type="submit">
																<span className="fe fe-search" />
															</button>
														</span>
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
														{this.state.users.map((user, i) => {
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
																		>
																			<i className="fa fa-edit" />
																		</button>
																		<button
																			type="button"
																			className="btn btn-icon js-sweetalert"
																			title="Delete"
																			data-type="confirm"
																			onClick={LoadUserData(user.Id)}
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
															onChange={this.handleFirstNameChange}
															value={this.state.firstName}
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Last Name"
															onChange={this.handleLastNameChange}
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
															onChange={this.handleEmailChange}
															value={this.state.email}
														/>
													</div>
												</div>
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Mobile No"
															onChange={this.handleMobileNoChange}
															value={this.state.mobileNo}
														/>
													</div>
												</div>
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<select className="form-control show-tick"
																	onChange={this.handleRoleChange} value={this.state.role}>
															<option value="">Select Role Type</option>
															<option value="SME">SME</option>
															<option value="user">User</option>
														</select>
													</div>
												</div>
												<div className="col-12">
													<hr className="mt-4" />
													<div class="row col-12 mt-2" style={{ display: 'block' }}>
														<h6 class="pull-left">Module Permission</h6>
														<AddUsers />
													</div>

													<div className="table-responsive">
														<table className="table table-striped table-hover table-vcenter text-nowrap mb-0">
															<thead>
																<tr>
																	<th className="w60">Name</th>
																	<th />
																	<th>Created Articles</th>
																	<th className="w100">Action</th>
																</tr>
															</thead>
															<tbody>
																<tr>
																	<td className="width45">
																		<span
																			className="avatar avatar-blue"
																			data-toggle="tooltip"
																			data-placement="top"
																			data-original-title="Avatar Name"
																		>
																			NG
																		</span>
																	</td>
																	<td>
																		<h6 className="mb-0">Marshall Nichols</h6>
																		<span>marshall-n@gmail.com</span>
																	</td>
																	<td>4</td>

																	<td />
																</tr>
																<tr>
																	<td>
																		<img
																			src="../assets/images/xs/avatar1.jpg"
																			data-toggle="tooltip"
																			data-placement="top"
																			alt="Avatar"
																			className="avatar"
																			data-original-title="Avatar Name"
																		/>
																	</td>
																	<td>
																		<h6 className="mb-0">Susie Willis</h6>
																		<span>sussie-w@gmail.com</span>
																	</td>

																	<td>4</td>
																	<td>
																		<button
																			type="button"
																			className="btn btn-icon js-sweetalert"
																			title="Delete"
																			data-type="confirm"
																		>
																			<i className="fa fa-trash-o text-danger" />
																		</button>
																	</td>
																</tr>
																<tr>
																	<td>
																		<img
																			src="../assets/images/xs/avatar2.jpg"
																			data-toggle="tooltip"
																			data-placement="top"
																			alt="Avatar"
																			className="avatar"
																			data-original-title="Avatar Name"
																		/>
																	</td>
																	<td>
																		<h6 className="mb-0">Debra Stewart</h6>
																		<span>debra@gmail.com</span>
																	</td>

																	<td>4</td>
																	<td>
																		<button
																			type="button"
																			className="btn btn-icon js-sweetalert"
																			title="Delete"
																			data-type="confirm"
																		>
																			<i className="fa fa-trash-o text-danger" />
																		</button>
																	</td>
																</tr>
																<tr>
																	<td>
																		<span
																			className="avatar avatar-green"
																			data-toggle="tooltip"
																			data-placement="top"
																			data-original-title="Avatar Name"
																		>
																			KH
																		</span>
																	</td>
																	<td>
																		<h6 className="mb-0">Erin Gonzales</h6>
																		<span>Erinonzales@gmail.com</span>
																	</td>

																	<td>4</td>
																	<td>
																		<button
																			type="button"
																			className="btn btn-icon js-sweetalert"
																			title="Delete"
																			data-type="confirm"
																		>
																			<i className="fa fa-trash-o text-danger" />
																		</button>
																	</td>
																</tr>


															</tbody>
														</table>
													</div>
													<div class="row col-12 mt-5">
														<button type="button" className="btn btn-primary" onClick={saveUser}>
															Save
														</button>
														<button
															type="button"
															className="btn btn-secondary ml-2"
															data-dismiss="modal"
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