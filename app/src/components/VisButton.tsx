import React, {useState, useEffect} from 'react';

export default function VisButton({name, func}) {
    return (<button
        className={"btn"}
        onClick={func}>
        {name}
    </button>);
}

export function GraphSizeButton({animeGraph}) {
    let [graphSize, setGraphSize] = useState(25);
    useEffect(() => {
        animeGraph.graphSize = graphSize;
    }, [graphSize])

    // https://stackoverflow.com/questions/31110184/react-synthetic-event-distinguish-left-and-right-click-events
    const handleClick = (e) => {
        e.preventDefault();
        if (e.type === 'click')
            setGraphSize(graphSize == 800 ? 25 : 2*graphSize)
        else if (e.type === 'contextmenu')
            setGraphSize(graphSize == 25 ? 800 : graphSize/2)
    };

    return (<button
        className={"w-[5vh] btn"}
        onClick={handleClick} onContextMenu={handleClick}>
        {graphSize}
    </button>);
}