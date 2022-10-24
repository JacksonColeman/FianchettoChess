import { useState } from "react";

export default function TreeVisualizer({positionTree, initialPosition}){

    const [showChildren, setShowChildren] = useState(false);

    const children = positionTree[initialPosition]
    const hasChildren = positionTree[initialPosition]

    function OnClickShowChildren(position){
        setShowChildren(!showChildren)
    }

    return (
        <div>
            <pre style={showChildren ? {color: "yellow"} : null}>{initialPosition}</pre>
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