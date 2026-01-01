import { ChangeEvent, FormEvent, JSX, ReactNode, useEffect, useState } from "react"
import { delay, mkMockImgUrl } from "../commons"
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
}

export default function Page(): JSX.Element {
    return <>
        <a href="https://react.dev/learn/extracting-state-logic-into-a-reducer" target="_blank"><h1>Managing State</h1></a>
        <hr className="m-4" />
        <h2>1. Extracting State Logic into a Reducer</h2>
        <LAB_1.TaskApp />
    </>
} 