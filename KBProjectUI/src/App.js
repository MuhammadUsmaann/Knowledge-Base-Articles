import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Layout from './components/Shared/Layout';
import Login from './components/Authentication/login';
import ForgotPassword from './components/Authentication/forgotpassword';
import NotFound from './components/Authentication/404';
import InternalServer from './components/Authentication/500';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from './lib/common';

class App extends Component {

	render() {

		let token  = getTokenFromLocalStorage();
		const ProtectedRoute = ({ token, children }) => {
		if (!token) {
			return <Navigate to="/login" replace />;
		}

		return children;
		};
		const { darkMode, boxLayout, darkSidebar, iconColor, gradientColor, rtl, fontType } = this.props
		return (
			<div className={`${darkMode ? "dark-mode" : ""}${darkSidebar ? "sidebar_dark" : ""} ${iconColor ? "iconcolor" : ""} ${gradientColor ? "gradient" : ""} ${rtl ? "rtl" : ""} ${fontType ? fontType : ""}${boxLayout ? "boxlayout" : ""}`}>
				<Routes >
					<Route path="/login" element={<Login {...this.props}/>} />
					<Route path="/forgotpassword" element={<ForgotPassword />} />
					<Route path="/notfound" element={<NotFound />} />
					<Route path="/internalserver" element={<InternalServer />} />
					<Route path="*" element={
					 	<ProtectedRoute token={token}>
					 		<Layout {...this.props}/>
				   		</ProtectedRoute>
					} />
				</Routes >

			</div>
		);
	}
}
const mapStateToProps = state => ({
	darkMode: state.settings.isDarkMode,
	darkSidebar: state.settings.isDarkSidebar,
	iconColor: state.settings.isIconColor,
	gradientColor: state.settings.isGradientColor,
	rtl: state.settings.isRtl,
	fontType: state.settings.isFont,
	boxLayout: state.settings.isBoxLayout
});


const mapDispatchToProps = dispatch => ({})
export default connect(mapStateToProps, mapDispatchToProps)(App)