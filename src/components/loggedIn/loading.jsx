import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
    <React.Fragment>
    <div className="d-flex">
        <ReactLoading type={"bars"} color={"rgb(154, 202, 21)"} className="m-auto" height={'20%'} width={'20%'} /> <br/>
    </div>
    <p className="text-big text-center text-success">Please Wait !</p>
    </React.Fragment>
);

export default Loading;