import React, { Component, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigation } from 'react-router'
import axios from 'axios';
import { API_ROUTES, APP_ROUTES } from '../../lib/constants';
import { getTokenFromLocalStorage, storeTokenInLocalStorage, withRouter } from '../../lib/common';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: '',
			email: "",
			password: ""
		};
	};
	handleEmailChange = event => {
		this.setState({
			email: event.target.value
		})
	};
	handlePasswordChange = event => {
		this.setState({
			password: event.target.value
		})
	};
	render() {
		let token = getTokenFromLocalStorage();
		if (token) {
			this.props.router.navigate(APP_ROUTES.DASHBOARD)
			return
		}

		const signIn = async () => {
			try {
				this.state.isLoading = true;
				const response = await axios({
					method: 'post',
					url: API_ROUTES.SIGN_IN,
					data: {
						username: this.state.email,
						password: this.state.password
					}
				});
				if (!response?.data?.Result.Token) {
					console.log('Something went wrong during signing in: ', response);
					return;
				}
				storeTokenInLocalStorage(response?.data?.Result.Token);
				this.props.router.navigate(APP_ROUTES.DASHBOARD)
			}
			catch (err) {
				console.log('Some error occured during signing in: ', err);
			}
			finally {
				//setIsLoading(false);
			}
		};

		return (
			<div className="auth">

				{/* {(user || authenticated) && (
          			<Navigate to="/dashboard" replace={true} />
        		)} */}

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
								onChange={this.handleEmailChange}
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
								onChange={this.handlePasswordChange}
							/>
						</div>
						<div className="form-group">
							<label className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" />
								<span className="custom-control-label">Remember me</span>
							</label>
						</div>
						<div className="form-footer">
							<a className="btn btn-primary btn-block" onClick={signIn}>
								Click to login
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default withRouter(Login) 