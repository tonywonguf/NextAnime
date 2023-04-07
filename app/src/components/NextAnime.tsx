import ExampleGraphDisplay from "./ExampleGraphDisplay";
import SideBar from "./SideBar";
import React from "react";


export default function NextAnime(props) {
    return (
        <div className="min-h-screen flex flex-col h-screen bg-[#23272a]">
            {/* Title */}
            <div className={"p-3"}>
                <p className="text-3xl mb-2 text-white font-roboto"> NextAnime </p>
                <hr/>
            </div>

            {/* Example Graph */}
            <main className="flex overflow-y-hidden h-full">
                <div className={"w-8/12 h-full p-1"}>
                    <ExampleGraphDisplay/>
                </div>

                <div className={"w-4/12 overflow-y-scroll overflow-x-clip p-1"}>
                    <SideBar/>
                </div>
            </main>
        </div>
    );
}