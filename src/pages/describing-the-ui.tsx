import { JSX, ReactNode } from "react"
import { mkMockImgUrl } from "../commons"
import { JsxEmit } from "typescript";

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
    </>
}
