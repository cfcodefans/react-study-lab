import { ChangeEvent, FormEvent, JSX, useEffect, useState } from "react"
import { delay, mkMockImgUrl } from "../commons"
import { useImmer } from "use-immer";

namespace LAB_1 {
    async function submitForm(answer: string) {
        await delay(1500, 
            answer === "lima" ? "ok" : "Good guess but a wrong answer. Try again!",
            answer !== "lima")

    }

    export function Form() {
        const [answer, setAnswer] = useState<string>("")
        const [error, setError] = useState<any>(null)
        const [status, setStatus] = useState<string>("typing")

        if (status === "success") {
            return <h1>That is right!</h1>
        }

        function handleTextChange(ce: ChangeEvent<HTMLTextAreaElement>) {
            setAnswer(ce.target.value)
        }

        async function handleSubmit(fe: FormEvent) {
            fe.preventDefault()
            setStatus("submitting")
            try {
                await submitForm(answer)
                setStatus("success")
            } catch (err: any) {
                setStatus("typing")
                setError(err)
            }
        }

        return <div className="flex flex-col">
            <h2>City Quiz</h2>
            <p>
                In which city is there a billboard that turns air into drinkable water?
            </p>
            <form onSubmit={handleSubmit}>
                <textarea value={answer} onChange={handleTextChange} disabled={status === "submitting"} />
                <br />
                <button className="btn-sm" disabled={answer.length === 0 || status === "submitting"}>Submit</button>
                {error != null && <p className="Error">{error.toString()}</p>}
            </form>
        </div>
    }

    export function Picture(): JSX.Element {
        const [isActive, setIsActive] = useState<boolean>(false)
        return <div className="h-[15rem] w-[15rem] rounded-lg bg-blue-300 flex place-content-center" 
            onClick={(ce) => setIsActive(false)}>
            <img className={`place-self-center rounded-lg ${isActive ? "border-2 border-solid" : ""}`}
                onClick={(ce) => {
                    ce.stopPropagation()
                    console.dir(ce.target)
                    setIsActive(true)
                }} 
                src={mkMockImgUrl("5qwVYb1.jpeg", 200, 100)} 
                alt="Rainbow houses in Kampung Pelangi, Indonesia" />
        </div>
    }

    export function ProfileEditor(): JSX.Element {
        const [isEditing, setIsEditing] = useState<boolean>(false)
        const [firstName, setFirstName] = useState<string>("Jane")
        const [lastName, setLastName] = useState<string>("Jacobs")

        return <form className="flex flex-col gap-2 m-2" onSubmit={(fe) => {
            fe.preventDefault()
            setIsEditing(!isEditing)
        }}>
            <label>First name: &nbsp;
                {isEditing && <input value={firstName} type="text" onChange={(ce) => setFirstName(ce.target.value)} />}
                {!isEditing && <b>{firstName}</b>}
            </label>
            <label>Last name: &nbsp;
                {isEditing && <input value={lastName} type="text" onChange={(ce) => setLastName(ce.target.value)} />}
                {!isEditing && <b>{lastName}</b>}
            </label>
            <button type="submit" className="btn-sm">
                {isEditing ? "Save" : "Edit"}
            </button>
            <p><i>Hello, {firstName} {lastName} </i></p>
        </form>
    }
}

namespace LAB_2 {
    export function Form(): JSX.Element {
        const [firstName, setFirstName] = useState<string>("")
        const [lastName, setLastName] = useState<string>("")
        return <form className="flex flex-col gap-2">
            <h2>Let"s check you in</h2>
            <label>First name: &nbsp;
                <input value={firstName} type="text" onChange={(ce) => setFirstName(ce.target.value)} />
            </label>
            <label>Last name: &nbsp;
                <input value={lastName} type="text" onChange={(ce) => setLastName(ce.target.value)} />
            </label>
            <button className="btn-sm" type="reset" onClick={(ce) => {
                setFirstName("")
                setLastName("")
            }}>Reset</button>
            <p>
                Your ticket will be issued to: <b>{`${firstName} ${lastName}`}</b>
            </p>
        </form>
    }

    declare type TPlace = { id: number, title: string, childPlaces: TPlace[] }
    const initialTravelPlan: TPlace = {
        id: 0,
        title: "(Root)",
        childPlaces: [{
            id: 1,
            title: "Earth",
            childPlaces: [{
                id: 2,
                title: "Africa",
                childPlaces: [{
                    id: 3,
                    title: "Botswana",
                    childPlaces: []
                }, {
                    id: 4,
                    title: "Egypt",
                    childPlaces: []
                }, {
                    id: 5,
                    title: "Kenya",
                    childPlaces: []
                }, {
                    id: 6,
                    title: "Madagascar",
                    childPlaces: []
                }, {
                    id: 7,
                    title: "Morocco",
                    childPlaces: []
                }, {
                    id: 8,
                    title: "Nigeria",
                    childPlaces: []
                }, {
                    id: 9,
                    title: "South Africa",
                    childPlaces: []
                }]
            }, {
                id: 10,
                title: "Americas",
                childPlaces: [{
                    id: 11,
                    title: "Argentina",
                    childPlaces: []
                }, {
                    id: 12,
                    title: "Brazil",
                    childPlaces: []
                }, {
                    id: 13,
                    title: "Barbados",
                    childPlaces: []
                }, {
                    id: 14,
                    title: "Canada",
                    childPlaces: []
                }, {
                    id: 15,
                    title: "Jamaica",
                    childPlaces: []
                }, {
                    id: 16,
                    title: "Mexico",
                    childPlaces: []
                }, {
                    id: 17,
                    title: "Trinidad and Tobago",
                    childPlaces: []
                }, {
                    id: 18,
                    title: "Venezuela",
                    childPlaces: []
                }]
            }, {
                id: 19,
                title: "Asia",
                childPlaces: [{
                    id: 20,
                    title: "China",
                    childPlaces: []
                }, {
                    id: 21,
                    title: "India",
                    childPlaces: []
                }, {
                    id: 22,
                    title: "Singapore",
                    childPlaces: []
                }, {
                    id: 23,
                    title: "South Korea",
                    childPlaces: []
                }, {
                    id: 24,
                    title: "Thailand",
                    childPlaces: []
                }, {
                    id: 25,
                    title: "Vietnam",
                    childPlaces: []
                }]
            }, {
                id: 26,
                title: "Europe",
                childPlaces: [{
                    id: 27,
                    title: "Croatia",
                    childPlaces: [],
                }, {
                    id: 28,
                    title: "France",
                    childPlaces: [],
                }, {
                    id: 29,
                    title: "Germany",
                    childPlaces: [],
                }, {
                    id: 30,
                    title: "Italy",
                    childPlaces: [],
                }, {
                    id: 31,
                    title: "Portugal",
                    childPlaces: [],
                }, {
                    id: 32,
                    title: "Spain",
                    childPlaces: [],
                }, {
                    id: 33,
                    title: "Turkey",
                    childPlaces: [],
                }]
            }, {
                id: 34,
                title: "Oceania",
                childPlaces: [{
                    id: 35,
                    title: "Australia",
                    childPlaces: [],
                }, {
                    id: 36,
                    title: "Bora Bora (French Polynesia)",
                    childPlaces: [],
                }, {
                    id: 37,
                    title: "Easter Island (Chile)",
                    childPlaces: [],
                }, {
                    id: 38,
                    title: "Fiji",
                    childPlaces: [],
                }, {
                    id: 39,
                    title: "Hawaii (the USA)",
                    childPlaces: [],
                }, {
                    id: 40,
                    title: "New Zealand",
                    childPlaces: [],
                }, {
                    id: 41,
                    title: "Vanuatu",
                    childPlaces: [],
                }]
            }]
        }, {
            id: 42,
            title: "Moon",
            childPlaces: [{
                id: 43,
                title: "Rheita",
                childPlaces: []
            }, {
                id: 44,
                title: "Piccolomini",
                childPlaces: []
            }, {
                id: 45,
                title: "Tycho",
                childPlaces: []
            }]
        }, {
            id: 46,
            title: "Mars",
            childPlaces: [{
                id: 47,
                title: "Corn Town",
                childPlaces: []
            }, {
                id: 48,
                title: "Green Hill",
                childPlaces: []      
            }]
        }]
    }

    export function PlaceTree({ place }: { place: TPlace }): JSX.Element {
        const [placeTree, setPlaceTree] = useState<TPlace>(place) 
        const { id, title, childPlaces } = placeTree
        return childPlaces.length <= 0 
            ? <li>{title}</li>
            : <li><details open={true}>
                <summary>{title}</summary>
                <ol type="1" className="w-full list-decimal box-border ps-4 ">
                    {childPlaces.map(p => <PlaceTree key={p.id} place={p} />)}
                </ol> 
            </details></li>
    }

    export function TravePlan(): JSX.Element {
        const [placeTree, setPlaceTree] = useState<TPlace>(initialTravelPlan) 
        return <ol type="1" className="w-full list-decimal box-border ps-4 my-2">
            <PlaceTree place={placeTree} />
        </ol>
    }

    export function Clock({ color, time }: { color: string, time: string }): JSX.Element {
        return <h1 style={{ color }}>{time}</h1>
    }

    export function ClockCase(): JSX.Element {
        const [color, setColor] = useState<string>("lightcoral")
        const [time, setTime] = useState<string>("")
        useEffect(() => {
            const handler: number = setInterval(() => {
                setTime((new Date()).toISOString())
            }, 990)
            return () => clearInterval(handler)
        }, [])

        return <div className="my-2">
            <label>Pick a Color: 
                <select onChange={(ce) => setColor(ce.target.value)}>
                    <option selected={true}>lightcoral</option>
                    <option>midnightblue</option>
                    <option>rebeccapurple</option>
                </select>
            </label>
            <Clock color={color} time={time} />
        </div>
    }

    let NEXT_ITEM_ID: number = 3
    declare type TItem = { id: number, title: string, packed: boolean }
    const INIT_ITEMS: TItem[] = [
        { id: 0, title: "Warm socks", packed: true },
        { id: 1, title: "Travel journal", packed: false },
        { id: 2, title: "Watercolors", packed: false },
    ]
    export function AddItem({ handleAddItem }: { handleAddItem: (title: string) => void }): JSX.Element {
        const [title, setTitle] = useState<string>("")
        return <div className="flex flex-row">
            <input type="text" value={title}
                placeholder="Add Item"
                onChange={ce => setTitle(ce.target.value)} />
            <button className="btn-sm" 
                onClick={(me) => {
                    handleAddItem(title)
                    setTitle("")
                }}>Add</button>
        </div>
    }
    export function ItemList({ items, 
        handleChangeItem,
        handleDeleteItem }
        : { items: TItem[], 
            handleChangeItem: (newItem: TItem) => void,
            handleDeleteItem: (itemId: number) => void }): JSX.Element {
        return <ol className="flex flex-col gap-1">
            {items.map(item => {
                return <li key={item.id} className="flex flex-row gap-2">
                    <input onChange={(ce) => {
                        handleChangeItem({ ...item, packed: ce.target.checked })
                    }} checked={item.packed}
                        type="checkbox" />
                    {item.title}
                    <button className="btn-sm"
                        onClick={(ce) => handleDeleteItem(item.id)}
                    >Delete</button>
                </li>
            })}
        </ol>
    }
    export function PackingPlan(): JSX.Element {
        const [items, updateItems] = useImmer<TItem[]>(INIT_ITEMS)
        function handleAddItem(title: string) {
            updateItems(draft => {
                draft.push({ id: NEXT_ITEM_ID++, title, packed: false })
            })
        }
        function handleChangeItem(newItem: TItem) {
            updateItems(draft => {
                const idx: number = draft.findIndex(item => item.id === newItem.id)
                if (idx < 0) return
                draft[idx] = newItem
            })
        }
        function handleDeleteItem(itemId: number) {
            updateItems(draft => {
                const idx: number = draft.findIndex(item => item.id === itemId)
                if (idx < 0) return
                draft.splice(idx, 1)
            })
        }
        return <div className="flex flex-col gap-2 my-2">
            <AddItem handleAddItem={handleAddItem} />
            <ItemList items={items} 
                handleChangeItem={handleChangeItem} 
                handleDeleteItem={handleDeleteItem} />
            <b>{items.filter(item => item.packed).length} out of {items.length} packed!</b>
        </div>
    }

    declare type TLetter = { id: number, subject: string, isStarred: boolean }
    const initialLetters: TLetter[] = [
        { id: 0, subject: "Ready for adventure?", isStarred: true, }, 
        { id: 1, subject: "Time to check in!", isStarred: false, }, 
        { id: 2, subject: "Festival Begins in Just SEVEN Days!", isStarred: false, }
    ]
    function Letter({
        letter, isHighlighted, onHover, onToggleStar
    }: {
        letter: TLetter,
        isHighlighted: boolean,
        onHover: (TLetter) => void,
        onToggleStar: (TLetter) => void
    }): JSX.Element {
        return <li className={`${isHighlighted ? "bg-blue-200" : ""}`}
            onFocus={() => onHover(letter)}
            onPointerMove={() => onHover(letter)}>
            <button className="btn-sm" onClick={(ce) => onToggleStar(letter)}>
                {letter.isStarred ? "Unstar" : "Star"}
            </button>
            {letter.subject}
        </li>
    }
    export function MailClient(): JSX.Element {
        const [letters, updateLetters] = useImmer<TLetter[]>(initialLetters)
        const [highlightedLetterId, setHighlightedLetterId] = useState<number>(null)
        function handleHover(letter: TLetter) {
            setHighlightedLetterId(letter.id)
        }
        function handleStar(letter: TLetter) {
            updateLetters(draft => {
                const idx: number = draft.findIndex(_letter => _letter.id === letter.id)
                if (idx < 0) return
                draft[idx] = { ...letter, isStarred: !letter.isStarred }
            })
        }
        return <>
            <h2>Inbox</h2>   
            <ol>
                {letters.map(letter => <Letter key={letter.id}
                    letter={letter}
                    onHover={handleHover}
                    onToggleStar={handleStar}
                    isHighlighted={letter.id === highlightedLetterId}
                />)}
            </ol>
        </>
    }

    function Letter2({ 
        letter, onToggle, isSeleted
    }: {
        letter: TLetter, onToggle: (number) => void, isSeleted: boolean
    }): JSX.Element {
        return <li className={isSeleted ? "bg-blue-200" : ""}>
            <label>
                <input type="checkbox" checked={isSeleted}
                    onChange={(ce) => onToggle(letter.id)} />
                {letter.subject}
            </label>
        </li>
    }
    export function MailClient2(): JSX.Element {
        const [selectedIds, updateSeletedIds] = useImmer<number[]>([])
        function onToggle(id: number) {
            updateSeletedIds(draft => {
                const idx: number = draft.indexOf(id)
                if (idx < 0) 
                    draft.push(id)
                else 
                    draft.splice(idx, 1)
            })
        }
        return <>
            <h2>Inbox</h2>   
            <ol>
                {initialLetters.map(letter => <Letter2 key={letter.id}
                    letter={letter}
                    onToggle={onToggle}
                    isSeleted={selectedIds.indexOf(letter.id) >= 0}
                />)}
            </ol>
            <b>            You selected {selectedIds.length} letters          </b>
        </>
    }
}

namespace LAB_3 {

}

export default function Page(): JSX.Element {
    return <>
        <a href="https://react.dev/learn/managing-state" target="_blank"><h1>Managing State</h1></a>
        <hr className="m-4" />
        <h2>Reacting to input with state</h2>
        <LAB_1.Form />
        <LAB_1.Picture />
        <LAB_1.ProfileEditor />
        <hr className="m-4" />
        <h2>Choosing the state structure </h2>
        <LAB_2.Form />
        <LAB_2.TravePlan />
        <LAB_2.ClockCase />
        <LAB_2.PackingPlan />
        <LAB_2.MailClient />
        <br />
        <LAB_2.MailClient2 />
        <hr className="m-4" />
        <h2>Sharing state between components </h2>
    </>
} 