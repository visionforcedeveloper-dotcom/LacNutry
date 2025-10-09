import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Scan, Camera, Info, AlertCircle, CheckCircle, XCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { trpc } from '@/lib/trpc';

type ScanResult = {
  productName: string;
  hasLactose: boolean;
  lactoseLevel: 'none' | 'low' | 'medium' | 'high';
  lactoseIngredients: string[];
  safeForConsumption: boolean;
  alternatives: string[];
  warning?: string;
  confidence: number;
};

export default function ScannerScreen() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  
  const scanMutation = trpc.ai.scanProduct.useMutation({
    onSuccess: (data) => {
      setScanResult(data);
      setShowCamera(false);
    },
    onError: (error) => {
      Alert.alert('Erro', 'Não foi possível analisar a imagem. Tente novamente.');
      console.error('Scan error:', error);
    },
  });

  const handleTakePhoto = async () => {
    if (!cameraPermission) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert('Permissão Negada', 'Precisamos de acesso à câmera para escanear produtos.');
        return;
      }
    }

    if (!cameraPermission.granted) {
      const permission = await requestCameraPermission();
      if (!permission.granted) {
        Alert.alert('Permissão Negada', 'Precisamos de acesso à câmera para escanear produtos.');
        return;
      }
    }

    setShowCamera(true);
    setScanResult(null);
    setScannedImage(null);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setScannedImage(result.assets[0].uri);
      setScanResult(null);
      scanMutation.mutate({ image: base64Image });
    }
  };

  const handleCapture = async (camera: any) => {
    try {
      const photo = await camera.takePictureAsync({ base64: true, quality: 0.8 });
      if (photo.base64) {
        const base64Image = `data:image/jpeg;base64,${photo.base64}`;
        setScannedImage(photo.uri);
        scanMutation.mutate({ image: base64Image });
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Erro', 'Não foi possível tirar a foto.');
    }
  };

  const getLactoseLevelColor = (level: string) => {
    switch (level) {
      case 'none':
        return Colors.success;
      case 'low':
        return '#FFA500';
      case 'medium':
        return '#FF8C00';
      case 'high':
        return Colors.error;
      default:
        return Colors.text.tertiary;
    }
  };

  const getLactoseLevelText = (level: string) => {
    switch (level) {
      case 'none':
        return 'Sem Lactose';
      case 'low':
        return 'Baixo';
      case 'medium':
        return 'Médio';
      case 'high':
        return 'Alto';
      default:
        return 'Desconhecido';
    }
  };

  if (showCamera && cameraPermission?.granted) {
    let cameraRef: any = null;

    return (
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing="back"
          ref={(ref: any) => (cameraRef = ref)}
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cameraFooter}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={() => handleCapture(cameraRef)}
                disabled={scanMutation.isPending}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {scanMutation.isPending && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Analisando produto...</Text>
          </View>
        </View>
      )}

      {scanResult ? (
        <View style={styles.resultContainer}>
          {scannedImage && (
            <Image source={{ uri: scannedImage }} style={styles.resultImage} />
          )}

          <View style={styles.resultCard}>
            <View style={[styles.statusBadge, { backgroundColor: scanResult.safeForConsumption ? Colors.success + '20' : Colors.error + '20' }]}>
              {scanResult.safeForConsumption ? (
                <CheckCircle size={24} color={Colors.success} strokeWidth={2.5} />
              ) : (
                <XCircle size={24} color={Colors.error} strokeWidth={2.5} />
              )}
              <Text style={[styles.statusText, { color: scanResult.safeForConsumption ? Colors.success : Colors.error }]}>
                {scanResult.safeForConsumption ? 'Seguro para Consumo' : 'Contém Lactose'}
              </Text>
            </View>

            <Text style={styles.productName}>{scanResult.productName}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nível de Lactose:</Text>
              <View style={[styles.levelBadge, { backgroundColor: getLactoseLevelColor(scanResult.lactoseLevel) + '20' }]}>
                <Text style={[styles.levelText, { color: getLactoseLevelColor(scanResult.lactoseLevel) }]}>
                  {getLactoseLevelText(scanResult.lactoseLevel)}
                </Text>
              </View>
            </View>

            {scanResult.lactoseIngredients.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Ingredientes com Lactose:</Text>
                {scanResult.lactoseIngredients.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientItem}>
                    <AlertCircle size={16} color={Colors.error} strokeWidth={2} />
                    <Text style={styles.ingredientText}>{ingredient}</Text>
                  </View>
                ))}
              </View>
            )}

            {scanResult.alternatives.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Alternativas Sugeridas:</Text>
                {scanResult.alternatives.map((alternative, index) => (
                  <View key={index} style={styles.alternativeItem}>
                    <CheckCircle size={16} color={Colors.success} strokeWidth={2} />
                    <Text style={styles.alternativeText}>{alternative}</Text>
                  </View>
                ))}
              </View>
            )}

            {scanResult.warning && (
              <View style={styles.warningBox}>
                <AlertCircle size={20} color={Colors.warning} strokeWidth={2} />
                <Text style={styles.warningText}>{scanResult.warning}</Text>
              </View>
            )}

            <View style={styles.confidenceRow}>
              <Text style={styles.confidenceLabel}>Confiança da análise:</Text>
              <Text style={styles.confidenceValue}>{scanResult.confidence}%</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.scanAgainButton}
            onPress={() => {
              setScanResult(null);
              setScannedImage(null);
            }}
          >
            <Text style={styles.scanAgainText}>Escanear Outro Produto</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.iconGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Scan size={64} color={Colors.surface} strokeWidth={2} />
          </LinearGradient>
        </View>

        <Text style={styles.title}>Scanner de Produtos</Text>
        <Text style={styles.description}>
          Escaneie códigos de barras ou tire fotos de produtos para verificar se
          contêm lactose e o nível de lactose presente
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Scan size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Scan de Código de Barras</Text>
              <Text style={styles.featureDescription}>
                Identifique produtos instantaneamente
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Camera size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Análise por Foto</Text>
              <Text style={styles.featureDescription}>
                Tire foto do rótulo para análise
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Info size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Nível de Lactose</Text>
              <Text style={styles.featureDescription}>
                Veja a quantidade exata de lactose
              </Text>
            </View>
          </View>
        </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={handleTakePhoto}>
              <LinearGradient
                colors={Colors.gradient.primary}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Camera size={24} color={Colors.surface} strokeWidth={2.5} />
                <Text style={styles.primaryButtonText}>Tirar Foto</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8} onPress={handlePickImage}>
              <Scan size={24} color={Colors.primary} strokeWidth={2.5} />
              <Text style={styles.secondaryButtonText}>Escolher da Galeria</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBox}>
            <Info size={20} color={Colors.primary} strokeWidth={2} />
            <Text style={styles.infoText}>
              Tire uma foto clara do rótulo do produto para melhor análise
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start' as const,
  },
  closeButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: '600' as const,
  },
  cameraFooter: {
    position: 'absolute' as const,
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center' as const,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderWidth: 4,
    borderColor: Colors.primary,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
  },
  loadingOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 1000,
  },
  loadingCard: {
    backgroundColor: Colors.surface,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center' as const,
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  resultContainer: {
    padding: 20,
  },
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },
  resultCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  statusBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700' as const,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  levelBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '700' as const,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  ingredientItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.error + '10',
    borderRadius: 8,
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: Colors.text.primary,
    flex: 1,
  },
  alternativeItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.success + '10',
    borderRadius: 8,
    marginBottom: 8,
  },
  alternativeText: {
    fontSize: 14,
    color: Colors.text.primary,
    flex: 1,
  },
  warningBox: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    backgroundColor: Colors.warning + '20',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  confidenceRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  confidenceLabel: {
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  confidenceValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  scanAgainButton: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center' as const,
  },
  scanAgainText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center' as const,
  },
  iconWrapper: {
    marginBottom: 32,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'center' as const,
  },
  description: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  featureItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 20,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '30',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.text.tertiary,
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden' as const,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 18,
    gap: 12,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
  secondaryButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.primary,
    gap: 12,
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.primary,
  },
  infoBox: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.primaryLight + '20',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 24,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
