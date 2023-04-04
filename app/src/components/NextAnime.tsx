import ExampleComponent from "./ExampleComponent";
import ExampleGraphDisplay from "./ExampleGraphDisplay";
import React from "react";


export default function NextAnime(props) {
    return (
        <div className="min-h-screen flex flex-col h-screen">
            {/* Title */}
            <div className={"p-3"}>
                <p className="text-2xl text-slate-700 mb-2">NextAnime</p>
                <hr className={"my-2"}/>
            </div>

            {/* Example Graph */}
            <main className="flex flex-row overflow-y-hidden h-full">
                <ExampleGraphDisplay/>
            </main>
        </div>
    );
}