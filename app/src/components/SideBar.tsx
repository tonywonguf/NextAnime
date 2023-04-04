export default function SideBar(props) {
    return (
        <div id = "sidebar" className={"w-1/4 flex-shrink-0 bg-[#2c2f33] min-w-500 flex-grow m-1 rounded"}>
            <div className={"flex"}>
                <input type={"text"} placeholder={"Enter Anime Title"} className={"m-3 p-4 h-8 w-72"}></input>
                <button className={"bg-[#23272a] text-[#80848e] rounded p-2 ml-4 my-2 w-32 hover:brightness-150"}>SEARCH</button>
            </div>
            <div id = "parameter-container" className={"bg-violet-300 rounded p-2 m-2 h-20"}>
                <label id={"parameter-container"}>Parameters</label>
                <hr></hr>
                <div className={"flex"}>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="genres" type="checkbox" className={"flex"}></input>
                        <label id={"genres"} className={"flex m-1"}>Genres</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="staff" type="checkbox" className={"flex"}></input>
                        <label id={"staff"} className={"flex m-1"}>Staff</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="studio" type="checkbox" className={"flex"}></input>
                        <label id={"studio"} className={"flex m-1"}>Studio</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="year" type="checkbox" className={"flex"}></input>
                        <label id={"year"} className={"flex m-1"}>Year</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="episodes" type="checkbox" className={"flex"}></input>
                        <label id={"episodes"} className={"flex m-1"}>Episodes</label>
                    </div>
                    <div className={"flex m-0.5 p-0.5"}>
                        <input id="popularity" type="checkbox" className={"flex"}></input>
                        <label id={"popularity"} className={"flex m-1"}>Popularity</label>
                    </div>
                </div>

            </div>
            <div id = "selected-Anime-Container" className={"bg-violet-200 rounded p-2 m-2 h-80"}>
                <label id={"selected-Anime-Container"} className={"flex"}>Selected Anime</label>
                <hr></hr>
                <div className={"flex"}>
                    <div className={"bg-violet-300 rounded m-1.5 h-64 w-1/2"}></div>
                    <div className={"bg-violet-300 rounded m-1.5 h-64 w-1/2"}></div>
                </div>
            </div>

            <div id = "suggested-Anime-Container" className={"bg-violet-200 rounded p-2 m-2 h-80"}>
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