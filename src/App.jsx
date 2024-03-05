import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
	const [start, setStarted] = useState(false);
	const [time, setTime] = useState(0);
	const [laptime, setLapTime] = useState(0);
	const [lapcount, setLapCount] = useState(1);
	const interval = useRef(null);
	const [laps, setlaps] = useState([]);

	const handleTimer = () => {
		if (!start) {
			setStarted(true);
			interval.current = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 1000);
		} else {
			setStarted(false);
			clearInterval(interval.current); // Access the 'current' property
		}
	};

	const setReset = () => {
		setStarted(false);
		clearInterval(interval.current); // Access the 'current' property
		setTime(0);
		setlaps([]);
		setLapCount(1);
		//cleardata();
	};

	const setLap = () => {
		const dura = time - laptime;
		const lap = {"id" : lapcount, "duration" : dura, "start" : laptime, "end" : time};
		setLapTime(time);
		setLapCount(lapcount + 1);
		console.log(lap);
		postData(lap);
	};

	function postData(data) {
		fetch('http://localhost:3000/laps', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data)
		})
		.then(response => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
		  console.log('Success:', data);
		})
		.catch(error => {
		  console.error('Error:', error);
		});
	  }

	  const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/laps'); // Replace with your JSON server endpoint
            const jsonData = await response.json();
            setlaps(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

	function clearData() {
		fetch(`http://localhost:3000/laps/`, {
		  method: 'DELETE',
		  headers: {
			'Content-Type': 'application/json'
		  }
		})
		.then(response => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  console.log('Data cleared successfully');
		})
		.catch(error => {
		  console.error('Error:', error);
		});
	  }

	useEffect(() => {
		fetchData();
	});

	return (
		<div className='page'>
			<div className='timer'>{time}</div>
			<div className='buttons'>
				<button onClick={handleTimer}>{start ? 'Stop' : 'Start'}</button>
				<button onClick={setReset}>Reset</button>
				<button onClick={setLap}>Lap</button>
			</div>
			<div className='laps'>
				<table>
					<thead>
						<tr>
							<th>Lap</th>
							<th>Start</th>
							<th>End</th>
							<th>Duration</th>
						</tr>
					</thead>
					<tbody>
						{laps.map((lap) => (
							<tr key={lap.id}>
								<td>{lap.id}</td>
								<td>{lap.start}</td>
								<td>{lap.end}</td>
								<td>{lap.duration}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
