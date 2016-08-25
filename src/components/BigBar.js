import React, { PropTypes } from 'react';
import formatBar from '../utils/UtilBarPercentStyle';


const BigBar = ({current, max, barName}) => {

    let emptyBar = "barType "+barName+"Empty";
    let fullBar = "barType "+barName+" full";
    let barStyle = {width: formatBar(current,max)};
    let overlayText = "barType overlayText";

    let abbrev = "HP";

    if(barName==="mana"){
        abbrev ="MP";
    }
    else if(barName==="exp"){
        abbrev = "EXP";
    }

    return (
        <div className={emptyBar}>
            <div className={fullBar} style={barStyle}>
                <div className={overlayText}>
                    {current} / {max} {abbrev}
                </div>
            </div>
        </div>
    );
};

BigBar.propTypes = {
    current : PropTypes.number.isRequired,
    max : PropTypes.number.isRequired,
    barName : PropTypes.string.isRequired
};

export default BigBar;