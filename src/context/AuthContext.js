import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
	switch (action.type) {
		case "add_error":
			return { ...state, errorMessage: action.payload };
		case "login":
			return { errorMessage: "", token: action.payload };
		case "signout":
			return { errorMessage: "", token: null };
		case "clear_error_message":
			return { ...state, errorMessage: "" };
		default:
			return state;
	}
};

const tryLocalSignin = dispatch => async () => {
	const token = await AsyncStorage.getItem("token");
	if (token) {
		dispatch({ type: "login", payload: token });
		navigate("TrackList");
	} else {
		navigate("loginFlow");
	}
};

const clearErrorMessage = dispatch => () => {
	dispatch({ type: "clear_error_message" });
};

const signup = dispatch => {
	return async ({ email, password }) => {
		try {
			const response = await trackerApi.post("/signup", { email, password });
			await AsyncStorage.setItem("token", response.data.token);
			dispatch({ type: "login", payload: response.data.token });
			navigate("TrackList");
		} catch (error) {
			dispatch({ type: "add_error", payload: "Something went wrong with signup" });
		}
	};
};

const signin = dispatch => {
	return async ({ email, password }) => {
		try {
			const response = await trackerApi.post("/signin", { email, password });
			await AsyncStorage.setItem("token", response.data.token);
			dispatch({ type: "login", payload: response.data.token });
			navigate("TrackList");
		} catch (error) {
			dispatch({ type: "add_error", payload: "Something went wrong with signin" });
		}
	};
};

const signout = dispatch => {
	return async () => {
		try {
			await AsyncStorage.removeItem("token");
			dispatch({ type: "signout" });
			navigate("loginFlow");
		} catch (error) {
			dispatch({ type: "add_error", payload: "Something went wrong with signout" });
		}
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage, tryLocalSignin },
	{ token: null, errorMessage: "" }
);
