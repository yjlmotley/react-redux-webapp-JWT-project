import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>Hello, I'm Rigo!~</h1>
			<h1>Try logging in!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
}; 