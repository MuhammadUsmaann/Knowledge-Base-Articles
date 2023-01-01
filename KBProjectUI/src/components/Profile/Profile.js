import React, { Component } from 'react'
import { connect } from 'react-redux';

class Profile extends Component {
    render() {
        const { fixNavbar } = this.props;
        return (
            <>
                <div className="section-body  py-4">
                    <div className="container-fluid">
                        <div className="row clearfix">
                            <div className="col-12">
                                <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="pills-calendar-tab" data-toggle="pill" href="#pills-calendar" role="tab" aria-controls="pills-calendar" aria-selected="false">Prfolile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-timeline-tab" data-toggle="pill" href="#pills-timeline" role="tab" aria-controls="pills-timeline" aria-selected="true">Security</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-8 col-md-12">
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-calendar" role="tabpanel" aria-labelledby="pills-calendar-tab">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="card-title">Edit Profile</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row clearfix">
                                                            <div className="col-sm-6 col-md-3">
                                                                <div className="form-group">
                                                                    <label className="form-label">First Name</label>
                                                                    <input type="text" className="form-control" placeholder="Username" defaultValue="michael23" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 col-md-3">
                                                                <div className="form-group">
                                                                    <label className="form-label">Last Name</label>
                                                                    <input type="text" className="form-control" placeholder="Username" defaultValue="michael23" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">Email address</label>
                                                                    <input type="email" className="form-control" placeholder="Email" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label className="form-label">Address</label>
                                                                    <input type="text" className="form-control" placeholder="Home Address" defaultValue="455 S. Airport St. Moncks Corner" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 col-md-4">
                                                                <div className="form-group">
                                                                    <label className="form-label">City</label>
                                                                    <input type="text" className="form-control" placeholder="City" defaultValue="New York" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 col-md-3">
                                                                <div className="form-group">
                                                                    <label className="form-label">Postal Code</label>
                                                                    <input type="number" className="form-control" placeholder="ZIP Code" />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-5">
                                                                <div className="form-group">
                                                                    <label className="form-label">Country</label>
                                                                    <select className="form-control custom-select">
                                                                        <option value>USA</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="form-group mb-0">
                                                                    <label className="form-label">About Me</label>
                                                                    <textarea rows={5} className="form-control" placeholder="Here can be your description" defaultValue={"Oh so, your weak rhyme You doubt I'll bother, reading into it I'll probably won't, left to my own devices But that's the difference in our opinions."} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-footer text-right">
                                                        <button type="submit" className="btn btn-primary">Update Profile</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-timeline" role="tabpanel" aria-labelledby="pills-timeline-tab">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Change Password</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="row clearfix">
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="form-group">
                                                            <label className="form-label">Old Password</label>
                                                            <input type="password" className="form-control" placeholder="Username" defaultValue="michael23" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="form-group">
                                                            <label className="form-label">New Password</label>
                                                            <input type="password" className="form-control" placeholder="Username" defaultValue="michael23" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-4">
                                                        <div className="form-group">
                                                            <label className="form-label">Confirm Password</label>
                                                            <input type="password" className="form-control" placeholder="Email" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer text-right">
                                                <button type="submit" className="btn btn-primary">Update Password</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);