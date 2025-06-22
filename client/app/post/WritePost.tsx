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
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WritePostScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") {
      Alert.alert("알림", "제목을 입력해주세요.");
      return;
    }

    if (content.trim() === "") {
      Alert.alert("알림", "내용을 입력해주세요.");
      return;
    }

    Alert.alert("알림", "게시글이 등록되었습니다.", [
      {
        text: "확인",
        onPress: () => navigation.navigate("Board"),
      },
    ]);
  };

  const handleCancel = () => {
    if (title.trim() !== "" || content.trim() !== "") {
      Alert.alert(
        "작성 취소",
        "작성 중인 내용이 있습니다. 정말 취소하시겠습니까?",
        [
          { text: "계속 작성", style: "cancel" },
          { text: "취소", onPress: () => navigation.goBack() },
        ],
      );
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>취소</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>글쓰기</Text>
        <TouchableOpacity
          style={[
            styles.submitButton,
            title.trim() === "" || content.trim() === ""
              ? styles.disabledButton
              : null,
          ]}
          onPress={handleSubmit}
          disabled={title.trim() === "" || content.trim() === ""}
        >
          <Text
            style={[
              styles.submitButtonText,
              title.trim() === "" || content.trim() === ""
                ? styles.disabledButtonText
                : null,
            ]}
          >
            등록
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.titleInput}
          placeholder="제목을 입력하세요"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        <View style={styles.divider} />

        <TextInput
          style={styles.contentInput}
          placeholder="내용을 입력하세요"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="image-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="videocam-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="link-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="location-outline" size={24} color="#555" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolbarButton}>
          <Ionicons name="happy-outline" size={24} color="#555" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2a2a2a",
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButton: {
    paddingHorizontal: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  submitButton: {
    paddingHorizontal: 8,
  },
  submitButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
  disabledButtonText: {
    color: "#aaa",
  },
  content: {
    flex: 1,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "500",
    padding: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
    minHeight: 300,
  },
  toolbar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 8,
  },
  toolbarButton: {
    padding: 8,
    marginHorizontal: 4,
  },
});
