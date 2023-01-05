import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { SendGetRequest } from '../../lib/common';
import { API_ROUTES, APP_ROUTES } from '../../lib/constants';


class AddUsers extends Component {

    constructor(props) {
        super(props);
        this.setUserId = this.setUserId.bind(this);

        this.state = {
            selectedUsers: [],
            smeUsers: [],
            showResult: [],
            id: this.props.userid
        }
    }
    setUserId(id) {
        this.setState({
            id: id,
        });
    }
    async componentWillMount() {
        //this.LoadSMEUsersList();

    }
    LoadSMEUsersList = async () => {

        const response = await SendGetRequest(API_ROUTES.GET_SME_USERS + "?id=" + this.state.id);

        if (response?.authenticated) {
            this.props.router.navigate(APP_ROUTES.SIGN_IN)
            return;
        }
        else {
            this.setState({
                smeUsers: response
            })
        }
    }
    AssociateUser = async (event) => {
        const response = await SendGetRequest( API_ROUTES.ASSOCIATE_USER + "?id=" + this.state.id + "&userId=" + event.target.id);

        if (response?.authenticated) {
            this.props.router.navigate(APP_ROUTES.SIGN_IN)
            return;
        }
        else {
            this.setState({
                users: this.state.smeUsers.filter(obj => {
                    return obj.Id !== parseInt(event.target.id);
                })
            });
        }
    }
    render() {

        return (
            <>
                <Popup trigger={
                    <button class="btn btn-primary pull-right">Add Users</button>

                } modal onOpen={this.LoadSMEUsersList}>
                    {close => (
                        <div className="custom-modal">
                            <div className='modal-body'>
                                <button className="custom-close" onClick={close}>
                                    &times;
                                </button>
                                <div className="table-responsive">
                                    <table className="table table-striped table-hover table-vcenter text-nowrap mb-0">
                                        <thead>
                                            <tr>
                                                <th className="w60">Name</th>
                                                <th >Email</th>
                                                <th>Created Articles</th>
                                                <th className="w100">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.smeUsers.map((auser, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <h6 className="mb-0">{auser.FirstName} {auser.LastName}</h6>
                                                        </td>
                                                        <td><span>{auser.Email}</span></td>
                                                        <td>{auser.Count}</td>

                                                        <td>
                                                            <button className='btn btn-primary' id={auser.Id} onClick={this.AssociateUser}>Add</button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className='d-flex justify-content-end my-4 mr-4'>
                                    <button
                                        className="btn btn-primary mr-3"
                                        onClick={() => {
                                            close();
                                        }}
                                    >
                                        close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Popup>
            </>
        );
    }
}


export default AddUsers;