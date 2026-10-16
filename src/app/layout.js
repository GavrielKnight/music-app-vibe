import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import styles from "./styles";

export default function Layout({ children }) {

    return (
        <View style={{ flex: 1 }}>
            {/*Barra superior*/}
            <Appbar.Header style={styles.appBar}>
                <Image
                    source={require("../../assets/images/app-logo.png")}
                    style={styles.appLogo}
                    contentFit="contain"
                    accessibilityLabel="Logo de Music App"
                />
                <Appbar.Content title="Music App"/>
            </Appbar.Header>

            {/* Contenido */}
            <View  style={{ flex: 1 }}>{children}</View>

            {/* Barra inferior */}
            <Appbar style={styles.appBar}>
                <Pressable onPress={() => router.push("/")}>
                    <Text style={styles.title1}>Inicio</Text>
                </Pressable>

                <Pressable onPress={() => router.push("/search")}>
                    <Text style={styles.title1}>Buscar</Text>
                </Pressable>

                <Pressable>
                    <Text style={styles.title1}>Configuración</Text>
                </Pressable>
            </Appbar>
        </View>
    );
}