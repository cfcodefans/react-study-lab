import { ActionDispatch, ChangeEvent, FormEvent, JSX, ReactNode, useEffect, useReducer, useState } from "react"
import { delay, mkMockImgUrl, replaceIf } from "../commons"
import { useImmer } from "use-immer"


namespace LAB_1 {
    declare type TTask = { id: number, text: string, done: boolean }
    let nextId: number = 3
    const initialTasks: TTask[] = [
        { id: 0, text: "Visit Kafka Museum", done: true },
        { id: 1, text: "Watch a puppet show", done: false },
        { id: 2, text: "Lennon Wall pic", done: false },
    ]
    function AddTask({ onAddTask }: { onAddTask: (text: string) => void }): JSX.Element {
        const [text, setText] = useState<string>("")
        return <>
            <input type="text"
                placeholder="Add Task"
                value={text}
                onChange={(ce) => setText(ce.target.value)} />
            &nbsp;
            <button className="btn-sm" onClick={(ce) => {
                setText("")
                onAddTask(text)
            }}>Add</button>
        </>
    }
    function Task({ task, onChange, onDelete }
        : { task: TTask, onChange: (t: TTask) => void, onDelete: (id: number) => void }): JSX.Element {
        const [isEditing, setIsEditing] = useState<boolean>(false)

        return <label>
            <input type="checkbox" 
                checked={task.done} 
                onChange={ce => {
                    onChange({ ...task, done: ce.target.checked })
                }} />
            {isEditing 
                ? <>
                    <input type="text" 
                        value={task.text} 
                        onChange={ce => {
                            onChange({ ...task, text: ce.target.value })
                        }} />
                    <button className="btn-sm" onClick={() => setIsEditing(false)}>Save</button>
                </>
                : <>
                    <i>{task.text}</i>
                    <button className="btn-sm" onClick={() => setIsEditing(true)}>Edit</button>
                </>}
            <button className="btn-sm" onClick={() => onDelete(task.id)}>Delete</button>
        </label>
    }
    function TaskList({ tasks, onChange, onDelete }
        : { tasks: TTask[], onChange: (t: TTask) => void, onDelete: (id: number) => void }): JSX.Element {
        return <ol>{
            tasks.map(task => {
                return <li key={task.id}>
                    <Task task={task} onChange={onChange} onDelete={onDelete} />
                </li>
            })
        }</ol>
    }

    export function TaskApp(): JSX.Element {
        const [tasks, setTasks] = useState<TTask[]>(initialTasks)
        return <div className="flex flex-col gap-2">
            <h1>Prague itinerary</h1>
            <div>
                <AddTask onAddTask={(text: string) => setTasks([...tasks, { id: nextId++, text, done: false }])} />
            </div>
            <TaskList tasks={tasks}
                onChange={(task: TTask) => {
                    setTasks(tasks.map(t => {
                        return (t.id === task.id) ? task : t
                    }))  
                }}
                onDelete={(id: number) => setTasks(tasks.filter(t => t.id !== id))}
            />
        </div>
    }

    export function TaskApp2(): JSX.Element {
        const [tasks, dispatcher] = useReducer(TaskReducer, initialTasks)
        return <div className="flex flex-col gap-2">
            <h1>Prague itinerary</h1>
            <div>
                <AddTask onAddTask={(text: string) => dispatcher({ text, type: "added" })} />
            </div>
            <TaskList tasks={tasks}
                onChange={(task: TTask) => dispatcher({ ...task, type: "changed" })}
                onDelete={(id: number) => dispatcher({ id, type: "deleted" })}
            />
        </div>
    }

    function TaskReducer(tasks: TTask[], action: { type: string } & Partial<TTask>): TTask[] {
        switch (action.type) {
            case "added": {
                return [...tasks, { id: action.id ?? nextId++, text: action.text ?? "", done: false }]
            }
            case "changed": {
                return replaceIf(tasks, 
                    (t, i) => t.id === action.id, 
                    { id: action.id!!, text: action.text!!, done: action.done!! })
            }
            case "deleted": {
                return tasks.filter(t => t.id !== action.id)
            }
            default: {
                throw new Error(`Unknown action: ${action.text}`)
            }
        }
    }

    declare type TContact = { id: number, name: string, email: string }
    const contacts: TContact[] = [
        { id: 0, name: "Taylor", email: "taylor@mail.com" },
        { id: 1, name: "Alice", email: "alice@mail.com" },
        { id: 2, name: "Bob", email: "bob@mail.com" },
    ]
    declare type TMessengerState = { selectedId: number, message: string }
    const INIT_MSG_STATE: TMessengerState = { selectedId: 0, message: "Hello" }
    declare type TChatAct = {
        type: "changed_selection" | "edited_message", 
        contactId: number, 
        message: string 
    }
    function MessengerReducer(state: TMessengerState, act: TChatAct): TMessengerState {
        switch (act.type) {
            case "changed_selection": {
                return { ...state, selectedId: act.contactId, message: "" }
            }
            case "edited_message": {
                return { ...state, message: act.message }
            }
            default: {
                throw Error(`Unknown action: ${act.type}`)
            }
        }
    }
    function ContactList({
        contacts, selectedId, dispatcher
    }: {
        contacts: TContact[], selectedId: number, dispatcher: ActionDispatch<[act: TChatAct]>
    }): JSX.Element {
        return <section >
            <ol className="flex flex-col gap-2">{
                contacts.map(c => {
                    const { id, name } = c
                    return <li key={id}>
                        <button className="btn-sm" 
                            onClick={ce => dispatcher({ type: "changed_selection", contactId: id, message: "" })}>
                            {selectedId === c.id ? <b>{name}</b> : name}
                        </button>
                    </li>
                })
            }</ol>
        </section>
    }
    function Chat({
        contact, message, dispatcher
    }: {
        contact: TContact, message: string, dispatcher: ActionDispatch<[act: TChatAct]>
    }): JSX.Element {
        return <section className="flex flex-col gap-2">
            <textarea value={message} placeholder={`Chat to ${contact.name}`}
                onChange={ce => dispatcher({
                    type: "edited_message", 
                    message: ce.target.value, 
                    contactId: contact.id })} />
            <button className="btn-sm">Send to {contact.name}</button>
        </section>
    }
    export function Messenger(): JSX.Element {
        const [state, dispatcher] = useReducer<TMessengerState, [act: TChatAct]>(MessengerReducer, INIT_MSG_STATE)
        const { message } = state
        const contact: TContact = contacts.find(c => c.id === state.selectedId)!!
        return <div className="grid grid-cols-4 gap-1">
            <div>
                <ContactList contacts={contacts} 
                    selectedId={state.selectedId} 
                    dispatcher={dispatcher} />
            </div>
            <div className="col-span-3">
                <Chat key={contact.id}
                    message={message}
                    contact={contact}
                    dispatcher={dispatcher} />
            </div>
        </div>
    }
}

namespace LAB_2 {
    
}

export default function Page(): JSX.Element {
    return <>
        <a href="https://react.dev/learn/extracting-state-logic-into-a-reducer" target="_blank"><h1>Managing State</h1></a>
        <hr className="m-4" />
        <h2>1. Extracting State Logic into a Reducer</h2>
        <LAB_1.TaskApp />
        <br />
        <LAB_1.TaskApp2 />
        <br />
        <LAB_1.Messenger />
        <br />
        <br />
        <h2>2. Passing Data Deeply with Context </h2>
        
    </>
} 