import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import CaptureIcon from '../assets/capture-button.png';
import SwitchIcon from '../assets/switch-button.png';

const CameraScreen = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('front');
  const [showResults, setShowResults] = useState(false);

  const device = useCameraDevice(cameraPosition);
  const camera = useRef(null);

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    if (status === 'granted') {
      setCameraPermission(true);
    } else if (status === 'not-determined') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'granted');
    } else {
      setCameraPermission(false);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const takePhoto = async () => {
    try {
      const photo = await camera.current.takePhoto();
      if (photo?.path) {
        setCapturedPhoto(`file://${photo.path}`);
        setIsAnalysing(true);
        setTimeout(() => {
          setIsAnalysing(false);
          setShowResultButton(true);
        }, 2000);
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const toggleCamera = () => {
    setCameraPosition((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  const retakePhoto = () => {
    setShowResults(false);
    setCapturedPhoto(null);
    setIsAnalysing(false);
    setShowResultButton(false);
  };

  if (cameraPermission === null) return <Text>Checking camera permission...</Text>;
  if (!cameraPermission) return <Text>Camera permission not granted</Text>;
  if (!device) return <Text>No camera device available</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      {!capturedPhoto && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
      )}

      {capturedPhoto && (
        <Image source={{ uri: capturedPhoto }} style={StyleSheet.absoluteFill} resizeMode="cover" />
      )}

      {!isAnalysing && !showResultButton && (
        <View style={styles.controls}>
          <View style={styles.button} />
          <TouchableOpacity style={styles.button} onPress={takePhoto} testID="capture-button">
            <Image source={CaptureIcon} style={styles.captureBtn} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCamera} testID="switch-button">
            <Image source={SwitchIcon} style={styles.switchBtn} />
          </TouchableOpacity>
        </View>
      )}

      {isAnalysing && (
        <View style={styles.bottomSheet}>
          <View style={styles.analyseView}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.sheetText}>Analysing photo</Text>
          </View>
        </View>
      )}

      {showResultButton && (
        <>
          <View style={showResults ? styles.showResultsretakeContainer : styles.retakeContainer}>
            <TouchableOpacity style={styles.retakeButton} onPress={retakePhoto}>
              <Text style={styles.retakeText}>Retake</Text>
            </TouchableOpacity>
          </View>

          {showResults ? (
            <View style={styles.resultsBottomSheet}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.resultCard}>
                  <View style={styles.baldIcon}>
                    <Text>100%</Text>
                  </View>
                  <Text style={styles.resultsTitle}>Baldness</Text>
                  <Text style={styles.resultsTxt}>
                    Hair thinning detected on the scalp with visible bald patches. Hair loss is
                    moderate and could progress without intervention.
                  </Text>
                </View>
                <View style={styles.resultCard}>
                  <View style={styles.wrinkleIcon}>
                    <Text>05%</Text>
                  </View>
                  <Text style={styles.resultsTitle}>Wrinkles</Text>
                  <Text style={styles.resultsTxt}>
                    Fine lines and deep wrinkles are visible around the forehead and eyes. Skin
                    elasticity is reduced, indicating signs of aging.
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Skin Report')}
                testID="recommendations-button"
              >
                <View style={styles.analyseView}>
                  <Text style={styles.sheetText}>Recommendations</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.bottomSheet}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowResults(true)}
                testID="see-results-button"
              >
                <View style={styles.analyseView}>
                  <Text style={styles.sheetText}>See Results</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(4, 4, 4, 0.2)',
    height: 150,
  },
  button: {
    padding: 14,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    height: 150,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  resultsBottomSheet: {
    position: 'absolute',
    bottom: 0,
    height: 370,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginLeft: 10,
  },
  retakeContainer: {
    position: 'absolute',
    bottom: 180,
    alignSelf: 'center',
  },
  showResultsretakeContainer: {
    position: 'absolute',
    bottom: 380,
    alignSelf: 'center',
  },
  retakeButton: {
    backgroundColor: '#ffffffcc',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retakeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  captureBtn: {
    height: 70,
    width: 70,
  },
  switchBtn: {
    height: 40,
    width: 40,
  },
  analyseView: {
    flexDirection: 'row',
    backgroundColor: '#252525',
    height: 50,
    width: '300',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  resultCard: {
    paddingVertical: 10,
    width: '35%',
    backgroundColor: '#EFEFEF',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsTxt: {
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  resultsTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
  },
  wrinkleIcon: {
    height: 70,
    width: 70,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C0EAC0',
  },
  baldIcon: {
    height: 70,
    width: 70,
    borderRadius: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF9628A',
  },
});

export default CameraScreen;