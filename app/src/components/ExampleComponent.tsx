import {Component} from "react";
import AnimeDataDisplay from "./AnimeDataDisplay";

interface Props {
    startNum: number
}

interface States {
    num: number
}

export default class ExampleComponent extends Component<Props, States> {
    constructor(props) {
        super(props);
        this.state = {num: this.props.startNum};
    }

    increment() {
        this.setState({num: this.state.num + 1});
    }

    render() {
        return (
            <div>
                <p className={"mb-2"}>
                    <b>Current #:</b> <a className={"font-mono"}>{this.state.num}</a>
                </p>

                <button onClick={this.increment.bind(this)}
                        className={"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"}
                >
                    Increment
                </button>

                <hr className={"my-2"}/>

                <AnimeDataDisplay/>
            </div>
        )
    }
}
