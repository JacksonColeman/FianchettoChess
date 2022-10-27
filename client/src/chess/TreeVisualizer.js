import { useState } from "react";

export default function TreeVisualizer({positionTree, initialPosition}){


    const [showChildren, setShowChildren] = useState(false);
    let positionASCII = initialPosition[0]
    let positionMove = initialPosition[1]
    let positionValue = initialPosition[2]
    let positionAlpha = initialPosition[3]
    let positionBeta = initialPosition[4]

    const children = positionTree[positionASCII]
    const hasChildren = positionTree[positionASCII]

    function OnClickShowChildren(){
        setShowChildren(!showChildren)
    }

    if (positionTree == {}){
        return (
            <div></div>
        )
    }

    return (
        <div>
        { positionASCII ?
            <div className="tree-node">
                <pre style={showChildren ? {color: "yellow"} : null}>{positionASCII}</pre>
                <p>Move: {positionMove}</p>
                <p>Evaluation: {Math.round(positionValue)}</p>
                {/* <p>ALPHA: {positionAlpha}</p>
                <p>BETA: {positionBeta}</p> */}
                {hasChildren ? 
                    <button onClick={OnClickShowChildren}>{showChildren ? "Hide Children" : "Show Children"}</button>
                    :
                    null
                }
                {(showChildren && children!=null)
                ? 
                <div style={{display: "flex"}}>
                    {children.map(child =>
                    <TreeVisualizer positionTree={positionTree} initialPosition={child}/>
                    ) }
                </div>
                : 
                null}
                
            </div>
            :
            null
        }
        </div>
    )
}