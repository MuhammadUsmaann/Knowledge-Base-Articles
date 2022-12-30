import React, { Component } from 'react';
import articleList from './ArticleList';
import Ckeditor from '../common/ckeditor'


class Articles extends Component {

	constructor(props) {
		super(props);
		this.state = {
			datalist: articleList
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
															<th className="w60">Title</th>
															<th>Created Date</th>
															<th>Author</th>
															<th className="w100">Action</th>
														</tr>
													</thead>
													<tbody>
														{
															this.state.datalist?.map((obj, index) => {
																return (
																	<tr key={index}>
																		<td>
																			<h6 className="mb-0">{obj.title}</h6>
																			<span className='text-turncate-1'> {obj.description}</span></td>
																		<td>{obj.date}</td>
																		<td>{obj.author}</td>
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
																				onClick={() => this.deletehandle(obj.id)}
																			>
																				<i className="fa fa-trash-o text-danger" />
																			</button>
																		</td>
																	</tr>
																)
															})
														}


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
												<div className="col-lg-12 col-md-12 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Title"
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Tags"
														/>
													</div>
												</div>
												
												<div className="col-12">
													<Ckeditor></Ckeditor>
												</div>
												<div className='col-12 mt-3'>
													<button type="button" className="btn btn-primary">
														Add
													</button>
													<button
														type="button"
														className="btn btn-secondary ml-3"
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
			</>
		);
	}
}

export default (Articles);