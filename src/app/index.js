import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
    Button,
    Card,
    Checkbox,
    Chip,
    Dialog,
    IconButton,
    Portal,
    TextInput,
} from "react-native-paper";
import { usePlaylists } from "../contexts/PlaylistsContext";
import songs from "../data/songs.json";
import Layout from "./layout.js";
import SongCard from "./SongCard.js";
import styles from "./styles.js";

export default function Inicio(){
    const { playlists, createPlaylist } = usePlaylists();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [playlistName, setPlaylistName] = useState("");
    const [selectedSongIds, setSelectedSongIds] = useState([]);
    const [nameError, setNameError] = useState(false);

    function openCreateDialog() {
        setPlaylistName("");
        setSelectedSongIds([]);
        setNameError(false);
        setDialogVisible(true);
    }

    function toggleSong(songId) {
        setSelectedSongIds((current) =>
            current.includes(songId)
                ? current.filter((id) => id !== songId)
                : [...current, songId]
        );
    }

    function handleCreatePlaylist() {
        if (!playlistName.trim()) {
            setNameError(true);
            return;
        }

        createPlaylist(playlistName, selectedSongIds);
        setDialogVisible(false);
    }

    return (
        <Layout>
            <ScrollView>
                <View style={styles.horizontalBox}>
                    <Text style={styles.title1}>Hola, Gavriel</Text>
                    <IconButton
                        icon={() => (
                            <MaterialCommunityIcons name="bell" size={24}/>
                        )}
                    />
                </View>
                <View>
                    <Text style={styles.title2}>Selecciona</Text>
                    <ScrollView horizontal contentContainerStyle={styles.scrollingBox}>
                        <Chip>Todas</Chip>
                        <Chip>Hip Hop</Chip>
                        <Chip>Fiesta</Chip>
                        <Chip>Rock</Chip>
                        <Chip>Pop</Chip>
                        <Chip>Videogame OST</Chip>
                    </ScrollView>

                    
                    <Text style={styles.title2}>Canciones Populares</Text>
                    <ScrollView horizontal contentContainerStyle={styles.scrollingBox}>
                        {songs.map((song) => (
                            <SongCard
                                key={song.id}
                                song={song}
                            />
                        ))}
                    </ScrollView>

                    <Text style={styles.title2}>Mis Playlists</Text>
                    <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
                        <Button
                            icon="plus"
                            mode="contained"
                            onPress={openCreateDialog}
                        >
                            Crear playlist
                        </Button>

                        {playlists.length === 0 ? (
                            <Text style={{ paddingVertical: 16 }}>
                                Aun no has creado playlists.
                            </Text>
                        ) : (
                            playlists.map((playlist) => {
                                const previewSongs = playlist.songIds
                                    .map((songId) => songs.find((song) => song.id === songId))
                                    .filter(Boolean)
                                    .slice(0, 2);

                                return (
                                    <Card
                                        key={playlist.id}
                                        style={{ marginTop: 12 }}
                                        onPress={() => router.push(`/playlists/${playlist.id}`)}
                                    >
                                        <Card.Title
                                            title={playlist.name}
                                            subtitle={`${playlist.songIds.length} canciones`}
                                            left={(props) => (
                                                <MaterialCommunityIcons
                                                    {...props}
                                                    name="playlist-music"
                                                    size={28}
                                                />
                                            )}
                                        />
                                        <Card.Content>
                                            <Text>
                                                {previewSongs.length > 0
                                                    ? previewSongs.map((song) => song.titulo).join(", ")
                                                    : "Sin canciones"}
                                            </Text>
                                        </Card.Content>
                                    </Card>
                                );
                            })
                        )}
                    </View>
                </View>
            </ScrollView>

            <Portal>
                <Dialog
                    visible={dialogVisible}
                    onDismiss={() => setDialogVisible(false)}
                >
                    <Dialog.Title>Nueva playlist</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Nombre"
                            mode="outlined"
                            value={playlistName}
                            onChangeText={(value) => {
                                setPlaylistName(value);
                                if (value.trim()) setNameError(false);
                            }}
                            maxLength={50}
                            autoCapitalize="sentences"
                            error={nameError}
                        />
                        {nameError && (
                            <Text style={{ color: "#B3261E", marginTop: 4 }}>
                                Escribe un nombre para continuar.
                            </Text>
                        )}
                        <Text style={{ marginTop: 16, marginBottom: 4 }}>
                            Canciones (opcional)
                        </Text>
                        <ScrollView style={{ maxHeight: 280 }}>
                            {songs.map((song) => (
                                <Checkbox.Item
                                    key={song.id}
                                    label={`${song.titulo} - ${song.artista}`}
                                    status={selectedSongIds.includes(song.id) ? "checked" : "unchecked"}
                                    onPress={() => toggleSong(song.id)}
                                    position="leading"
                                />
                            ))}
                        </ScrollView>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>
                            Cancelar
                        </Button>
                        <Button onPress={handleCreatePlaylist}>
                            Crear
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Layout>
    );
}