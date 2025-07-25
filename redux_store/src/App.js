import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./store/slices/counter/counterSlice";


const App = () => {
  const count = useSelector((state)=>state.counters.value)
  const dispatch = useDispatch()

  const handleDispatchIncrement = ()=>{
    dispatch(increment())
  }
  const handleDispatchDecrement = ()=>{
    dispatch(decrement())
  }
  return (
		<div>
			<button onClick={handleDispatchDecrement}>decrement</button>
			<section>{count}</section>
			<button onClick={handleDispatchIncrement}>increment</button>
		</div>
	);
}

export default App


