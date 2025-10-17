// javascript
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, findNodeHandle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

export default function ScreenshotScreen({ navigation }) {
	const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
	const screenshotRef = useRef(null);

	if (!mediaPermission) {
		return <View />;
	}

	if (!mediaPermission.granted) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.permissionContainer}>
					<Text style={styles.permissionText}>We need media library permission to save screenshots</Text>
					<TouchableOpacity style={styles.button} onPress={() => requestMediaPermission()}>
						<Text style={styles.buttonText}>Grant Permission</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	const takeScreenshot = async () => {
		try {
			// get native handle (ensures view exists on native side)
			const node = findNodeHandle(screenshotRef.current) || screenshotRef.current;
			if (!node) throw new Error('No native node available to capture');

			const uri = await captureRef(node, {
				format: 'png',
				quality: 1,
				result: 'tmpfile',
			});

			const asset = await MediaLibrary.createAssetAsync(uri);
			try {
				await MediaLibrary.createAlbumAsync('Screenshots', asset, false);
			} catch (e) {
				// ignore album exists error
			}

			Alert.alert('Success', 'Screenshot saved to gallery!');
		} catch (error) {
			console.error('takeScreenshot error:', error);
			Alert.alert('Error', `Failed to take screenshot: ${error?.message || error}`);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
					<Text style={styles.backText}>←</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Screenshot</Text>
				<View style={styles.backButton} />
			</View>

			<ScrollView style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
				{/* Make sure the view is not collapsed/optimized away on native side */}
				<View ref={screenshotRef} collapsable={false} style={styles.screenshotArea}>
					<View style={styles.card}>
						<Text style={styles.cardTitle}>📱 Screenshot Demo</Text>
						<Text style={styles.cardText}>
							This entire content area will be captured when you tap the button below.
						</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.cardTitle}>✨ Features</Text>
						<Text style={styles.cardText}>• High quality PNG export</Text>
						<Text style={styles.cardText}>• Saves to device gallery</Text>
						<Text style={styles.cardText}>• Captures entire view content</Text>
					</View>

					<View style={styles.demoBox}>
						<Text style={styles.demoText}>🎨 Demo Content</Text>
						<View style={styles.colorRow}>
							<View style={[styles.colorBox, { backgroundColor: '#ff4757' }]} />
							<View style={[styles.colorBox, { backgroundColor: '#4CAF50' }]} />
							<View style={[styles.colorBox, { backgroundColor: '#2196F3' }]} />
						</View>
					</View>
				</View>
			</ScrollView>

			<View style={styles.footer}>
				<TouchableOpacity style={styles.screenshotButton} onPress={takeScreenshot}>
					<Text style={styles.buttonText}>📸 Capture Screenshot</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1a1a1a',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 15,
		backgroundColor: '#2a2a2a',
	},
	backButton: {
		width: 40,
	},
	backText: {
		fontSize: 28,
		color: '#fff',
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
	},
	content: {
		flex: 1,
	},
	screenshotArea: {
		padding: 20,
		gap: 20,
	},
	card: {
		backgroundColor: '#2a2a2a',
		padding: 20,
		borderRadius: 15,
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
		marginBottom: 10,
	},
	cardText: {
		fontSize: 16,
		color: '#ccc',
		lineHeight: 24,
	},
	demoBox: {
		backgroundColor: '#2a2a2a',
		padding: 20,
		borderRadius: 15,
		alignItems: 'center',
	},
	demoText: {
		fontSize: 18,
		color: '#fff',
		marginBottom: 15,
	},
	colorRow: {
		flexDirection: 'row',
		gap: 15,
	},
	colorBox: {
		width: 60,
		height: 60,
		borderRadius: 10,
	},
	footer: {
		padding: 20,
		backgroundColor: '#1a1a1a',
	},
	screenshotButton: {
		backgroundColor: '#2196F3',
		padding: 18,
		borderRadius: 15,
		alignItems: 'center',
	},
	permissionContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
	},
	permissionText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 20,
	},
	button: {
		backgroundColor: '#2196F3',
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
