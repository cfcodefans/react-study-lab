import { JSX, MouseEventHandler, ReactNode, useState } from "react"
import { mkMockImgUrl } from "../commons"

namespace LAB_1 {
    function Button({ children, onClick }: { children: ReactNode, onClick: MouseEventHandler }): JSX.Element {
        return <button onClick={onClick}
            className="rounded-full bg-cyan-500 px-2 py-1 text-sm font-semibold text-white"
        >{children}</button>
    }
    function Toolbar({ onPlayMovie, onUploadImage }: { onPlayMovie: MouseEventHandler, onUploadImage: MouseEventHandler }): JSX.Element {
        return <div className="flex flex-row gap-2">
            <Button onClick={onPlayMovie}>Play Moive</Button>
            <Button onClick={onUploadImage}>Upload Image</Button>
        </div>
    }
    export function App(): JSX.Element {
        return <Toolbar onPlayMovie={(ev) => alert("Playing")} 
            onUploadImage={(ev) => alert("Uploading")} />
    }
}

namespace LAB_2 {
    declare type TSculptureList = {
        name: string
        artist: string,
        description: string,
        url: string
        alt: string
    }
    const SCULPTURE_LIST: TSculptureList[] = [{
        name: "Homenaje a la Neurocirugía",
        artist: "Marta Colvin Andrade",
        description: "Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.",
        url: mkMockImgUrl("Mx7dA2Y.jpg"),
        alt: "A bronze statue of two crossed hands delicately holding a human brain in their fingertips."
    }, {
        name: "Floralis Genérica",
        artist: "Eduardo Catalano",
        description: "This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.",
        url: mkMockImgUrl("ZF6s192m.jpg"),
        alt: "A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens."
    }, {
        name: "Eternal Presence",
        artist: "John Woodrow Wilson",
        description: "Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as 'a symbolic Black presence infused with a sense of universal humanity.'",
        url: mkMockImgUrl("aTtVpES.jpg"),
        alt: "The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity."
    }, {
        name: "Moai",
        artist: "Unknown Artist",
        description: "Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.",
        url: mkMockImgUrl("RCwLEoQm.jpg"),
        alt: "Three monumental stone busts with the heads that are disproportionately large with somber faces."
    }, {
        name: "Blue Nana",
        artist: "Niki de Saint Phalle",
        description: "The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.",
        url: mkMockImgUrl("Sd1AgUOm.jpg"),
        alt: "A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy."
    }, {
        name: "Ultimate Form",
        artist: "Barbara Hepworth",
        description: "This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.",
        url: mkMockImgUrl("2heNQDcm.jpg"),
        alt: "A tall sculpture made of three elements stacked on each other reminding of a human figure."
    }, {
        name: "Cavaliere",
        artist: "Lamidi Olonade Fakeye",
        description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
        url: mkMockImgUrl("wIdGuZwm.png"),
        alt: "An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns."
    }, {
        name: "Big Bellies",
        artist: "Alina Szapocznikow",
        description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
        url: mkMockImgUrl("AlHTAdDm.jpg"),
        alt: "The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures."
    }, {
        name: "Terracotta Army",
        artist: "Unknown Artist",
        description: "The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.",
        url: mkMockImgUrl("HMFmH6m.jpg"),
        alt: "12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor."
    }, {
        name: "Lunar Landscape",
        artist: "Louise Nevelson",
        description: "Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.",
        url: mkMockImgUrl("rN7hY6om.jpg"),
        alt: "A black matte sculpture where the individual elements are initially indistinguishable."
    }, {
        name: "Aureole",
        artist: "Ranjani Shettar",
        description: "Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a 'fine synthesis of unlikely materials.'",
        url: mkMockImgUrl("okTpbHhm.jpg"),
        alt: "A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light."
    }, {
        name: "Hippos",
        artist: "Taipei Zoo",
        description: "The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.",
        url: mkMockImgUrl("6o5Vuyu.jpg"),
        alt: "A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming."
    }]

    export function Gallery(): JSX.Element {
        const [index, setIndex] = useState<number>(0)
        const [showMore, setShowMore] = useState<boolean>()
        const hasNext: boolean = index < SCULPTURE_LIST.length - 1

        function handleNextClick() {
            if (hasNext) setIndex(index + 1)
            else setIndex(0)
        }
        function handleShowMore() {
            setShowMore(!showMore)
        }
        const { name, artist, description, url, alt } = SCULPTURE_LIST[index]
        return <>
            <button onClick={handleNextClick}>Next</button>
            <h2><i>{name}</i> by {artist}</h2>
            <h3>({index + 1}) of {SCULPTURE_LIST.length}</h3>
            <button onClick={handleShowMore}>
                {showMore ? "Hide" : "Show"} details
            </button>
            {showMore && <p>{description}</p>}
            <img className="rounded-lg" src={url} alt={alt} />
        </>
    }
}

export default function Page(): JSX.Element {
    return <>
        <h2>Responding to events</h2>
        <LAB_1.App />
        <h2>State: a component’s memory</h2>
        <LAB_2.Gallery />
    </>
} 