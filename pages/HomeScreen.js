import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>📸 Camera & Screenshot Demo</Text>
                <Text style={styles.subtitle}>Choose a feature to explore</Text>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={[styles.featureButton, styles.cameraButton]}
                        onPress={() => navigation.navigate('Camera')}
                    >
                        <Text style={styles.icon}>📷</Text>
                        <Text style={styles.buttonTitle}>Camera</Text>
                        <Text style={styles.buttonDescription}>Take photos with front/back camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.featureButton, styles.screenshotButton]}
                        onPress={() => navigation.navigate('Screenshot')}
                    >
                        <Text style={styles.icon}>📱</Text>
                        <Text style={styles.buttonTitle}>Screenshot</Text>
                        <Text style={styles.buttonDescription}>Capture screen content</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginBottom: 50,
    },
    buttonsContainer: {
        gap: 20,
    },
    featureButton: {
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
    },
    cameraButton: {
        backgroundColor: '#2a2a2a',
    },
    screenshotButton: {
        backgroundColor: '#2a2a2a',
    },
    icon: {
        fontSize: 60,
        marginBottom: 15,
    },
    buttonTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    buttonDescription: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});
