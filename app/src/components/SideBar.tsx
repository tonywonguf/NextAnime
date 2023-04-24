import React, {useLayoutEffect, useState} from "react"
import {Node} from "vis-network"
import {nodes} from "./Datafile";

function SearchBar({animeGraph, selectedAnime, setSelectedAnime}) {
    let [searchString, setSearchString] = useState("")
    let [isFocused, setIsFocused] = useState(false);

    // reads all the current nodes and creates the search results, depending on searchString
    function getSearchAnime(): Node[] {
        return nodes.get().filter(node => {
            const found = Object.values(node.titles)
                .some((t: String) => t?.toLowerCase().includes(searchString.toLowerCase()));

            return (node.label && found);
        }).slice(0, 50);
    }

    const searchedAnime = getSearchAnime();

    // creates Divs for putting in search dropdown
    function searchAnimeDivs() {
        return (
            searchedAnime.map(node => (
                <div key={node.id}
                     className={`hover:bg-purple-500 order-last p-0.5 pointer-events-auto
                                ${node === selectedAnime ? 'bg-green-300 font-bold' : ''}`}
                     onMouseDown={() => {
                         setSelectedAnime(node);
                         // animeGraph.nodes.clear();
                         if (!animeGraph.nodes.get(node.id))
                             animeGraph.nodes.add(node);
                     }}>
                    {node.label}
                </div>
            ))
        )
    }

    function keyboardEvents(keyPressed: String) {
        if (keyPressed == 'Enter')
            setSelectedAnime(searchedAnime[0]);
        if (keyPressed == 'Escape')
            document.getElementById("search-bar").blur()
    }

    return (
        <div className={"pb-2 relative pointer-events-auto"}>
            <input id={"search-bar"}
                   type={"text"}
                   placeholder={"Enter Anime Title"}
                   className={"p-2 w-full rounded"}
                   value={searchString}
                   onChange={e => setSearchString(e.target.value)}
                   onFocus={setIsFocused.bind(this, true)}
                   onBlur={setIsFocused.bind(this, false)}
                   onKeyDown={e => keyboardEvents(e.key)}/>

            <div
                className={"bg-white rounded-b absolute w-full max-h-48 shadow-lg overflow-y-auto pointer-events-auto"}>
                {isFocused && searchAnimeDivs()}
            </div>
        </div>
    )
}

function CheckButton(name, func: Function) {
    let [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }
    return (
        <button className={`Button ${clicked? "btn-param-c" : "btn-param-u"}`}
                onClick={func.bind(this) && handleClick}>
            {name}
        </button>
    );

}

function AnimeBox({title, selectedAnime}) {
    return (
        <div id="selected-Anime-Container" className={"bg-violet-200 rounded mt-2 p-0.5 w-full pointer-events-auto"}>
            <label id={"selected-Anime-Container"} className={"p-2"}>{title}</label>
            <hr/>
            <div className={"flex"}>
                <div className={"bg-violet-300 rounded m-1.5 h-80 w-1/2 font-mono p-1 overflow-y-auto"}>
                    {selectedAnime &&
                        <p>
                            Title: {selectedAnime["label"]} <br/>
                            <hr/>
                            Genres: {selectedAnime["tags"].join(", ") ?? ""} <br/>
                            <hr/>
                            MediaType: {selectedAnime["mediaType"]} <br/>
                            <hr/>
                            Episodes: {selectedAnime["episodes"] ?? "None"} <br/>
                            <hr/>
                            Chapters: {selectedAnime["chapters"] ?? "None"} <br/>
                            <hr/>
                            Year: {selectedAnime["seasonYear"]} <br/>
                            <hr/>
                            Studio: {selectedAnime["studios"].map(info => info["name"]).join(", ")??""} <br/>
                        </p>}
                </div>
                <div className={"bg-violet-300 rounded flex items-center justify-center m-1.5 p-1 h-80 w-1/2"}>
                    {selectedAnime &&
                        <img className={"object-fill max-h-full max-w-full"} src={selectedAnime["imageLarge"]}
                             alt={selectedAnime["imageLarge"]}/>}
                </div>
            </div>
        </div>
    )
}

export default function SideBar({animeGraph}) {

    let [selectedAnime, setSelectedAnime] = useState(null);
    let [selectedSuggestedAnime, setSelectedSuggestedAnime] = useState(null);
    let [selectedParameters, setSelectedParameters] = useState([false, false, false, false, false]);


    if (animeGraph.network)
        animeGraph.network.on("click", (e) => {
            const id = e.nodes[0]
            if (id == undefined) return;
            setSelectedSuggestedAnime(animeGraph.nodes.get(id))
        });

    return (
        <div
            className={"absolute top-0 right-0 w-4/12 h-full flex-grow overflow-y-hidden overflow-x-clip p-1 pointer-events-none"}>
            {/* Title */}
            <div className={""}>
                <p className="text-3xl mb-2 text-white font-roboto"> NextAnime </p>

                <SearchBar animeGraph={animeGraph} selectedAnime={selectedAnime} setSelectedAnime={setSelectedAnime}/>

                {/* Check boxes */}
                <div className={"flex bg-violet-300 rounded text-sm px-2 p-1 pointer-events-auto"}>
                    {CheckButton("Genre", ()=> console.log(this))}
                    {CheckButton("Studio", ()=> console.log(this))}
                    {CheckButton("Year", ()=> console.log(this))}
                    {CheckButton("Episodes", ()=> console.log(this))}
                    {CheckButton("MediaType", ()=> console.log(this))}
                </div>

                {/* Container boxes */}
                <AnimeBox title="Selected Anime" selectedAnime={selectedAnime}/>
                <AnimeBox title="Suggested Anime" selectedAnime={selectedSuggestedAnime}/>
            </div>

        </div>);
}