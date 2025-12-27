import { JSX, MouseEventHandler, PointerEvent, ReactNode, RefObject, useEffect, useRef, useState } from "react"
import { delay, mkMockImgUrl } from "../commons"
import { useImmer } from "use-immer"
import { flatMap } from "lodash";

namespace LAB_1 {
    function Toolbar({ onPlayMovie, onUploadImage }: { onPlayMovie: MouseEventHandler, onUploadImage: MouseEventHandler }): JSX.Element {
        return <div className="flex flex-row gap-2">
            <button className="btn-sm" onClick={onPlayMovie}>Play Moive</button>
            <button className="btn-sm" onClick={onUploadImage}>Upload Image</button>
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
            <button className="btn-sm" onClick={handleNextClick}>Next</button>
            <h2><i>{name}</i> by {artist}</h2>
            <h3>({index + 1}) of {SCULPTURE_LIST.length}</h3>
            <button onClick={handleShowMore} className="btn-sm">
                {showMore ? "Hide" : "Show"} details
            </button>
            {showMore && <p>{description}</p>}
            <img className="rounded-lg" src={url} alt={alt} />
        </>
    }
}

namespace LAB_3 {
    function Clock({ time }: { time: string }): JSX.Element {
        return <div>
            <h1>{time}</h1>
            <input type="text" className="rounded-lg bg-slate-200 px-2 py-1" />
        </div>
    }
    export function App(): JSX.Element {
        const [time, setTime] = useState<string>("--:--:--")
        useEffect(() => {
            const handler: number = setInterval(() => {
                const now: Date = new Date()
                setTime(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
            }, 900)
            return () => clearInterval(handler)
        }, [])
        return <Clock time={time} />
    }
}

namespace LAB_4 {
    async function sendMessage(message: string): Promise<void> {
        return new Promise((resolver, reject) => {
            setTimeout(() => {
                alert(`${message} is sent`)
                resolver(null)
            }, 3000)
        })
    }

    export function Form(): JSX.Element {
        const [isSent, setIsSent] = useState<boolean>(false)
        const [message, setMessage] = useState<string>("")

        //Use a ref to track if the component is currently mounted
        const isMounted: RefObject<boolean> = useRef<boolean>(true)
        useEffect(() => {
            //Cleanup function sets isMounted to false when component leaves the screen
            return () => { isMounted.current = false; }
        }, [])

        if (isSent) {
            return <h1>The message: ${message} is sent</h1>
        }
        return <form 
            className="flex flex-row items-center gap-2"
            onSubmit={async (fe) => {
                fe.preventDefault()
                setIsSent(true)
                await sendMessage(message)
                if (isMounted.current) {
                    setMessage("")
                    setIsSent(false)
                }
            }}>
            <textarea placeholder="Message" 
                className="px-2 py-1 rounded-lg bg-slate-200"
                value={message} 
                onChange={(ce) => setMessage(ce.target.value)} />
            <button type="submit" disabled={isSent}
                className="btn-sm"
            >Send</button>
        </form>
    }
}

namespace LAB_5 {
    export function Counter(): JSX.Element {
        const [count, setCount] = useState<number>(0)
        return <div className="flex flex-row items-center gap-2">
            <h1>{count}</h1>
            <button className="btn-sm"
                onClick={(me) => {
                    setCount(count + 1)
                    setCount(count + 1)
                    setCount(count + 1)
                }}>+3 X</button>

            <button className="btn-sm"
                onClick={(me) => {
                    setCount(n => n + 1)
                    setCount(n => n + 1)
                    setCount(n => n + 1)
                }}>+3 Y</button>

            <button className="btn-sm"
                onClick={(me) => {
                    setCount(count + 2)
                    setCount(n => n + 2)
                }}>+4 Y</button>
        </div>
    }

    export function RequestTracker(): JSX.Element {
        const [pending, setPending] = useState<number>(0)
        const [completed, setCompleted] = useState<number>(0)

        return <div className="flex flex-row items-center gap-2">
            <h3>Pending: {pending}</h3>
            <h3>Completed: {completed}</h3>
            <button className="btn-sm"
                onClick={async (me) => {
                    setPending(pending + 1)
                    await delay(3000, null)
                    setPending(p => p - 1)
                    setCompleted(c => c + 1)
                }}>Buy</button>
        </div>
    }
}

namespace LAB_6 {
    export declare type TPoint = { x: number, y: number }
    export function MovingDot(): JSX.Element {
        const [pos, setPos] = useState<TPoint>({ x: 0, y: 0 })
        const x: number = Math.round(pos.x), y: number = Math.round(pos.y)
        return <div className="relative w-100 h-[10rem] rounded-lg bg-slate-100"
            onMouseMove={(pe) => {
                setPos({ x: pe.nativeEvent.offsetX, y: pe.nativeEvent.offsetY })
            }}>
            <div style={{ transform: `translate(${x}px, ${y}px)`,
                left: -10, top: -10, width: 20, height: 20 }}
                className="rounded-full absolute bg-red-300" >
            </div>
        </div>
    }

    declare type TPerson = {
        name: string
        artwork: {
            title: string,
            city: string,
            image: string
        }
    }

    export function Form(): JSX.Element {
        const [person, updatePerson] = useImmer<TPerson>({
            name: 'Niki de Saint Phalle',
            artwork: {
                title: "Blue Nana",
                city: "Hamburg",
                image: "Sd1AgUOm.jpg",
            }
        })

        const { artwork } = person

        return <form className="flex flex-col gap-2 my-2">
            <label>Name: 
                <input type="text" className="px-2 py-1 rounded-lg bg-slate-200" value={person.name}
                    onChange={(ce) => {
                        updatePerson(draft => { 
                            draft.name = ce.target.value
                        })
                    }} />
            </label>
            <label>Title: 
                <input type="text" className="px-2 py-1 rounded-lg bg-slate-200" value={artwork.title}
                    onChange={(ce) => {
                        updatePerson(draft => {
                            draft.artwork.title = ce.target.value
                        })
                    }} />
            </label>
            <label>City: 
                <input type="text" className="px-2 py-1 rounded-lg bg-slate-200" value={artwork.city}
                    onChange={(ce) => {
                        updatePerson(draft => {
                            draft.artwork.city = ce.target.value
                        })
                    }} />
            </label>
            <label>Image: 
                <input type="text" className="px-2 py-1 rounded-lg bg-slate-200" value={artwork.image}
                    onChange={(ce) => {
                        updatePerson(draft => {
                            draft.artwork.image = ce.target.value
                        })
                    }} />
            </label>
            <p>
                <i>{artwork.title}</i>
                {' by '}
                {person.name}
                <br />
                (located in {artwork.city})
            </p>
            <img src={mkMockImgUrl(artwork.image)} 
                width={120} height={80}
                alt={artwork.title} className="rounded-lg" />
        </form>
    }
}

namespace LAB_7 {
    export declare type TPoint = { x: number, y: number }
    declare type TShapeState = {
        color: string, position: TPoint
    }
    function Box({ children, 
        onMove, 
        color, 
        position }: { 
            children: ReactNode, 
            onMove: (pos: TPoint) => void } & TShapeState): JSX.Element {
        const [lastPos, setLastPos] = useState<TPoint>(null)
        const { x, y } = position
        return <div 
            onPointerDown={(pe: PointerEvent<HTMLDivElement>) => {
                pe.currentTarget.setPointerCapture(pe.pointerId)
                setLastPos({ x: pe.nativeEvent.offsetX, y: pe.nativeEvent.offsetY })
            }}
            onPointerMove={(pe: PointerEvent<HTMLDivElement>) => {
                if (!lastPos) return
                const newX: number = pe.nativeEvent.offsetX
                const newY: number = pe.nativeEvent.offsetY
                setLastPos({ x: newX, y: newY })
                onMove({ x: newX - lastPos.x, y: newY - lastPos.y })
            }}

            onPointerUp={(pe: PointerEvent<HTMLDivElement>) => {
                setLastPos(null)
            }}
            className="flex align-center absoulte w-[5rem] h-[5rem] rounded-full"
            style={{ backgroundColor: color, translate: `translate(${x}px, ${y}px)` }}>
            {children}
        </div>
    }

    function Background({ pos }: { pos: TPoint }): JSX.Element {
        const { x, y } = pos
        return <div className="absolute w-[15rem] h-[15rem] bg-yellow-300"
            style={{ transform: `translate(${x}px, ${y}px)` }}>
        </div>
    }

    const INIT_POS: TPoint = { x: 0, y: 0 }
}

namespace LAB_8 {
    let nextId: number = 0
    declare type TArtist = { id: number, name: string }

    export function List(): JSX.Element {
        const [name, setName] = useState<string>("")
        const [artists, setArtists] = useState<TArtist[]>([])
        return <div className="rounded-lg flex flex-col gap-2">
            <caption className="flex flex-row gap-2">
                <input className="px-2 py-1 rounded-lg bg-slate-200"
                    value={name} onChange={(ce) => setName(ce.target.value)} />
                <button onClick={() => {
                    const insertedAt: number = artists.findIndex(a => a.name > name)
                    const newArtist: TArtist = { name, id: ++nextId }
                    if (insertedAt < 0)
                        setArtists([...artists, newArtist])    
                    else
                        setArtists([...artists.slice(0, insertedAt), newArtist, ...artists.slice(insertedAt)])  
                }}
                    className="btn-sm">
                    Add
                </button>
            </caption>
            <ol type="1" className="rounded-lg flex flex-col gap-2">{artists.map((artist, i) => {
                const { id, name } = artist
                return <li key={id} className="flex flex-row gap-2"><span>#{id} {name}</span>
                    <button className="btn-sm"
                        onClick={() => {
                            setArtists(artists.filter(_artist => _artist.id !== id))
                        }}>
                        Delete
                    </button>
                </li>
            })}</ol>
        </div>
    }

    declare type TShape = { id: number, type: string, } & LAB_7.TPoint
    export function ShapeEditor(): JSX.Element {
        const [shapes, setShapes] = useState<TShape[]>([
            { id: 0, type: "circle", x: 50, y: 100 },
            { id: 1, type: "square", x: 150, y: 100 },
            { id: 2, type: "circle", x: 250, y: 100 },
        ])

        function handleClick() {
            setShapes((ss) => {
                return ss.map(s => {
                    if (s.type === "circle") {
                        return { ...s, y: s.y + 20 }
                    }
                    return s
                })
            })
        }

        return <div className="relative bg-cyan-100 h-[15rem] w-[20rem] rounded-lg p-2">
            <button className="btn-sm" onClick={(me) => handleClick()}>Move circles down</button>
            {shapes.map((s) => {
                return <div key={s.id} className="absolute w-[20px] h-[20px] bg-purple-300"
                    style={{ left: s.x, top: s.y, borderRadius: (s.type === "circle" ? "50%" : "0%") }}
                />
            })}
        </div>
    }

    export function CounterList(): JSX.Element {
        const [counters, setCounter] = useState<number[]>([0, 1, 2])
        
        function handleIncrementClick(idx: number) {
            setCounter(counters.map((c, i) => {
                return (i === idx) ? c + 1 : c
            }))
        }

        return <ol type="1" className="flex flex-row gap-2">
            {counters.map((c, i) => {
                return <li key={i}> {c} <button className="btn-sm" onClick={(me) => handleIncrementClick(i)}>+1</button></li>
            })}
        </ol>
    }

    declare type TItem = { id: number, title: string, seen: boolean }
    const INIT_ITEMS: TItem[] = [
        { id: 0, title: "Big Bellies", seen: false },
        { id: 1, title: "Lunar Landscape", seen: false },
        { id: 2, title: "Terracotta Army", seen: true },
    ]
    function ItemList({ artworks, onToggle }: { artworks: TItem[], onToggle: (id: number, nextSeen: boolean) => void }): JSX.Element {
        return <ol type="1" className="flex flex-row gap-2">
            {artworks.map(a => <li key={a.id}>
                <label>
                    <input type="checkbox" checked={a.seen} onChange={(ce) => { onToggle(a.id, ce.target.checked) }} />
                    {a.title}
                </label>
            </li>)}
        </ol>
    }
    export function BucketList(): JSX.Element {
        /*
        const [myList, setMyList] = useState<TItem[]>(INIT_ITEMS)
        const [yourList, setYourList] = useState<TItem[]>(INIT_ITEMS)
        function handleToggleMyList(artworkId: number, nextSeen: boolean) {
            if (false) {
            const _list: TItem[] = [...myList]
            const artwork: TItem = _list.find(item => item.id === artworkId) //ERROR
            if (!artwork) return
            artwork.seen = nextSeen
            setMyList(_list)
            }
            const _list: TItem[] = [...myList]
            const _idx:number = _list.findIndex(item=>item.id===artworkId)
            if (_idex < 0) return
            _list[_idx] = {..._list[_idx], seen:nextSeen}
            setMyList(_list)
        }
        function handleToggleYourList(artworkId: number, nextSeen: boolean) {
            const _list: TItem[] = [...yourList]
            const artwork: TItem = _list.find(item => item.id === artworkId) //ERROR
            if (!artwork) return
            artwork.seen = nextSeen
            setYourList(_list)
        }
            */

        const [myList, updateMyList] = useImmer<TItem[]>(INIT_ITEMS)
        const [yourList, updateYourList] = useImmer<TItem[]>(INIT_ITEMS)

        function handleToggleMyList(artworkId: number, nextSeen: boolean) {
            updateMyList(draft => {
                const artwork: TItem = draft.find(item => item.id === artworkId)
                artwork.seen = nextSeen
            })
        }

        function handleToggleYouList(artworkId: number, nextSeen: boolean) {
            updateYourList(draft => {
                const artwork: TItem = draft.find(item => item.id === artworkId)
                artwork.seen = nextSeen
            })
        }

        return <>
            <h1>Art Bucket List</h1>
            <h2>My list of art to see:</h2>
            <ItemList
                artworks={myList}
                onToggle={handleToggleMyList} />
            <h2>Your list of art to see:</h2>
            <ItemList
                artworks={yourList}
                onToggle={handleToggleYouList} />
        </>
    }
}

namespace LAB_9 {
    declare type TProduct = { id: number, name: string, count: number }
    const INIT_PRODUCTS: TProduct[] = [
        { id: 0, name: "Baklava", count: 1, }, 
        { id: 1, name: "Cheese", count: 5, },
        { id: 2, name: "Spaghetti", count: 2, }]
    export function ShoppingCart(): JSX.Element {
        const [products, setProducts] = useState<TProduct[]>([...INIT_PRODUCTS])

        function handleIncrementClick(productId: number) {
            const _products: TProduct[] = [...products]
            const idx: number = _products.findIndex(p => p.id === productId)
            if (idx < 0) return
            const _product: TProduct = { ..._products[idx] }
            _product.count++
            _products[idx] = _product
            setProducts(_products)
        }
        function handleDecreaseClick(productId: number) {
            const _products: TProduct[] = [...products]
            const idx: number = _products.findIndex(p => p.id === productId)
            if (idx < 0) return
            const _product: TProduct = { ..._products[idx] }
            _product.count--
            _products[idx] = _product
            if (_product.count <= 0) {
                _products.splice(idx, 1)
            }
            setProducts(_products)
        }

        return <ol type="1" className="flex flex-row gap-2">{products.map(product => {
            return <li key={product.id}>
                {product.name} (<b>{product.count}</b>) &nbsp;
                <button className="btn-sm" onClick={(ce) => handleIncrementClick(product.id)}>+</button>
                <button className="btn-sm" onClick={(ce) => handleDecreaseClick(product.id)}>-</button>
            </li>
        })}
            <li><button className="btn-sm" onClick={(ce) => setProducts([...INIT_PRODUCTS])}>Reset</button></li>
        </ol>
    }

    declare type TTodo = { id: number, title: string, done: boolean }
    const INIT_TODOS: TTodo[] = [
        { id: 0, title: "Buy milk", done: true },
        { id: 1, title: "Eat tacos", done: false },
        { id: 2, title: "Brew tea", done: false },
    ]
    function TaskList({ todos, 
        onChangeTodo, 
        onDeleteTodo }: { todos: TTodo[], 
            onChangeTodo: (t: TTodo) => void,
            onDeleteTodo: (t: TTodo) => void }): JSX.Element {
        return <ol type="1" className="flex flex-col gap-2">
            {todos.map(t => {
                return <li key={t.id}>
                    <Task todo={t} onChange={onChangeTodo} onDelete={onDeleteTodo} />
                </li>
            })}
        </ol>
    }
    function Task({ todo, 
        onChange, 
        onDelete }: { todo: TTodo, 
            onChange: (t: TTodo) => void,
            onDelete: (t: TTodo) => void }): JSX.Element {
        const [isEditing, setIsEditing] = useState<boolean>(false)

        return <label className="flex flex-row gap-2">
            <input type="checkbox" 
                checked={todo.done} 
                onChange={(ce) => { onChange({ ...todo, done: ce.target.checked }) }} />  
            {isEditing && <>
                <input value={todo.title} 
                    type="text"
                    onChange={(ce) => { onChange({ ...todo, title: ce.target.value }) }} />
                <button className="btn-sm" onClick={(me) => setIsEditing(false)}>Save</button>
            </>}    
            {!isEditing && <>
                {todo.title}
                <button className="btn-sm" onClick={(me) => setIsEditing(true)}>Edit</button>
            </>}    
            <button className="btn-sm" onClick={(me) => onDelete(todo)}>Delete</button>
        </label>
    }
    function AddTodo({ onAddTodo }: { onAddTodo: (t: string) => void }): JSX.Element {
        const [title, setTitle] = useState<string>("")
        return <>
            <input placeholder="Add todo" type="text"
                value={title}
                onChange={(ce) => setTitle(ce.target.value)} />
            <button className="btn-sm" onClick={(ce) => {
                setTitle("")
                onAddTodo(title)
            }}>Add</button>
        </>
    }

    export function TaskApp(): JSX.Element {
        const [todos, updateTodos] = useImmer<TTodo[]>(INIT_TODOS)
        function onAddTodo(title: string) {
            updateTodos(draft => {
                draft.push({ id: todos.length, title, done: false })
            })
        }
        function onChangeTodo(todo: TTodo) {
            updateTodos(draft => {
                const idx: number = draft.findIndex(t => t.id === todo.id)
                if (idx < 0) return 
                draft[idx] = todo
            })
        }
        function onDeleteTodo(todo: TTodo) {
            updateTodos(draft => {
                const idx: number = draft.findIndex(t => t.id === todo.id)
                if (idx < 0) return 
                draft.splice(idx, 1)
            })
        }

        return <div className="flex flex-col">
            <div className="flex flex-row"><AddTodo onAddTodo={onAddTodo} /></div>
            <TaskList todos={todos}
                onChangeTodo={onChangeTodo}
                onDeleteTodo={onDeleteTodo} />
        </div>
    }
}

export default function Page(): JSX.Element {
    return <>
        <section className="  rounded-lg p-2 m-3">
            <h2>Responding to events</h2>
            <LAB_1.App />
        </section>
        <section className="  rounded-lg p-2 m-3">
            <h2>State: a component's memory</h2>
            <LAB_2.Gallery />
        </section>
        <section className="  rounded-lg p-2 m-3">
            <h2>Render and Commit</h2>
            <LAB_3.App />
        </section>
        <section className="  rounded-lg p-2 m-3">
            <h2>State as a Snapshot</h2>
            <LAB_4.Form />
        </section>
        <section className="  rounded-lg p-2 m-3">
            <h2>Queueing a Series of State Updates</h2>
            <LAB_5.Counter />
            <hr className="my-2" />
            <LAB_5.RequestTracker />
        </section>
        <section className="  rounded-lg p-2 m-3">
            <h2>Updating Objects in State</h2>
            <LAB_6.MovingDot />
            <hr className="my-2" />
            <LAB_6.Form />
        </section>

        <section className="  rounded-lg p-2 m-3">
            <h2>Updating Arrays in State</h2>
            <LAB_8.List />
            <hr className="my-2" />
            <LAB_8.ShapeEditor />
            <hr className="my-2" />
            <LAB_8.CounterList />
            <hr className="my-2" />
            <LAB_8.BucketList />
            <hr className="my-2" />
            <LAB_9.ShoppingCart />
            <hr className="my-2" />
            <LAB_9.TaskApp />
        </section>
    </>
} 