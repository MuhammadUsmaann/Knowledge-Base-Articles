import React, { Component } from 'react'
import { connect } from 'react-redux';
import list from './CardList'
import Card from './Cards';

class Home extends Component {
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