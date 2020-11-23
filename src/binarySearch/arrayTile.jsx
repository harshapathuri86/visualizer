import React from "react";

const ArrayTile = ({ idx, val, type ,width}) => {
    let ArrStyle = {  width: `${width}%` };
    console.log("WIDTH",width);
    if(type === "binarySearch")  return(
    <div className="b-array-bar" style={ArrStyle}>
        {`${val}`}
        <br/>
        <span>{`${idx}`}</span>
    </div>
    );
    else
    {
        return(
        <div className="l-array-bar" style={ArrStyle}>
            {`${val}`}
            <br/>
            <span>{`${idx}`}</span>
        </div>
        );
    }
};
export default ArrayTile;

