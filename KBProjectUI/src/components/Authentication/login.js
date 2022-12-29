import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
	render() {
		return (
			<div className="auth">
				<div className="card">
					<div className="text-center mb-2">
						<Link className="header-brand" to="/">
							<i className="fe fe-command brand-logo" />
						</Link>
					</div>
					<div className="card-body">
						<div className="card-title">Login to your account</div>

						<div className="form-group">
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Enter email"
							/>
						</div>
						<div className="form-group">
							<label className="form-label">
								Password
								<Link className="float-right small" to="/forgotpassword">
									I forgot password
								</Link>
							</label>
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Password"
							/>
						</div>
						<div className="form-group">
							<label className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" />
								<span className="custom-control-label">Remember me</span>
							</label>
						</div>
						<div className="form-footer">
							<a className="btn btn-primary btn-block" href="/">
								Click to login
							</a>
						</div>
					</div>
					<div className="text-center text-muted">
						Don't have account yet? <Link to="/signup">Sign Up</Link>
					</div>
				</div>
			</div>
		);
	}
}
