import React, { Component } from 'react'
import Card from './Cards';
import Tags from '@yaireo/tagify/dist/react.tagify'
import "@yaireo/tagify/dist/tagify.css"
import { API_ROUTES, APP_ROUTES } from '../../lib/constants';
import { SendPostRequest, withRouter } from '../../lib/common';

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

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: "",
			searchText: "",
			title: "",
			showResult: []
		}
	}

	componentDidMount() {


	}
	handleTagChange = async (event) => {
		let tags = "";
		if (event.detail.tagify.value.length > 0) {
			if (event.detail.tagify.value.length === 1) {
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
		});
	};
	handleSearchTextChange = async (event) => {
		this.setState({
			searchText: event.target.value
		})
	}
	handleTitleTextChange = async (event) => {
		this.setState({
			title: event.target.value
		})
	}
	async componentWillMount() {
		this.LoadArticles();

	}
	LoadArticles = async () => {

		const response = await SendPostRequest(API_ROUTES.GET_ARTICLES_HOME, {
			SearchText: this.state.searchText,
			Tags: this.state.tags,
			Title: this.state.title
		});

		if (response?.authenticated) {
			this.props.router.navigate(APP_ROUTES.SIGN_IN)
			return;
		}
		else {
			this.setState({
				showResult: response
			})
		}
	}
	handleSearchButtonClicked = async () => {
		this.LoadArticles();
	}
	render() {
		const { fixNavbar } = this.props;
		return (
			<>
				<div className={`section-body ${fixNavbar ? "marginTop" : ""} mt-3`}>
					<div className="container-fluid">
						<div className="row clearfix">
							<div className="col-12">
								<div className="card">
									<div className="card-body">
										<div className="row">
											<div className="col-lg-4 col-md-4 col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleTextChange} placeholder="Title" />
												</div>
											</div>
											<div className="col-lg-4 col-md-4 col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control" value={this.state.searchText} onChange={this.handleSearchTextChange} placeholder="Desciption" />
												</div>
											</div>
											<div className="col-lg-4 col-md-4 col-sm-6">
												<div className="input-group">
													<Tags
														value={this.state.tags}
														settings={baseTagifySettings}
														autoFocus={true}
														{...this.state.tags}
														onChange={this.handleTagChange}
													/>
												</div>
											</div>
											<div className="col-lg-3 col-md-4 col-sm-12">
												<button href="fake_url;" className="btn btn-sm btn-primary" onClick={this.handleSearchButtonClicked}>Search</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							{
								this.state.showResult.map((obj, index) => {
									return (
										<div className="col-xl-3 col-lg-4 col-md-6">
											<Card title={obj.Title}
												description={obj.Description}
												author={obj.CreatedByName}
												date={obj.CreateDate}
											/>
										</div>
									)
								})
							}
						</div>
					</div>
				</div>

			</>
		)
	}
}


export default withRouter(Home);