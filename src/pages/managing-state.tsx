import { ChangeEvent, FormEvent, JSX, ReactNode, useEffect, useState } from "react"
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
    function Panel({
        title, children, isActive, onShow
    }: {
        title: string, children: ReactNode, isActive: boolean, onShow: () => void
    }): JSX.Element {
        return <section >
            <h3 className="font-semibold">{title}</h3>
            {isActive 
                ? <p>{children}</p>
                : <button className="btn-sm" onClick={onShow}>Show</button>}
        </section>
    }
    export function Accordion(): JSX.Element {
        const [activeIdx, setActiveIdx] = useState<number>(0)
        return <div className="flex flex-col gap-2 rounded-lg bg-blue-100 p-3">
            <h2>Almaty, Kazakhstan</h2>
            <Panel
                title="About"
                isActive={activeIdx === 0}
                onShow={() => setActiveIdx(0)}            >
                With a population of about 2 million, Almaty is Kazakhstan"s largest city. From 1929 to 1997, it was its capital city.
            </Panel>
            <Panel
                title="Etymology"
                isActive={activeIdx === 1}
                onShow={() => setActiveIdx(1)}            >
                The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
            </Panel>
        </div>
    }

    function MockInput({ 
        label, text, onChange 
    }: { 
        label: string, text: string, onChange: (string) => void 
    }): JSX.Element {
        return <label>
            {label}
            &nbsp;
            <input type="text" value={text} onChange={(ce) => onChange(ce.target.value)} />
        </label>
    }
    export function SynchedInputs(): JSX.Element {
        const [text, setText] = useState<string>("")
        return <div className="flex flex-row gap-2">
            <MockInput label="First Input" text={text} onChange={setText} />
            <MockInput label="Second Input" text={text} onChange={setText} />
        </div>
    }

    declare type TFood = { id: number, name: string, description: string }
    const foods: TFood[] = [{
        id: 0,
        name: "Sushi",
        description: "Sushi is a traditional Japanese dish of prepared vinegared rice"
    }, {
        id: 1,
        name: "Dal",
        description: "The most common way of preparing dal is in the form of a soup to which onions, tomatoes and various spices may be added"
    }, {
        id: 2,
        name: "Pierogi",
        description: "Pierogi are filled dumplings made by wrapping unleavened dough around a savoury or sweet filling and cooking in boiling water"
    }, {
        id: 3,
        name: "Shish kebab",
        description: "Shish kebab is a popular meal of skewered and grilled cubes of meat."
    }, {
        id: 4,
        name: "Dim sum",
        description: "Dim sum is a large range of small dishes that Cantonese people traditionally enjoy in restaurants for breakfast and lunch"
    }]
    function filterItems(items: TFood[], query: string): TFood[] {
        query = query.toLowerCase().trim()
        if (query.length === 0) return items
        return items.filter(food => {
            return food
                .name
                .split(" ")
                .map(word => word.toLowerCase())
                .some(word => word.startsWith(query))
        })
    }
    function List({ foods }: { foods: TFood[] }): JSX.Element {
        return <table>
            <tbody>
                {foods.map(food => {
                    return <tr key={food.id}>
                        <td>{food.name}</td>
                        <td>{food.description}</td>
                    </tr>
                })}
            </tbody>
        </table>
    }
    function SearchBar({ 
        text, updateText 
    }: {
        text: string, updateText: (string) => void
    }): JSX.Element {
        return <label>
            Search: &nbsp;
            <input type="text" 
                value={text} 
                onChange={(ce) => updateText(ce.target.value)} />
        </label>        
    }
    export function FilterableList(): JSX.Element {
        const [items, updateItems] = useState<TFood[]>(foods)
        const [query, setQuery] = useState<string>("")
        function callQuery(q: string) {
            setQuery(q)
            updateItems(filterItems(foods, q))
        }
        return <div className="m-3">
            <SearchBar text={query} updateText={callQuery} />
            <br />
            <List foods={items} />
        </div>
    }
}

namespace LAB_4 {
    function Counter({ title }: { title?: string }): JSX.Element {
        const [score, setScore] = useState<number>(0)
        const [hover, setHover] = useState<boolean>(false)

        return <div className={`rounded-lg ${hover ? "bg-blue-100" : ""}
            p-2 `}
            onPointerEnter={(pe) => setHover(true)}
            onPointerLeave={(pe) => setHover(false)}>

            <h1 className="text-center">{title ?? ""} {score}</h1>
            <button className="btn-sm" onClick={ce => setScore(score + 1)}>
                Add One
            </button>
        </div>
    }
    export function App(): JSX.Element {
        const [showB, setShowB] = useState<boolean>(true)

        return <div className="flex flex-row gap-2">
            <Counter />
            {showB && <Counter />}
            <div className={!showB ? "hidden" : ""}><Counter /></div>
            <label>
                <input type="checkbox" 
                    checked={showB}
                    onChange={(ce) => setShowB(ce.target.checked)} />
                Render the second counter
            </label>
        </div>
    }

    export function App2(): JSX.Element {
        const [isPlayA, setIsPlayA] = useState<boolean>(true)
        return <div className="flex flex-row gap-2">
            {isPlayA ? <Counter title="Taylor" /> : <Counter title="Sarah" />}
            {isPlayA ? <Counter key="Taylor" title="Taylor with key" /> 
                : <Counter key="Sarah" title="Sarah with key" />}
            <button className="btn-sm" onClick={ce => setIsPlayA(!isPlayA)}>
                Next Player!
            </button>
        </div>
    }

    declare type TContact = { id: number, name: string, email: string }
    const contacts: TContact[] = [
        { id: 0, name: "Taylor", email: "taylor@mail.com" },
        { id: 1, name: "Alice", email: "alice@mail.com" },
        { id: 2, name: "Bob", email: "bob@mail.com" }
    ]
    function ChatBox({ contact }: { contact: TContact }): JSX.Element {
        const [text, setText] = useState<string>("")
        return <section>
            <textarea value={text}
                onChange={ce => setText(ce.target.value)}
                placeholder={`Chat to ${contact.name}`} />
            <br />
            <button className="btn-sm">Send to {contact.email}</button>
        </section>
    }
    function ContactList({
        contacts, selected, onSelect
    }: { 
        contacts: TContact[], selected: TContact, onSelect: (TContact) => void 
    }): JSX.Element {
        return <section>
            <ol className="gap-2 flex-col flex">{
                contacts.map(c => {
                    return <li key={c.id}>
                        <button className={`btn-sm ${c.id === selected.id ? "bg-blue-500" : ""}`} 
                            onClick={ce => onSelect(c)}>
                            {c.name}
                        </button>
                    </li>
                })
            }</ol>
        </section>        
    }
    export function Messenger(): JSX.Element {
        const [selected, setSelected] = useState<TContact>(contacts[0])
        return <div className="m-4 grid grid-cols-2 gap-2 auto-cols-min grid-flow-col w-content">
            <ContactList contacts={contacts}
                selected={selected}
                onSelect={(c: TContact) => setSelected(c)} />
            <ChatBox key={selected.id} contact={selected} />
        </div>
    }

    function Form(): JSX.Element {
        const [text, setText] = useState<string>("")
        return <textarea value={text} onChange={ce => setText(ce.target.value)} />
    }
    export function Challenge1(): JSX.Element {
        const [showHint, setShowHint] = useState<boolean>(false)
        return <div className="m-4">
            {showHint && <p><i>Hint: Your favorite city?</i></p>}
            <Form />
            <button onClick={(ce) => {
                setShowHint(!showHint);
            }}>{showHint ? "Hide" : "Show"} hint</button>
        </div>
    }
}

export default function Page(): JSX.Element {
    return <>
        <a href="https://react.dev/learn/managing-state" target="_blank"><h1>Managing State</h1></a>
        <hr className="m-4" />
        <h2>1. Reacting to input with state</h2>
        <LAB_1.Form />
        <LAB_1.Picture />
        <LAB_1.ProfileEditor />
        <hr className="m-4" />
        <h2>2. Choosing the state structure </h2>
        <LAB_2.Form />
        <LAB_2.TravePlan />
        <LAB_2.ClockCase />
        <LAB_2.PackingPlan />
        <LAB_2.MailClient />
        <br />
        <LAB_2.MailClient2 />
        <hr className="m-4" />
        <h2>3. Sharing state between components </h2>
        <LAB_3.Accordion />
        <br />
        <LAB_3.SynchedInputs />
        <LAB_3.FilterableList />
        <h2>4. Preserving and Resetting State </h2>
        <LAB_4.App />
        <LAB_4.App2 />
        <LAB_4.Messenger />
        <LAB_4.Challenge1 />
    </>
} 