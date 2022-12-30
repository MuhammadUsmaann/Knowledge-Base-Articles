import React, { Component } from 'react';
import Popup from 'reactjs-popup';


class AddUsers extends Component {

    render() {
        return (
            <>
                <Popup trigger={
                    <button class="btn btn-primary pull-right">Add Users</button>

                } modal>
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
                                                <th />
                                                <th>Created Articles</th>
                                                <th className="w100">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img
                                                        src="../assets/images/xs/avatar1.jpg"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        alt="Avatar"
                                                        className="avatar"
                                                        data-original-title="Avatar Name"
                                                    />
                                                </td>
                                                <td>
                                                    <h6 className="mb-0">Susie Willis</h6>
                                                    <span>sussie-w@gmail.com</span>
                                                </td>

                                                <td>4</td>
                                                <td>
                                                    <button className='btn btn-primary'>Add</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <img
                                                        src="../assets/images/xs/avatar2.jpg"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        alt="Avatar"
                                                        className="avatar"
                                                        data-original-title="Avatar Name"
                                                    />
                                                </td>
                                                <td>
                                                    <h6 className="mb-0">Debra Stewart</h6>
                                                    <span>debra@gmail.com</span>
                                                </td>

                                                <td>4</td>
                                                <td>
                                                    <button className='btn btn-primary'>Add</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span
                                                        className="avatar avatar-green"
                                                        data-toggle="tooltip"
                                                        data-placement="top"
                                                        data-original-title="Avatar Name"
                                                    >
                                                        KH
                                                    </span>
                                                </td>
                                                <td>
                                                    <h6 className="mb-0">Erin Gonzales</h6>
                                                    <span>Erinonzales@gmail.com</span>
                                                </td>

                                                <td>4</td>
                                                <td>
                                                    <button className='btn btn-primary'>Add</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='d-flex justify-content-end my-4 mr-4'>
                                    <button
                                        className="btn btn-primary mr-3"
                                        onClick={() => {
                                            console.log('modal closed ');
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