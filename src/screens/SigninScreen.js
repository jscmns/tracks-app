import React, { useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";

const SigninScreen = () => {
	const { state, signin, clearErrorMessage } = useContext(AuthContext);

	return (
		<View style={styles.container}>
			<NavigationEvents onWillFocus={clearErrorMessage} />
			<AuthForm
				headerText="Sign in"
				errorMessage={state.errorMessage}
				submitButtonText="Sign in"
				onSubmit={signin}
			/>
			<NavLink text="Don't have an account? Sign up instead" routeName="Signup" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginBottom: 200
	}
});

SigninScreen.navigationOptions = () => {
	return {
		headerShown: false
	};
};

export default SigninScreen;
