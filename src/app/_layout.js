import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { PlaylistsProvider } from "../contexts/PlaylistsContext";

export default function RootLayout() {
    return (
        <PaperProvider>
            <PlaylistsProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </PlaylistsProvider>
        </PaperProvider>
    );
}