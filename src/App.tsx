import { useState } from 'react';
import './App.css'

function App() {
	const [started, setStarted] = useState<boolean>(false);

	if (started) {
		return (
			<div className='page'>
				<h1 className='icon'>🎉</h1>
				<h1>Best of Luck!</h1>
				<h3>Remember to read the instructions carefully and ask questions if you are unsure about anything.</h3>
				<p>You can start by removing the code in the App.tsx and the App.css files</p>
			</div>
		)
	}

    return (
		<div className='page'>
			<h1>👋🏻 Hello Candidate</h1>
			<h3>
				Welcome to the ReachHub Live Coding Assignment<br/>
				Congratulations on making it this far! Let's buckle up for the live coding round now.
			</h3>
			<p>
				Now that you have the codebase, let's get started with the assignment. Follow the instructions in the README.md file.<br/>
				If you have any questions or need help, please feel free to ask.
			</p>
			<button onClick={() => setStarted(true)}>Get Started</button>
		</div>
    )
}

export default App
