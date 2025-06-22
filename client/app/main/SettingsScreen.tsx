import { COLORS } from "@/constant/global-colors";
import { RootStackParamList } from "@/types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        onPress: () => navigation.navigate("Signin"),
      },
    ]);
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    description: string,
    value: boolean,
    onValueChange: (value: boolean) => void,
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon as any} size={24} color="#555" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#ddd", true: COLORS.primary }}
        thumbColor="#fff"
      />
    </View>
  );

  const renderLinkItem = (icon: string, title: string, onPress: () => void) => (
    <TouchableOpacity style={styles.linkItem} onPress={onPress}>
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon as any} size={24} color="#555" />
      </View>
      <View style={styles.linkContent}>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#aaa" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>계정</Text>

          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profileImagePlaceholder}>P</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>사용자</Text>
              <Text style={styles.profileEmail}>user@example.com</Text>
            </View>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>수정</Text>
            </TouchableOpacity>
          </View>

          {/* {renderLinkItem("person-outline", "계정 정보", () => { })} */}
          {/* {renderLinkItem("shield-outline", "개인정보 및 보안", () => { })} */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>알림</Text>

          {renderSettingItem(
            "notifications-outline",
            "푸시 알림",
            "새 글, 댓글 등의 알림을 받습니다",
            pushNotifications,
            setPushNotifications,
          )}

          {renderSettingItem(
            "mail-outline",
            "이메일 알림",
            "중요 공지사항을 이메일로 받습니다",
            emailNotifications,
            setEmailNotifications,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 설정</Text>

          {renderSettingItem(
            "moon-outline",
            "다크 모드",
            "어두운 테마를 사용합니다",
            darkMode,
            setDarkMode,
          )}

          {renderSettingItem(
            "play-outline",
            "동영상 자동 재생",
            "Wi-Fi 연결 시 동영상을 자동으로 재생합니다",
            autoPlay,
            setAutoPlay,
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>지원</Text>

          {renderLinkItem("help-circle-outline", "도움말", () => { })}
          {renderLinkItem("information-circle-outline", "앱 정보", () => { })}
          {renderLinkItem("chatbubble-outline", "피드백 보내기", () => { })}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.primary} />
          <Text style={styles.logoutText}>로그아웃</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>버전 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 1,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImagePlaceholder: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  editProfileButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  editProfileText: {
    fontSize: 14,
    color: "#555",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: "#333",
  },
  settingDescription: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 1,
  },
  linkContent: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 24,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 8,
  },
  versionText: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
    marginBottom: 24,
  },
});
