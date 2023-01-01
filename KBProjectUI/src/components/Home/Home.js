import React, { Component,useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { connect } from 'react-redux';
import list from './CardList'
import Card from './Cards';
import Tags from "@yaireo/tagify/dist/react.tagify" 
import "@yaireo/tagify/dist/tagify.css"

const baseTagifySettings = {
	blacklist: ["xxx", "yyy", "zzz"],
	maxTags: 6,
	//backspace: "edit",
	placeholder: "type something",
	dropdown: {
	  enabled: 0 // a;ways show suggestions dropdown
	}
  }
class Home extends Component {
	// const [tagifySettings, setTagifySettings] = useState([]);
	// const [tagifyProps, setTagifyProps] = useState({});

	
	constructor(props) {
        super(props);

        baseTagifySettings.callbacks = {
            add     : this.onTagifyAdd,
            remove  : this.onTagifyRemove,
            input   : this.onTagifyInput,
            invalid : this.onTagifyInvalid
        }
    }

    componentDidMount(){}

	onTagifyAdd = e => {
        console.log('added:', e.detail);
    }

    onTagifyRemove = e => {
        console.log('remove:', e.detail);
    }

    onTagifyInput = e => {
        console.log('input:', e.detail);
    }

    onTagifyInvalid = e => {
        console.log('invalid:', e.detail);
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
											<div className="col-lg-5 col-md-4 col-sm-6">
												<div className="input-group">
													<Tags
														tagifyRef={tagifyRef} // optional Ref object for the Tagify instance itself, to get access to  inner-methods
														settings={baseTagifySettings}  // tagify settings object
														defaultValue="a,b,c"
														{...tagifyProps}   // dynamic props such as "loading", "showDropdown:'abc'", "value"
														onChange={onChange}
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