import {useState} from "react"
import {Node} from "./AnimeGraph"

function SearchBar({animeGraph}) {
    let [searchString, setSearchString] = useState("")
    let [isFocused, setIsFocused] = useState(false);

    let handleChange = e => setSearchString(e.target.value);

    function getSearchAnime(): Node[] {
        return animeGraph.nodes.filter((node) => {
            // If the search string is empty, show all nodes
            if (node.label.length == 0) return false;
            if (!searchString) return true;
            // Convert the title to lowercase for case-insensitive search
            const label = node.label.toLowerCase();

            // If the title contains the search string, show the node
            return label.includes(searchString.toLowerCase());
        }).sort((lhs, rhs) => {
            return lhs.label.localeCompare(rhs.label);
        });
    }

    const searchResults = getSearchAnime();

    return (
        <div className={"pb-2 relative"}>
            <input type={"text"}
                   placeholder={"Enter Anime Title"}
                   className={"p-2 w-full rounded"}
                   value={searchString}
                   onChange={(e) => handleChange(e)}
                   onFocus={() => setIsFocused(true)}
                   onBlur={() => setIsFocused(false)}/>
            <div className={"bg-white rounded-b absolute w-full max-h-48 shadow-lg overflow-y-auto"}>
                {isFocused && (
                        searchResults.map((node) => (
                            <div key={node.id} className={"hover:bg-purple-500 order-last p-0.5"}
                                 onMouseDown={() => {
                                const updatedNode = { ...node, image: "https://ichef.bbci.co.uk/news/976/cpsprodpb/1362E/production/_128860497_334922667_762325655074030_2740480103230960428_n.jpg" };
                                animeGraph.network.body.data.nodes.update(updatedNode);}}>
                                {node.label}
                            </div>
                        ))
                )}
            </div>

        </div>
    )
}

function CheckBox({name}) {

    return (
        <span className={"flex-grow flex-nowrap whitespace-nowrap m-0 mt-1 mb-1 text-sm overflow-hidden"}>
            <input id={name} type="checkbox" className="z-10"></input>
            <label htmlFor={name} id={name} className="pl-1">{name}</label>
        </span>
    )

}

function AnimeBox({title}) {
    return (
        <div id="selected-Anime-Container" className={"bg-violet-200 rounded mt-2 p-0.5"}>
            <label id={"selected-Anime-Container"} className={"p-2"}>{title}</label>
            <hr/>
            <div className={"flex"}>
                <div className={"bg-violet-300 rounded m-1.5 h-64 w-1/2"}></div>
                <div className={"bg-violet-300 rounded m-1.5 h-64 w-1/2"}></div>
            </div>
        </div>
    )
}

export default function SideBar({animeGraph}) {
    return (
        <div id="sidebar" className={"flex-shrink-0 bg-[#2c2f33] min-w-500 flex-grow rounded"}>

            <SearchBar animeGraph={animeGraph}/>

            <div className={"flex bg-violet-300 rounded text-sm px-2 p-1"}>
                <CheckBox name="Genre"/>
                <CheckBox name="Staff"/>
                <CheckBox name="Studio"/>
                <CheckBox name="Year"/>
                <CheckBox name="Episodes"/>
                <CheckBox name="Popularity"/>
            </div>


            <AnimeBox title="Selected Anime"/>
            <AnimeBox title="Suggested Anime"/>

        </div>

    );
}