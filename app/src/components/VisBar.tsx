import ExampleGraphDisplay from "./ExampleGraphDisplay";
export default function VisBar(props) {
    return (
        <div id = "visbar" className={"w-1/12 flex-shrink-0 bg-[#2c2f33] min-w-500 flex-grow m-1 rounded"}>
            <p className={"p-2 pl-3 text-white"}>VIS-BAR</p>
            {/*<button className={"bg-[#23272a] text-[#80848e] rounded p-2 ml-3 my-2 hover:brightness-150"}
                    onClick={() => recolor.bind(this)(edges)}>Recolor!
            </button>
            <button className={"bg-[#23272a] text-[#80848e] rounded p-2 ml-3 my-2 hover:brightness-150"}
                    onClick={() => network.fit()}>Refit!
            </button>*/}
            //TODO: Figure out how to actually implement the button :)
        </div>

    );
}