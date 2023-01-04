import React, { Component } from 'react';
import articleList from './ArticleList';
import Ckeditor from '../common/ckeditor';
import Tags from '@yaireo/tagify/dist/react.tagify';
import "@yaireo/tagify/dist/tagify.css";
import axios from 'axios';
import { API_ROUTES } from '../../lib/constants';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Moment from 'react-moment';

const baseTagifySettings = {
	defaultValue: [""],
	maxTags: 10,
	//backspace: "edit",
	placeholder: "Enter Tags",
	dropdown: {
		enabled: 0 // always show suggestions dropdown
	},
	showFilteredDropdown: "a",
	
}

class Articles extends Component {

	constructor(props) {
		super(props);
		this.state = {
			datalist: [],
			showResult: [],
			title: "",
			description: "",
			tags: []
		}
		this.child = React.createRef();
	}
	handleSearchTextOnChange = async (event) => {
		
		if (event != null && event != undefined) {
			this.setState({
				showResult: this.state.datalist.filter(employee => {
					return employee.Title.toLowerCase().includes(event.target.value.toLowerCase().trim())
						|| employee.Description.toLowerCase().includes(event.target.value.toLowerCase().trim())
						|| employee.CreateDate.toLowerCase().includes(event.target.value.toLowerCase().trim());
						//|| employee.CreatedBy.toLowerCase().includes(event.target.value.toLowerCase());
				})
			});
		}
		else {
			this.setState({
				showResult: this.state.datalist
			});
		}
	};
	handleTitleChange = async (event) => {
		this.setState({
			title: event.target.value
		})
	};
	handleTagChange = async (event) => {
		let tags = "";
		if (event.detail.tagify.value.length > 0) {
			if (event.detail.tagify.value.length == 1) {
				tags = event.detail.tagify.value[0].value;
			}
			else {
				tags = event.detail.tagify.value.reduce(function (a, b) {
					return (a.value || a) + ", " + b.value
				}
				)
			}

		}
		this.setState({
			tags: tags
		})

	};
	handleDescriptionChange = async (event) => {
		this.setState({
			description: event
		})
	}
	handleTabChange = async (event) => {
		this.setState({
			title: "",
			description: "",
			tags: []
		});
	}
	async deletehandle(id) {
		const response = await axios({
			method: 'get',
			url: API_ROUTES.DELETE_ARTICLE + "?id=" +id
		});
		if (!response?.data?.Success) {
			console.log('Something went wrong during signing in: ', response);
			return;
		}
		else {
			this.setState({
				datalist: this.state.datalist.filter(obj => {
					return obj.Id !== id;
				}),
				showResult: this.state.datalist.filter(obj => {
					return obj.Id !== id;
				})
			})
		}

		
	}
	async componentWillMount() {
		this.LoadArticlesList()
	}

	async LoadArticlesList() {
		const response = await axios({
			method: 'get',
			url: API_ROUTES.GET_ARTICLES
		});
		if (!response?.data?.Success) {
			console.log('Something went wrong during signing in: ', response);
			return;
		}
		else {
			this.setState({
				datalist: response?.data?.Result,
				showResult: response?.data?.Result,
			});
		}
	}
	async saveArticleAndClose() {
		this.saveArticle();
		document.getElementById("article-list").click();
	}
	async saveArticle  () {
		try {
			const response = await axios({
				method: 'post',
				url: API_ROUTES.SAVE_ARTICLE,
				data: {
					title: this.state.title,
					tags: this.state.tags,
					description: this.state.description
				}
			});
			if (!response?.data?.Success) {
				console.log('Something went wrong during signing in: ', response);
				return;
			}
			else {
				this.LoadArticlesList();
			}
		}
		catch (err) {
			console.log('Some error occured during signing in: ', err);
		}
		finally {
			//setIsLoading(false);
		}
	};
	async LoadArticleData (event)  {
		try {
			// let id = event.target.id;
			// if(event.target.tagName == "I")
			// {
			// 	id= event.target.parentElement.id
			// }

			const response = await axios({
				method: 'get',
				url: API_ROUTES.GET_ARTICLE_BY_ID + "?id="  + event
			});

			if (!response?.data?.Success) {
				console.log('Something went wrong during signing in: ', response);
				return;
			}
			else{
				this.setState({
					title: response?.data.Result.Title,
					description: response?.data.Result.Description,
					tags: response?.data.Result.Tags,
					id:response?.data.Result.Id
				})
				document.getElementById("article-tab").click();
				this.child.current.updateContent(response?.data.Result.Description);
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
											id="article-list"
											data-toggle="tab"
											href="#user-list"
											onClick={this.handleTabChange}
										>
											List
										</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="article-tab" data-toggle="tab" href="#user-add">
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
											<h3 className="card-title">Articles List</h3>
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
															<th className="w60">Title</th>
															<th>Tags</th>
															<th>Created Date</th>
															<th>Author</th>
															<th className="w100">Action</th>
														</tr>
													</thead>
													<tbody>
														{
															this.state.showResult?.map((obj, index) => {
																return (
																	<tr key={index}>
																		<td>
																			<h6 className="mb-0">{obj.Title}</h6>
																			<span className='text-turncate-1'>
																				{ReactHtmlParser(obj.Description)}
																			</span>
																		</td>
																		<td>{obj.Tags}</td>
																		<td> <Moment format="YYYY-MM-DD ">
																			{obj.CreateDate}
																		</Moment>
																		</td>
																		<td>{obj.CreatedByName}</td>
																		<td>
																			<button
																				type="button"
																				className="btn btn-icon"
																				title="Edit"
																				id={obj.Id} onClick={() => this.LoadArticleData(obj.Id)}
																			>
																				<i className="fa fa-edit"  onClick={() => this.LoadArticleData(obj.Id)}/>
																			</button>
																			<button
																				type="button"
																				className="btn btn-icon js-sweetalert"
																				title="Delete"
																				data-type="confirm"
																				onClick={() => this.deletehandle(obj.Id)}
																			>
																				<i className="fa fa-trash-o text-danger" onClick={() => this.deletehandle(obj.Id)}/>
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
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<input
															type="text"
															className="form-control"
															placeholder="Title"
															value={this.state.title}
															onChange={this.handleTitleChange}
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6 col-sm-12">
													<div className="form-group">
														<Tags
															value={this.state.tags}
															settings={baseTagifySettings}
															autoFocus={true}
															{...this.state.tags}
															onChange={this.handleTagChange}
														// onEditInput={() => console.log("onEditInput")}
														// onEditBeforeUpdate={() => console.log`onEditBeforeUpdate`}
														// onEditUpdated={() => {console.log("onEditStart")}}
														// onEditStart={() => console.log("onEditStart")}
														// onEditKeydown={() => console.log("onEditKeydown")}
														// onDropdownShow={() => console.log("onDropdownShow")}
														// onDropdownHide={() => console.log("onDropdownHide")}
														// onDropdownSelect={() => console.log("onDropdownSelect")}
														// onDropdownScroll={() => console.log("onDropdownScroll")}
														// onDropdownNoMatch={() => console.log("onDropdownNoMatch")}
														// onDropdownUpdated={() => console.log("onDropdownUpdated")}
														/>
													</div>
												</div>

												<div className="col-12">
													<Ckeditor ref={this.child} content={this.state.description}
														onChange={this.handleDescriptionChange}></Ckeditor>
												</div>
												<div className='col-12 mt-3'>
													<button type="button" className="btn btn-primary"
													onClick={() => this.saveArticle()}>
														Save
													</button>
													<button type="button" className="btn btn-primary ml-3" onClick={()=>this.saveArticleAndClose()}>
														Save & Close
													</button>
													<button
														type="button"
														className="btn btn-secondary ml-3"
														data-dismiss="modal"
													>
														Cancel
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