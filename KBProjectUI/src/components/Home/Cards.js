import React, { Component } from 'react'
import Popup from 'reactjs-popup';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Moment from 'react-moment';

class Card extends Component {
    render() {
        const { title, description, date, author } = this.props;
        return (
            <>
                <Popup trigger={
                    <div className="card cursor-pointer">
                        <div className="card-body text-center">
                            <h6 className="mt-3 mb-0">{title}</h6>
                            <p className='mt-3 text-turncate '>{ReactHtmlParser(description)}</p>
                            <div className="row text-center mt-4">
                                <div className="col-lg-6 border-right">
                                    <label className="mb-0">Date</label>
                                    <h4 className="font-18"><Moment format="YYYY-MM-DD ">
																			{date}
																		</Moment></h4>
                                </div>
                                <div className="col-lg-6">
                                    <label className="mb-0">Author</label>
                                    <h4 className="font-18">{author}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                } modal >
                    {close => (
                        <div className="custom-modal">
                            <div className='modal-body'>
                                <button className="custom-close" onClick={close}>
                                    &times;
                                </button>

                                <h6 className="mt-3 mb-0 bold">{title}</h6>
                                <hr />
                                <p className='mt-3 desciption-body' >{ReactHtmlParser(description)}</p>
                                <div className="row text-center mt-4">
                                    <div className="col-lg-6 border-right">
                                        <label className="mb-0">Date</label>
                                        <h4 className="font-18"><Moment format="YYYY-MM-DD ">
																			{date}
																		</Moment></h4>
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