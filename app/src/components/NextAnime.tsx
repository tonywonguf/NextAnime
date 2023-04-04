import ExampleComponent from "./ExampleComponent";
import ExampleGraphDisplay from "./ExampleGraphDisplay";
import SideBar from "./SideBar";
import React from "react";


export default function NextAnime(props) {
    return (
        <div className="min-h-screen flex flex-col h-screen bg-[#23272a] font-mono">
            {/* Title */}
            <div className={"p-3"}>
                <p className="text-3xl mb-2 text-white"> NextAnime </p>
                <hr/>
            </div>

            {/* Example Graph */}
            <main className="flex overflow-y-hidden h-full">
                <ExampleGraphDisplay/>
                <SideBar/>
            </main>
        </div>
    );
}