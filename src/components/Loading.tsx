import React from 'react';
import ReactLoading from 'react-loading';

interface ExampleTypes {
    type?: string
    color: string

}
 
const Loading = ({ type, color}: ExampleTypes) => (
    <ReactLoading className='loading' delay={0} type={type} color={color} height={100} width={100} />
);
 
export default Loading;