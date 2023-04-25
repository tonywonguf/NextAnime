import React, {useEffect, useState} from "react"
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
                     className={`hover:bg-purple-500 order-last p-[0.25vh] text-[1.5vh] pointer-events-auto
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
        if (keyPressed == 'Enter') {
            const node = searchedAnime[0]
            setSelectedAnime(node);
            if (!animeGraph.nodes.get(node.id))
                animeGraph.nodes.add(node);
        }
        if (keyPressed == 'Escape')
            document.getElementById("search-bar").blur()
    }

    return (
        <div className={"flex flex-row pb-[1vh] h-[5.5vh] relative pointer-events-auto"}>
            <input id={"search-bar"}
                   type={"text"}
                   placeholder={"Enter Anime Title"}
                   className={"p-[0.6vh] w-full rounded-[0.5vh] text-[2vh] !outline-none"}
                   value={searchString}
                   autoComplete={"off"}
                   onChange={e => setSearchString(e.target.value)}
                   onFocus={setIsFocused.bind(this, true)}
                   onBlur={setIsFocused.bind(this, false)}
                   onKeyDown={e => keyboardEvents(e.key)}/>

            <div className={"absolute -z-5 bg-white rounded-b absolute w-full mt-[4.15vh] max-h-[30vh] shadow-lg overflow-y-auto pointer-events-auto"}>
                {isFocused && searchAnimeDivs()}
            </div>
        </div>
    )
}

function CheckButton({name, sP, sSP}) {
    let newSelectedParameters = {...sP}
    newSelectedParameters[name] = !newSelectedParameters[name];

    return (
        <button className={`btn-param ${sP[name] ? "bg-violet-400" : "bg-violet-300"}`}
                onClick={sSP.bind(this, newSelectedParameters)}>
            {name}
        </button>
    );

}

function AnimeBox({title, selectedAnime}) {
    return (
        <div className={"flex flex-col bg-violet-200 rounded-[1vh] mt-[1vh] p-[0.5vh] w-full pointer-events-auto h-[30vh]"}>
            <label className={"p-[0.5vh] text-[2vh]"}>{title}</label>
            <hr className={"border-[0.1vh]"}/>
            <div className={"flex flex-grow"}>
                <div className={"inner-anime-box"}>
                    {selectedAnime &&
                        <p>
                            Title: {selectedAnime["label"]} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            Genres: {selectedAnime["tags"].join(", ") ?? ""} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            MediaType: {selectedAnime["mediaType"]} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            Episodes: {selectedAnime["episodes"] ?? "None"} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            Chapters: {selectedAnime["chapters"] ?? "None"} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            Year: {selectedAnime["seasonYear"]} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            Studio: {selectedAnime["studios"].map(info => info["name"]).join(", ")??""} <br/>
                        </p>}
                </div>
                <div className={"inner-anime-box justify-center flex"}>
                    {selectedAnime &&
                        <img className={"max-h-full max-w-full"} src={selectedAnime["imageLarge"]}
                             alt={selectedAnime["imageLarge"]}/>}
                </div>

            </div>

        </div>
    )
}

function collapseSidebar() {
    const sidebar = document.getElementById("side-bar")
    sidebar.classList.toggle("invisible");
}

export default function SideBar({animeGraph}) {

    let [selectedAnime, setSelectedAnime] = useState(null);
    let [selectedSuggestedAnime, setSelectedSuggestedAnime] = useState(null);
    let [selectedParameters, setSelectedParameters] = useState({
        Title: false,
        Genre: false,
        Studio: false,
        Year: false,
        Episodes: false,
        Chapters: false,
        MediaType: false});

    useEffect(() => {
        animeGraph.selectedParameters = selectedParameters;
    }, [selectedParameters]);


    if (animeGraph.network)
        animeGraph.network.on("click", (e) => {
            const id = e.nodes[0]
            if (id == undefined) return;
            setSelectedSuggestedAnime(animeGraph.nodes.get(id))
        });

    return ( <>
        {/* Title */}
        <p className="title"
           onClick={collapseSidebar.bind(this)}> NextAnime </p>

        <div id={"side-bar"}
            className={"absolute top-[6.2vh] right-0 w-4/12 h-[90vh] flex-grow overflow-y-hidden overflow-x-clip m-[0.5vh] pointer-events-none"}>

            <SearchBar animeGraph={animeGraph} selectedAnime={selectedAnime} setSelectedAnime={setSelectedAnime}/>

            {/* Check boxes */}
            <div className={"flex bg-violet-300 h-[5.5vh] rounded-[0.5vh] text-[1vh] p-[0.5vh] pointer-events-auto"}>
                <CheckButton name="Title" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="Genre" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="Studio" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="Year" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="Episodes" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="Chapters" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="MediaType" sP={selectedParameters} sSP={setSelectedParameters}/>
            </div>

            {/* Container boxes */}
            <AnimeBox title="Selected Anime" selectedAnime={selectedAnime}/>
            <AnimeBox title="Suggested Anime" selectedAnime={selectedSuggestedAnime}/>

        </div>
    </>);
}