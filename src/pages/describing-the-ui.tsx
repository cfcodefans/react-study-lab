import { JSX, ReactNode, useState } from "react"
import { mkMockImgUrl } from "../commons"

namespace LAB_1 {
    export function Profile(): JSX.Element {
        return <img className="rounded-lg" src={mkMockImgUrl("Katherine Johnson")} alt="Katherine Johnson" />
    }
    export function Component(): JSX.Element {
        return <section >
            <h1>Amazing scientists</h1>
            <div className="flex flex-row gap-3">
                <Profile />
                <Profile />
                <Profile />
            </div>
        </section>
    }
}

namespace LAB_2 {
    function Card({ children }: { children: ReactNode }): JSX.Element {
        return <div className="card">{children}</div>
    }
    function Avatar({ size, person }: { size: number, person: { name: string } }): JSX.Element {
        return <img className="avatar" 
            src={mkMockImgUrl(person.name)} 
            alt={person.name}
            width={size}
            height={size} />
    }
    export function Profile(): JSX.Element {
        return <Card><Avatar size={100} person={{ name: "Katsuko Saruhashi" }} /></Card>
    }
}

namespace LAB_3 {
    function Item({ name, isPacked }: { name: string, isPacked: boolean }): JSX.Element {
        return <li className="item">{name} 
            {isPacked ? "✅" : "❌"}
            /{isPacked && "✅"}{!isPacked && "❌"} </li>
    }

    export function PackingList(): JSX.Element {
        return <section>
            <h1>Sally Ride's Packing List</h1>
            <ul>
                <Item name="space suit" isPacked={true} />
                <Item name="Helmet with a golden leaf" isPacked={true} />
                <Item name="Photo of Tam" isPacked={false} />
            </ul>
        </section>
    }
}

namespace LAB_4 {
    declare type TPersonProps = {
        id: number
        name: string
        profession: string
        accomplishment: string
        imageId: string
    }
    const people: TPersonProps[] = [{
        id: 0,
        name: 'Creola Katherine Johnson',
        profession: 'mathematician',
        accomplishment: 'spaceflight calculations',
        imageId: 'MK3eW3A'
    }, {
        id: 1,
        name: 'Mario José Molina-Pasquel Henríquez',
        profession: 'chemist',
        accomplishment: 'discovery of Arctic ozone hole',
        imageId: 'mynHUSa'
    }, {
        id: 2,
        name: 'Mohammad Abdus Salam',
        profession: 'physicist',
        accomplishment: 'electromagnetism theory',
        imageId: 'bE7W1ji'
    }, {
        id: 3,
        name: 'Percy Lavon Julian',
        profession: 'chemist',
        accomplishment: 'pioneering cortisone drugs, steroids and birth control pills',
        imageId: 'IOjWm71'
    }, {
        id: 4,
        name: 'Subrahmanyan Chandrasekhar',
        profession: 'astrophysicist',
        accomplishment: 'white dwarf star mass calculations',
        imageId: 'lrWQx8l'
    }]

    export function List(): JSX.Element {
        return <article>
            <h1>Scientists</h1>
            <ol>{people.map((p) => {
                return <li key={p.id}>
                    <img src={mkMockImgUrl(p.name)} alt={p.name} />
                    <p>
                        <b>{p.name}:</b>
                        {' ' + p.profession + ' '}
                        known for {p.accomplishment}
                    </p>
                </li>
            })}</ol>
        </article>
    }
}

namespace LAB_5_1 {
    export const QUOTES: string[] = [
        "Don't let yesterday take up too much of today.” — Will Rogers",
        "Ambition is putting a ladder against the sky.",
        "A joy that's shared is a joy made double."
    ]

    export function Copyright({ year }: { year: number }): JSX.Element {
        return <p className="small">©️{year}</p>
    }

    export function FancyText({ title, text }: { title?: boolean, text: string }): JSX.Element {
        return title ? <h1 className="fancy title">{text}</h1>
            : <h3 className="fancy cursive">{text}</h3>
    }

    export function InspirationGenerator({ children }: { children: ReactNode }): JSX.Element {
        const [index, setIndex] = useState<number>(0)
        function next(): void {
            setIndex((index + 1) % QUOTES.length)
        }
        return <>
            <p>Your inspiration quote is</p>
            <FancyText text={QUOTES[index]} />
            <button onClick={next}>Inspire me again</button>
            {children}
        </>
    }

    export function App(): JSX.Element {
        return <>
            <FancyText title text="Get Inspired App" />
            <InspirationGenerator>
                <Copyright year={2024} />
            </InspirationGenerator>
        </>
    }
}

namespace LAB_5_2 {
    declare type TInspiration = { type: "quote" | "color", value: string }

    export const QUOTES: TInspiration[] = [
        { type: 'quote', value: "Don’t let yesterday take up too much of today.” — Will Rogers" },
        { type: 'color', value: "#B73636" },
        { type: 'quote', value: "Ambition is putting a ladder against the sky." },
        { type: 'color', value: "#256266" },
        { type: 'quote', value: "A joy that's shared is a joy made double." },
        { type: 'color', value: "#F9F2B4" },
    ]

    function ColorBox({ color }: { color: string }): JSX.Element {
        return <div className="w-[3rem] h-[3rem]" style={{ backgroundColor: color }} />
    }

    export function InspirationGenerator({ children }: { children: ReactNode }): JSX.Element {
        const [index, setIndex] = useState<number>(0)
        function next(): void {
            setIndex((index + 1) % QUOTES.length)
        }

        const { type, value } = QUOTES[index]
        
        return <>
            <p>Your inspiration {type} is</p>
            {type === "quote" ?
                <LAB_5_1.FancyText text={value} />
                : <ColorBox color={value} />}
            <button onClick={next}>Inspire me again</button>
            {children}
        </>
    }
    export function App(): JSX.Element {
        return <>
            <LAB_5_1.FancyText title text="Get Inspired App" />
            <InspirationGenerator>
                <LAB_5_1.Copyright year={2024} />
            </InspirationGenerator>
        </>
    }
}

export default function Page(): JSX.Element {
    return <>
        <a href="https://react.dev/learn/describing-the-ui" target="_blank"><h1>Describing the UI</h1></a>
        <h2>1. Your first Component</h2>
        <LAB_1.Component />
        <h2>2. Passing props to a component </h2>
        <LAB_2.Profile />
        <h2>3. Conditional rendering </h2>
        <LAB_3.PackingList />
        <h2>4. Rendering lists</h2>
        <LAB_4.List />
        <h2>The Render Tree</h2>
        <LAB_5_1.App />
        <h2>The Render Tree</h2>
        <LAB_5_2.App />
    </>
}
