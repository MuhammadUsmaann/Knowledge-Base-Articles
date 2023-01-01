import React, { Component,useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { connect } from 'react-redux';
import list from './CardList'
import Card from './Cards';

//import Tags from './tagify/react.tagify'
import Tags from '@yaireo/tagify/dist/react.tagify'
import "@yaireo/tagify/dist/tagify.css"

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
			tagifyProps : [
				"aaa",
				"aaa1",
				"aaa2",
				"aaa3",
				"bbb1",
				"bbb2",
				"bbb3",
				"bbb4"
			  ]
		}
	}
	
	componentDidMount(){

		
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
													<input type="text" className="form-control" placeholder="Search" />
												</div>
											</div>
											<div className="col-lg-6 col-md-6 col-sm-6">
												<div className="input-group">
												<Tags
													// tagifyRef={tagifyRef1}
													settings={baseTagifySettings}
													autoFocus={true}
													{...this.state.tagifyProps}
													//onChange={onChange}
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
								list.map((obj, index) => {
									return (
										<div className="col-xl-3 col-lg-4 col-md-6">
											<Card title={obj.title}
												description={obj.description}
												author={obj.author}
												date={obj.date}
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