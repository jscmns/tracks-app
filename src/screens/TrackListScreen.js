import React from "react";
import { StyleSheet, Text, Button } from "react-native";

const TrackListScreen = ({ navigation }) => {
	return (
		<>
			<Text>TrackListScreen</Text>
			<Button title="Go to track detail" onPress={() => navigation.navigate("TrackDetail")} />
		</>
	);
};

const styles = StyleSheet.create({});

export default TrackListScreen;
