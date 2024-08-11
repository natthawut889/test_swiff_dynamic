import React from 'react';

export interface BoxWrapperProps
{
    children?: React.ReactNode;
}
const BoxWrapper = ( props: BoxWrapperProps ) => {
    const { children } = props;
    return (
        <div className="box-wrapper">
            {children}
        </div>
    );
};

export default BoxWrapper;
