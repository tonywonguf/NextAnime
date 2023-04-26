import React, {useEffect, useState} from "react"
import {Node} from "vis-network"
import {nodes} from "./Datafile";
import {longestCommonSubstring} from "./ToolBox";

function SearchBar({animeGraph, selectedAnime, setSelectedAnime}) {
    let [searchString, setSearchString] = useState("")
    let [isFocused, setIsFocused] = useState(false);

    // reads all the current nodes and creates the search results, depending on searchString
    function getSearchAnime(): Node[] {
        return nodes.get().filter(node => {
            return Object.values(node.titles)
                .some((t: string) => t?.toLowerCase().includes(searchString?.toLowerCase()));
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
                         animeGraph.nodes.clear()
                         animeGraph.edges.clear()
                         setSelectedAnime(node);
                         if (!animeGraph.nodes.get(node.id))
                             animeGraph.nodes.add(node);
                     }}>
                    {node.label}
                </div>
            ))
        )
    }

    function keyboardEvents(keyPressed: String) {
        if (keyPressed == 'Enter' && searchedAnime.length != 0) {
            animeGraph.nodes.clear()
            animeGraph.edges.clear()
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

            <div
                className={"absolute -z-5 bg-white rounded-b absolute w-full mt-[4.15vh] max-h-[30vh] shadow-lg overflow-y-auto pointer-events-auto"}>
                {isFocused && searchAnimeDivs()}
            </div>
        </div>
    )
}
//button for associated parameter to change weights on graph
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
//boxes used to display content of specific anime
function AnimeBox({selectedAnime}) {
    return (
        <div
            className={"flex flex-col bg-violet-200 rounded-[1vh] mt-[1vh] p-[0.5vh] w-full pointer-events-auto h-[30vh]"}>
            <div className={"flex flex-grow"}>
                <div className={"inner-anime-box"}>
                    {selectedAnime &&
                        <p>
                            Title: {selectedAnime.label} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            Genres: {selectedAnime.tags.join(", ") ?? ""} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            Episodes: {selectedAnime.episodes ?? "None"} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            Year: {selectedAnime.seasonYear} <br/>
                            <hr className={"border-[0.1vh]"}/>
                            Studio: {selectedAnime.studios.map(info => info.name).sort().join(", ") ?? ""} <br/>
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
//function for collapsing sidebar
function collapseSidebar() {
    const sidebar = document.getElementById("side-bar")
    sidebar.classList.toggle("invisible");
}
//box for showing similarity content of selected Anime and selected Suggested Anime
function SimilarityBox({sA, sSA, sP}) {
    const a = sA;
    const b = sSA;
    if (!a || !b) return <div className={'similarity-box'}/>;

    const aLabel = a.label.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
    const bLabel = b.label.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();

    const lcsTitle = longestCommonSubstring(aLabel, bLabel);
    const lcsTitleSimilarity = (aLabel.length != 0) ? lcsTitle.length / aLabel.length : 0;

    const interTags = a.tags.filter(tag => b.tags.includes(tag))
    const interTagsSimilarity = (a.tags.length != 0) ? interTags.length / a.tags.length : 0;

    const episodeSimilarity = (a.episodes && b.episodes) ? 1 - (Math.min(Math.abs(a.episodes - b.episodes), 12) / 12) : 0;

    const yearSimilarity = (a.seasonYear && b.seasonYear) ? 1 - (Math.min(Math.abs(a.seasonYear - b.seasonYear), 20) / 20) : 0;

    const arrayA = a.studios.map(info => info.name)
    const arrayB = b.studios.map(info => info.name)
    const interStudios = arrayA.filter(studio => arrayB.includes(studio))
    const interStudiosSimilarity = (arrayA.length != 0) ? interStudios.length / arrayA.length : 0;

    const totalSimilarity = (sP["Title"] && 4 * lcsTitleSimilarity)
        + (sP["Genre"] && 2 * interTagsSimilarity)
        + (sP["Episodes"] && episodeSimilarity)
        + (sP["Year"] && yearSimilarity)
        + (sP["Studio"] && 3 * interStudiosSimilarity);
    const similarityDivisor = (sP["Title"] && aLabel.length != 0 && 4)
        + (sP["Genre"] && a.tags.length != 0 && 2)
        + (sP["Episodes"] && a.episodes && b.episodes && 1)
        + (sP["Year"] && a.seasonYear && b.seasonYear && 1)
        + (sP["Studio"] && arrayA.length != 0 && 3)

    return (
        <div className={"similarity-box"}>

            <SimilarityEntry text={`LCS between Titles: ${lcsTitle.length != 0 ? "\"" + lcsTitle + "\"" : 'NONE'}`}
                             percent={(aLabel.length != 0) ? (100 * lcsTitleSimilarity).toFixed(2) + '%' : "N/A"}/>

            <SimilarityEntry text={`Common Genres: ${interTags.join(", ")}`}
                             percent={(a.tags.length != 0) ? (100 * interTagsSimilarity).toFixed(2) + '%' : "N/A"}/>

            <SimilarityEntry
                text={`Episode Difference: ${(a.episodes && b.episodes) ? Math.abs(a.episodes - b.episodes) : "N/A"}`}
                percent={(a.episodes && b.episodes) ? (100 * episodeSimilarity).toFixed(2) + '%' : "N/A"}/>

            <SimilarityEntry
                text={`Year Difference: ${(a.seasonYear && b.seasonYear) ? Math.abs(a.seasonYear - b.seasonYear) : "N/A"}`}
                percent={(a.seasonYear && b.seasonYear) ? (100 * yearSimilarity).toFixed(2) + '%' : "N/A"}/>

            <SimilarityEntry text={`Common Studios: ${interStudios.join(", ")}`}
                             percent={(arrayA.length != 0) ? (100 * interStudiosSimilarity).toFixed(2) + '%' : "N/A"}/>

            <div className={"flex text-[2.5vh]"}>
                <p className={"flex-grow"}>Total Similarity: </p>
                <p>{(100 * totalSimilarity / similarityDivisor).toFixed(2)}%</p>
            </div>

        </div>
    )
}
//specific similarity text within similarity box
function SimilarityEntry({text, percent}) {
    return (
        <>
            <div className={"flex"}>
                <p className={"flex-grow"}>{text}</p>
                <p>{percent}</p>
            </div>
            <hr className={"border-[0.1vh]"}/>
        </>);
}
//the functional sideBar component which allows for:
//anime selection
//parameter manipulation
//anime content retrieval
//similarity characterstic retrieval
export default function SideBar({animeGraph}) {

    let [selectedAnime, setSelectedAnime] = useState(null);
    let [selectedSuggestedAnime, setSelectedSuggestedAnime] = useState(null);
    let [selectedParameters, setSelectedParameters] = useState({
        Title: true,
        Genre: true,
        Studio: true,
        Year: true,
        Episodes: true
    });
    //updates selectedParameters on animeGraph
    useEffect(() => {
        animeGraph.selectedParameters = selectedParameters;
    }, [selectedParameters]);

    //sets the selectedSuggestedAnime based on clicking an image
    if (animeGraph.network)
        animeGraph.network.on("click", (e) => {
            const id = e.nodes[0]
            if (id == undefined) return;
            setSelectedSuggestedAnime(animeGraph.nodes.get(id))
        });

    return (<>
        {/* Title */}
        <p className="title"
           onClick={collapseSidebar.bind(this)}> NextAnime </p>

        <div id={"side-bar"}
             className={"absolute top-[6.2vh] right-0 w-4/12 h-[92vh] flex-grow overflow-y-hidden overflow-x-clip m-[0.5vh] pointer-events-none"}>

            <SearchBar animeGraph={animeGraph} selectedAnime={selectedAnime} setSelectedAnime={setSelectedAnime}/>

            {/* Check boxes */}
            <div className={"flex bg-violet-300 h-[5.5vh] rounded-[0.5vh] text-[1vh] p-[0.5vh] pointer-events-auto"}>
                <CheckButton name="Title" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="Genre" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="Studio" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="Year" sP={selectedParameters} sSP={setSelectedParameters}/>
                <CheckButton name="Episodes" sP={selectedParameters} sSP={setSelectedParameters}/>
            </div>

            {/* Container boxes */}
            <AnimeBox selectedAnime={selectedAnime}/>
            <AnimeBox selectedAnime={selectedSuggestedAnime}/>

            <SimilarityBox sA={selectedAnime} sSA={selectedSuggestedAnime} sP={selectedParameters}/>
        </div>
    </>);
}