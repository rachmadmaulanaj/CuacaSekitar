import React from 'react';

const CardWeatherForecast = (props) => {
    const data = props.data;
    return (
        <div className='col-12 col-sm-6 col-lg-3 py-3'>
            <div className='card' style={{ border: 'none', borderRadius: '20px', boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)' }}>
                <div className='card-body p-2' style={{ fontSize: '20px' }}>
                    <div className="d-flex justify-content-center">
                        <div>
                            <img src={data.icon_link} alt={'forecast3hour '+data.time+' '+data.main} />
                            <div className="card-text text-center">
                                <small className="d-block">{data.main}</small>
                                <small className="d-block">{data.description}</small>
                            </div>
                        </div>
                        <div style={{ border: '1px solid #aeaeae', margin: '15px' }}></div>
                        <div className='my-auto'>
                            <h1 className="card-title mb-2">{data.temperature}&deg;</h1>
                            <div className="card-text">
                                <small className="d-block">{data.day},</small>
                                <small className="d-block">{data.date}</small>
                                <small className="d-block">{data.time}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardWeatherForecast;