import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { FormSectionCard } from './FormSectionCard';

interface ProfilePhotoSectionProps {
  photo?: string;
  onPhotoChange: (photo: string) => void;
}

export const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({
  photo,
  onPhotoChange,
}) => {
  const processPickedAsset = (asset: ImagePicker.ImagePickerAsset) => {
    if (asset.base64) {
      const mime = asset.mimeType || 'image/jpeg';
      onPhotoChange(`data:${mime};base64,${asset.base64}`);
    } else if (asset.uri) {
      onPhotoChange(asset.uri);
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Photo Permission',
          'Please allow photo gallery access in your device settings to select a profile photo.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        processPickedAsset(result.assets[0]);
      }
    } catch (err: any) {
      console.error('[ProfilePhotoSection Gallery Error]:', err);
      if (Platform.OS === 'web') {
        triggerWebFileInput();
      } else {
        Alert.alert('Upload Error', 'Could not open the photo gallery. Please try again.');
      }
    }
  };

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Permission',
          'Please allow camera access in your device settings to take a profile photo.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        processPickedAsset(result.assets[0]);
      }
    } catch (err: any) {
      console.error('[ProfilePhotoSection Camera Error]:', err);
      Alert.alert('Camera Error', 'Could not open camera. Please try again.');
    }
  };

  const triggerWebFileInput = () => {
    if (typeof document === 'undefined') return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) {
            onPhotoChange(result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handlePickPhoto = () => {
    if (Platform.OS === 'web') {
      triggerWebFileInput();
      return;
    }

    // On mobile devices (Android / iOS): Show camera vs gallery option dialog
    Alert.alert(
      'Profile Photo',
      'Choose an option:',
      [
        { text: 'Choose from Gallery', onPress: handlePickFromGallery },
        { text: 'Take Photo', onPress: handleTakePhoto },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleRemovePhoto = () => {
    onPhotoChange('');
  };

  return (
    <FormSectionCard
      title="Profile Photo"
      iconName="image-outline"
      description="Portrait photo shown in templates with portrait frames"
      defaultOpen={true}
    >
      <View style={styles.container}>
        {/* Photo Preview Circle / Frame */}
        <View style={styles.previewWrap}>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={styles.photoPreview}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderAvatar}>
              <Ionicons name="person" size={38} color="#94A3B8" />
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionColumn}>
          <Pressable
            id="upload-profile-photo-btn"
            onPress={handlePickPhoto}
            style={({ pressed }) => [styles.uploadBtn, pressed && { opacity: 0.85 }]}
            accessibilityRole="button"
            accessibilityLabel={photo ? 'Change profile photo' : 'Upload profile photo'}
          >
            <Ionicons name="camera-outline" size={17} color="#FFFFFF" />
            <Text style={styles.uploadBtnText}>
              {photo ? 'Change Photo' : 'Upload Photo'}
            </Text>
          </Pressable>

          {photo ? (
            <Pressable
              id="remove-profile-photo-btn"
              onPress={handleRemovePhoto}
              style={({ pressed }) => [styles.removeBtn, pressed && { opacity: 0.8 }]}
              accessibilityRole="button"
              accessibilityLabel="Remove photo"
            >
              <Ionicons name="trash-outline" size={15} color="#DC2626" />
              <Text style={styles.removeBtnText}>Remove Photo</Text>
            </Pressable>
          ) : (
            <Text style={styles.tipText}>
              PNG or JPEG · 3:4 portrait looks best
            </Text>
          )}
        </View>
      </View>
    </FormSectionCard>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 6,
  },
  previewWrap: {
    width: 78,
    height: 98,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  placeholderAvatar: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  actionColumn: {
    flex: 1,
    gap: 8,
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#047857',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    minHeight: 44,
    gap: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  uploadBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  removeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
    minHeight: 36,
    gap: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  removeBtnText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },
  tipText: {
    fontSize: 12,
    color: '#64748B',
  },
});
