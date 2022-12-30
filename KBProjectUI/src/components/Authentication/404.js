import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
	render() {
		return (
			<div className="auth">
				<div className="card">
					<div className="card-body">
						<div className="display-3 text-muted mb-5">
							<i className="si si-exclamation" /> 404
						</div>
						<h1 className="h3 mb-3">Oops.. You just found an error page..</h1>
						<p className="h6 text-muted font-weight-normal mb-3">
							We are sorry but our service is currently not available…
						</p>
						<Link className="btn btn-primary" to="/">
							<i className="fe fe-arrow-left mr-2" />
							Go back
						</Link>
					</div>
				</div>
			</div>

		);
	}
}
