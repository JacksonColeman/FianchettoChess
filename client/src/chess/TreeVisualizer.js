import { useState } from "react";

export default function TreeVisualizer({positionTree, initialPosition}){

    const [showChildren, setShowChildren] = useState(false);
    let positionASCII = initialPosition[0]
    let positionValue = initialPosition[1]

    const children = positionTree[positionASCII]
    const hasChildren = positionTree[positionASCII]

    function OnClickShowChildren(){
        setShowChildren(!showChildren)
    }

    return (
        <div>
            <pre style={showChildren ? {color: "yellow"} : null}>{positionASCII}</pre>
            <p>Evaluation: {positionValue}</p>
            {hasChildren ? 
                <button onClick={OnClickShowChildren}>Show Children</button>
                :
                null
            }
            {showChildren 
            ? 
            <div style={{display: "flex"}}>
                {children.map(child =>
                <TreeVisualizer positionTree={positionTree} initialPosition={child}/>
                ) }
            </div>
            : 
            null}
            
        </div>
    )
}