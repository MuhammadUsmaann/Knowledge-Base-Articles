import React, { Component } from 'react'
import { connect } from 'react-redux';
import list from './CardList'
import Card from './Cards';

//import Tags from './tagify/react.tagify'
import Tags from '@yaireo/tagify/dist/react.tagify'
import "@yaireo/tagify/dist/tagify.css"
import { API_ROUTES } from '../../lib/constants';
import axios from 'axios';

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
			tags: [],
			searchText: "",
			showResult: []
		}
	}

	componentDidMount() {


	}
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
		});
	};
	handleSearchTextChange = async (event) => {
		this.setState({
			searchText: event.target.value
		})
	}
	async componentWillMount() {
		this.LoadArticles();

	}
	LoadArticles = async () => {
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
				showResult: response?.data?.Result
			})
		}
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
											<div className="col-lg-5 col-md-4 col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control" value={this.state.searchText} onChange={this.handleSearchTextChange} placeholder="Search" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6 col-sm-6">
												<div className="input-group">
													<Tags
														value={this.state.tags}
														settings={baseTagifySettings}
														autoFocus={true}
														{...this.state.tags}
														onChange={this.handleTagChange}
													// onEditInput={() => console.log("onEditInput")}
													// onEditBeforeUpdate={() => console.log`onEditBeforeUpdate`}
													// onEditUpdated={() => console.log("onEditUpdated")}
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
											<div className="col-lg-3 col-md-4 col-sm-12">
												<a href="fake_url;" className="btn btn-sm btn-primary" >Search</a>
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
const mapStateToProps = state => ({
	fixNavbar: state.settings.isFixNavbar
})

const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(Home);