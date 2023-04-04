import Graph from "react-graph-vis";
import {v4 as uuidv4} from 'uuid';
import {useState} from "react";


export default function GraphDisplay(props) {
    let [graphKey, setGraphKey] = useState(uuidv4());
    let [nodes, setGraph] = useState([
        {
            "id": 0,
            "label": "Cowboy Bebop",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx1-CXtrrkMpJ8Zq.png"
        },
        {
            "id": 1,
            "label": "Cowboy Bebop: The Movie - Knockin' on Heaven's Door",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx5-NozHwXWdNLCz.jpg"
        },
        {
            "id": 2,
            "label": "Trigun",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx6-Zzun7PHNNgPt.jpg"
        },
        {
            "id": 3,
            "label": "Witch Hunter ROBIN",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx7-6uh1fPvbgS9t.png"
        },
        {
            "id": 4,
            "label": "Beet the Vandel Buster",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/b8-ReS3TwSgrDDi.jpg"
        },
        {
            "id": 5,
            "label": "Eyeshield 21",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx15-A4F2t0TgWoi4.png"
        },
        {
            "id": 6,
            "label": "Honey and Clover",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx16-5fJZ2Sy2ThRA.jpg"
        },
        {
            "id": 7,
            "label": "",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx17-6kqIbdUk3dgi.png"
        },
        {
            "id": 8,
            "label": "Initial D 4th Stage",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/b18-r7IirVmwP89u.jpg"
        },
        {
            "id": 9,
            "label": "Monster",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx19-ham53gnijfiN.jpg"
        },
        {
            "id": 10,
            "label": "Naruto",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx20-YJvLbgJQPCoI.jpg"
        },
        {
            "id": 11,
            "label": "ONE PIECE",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/nx21-tXMN3Y20PIL9.jpg"
        },
        {
            "id": 12,
            "label": "The Prince of Tennis",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx22-8Qg3NZXH6asP.png"
        },
        {
            "id": 13,
            "label": "",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx23-OwtP69d9B9kg.jpg"
        },
        {
            "id": 14,
            "label": "School Rumble",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx24-InbFkgWGvqIK.png"
        },
        {
            "id": 15,
            "label": "Desert Punk",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx25-H1etX7IgfFtQ.jpg"
        },
        {
            "id": 16,
            "label": "Texhnolyze",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx26-u2SawALYH3w3.jpg"
        },
        {
            "id": 17,
            "label": "Trinity Blood",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx27-MOAaiBHHLfOY.png"
        },
        {
            "id": 18,
            "label": "",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx28-QuKcZpUjTXzV.png"
        },
        {
            "id": 19,
            "label": "",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx29-0PsnJVadMG7k.jpg"
        },
        {
            "id": 20,
            "label": "Neon Genesis Evangelion",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx30-wmNoX3m2qTzz.jpg"
        },
        {
            "id": 21,
            "label": "Neon Genesis Evangelion: Death & Rebirth",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx31-3zRThtzQH62E.png"
        },
        {
            "id": 22,
            "label": "Neon Genesis Evangelion: The End of Evangelion",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx32-i4ijZI4MuPiV.jpg"
        },
        {
            "id": 23,
            "label": "Berserk",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx33-CTtcRjqe7UnM.jpg"
        },
        {
            "id": 24,
            "label": "Ghost in the Shell",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx43-LMGXobx4D6in.png"
        },
        {
            "id": 25,
            "label": "Samurai X: Trust and Betrayal",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx44-MG5I672UbWAy.png"
        },
        {
            "id": 26,
            "label": "Rurouni Kenshin",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx45-DEFgZRCxiGmF.png"
        },
        {
            "id": 27,
            "label": "Samurai X: The Motion Picture",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx46-Steq4sQpA6fq.png"
        },
        {
            "id": 28,
            "label": "Akira",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx47-Sjkc8RDBjqwT.jpg"
        },
        {
            "id": 29,
            "label": ".hack//Sign",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx48-YKktSuM10DRK.png"
        },
        {
            "id": 30,
            "label": "Oh! My Goddess",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx49-jv1G7rSP4lxg.png"
        },
        {
            "id": 31,
            "label": "Oh! My Goddess (TV)",
            "shape": "image",
            "image": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx50-OdzAFLX6X6Hf.png"
        }
    ]);
    let [edges, setEdges] = useState([
        {
            "from": 0,
            "to": 10,
            "color": "eb2735",
            "id": "7a0407af-84bc-4fe1-be59-812407816943"
        },
        {
            "from": 1,
            "to": 6,
            "color": "17c3fb",
            "id": "4b47bf47-64ce-4624-9a95-b716280aa1ba"
        },
        {
            "from": 2,
            "to": 15,
            "color": "ef3160",
            "id": "d00b8366-8267-4b2a-884a-5eefa9b935d7"
        },
        {
            "from": 3,
            "to": 5,
            "color": "d7f25",
            "id": "f3b089b7-4be2-448c-9851-64a56fc7092e"
        },
        {
            "from": 4,
            "to": 20,
            "color": "d4043a",
            "id": "d29107db-0556-4f5a-9068-d27f99b3e794"
        },
        {
            "from": 5,
            "to": 30,
            "color": "faf36a",
            "id": "2876c294-5612-4ed3-9432-1e9b7f1558d8"
        },
        {
            "from": 6,
            "to": 9,
            "color": "73b36d",
            "id": "0af81f8c-36ad-41df-a58e-9f09d5db6ae7"
        },
        {
            "from": 7,
            "to": 0,
            "color": "d96b7a",
            "id": "e25db90b-5162-4eef-b1a9-fd868c214438"
        },
        {
            "from": 8,
            "to": 31,
            "color": "98a7de",
            "id": "c2bede96-bd13-4c52-8d37-63cfa8052521"
        },
        {
            "from": 9,
            "to": 1,
            "color": "577b33",
            "id": "e95d5ee1-d437-4aa6-9853-bc1d602e9913"
        },
        {
            "from": 10,
            "to": 25,
            "color": "5657ed",
            "id": "32786fbb-90a6-4e47-b7ef-f5003a64c461"
        },
        {
            "from": 11,
            "to": 28,
            "color": "b125c5",
            "id": "a50acd98-9765-4fcd-b72f-c9acf304713a"
        },
        {
            "from": 12,
            "to": 6,
            "color": "ebd3a7",
            "id": "f573390d-e144-4528-a129-e6a53ed29a99"
        },
        {
            "from": 13,
            "to": 27,
            "color": "975e80",
            "id": "91aaf69d-5bc6-47c5-ad95-9513255bb400"
        },
        {
            "from": 14,
            "to": 4,
            "color": "351c16",
            "id": "58363810-3b42-432d-a487-a7df8bffc626"
        },
        {
            "from": 15,
            "to": 9,
            "color": "d34ab0",
            "id": "16ad3453-8396-4591-bfe2-37957d69e9b5"
        },
        {
            "from": 16,
            "to": 22,
            "color": "afea2c",
            "id": "75f25984-0112-4e8b-adb5-a5fd3dc74ca7"
        },
        {
            "from": 17,
            "to": 25,
            "color": "3258b4",
            "id": "b43b5875-316b-45b4-8744-0fe69eced06e"
        },
        {
            "from": 18,
            "to": 27,
            "color": "3e7f9d",
            "id": "2806e153-70a0-426f-a239-b975487d285d"
        },
        {
            "from": 19,
            "to": 19,
            "color": "62dee1",
            "id": "57f8e479-3b88-4576-b082-76b8744d21a0"
        },
        {
            "from": 20,
            "to": 29,
            "color": "87ea9f",
            "id": "97878a7a-294e-4232-8463-2936a004a624"
        },
        {
            "from": 21,
            "to": 17,
            "color": "bcccc8",
            "id": "c2447e3c-cbc3-4f29-ad18-2cfeb642b151"
        },
        {
            "from": 22,
            "to": 3,
            "color": "eb3333",
            "id": "c8c4af98-309a-44b3-b053-e342ce1cffcd"
        },
        {
            "from": 23,
            "to": 20,
            "color": "81a5a7",
            "id": "6f094edd-d3ad-42fe-8d70-e95733b2e6ad"
        },
        {
            "from": 24,
            "to": 19,
            "color": "7fa13a",
            "id": "6bc53bbd-90f5-4756-b376-46f8022c07b0"
        },
        {
            "from": 25,
            "to": 21,
            "color": "b33398",
            "id": "1af235c7-ac21-4349-8c60-ff60d112813a"
        },
        {
            "from": 26,
            "to": 6,
            "color": "77956b",
            "id": "2b1d808e-f337-457b-8b22-30aee1e58ff2"
        },
        {
            "from": 27,
            "to": 25,
            "color": "c609fc",
            "id": "01feb107-2599-4258-bb4a-69cda7e3fcc3"
        },
        {
            "from": 28,
            "to": 20,
            "color": "8d1c4d",
            "id": "48cf1e59-d8e5-4dd9-9053-f8642cf654f2"
        },
        {
            "from": 29,
            "to": 19,
            "color": "7ea874",
            "id": "919de016-ea3e-49c5-82e3-acccea44ec60"
        },
        {
            "from": 30,
            "to": 26,
            "color": "cde991",
            "id": "7d1df2fe-15a2-42e1-98ba-c43efb48461e"
        },
        {
            "from": 31,
            "to": 9,
            "color": "b5adb9",
            "id": "7fe0babb-17a2-402c-a9c4-407d2bcd8014"
        }
    ]);

    const randColor = () => Math.floor(Math.random() * 16777215).toString(16);

    const recolor = (E) => {
        const newEdges = E.map(e => ({from: e.from, to: e.to, color: randColor()}));
        setEdges(newEdges);
    }

    const refit = (graph) => {
        graph.fit({ animation: { duration: 1000 }, nodes: nodes.map(node => node.id) });
    }

    const options = {
        layout: {
            hierarchical: false
        },
        nodes: {
            font: {
                color: '#80848e'
            },
            shape: 'image',
            image: 'https://www.shutterstock.com/image-photo/little-beautiful-funny-british-kitten-260nw-1521783215.jpg',
            labelHighlightBold: false
        },
        edges: {
            color: "#000000",
            width: 3,
            length: 200
        },
        physics: {
            forceAtlas2Based: {
                gravitationalConstant: -500,
                centralGravity: 0.02,
                springLength: 200
            },
            maxVelocity: 50,
            solver: 'forceAtlas2Based'
        },
        interaction: {
            selectable: false,
            selectConnectedEdges: false
        },
        height: '100%'
    };

    return (
        <div className={"bg-[#2c2f33] m-1 rounded"}>
            <button className={"bg-[#23272a] text-[#80848e] rounded p-2 ml-3 my-2 hover:brightness-150"}
                    onClick={() => recolor.bind(this)(edges)}>Recolor!
            </button>
            <button className={"bg-[#23272a] text-[#80848e] rounded p-2 ml-3 my-2 hover:brightness-150"}
                    onClick={() => refit.bind(this)(graphKey.current.getGraph())}>Refit!
            </button>
            <Graph
                key={graphKey}
                graph={{nodes: nodes, edges: edges}}
                options={options}
            />
        </div>
    );

}
