export default function SideBar(props) {
    return (
        <div id="sidebar" className={"flex-shrink-0 bg-[#2c2f33] min-w-500 flex-grow rounded "}>
            <div className={"py-2"}>
                <div className={"flex justify-between mx-2 gap-2"}>
                    <input type={"text"} placeholder={"Enter Anime Title"} className={"p-4 h-10 grow rounded "}></input>
                    <button
                        className={"bg-[#23272a] text-[#80848e] rounded p-2 h-10 w-32 hover:brightness-150"}>SEARCH
                    </button>
                </div>
            </div>

            <div id="parameter-container" className={"bg-violet-300 rounded px-2 py-1 mx-2"}>
                <label id={"parameter-container"}>Parameters</label>
                <hr></hr>
                <div className={"flex text-sm"}>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="genres" type="checkbox" className={"flex"}></input>
                        <label htmlFor="genres" id={"genres"} className={"flex m-1"}>Genres</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="staff" type="checkbox" className={"flex"}></input>
                        <label htmlFor="staff" id={"staff"} className={"flex m-1"}>Staff</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="studio" type="checkbox" className={"flex"}></input>
                        <label htmlFor="studio" id={"studio"} className={"flex m-1"}>Studio</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="year" type="checkbox" className={"flex"}></input>
                        <label htmlFor="year" id={"year"} className={"flex m-1"}>Year</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="episodes" type="checkbox" className={"flex"}></input>
                        <label htmlFor="episodes" id={"episodes"} className={"flex m-1"}>Episodes</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="popularity" type="checkbox" className={"flex"}></input>
                        <label htmlFor="popularity" id={"popularity"} className={"flex m-1"}>Popularity</label>
                    </div>
                </div>

            </div>
            <div id="selected-Anime-Container" className={"bg-violet-200 rounded p-2 m-2"}>
                <label id={"selected-Anime-Container"} className={"flex"}>Selected Anime</label>
                <hr></hr>
                <div className={"flex"}>
                    <div className={"bg-violet-300 rounded m-1.5 h-64 w-1/2"}></div>
                    <div className={"bg-violet-300 rounded m-1.5 h-64 w-1/2"}></div>
                </div>
            </div>

            <div id="suggested-Anime-Container" className={"bg-violet-200 rounded p-2 m-2"}>
                <label id={"suggested-Anime-Container"} className={"flex"}>Suggested Anime</label>
                <hr></hr>
                <div className={"flex"}>
                    <div className={"bg-violet-300 rounded m-1.5 h-64 w-1/2"}></div>
                    <div className={"bg-violet-300 rounded m-1.5 h-64 w-1/2"}></div>
                </div>
            </div>
        </div>

    );
}