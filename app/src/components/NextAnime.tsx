import ExampleComponent from "./ExampleComponent";
import ExampleGraphDisplay from "./ExampleGraphDisplay";
import React from "react";


export default function NextAnime(props) {
    return (
        <div className="min-h-screen flex flex-col h-screen p-3">
            {/* Title */}
            <div>
                <ExampleComponent startNum={1}/>
            </div>

            {/* Main of Builder */}
            <main className="flex flex-row overflow-y-hidden h-full p-1">
                <ExampleGraphDisplay/>
            </main>
        </div>
    );
}