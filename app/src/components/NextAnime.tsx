import ExampleGraphDisplay from "./ExampleGraphDisplay";
import SideBar from "./SideBar";
import React from "react";
import VisBar from "./VisBar";


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
                <VisBar/>
                <ExampleGraphDisplay/>
                <SideBar/>
            </main>
        </div>
    );
}