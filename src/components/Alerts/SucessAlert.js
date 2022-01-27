import React from 'react';

export default function SucessAlert(props) {
  return (<div className="alert alert-success" role="alert">
            <h4 className="alert-heading">{props.title}</h4>
            <p>{props.description}</p>
            <hr/>
            <p className="mb-0">{props.recomendation}</p>
          </div>);
}
