import { StyleSheet } from "react-native";

export default StyleSheet.create({
    title1: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    title2: {
        fontSize: 18,
        paddingBottom: 10,
    },

    appBar: {
        backgroundColor: "limegreen",
        justifyContent: "space-evenly",
    },

    appLogo: {
        width: 36,
        height: 36,
        marginLeft: 12,
        marginRight: 8,
    },

    horizontalBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    scrollingBox: {
        gap: 20,
        paddingBottom: 20,
        alignItems: "center",
    },
    textBox: {
        backgroundColor: "lightgray",
        width: "50%",
        padding: 5,
        margin: 10,
        flex: 1,
    },

    card: {
        width: 200,
    },

    icon: {
        width: 40,
        height: 40
    },

    button: {
        backgroundColor: "lightgray",
        padding: 5,
        alignItems: "center",
    },

    songThumbnail: {
        width: 200,
        height: 200
    },
});