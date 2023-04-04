import {Component} from "react";
import AnimeData from '../data/animedata.json';

interface Props {
}

interface States {
}

export default class AnimeDataDisplay extends Component<Props, States> {
    componentDidMount() {
        console.log("AnimeData", AnimeData)
    }

    render() {
        return (
            <div className={"font-mono"}>
                {JSON.stringify(AnimeData)}
            </div>
        );
    }
}