import React from 'react';

export default function VisButton({name, func}) {
    return (<button
        className={"btn"}
        onClick={func.bind(this)}>
        {name}
    </button>);
}