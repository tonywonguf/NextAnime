import React, {useState} from "react"
import {Node} from "vis-network"

function SearchBar({animeGraph}) {
    let [searchString, setSearchString] = useState("")
    let [isFocused, setIsFocused] = useState(false);

    // reads all the current nodes and creates the search results, depending on searchString
    function getSearchAnime(): Node[] {
        return animeGraph.nodes.get().filter((node) => {
            return (
                node.label &&
                node.label.toLowerCase().includes(searchString.toLowerCase()));
        }).sort((l, r) => {
            return l.label.localeCompare(r.label);
        });
    }

    // creates Divs for putting in search dropdown
    function searchAnimeDivs() {
        return (
            getSearchAnime().map((node) => (
                <div key={node.id} className={"hover:bg-purple-500 order-last p-0.5"}
                     onMouseDown={() => {
                         const updatedNode = { ...node,
                             image: "https://ichef.bbci.co.uk/news/976/cpsprodpb/1362E/production/_128860497_334922667_762325655074030_2740480103230960428_n.jpg" };
                         animeGraph.nodes.update(updatedNode)}}>
                    {node.label}
                </div>
            ))
        )
    }

    return (
        <div className={"pb-2 relative"}>
            <input type={"text"}
                   placeholder={"Enter Anime Title"}
                   className={"p-2 w-full rounded"}
                   value={searchString}
                   onChange={e => setSearchString(e.target.value)}
                   onFocus={setIsFocused.bind(this, true)}
                   onBlur={setIsFocused.bind(this, false)}/>

            <div className={"bg-white rounded-b absolute w-full max-h-48 shadow-lg overflow-y-auto"}>
                {isFocused && searchAnimeDivs()}
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
    return (<div className={"w-4/12 h-full relative"}>
        <div id="hide-button" className={"w-6 h-12 rounded-tl-lg flex rounded-bl-lg cursor-pointer absolute -left-5 top-[70%] bg-[#1e2124]"}
            /* onClick={}*/>
            <svg viewBox="0 0 24 24"
                 stroke="currentColor"
                 fill="none"
                 stroke-width="2"
                 stroke-linecap="round"
                 stroke-linejoin="round"
                 className="w-full h-100 items-center justify-center text-white">
                <path d="M9 18L15 12L9 6"></path>
            </svg>
        </div>
        <div id="sidebar" className={"relative w-full h-full overflow-y-hidden overflow-x-clip p-1 bg-[#36393e]"}>
            {/* Title */}
            <p className="text-3xl mb-2 text-white font-roboto"> NextAnime </p>

            <SearchBar animeGraph={animeGraph}/>

            {/* Check boxes */}
            <div className={"flex bg-violet-300 rounded text-sm px-2 p-1"}>
                <CheckBox name="Genre"/>
                <CheckBox name="Staff"/>
                <CheckBox name="Studio"/>
                <CheckBox name="Year"/>
                <CheckBox name="Episodes"/>
                <CheckBox name="Popularity"/>
            </div>

            {/* Container boxes */}
            <AnimeBox title="Selected Anime"/>
            <AnimeBox title="Suggested Anime"/>

        </div>
    </div>);
}