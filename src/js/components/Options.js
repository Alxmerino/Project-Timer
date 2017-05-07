import React    from 'react';

let Options = () => {
    return (
        <div className="options btn-group">
            <button type="button" className="options__toggle btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="glyphicon glyphicon-cog" />
            </button>
            <ul className="options__menu dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
            </ul>
        </div>
    );
};

export default Options;
