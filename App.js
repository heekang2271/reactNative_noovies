import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import Stack from "./navigation/Stack";

const cacheImages = (images) =>
    images.map((image) => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });

const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const loadAssets = () => {
        const images = cacheImages([
            "https://images.unsplash.com/photo-1553272725-086100aecf5e?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=765&q=80",
            require("./assets/splash.png"),
        ]);
        const fonts = cacheFonts([Ionicons.font]);

        return Promise.all([...images, ...fonts]);
    };
    const onFinish = () => setIsReady(true);
    return isReady ? (
        <>
            <NavigationContainer>
                <Stack />
            </NavigationContainer>
            <StatusBar barStyle="light-content" />
        </>
    ) : (
        <AppLoading
            startAsync={loadAssets}
            onFinish={onFinish}
            onError={console.error}
        />
    );
}
