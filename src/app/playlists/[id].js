import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
    Avatar,
    Button,
    Checkbox,
    Dialog,
    Divider,
    IconButton,
    List,
    Portal,
} from "react-native-paper";
import { usePlaylists } from "../../contexts/PlaylistsContext";
import songs from "../../data/songs.json";
import { imagenes } from "../imagenes.js";
import Layout from "../layout.js";

export default function PlaylistDetail() {
    const { id } = useLocalSearchParams();
    const playlistId = Array.isArray(id) ? id[0] : id;
    const { playlists, addSongToPlaylist } = usePlaylists();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [selectedSongIds, setSelectedSongIds] = useState([]);
    const playlist = playlists.find((item) => item.id === playlistId);

    function toggleSong(songId) {
        setSelectedSongIds((current) =>
            current.includes(songId)
                ? current.filter((selectedId) => selectedId !== songId)
                : [...current, songId]
        );
    }

    function openAddSongsDialog() {
        setSelectedSongIds([]);
        setDialogVisible(true);
    }

    function handleAddSongs() {
        selectedSongIds.forEach((songId) => addSongToPlaylist(playlist.id, songId));
        setDialogVisible(false);
    }

    const availableSongs = playlist
        ? songs.filter((song) => !playlist.songIds.includes(song.id))
        : [];
    const playlistSongs = playlist
        ? playlist.songIds
            .map((songId) => songs.find((song) => song.id === songId))
            .filter(Boolean)
        : [];

    return (
        <Layout>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
                {!playlist ? (
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
                            Playlist no encontrada
                        </Text>
                        <Button mode="contained" onPress={() => router.replace("/")}>
                            Volver al inicio
                        </Button>
                    </View>
                ) : (
                    <>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <IconButton icon="arrow-left" onPress={() => router.back()} />
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                                    {playlist.name}
                                </Text>
                                <Text>{playlistSongs.length} canciones</Text>
                            </View>
                        </View>

                        <Button
                            icon="plus"
                            mode="contained"
                            onPress={openAddSongsDialog}
                            style={{ marginVertical: 16 }}
                        >
                            Agregar canciones
                        </Button>

                        {playlistSongs.length === 0 ? (
                            <Text style={{ paddingVertical: 16 }}>
                                Esta playlist aun no tiene canciones.
                            </Text>
                        ) : (
                            playlistSongs.map((song, index) => (
                                <View key={song.id}>
                                    <List.Item
                                        title={song.titulo}
                                        description={song.artista}
                                        onPress={() => router.push(`/playing?id=${song.id}`)}
                                        left={() => (
                                            <Avatar.Image
                                                size={44}
                                                source={imagenes[song.thumbnail]}
                                            />
                                        )}
                                        right={(props) => (
                                            <List.Icon {...props} icon="play" />
                                        )}
                                    />
                                    {index < playlistSongs.length - 1 && <Divider />}
                                </View>
                            ))
                        )}
                    </>
                )}
            </ScrollView>

            {playlist && (
                <Portal>
                    <Dialog
                        visible={dialogVisible}
                        onDismiss={() => setDialogVisible(false)}
                    >
                        <Dialog.Title>Agregar canciones</Dialog.Title>
                        <Dialog.Content>
                            {availableSongs.length === 0 ? (
                                <Text>Todas las canciones ya estan en esta playlist.</Text>
                            ) : (
                                <ScrollView style={{ maxHeight: 320 }}>
                                    {availableSongs.map((song) => (
                                        <Checkbox.Item
                                            key={song.id}
                                            label={`${song.titulo} - ${song.artista}`}
                                            status={selectedSongIds.includes(song.id) ? "checked" : "unchecked"}
                                            onPress={() => toggleSong(song.id)}
                                            position="leading"
                                        />
                                    ))}
                                </ScrollView>
                            )}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogVisible(false)}>
                                Cancelar
                            </Button>
                            <Button
                                onPress={handleAddSongs}
                                disabled={selectedSongIds.length === 0}
                            >
                                Agregar
                            </Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            )}
        </Layout>
    );
}
