import React, { Component } from 'react';

export default class Footer extends Component {
	render() {
		return (
			<>
				<div>
					<div className="section-body">
						<footer className="footer">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-6 col-sm-12">
										Copyright © 2023{' '}
										<a href="https://www.eze2travel.com/">Eze2Travel</a>
										.
									</div>
								</div>
							</div>
						</footer>
					</div>
				</div>
			</>
		);
	}
}
