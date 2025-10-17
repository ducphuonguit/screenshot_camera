import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function CameraScreen({ navigation }) {
	const [facing, setFacing] = useState('back')
	const [photo, setPhoto] = useState(null);
	const [cameraPermission, requestCameraPermission] = useCameraPermissions();
	const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
	const cameraRef = useRef(null);

	if (!cameraPermission || !mediaPermission) {
		return <View />;
	}

	if (!cameraPermission.granted || !mediaPermission.granted) {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.permissionContainer}>
					<Text style={styles.permissionText}>We need camera and media library permissions</Text>
					<TouchableOpacity style={styles.button} onPress={() => {
						requestCameraPermission();
						requestMediaPermission();
					}}>
						<Text style={styles.buttonText}>Grant Permissions</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}

	const takePicture = async () => {
		if (cameraRef.current) {
			const photo = await cameraRef.current.takePictureAsync();
			setPhoto(photo.uri);
		}
	};

	const flipCamera = () => {
		setFacing(current => (current === 'back' ? 'front' : 'back'));
	};

	const savePhoto = async () => {
		if (photo) {
			await MediaLibrary.saveToLibraryAsync(photo);
			Alert.alert('Success', 'Photo saved to gallery!');
		}
	};

	const retake = () => {
		setPhoto(null);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
					<Text style={styles.backText}>←</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Camera</Text>
				<View style={styles.backButton} />
			</View>

			{!photo ? (
				<CameraView style={styles.camera} facing={facing} ref={cameraRef}>
					<View style={styles.cameraOverlay}>
						<TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
							<Text style={styles.flipText}>🔄</Text>
						</TouchableOpacity>
					</View>
				</CameraView>
			) : (
				<Image source={{ uri: photo }} style={styles.preview} />
			)}

			<View style={styles.controlsContainer}>
				{!photo ? (
					<>
						<TouchableOpacity style={styles.captureButton} onPress={takePicture}>
							<View style={styles.captureButtonInner} />
						</TouchableOpacity>
						<Text style={styles.hint}>Tap to capture photo</Text>
					</>
				) : (
					<View style={styles.buttonRow}>
						<TouchableOpacity style={styles.actionButton} onPress={retake}>
							<Text style={styles.buttonText}>Retake</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.actionButton, styles.saveButton]} onPress={savePhoto}>
							<Text style={styles.buttonText}>Save Photo</Text>
						</TouchableOpacity>
					</View>
				)}
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
	camera: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 10,
		borderRadius: 20,
		overflow: 'hidden',
	},
	cameraOverlay: {
		flex: 1,
		backgroundColor: 'transparent',
		padding: 20,
	},
	flipButton: {
		alignSelf: 'flex-end',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		borderRadius: 30,
		padding: 10,
	},
	flipText: {
		fontSize: 24,
	},
	preview: {
		flex: 1,
		marginHorizontal: 20,
		marginVertical: 10,
		borderRadius: 20,
	},
	controlsContainer: {
		padding: 20,
		alignItems: 'center',
	},
	captureButton: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: '#fff',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	captureButtonInner: {
		width: 65,
		height: 65,
		borderRadius: 32.5,
		backgroundColor: '#ff4757',
	},
	hint: {
		color: '#999',
		fontSize: 14,
	},
	buttonRow: {
		flexDirection: 'row',
		gap: 15,
	},
	actionButton: {
		backgroundColor: '#2a2a2a',
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 10,
	},
	saveButton: {
		backgroundColor: '#4CAF50',
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
