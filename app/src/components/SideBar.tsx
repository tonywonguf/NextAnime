import React, {useState} from "react"
import {Node} from "vis-network"
import {nodes} from "./Datafile";

function SearchBar({setSelectedAnime}) {
    let [searchString, setSearchString] = useState("")
    let [isFocused, setIsFocused] = useState(false);

    // reads all the current nodes and creates the search results, depending on searchString
    function getSearchAnime(): Node[] {
        return nodes.filter((node) => {
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
                     onMouseDown={setSelectedAnime.bind(this, node)}>
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

function AnimeBox({title, selectedAnime}) {
    return (
        <div id="selected-Anime-Container" className={"bg-violet-200 rounded mt-2 p-0.5"}>
            <label id={"selected-Anime-Container"} className={"p-2"}>{title}</label>
            <hr/>
            <div className={"flex"}>
                <div className={"bg-violet-300 rounded m-1.5 h-64 w-1/2 font-mono p-1"}>
                    <p>
                        Title:  {selectedAnime["label"]} <br/>
                        <hr/>
                        Genres:  {selectedAnime["tags"].join(", ")} <br/>
                        <hr/>
                        MediaType:  {selectedAnime["mediaType"]} <br/>
                        <hr/>
                        Episodes:  {selectedAnime["episodes"]??"None"} <br/>
                        <hr/>
                        Chapters:  {selectedAnime["chapters"]??"None"} <br/>
                        <hr/>
                        Year:  {selectedAnime["year"]} <br/>
                    </p>
                </div>
                <div className={"bg-violet-300 rounded flex items-center justify-center m-1.5 p-1 h-64 w-1/2"}>
                    <img className={"object-fill max-h-full max-w-full"} src={selectedAnime["imageLarge"]} alt={selectedAnime["imageLarge"]}/>
                </div>
            </div>
        </div>
    )
}

export default function SideBar() {
    let [selectedAnime, setSelectedAnime] = useState(nodes[0]);
    let [selectedSuggestedAnime, setSelectedSuggestedAnime] = useState(nodes[0]);

    return (<div className={"w-4/12 h-full relative flex-grow"}>
        <div id="hide-button" className={"hideBtn"}>
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

            <SearchBar setSelectedAnime={setSelectedAnime}/>
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
            <AnimeBox title="Selected Anime" selectedAnime={selectedAnime}/>
            <AnimeBox title="Suggested Anime" selectedAnime={selectedAnime}/>

        </div>
    </div>);
}