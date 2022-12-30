import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddUsers from './Addusers';


class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			datalist: ['']
		}
	}
	deletehandle(id) {
		this.setState({
			datalist: this.state.datalist.filter(obj => {
				return obj.id !== id;
			})
		})


	}

	render() {
		const { fixNavbar } = this.props;
		return (
			<>
				<div>
					<div className={`section-body ${fixNavbar ? "marginTop" : ""} `}>
						<div className="container-fluid">
							<div className="d-flex justify-content-between align-items-center">
								<ul className="nav nav-tabs page-header-tab">
									<li className="nav-item">
										<a
											className="nav-link active"
											id="user-tab"
											data-toggle="tab"
											href="#user-list"
										>
											List
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="user-tab" data-toggle="tab" href="#user-add">
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
															<td>24 Jun, 2015</td>
															<td>CEO and Founder</td>
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

															<td>28 Jun, 2015</td>
															<td>Team Lead</td>
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

															<td>21 July, 2015</td>
															<td>Team Lead</td>
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

															<td>21 July, 2015</td>
															<td>Web Developer</td>
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
																>
																	<i className="fa fa-trash-o text-danger" />
																</button>
															</td>
														</tr>
														<tr>
															<td>
																<img
																	src="../assets/images/xs/avatar3.jpg"
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

															<td>28 Jun, 2015</td>
															<td>Team Lead</td>
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
																>
																	<i className="fa fa-trash-o text-danger" />
																</button>
															</td>
														</tr>
														<tr>
															<td>
																<img
																	src="../assets/images/xs/avatar4.jpg"
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

															<td>21 July, 2015</td>
															<td>Team Lead</td>
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
																>
																	<i className="fa fa-trash-o text-danger" />
																</button>
															</td>
														</tr>
														<tr>
															<td>
																<img
																	src="../assets/images/xs/avatar5.jpg"
																	data-toggle="tooltip"
																	data-placement="top"
																	alt="Avatar"
																	className="avatar"
																	data-original-title="Avatar Name"
																/>
															</td>
															<td>
																<h6 className="mb-0">Erin Gonzales</h6>
																<span>Erinonzales@gmail.com</span>
															</td>

															<td>21 July, 2016</td>
															<td>Web Developer</td>
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
																>
																	<i className="fa fa-trash-o text-danger" />
																</button>
															</td>
														</tr>
														<tr>
															<td>
																<img
																	src="../assets/images/xs/avatar6.jpg"
																	data-toggle="tooltip"
																	data-placement="top"
																	alt="Avatar"
																	className="avatar"
																	data-original-title="Avatar Name"
																/>
															</td>
															<td>
																<h6 className="mb-0">Ava Alexander</h6>
																<span>alexander@gmail.com</span>
															</td>

															<td>21 July, 2016</td>
															<td>HR</td>
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
																<h6 className="mb-0">Ava Alexander</h6>
																<span>alexander@gmail.com</span>
															</td>

															<td>21 July, 2019</td>
															<td>HR</td>
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
																>
																	<i className="fa fa-trash-o text-danger" />
																</button>
															</td>
														</tr>
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
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Last Name"
														/>
													</div>
												</div>
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Email ID *"
														/>
													</div>
												</div>
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Mobile No"
														/>
													</div>
												</div>
												<div className="col-md-4 col-sm-12">
													<div className="form-group">
														<select className="form-control show-tick">
															<option>Select Role Type</option>
															<option>SME</option>
															<option>Client</option>
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
																		>
																			<i className="fa fa-trash-o text-danger" />
																		</button>
																	</td>
																</tr>


															</tbody>
														</table>
													</div>
													<div class="row col-12 mt-5">
														<button type="button" className="btn btn-primary">
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