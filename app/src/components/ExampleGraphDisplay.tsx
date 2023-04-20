export default function GraphDisplay({animeGraph}) {
    return (
        <div className={"bg-[#2c2f33] rounded flex h-full relative"}>
            <div className={"absolute z-10"}>

                <button className={"btn"}
                        onClick={animeGraph.recolor.bind(animeGraph)}>
                    Recolor!
                </button>

                <button className={"btn"}
                        onClick={animeGraph.refit.bind(animeGraph)}>
                    Refit!
                </button>

            </div>

            {animeGraph.display()}

        </div>
    );

}
