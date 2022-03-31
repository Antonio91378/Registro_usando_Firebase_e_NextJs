// @flow 
import * as React from 'react';

interface contentProps{
    name:string;
    type:string;
    event:any;
    value:string;
};
export const DescriptionContent:React.FC<contentProps> = (contentProps) => {
    return (
        <div>
            <div><label htmlFor="">{contentProps.name}</label></div>
            <div><input type={contentProps.type} onChange={contentProps.event} value={contentProps.value}/></div>
        </div>
    );
};