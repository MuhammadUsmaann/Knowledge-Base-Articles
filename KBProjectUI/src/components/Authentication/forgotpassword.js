import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ForgotPassword extends Component {
	render() {
		return (
			<div className="auth">
				<div className="card">
					<div className="text-center mb-5">
						<Link className="header-brand" to="/">
							<i className="fe fe-command brand-logo" />
						</Link>
					</div>
					<div className="card-body">
						<div className="card-title">Forgot password</div>
						<p className="text-muted">
							Enter your email address and your password will be reset and emailed to you.
						</p>
						<div className="form-group">
							<label className="form-label" htmlFor="exampleInputEmail1">
								Email address
							</label>
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter email"
							/>
						</div>
						<div className="form-footer">
							<Link className="btn btn-primary btn-block" to="/login">
								Send me new password
							</Link>
						</div>
					</div>
					<div className="text-center text-muted">
						Forget it, <Link to="/login">Send me Back</Link> to the Sign in screen.
					</div>
				</div>
			</div>
		);
	}
}
