import React, { Component } from 'react'
import Popup from 'reactjs-popup';

class Card extends Component {
    render() {
        const { title, description, date, author } = this.props;
        return (
            <>

                <Popup trigger={
                    <div className="card cursor-pointer">
                        <div className="card-body text-center">
                            <h6 className="mt-3 mb-0">{title}</h6>
                            <p className='mt-3 text-turncate '>{description}</p>
                            <div className="row text-center mt-4">
                                <div className="col-lg-6 border-right">
                                    <label className="mb-0">Date</label>
                                    <h4 className="font-18">{date}</h4>
                                </div>
                                <div className="col-lg-6">
                                    <label className="mb-0">Author</label>
                                    <h4 className="font-18">{author}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                } modal>
                    {close => (
                        <div className="custom-modal">
                            <div className='modal-body'>
                                <button className="custom-close" onClick={close}>
                                    &times;
                                </button>

                                <h6 className="mt-3 mb-0">{title}</h6>
                                <p className='mt-3'>{description}</p>
                                <div className="row text-center mt-4">
                                    <div className="col-lg-6 border-right">
                                        <label className="mb-0">Date</label>
                                        <h4 className="font-18">{date}</h4>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="mb-0">Author</label>
                                        <h4 className="font-18">{author}</h4>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center my-4'>

                                    <button
                                        className="btn btn-primary"
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
        )
    }
}
export default Card;