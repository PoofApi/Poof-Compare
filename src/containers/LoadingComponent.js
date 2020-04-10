import React from 'react';

const Loading = () => {
    return(
        <div className="progress">
            <div>Now loading your search items.......</div>
            <div className="indeterminate"></div>
        </div>
    );
};

export default Loading;