import { ChangeEvent, FormEvent, JSX, useState } from "react"
import { delay, mkMockImgUrl } from "../commons"

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
}

namespace LAB_2 {
    export function Form(): JSX.Element {
        const [firstName, setFirstName] = useState<string>("")
        const [lastName, setLastName] = useState<string>("")
        return <form className="flex flex-col gap-2">
            <h2>Let's check you in</h2>
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
}

namespace LAB_3 {

}

export default function Page(): JSX.Element {
    return <>
        <a href="https://react.dev/learn/managing-state" target="_blank"><h1>Managing State</h1></a>
        <hr className="m-2" />
        <h2>Reacting to input with state</h2>
        <LAB_1.Form />
        <LAB_1.Picture />
        <hr className="m-2" />
        <h2>Choosing the state structure </h2>
        <LAB_2.Form />
        <hr className="m-2" />
        <h2>Sharing state between components </h2>
    </>
} 