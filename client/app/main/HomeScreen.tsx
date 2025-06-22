import { COLORS } from "@/constant/global-colors";
import { RootStackParamList } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>
            🥊 복싱 커뮤니티에 오신 것을 환영합니다!
          </Text>
          <Text style={styles.welcomeText}>
            최신 복싱 소식과 정보를 공유하세요.
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>128</Text>
            <Text style={styles.statLabel}>오늘 방문자</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>새 글</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>인기 글</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>인기 게시글</Text>
        <View style={styles.popularPosts}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.postCard}
              onPress={() => navigation.navigate("PostDetail", { id: item })}
            >
              <Text style={styles.postTitle}>
                복싱 초보자를 위한 팁 #{item}
              </Text>
              <Text style={styles.postExcerpt}>
                복싱을 처음 시작하는 분들을 위한 유용한 정보입니다...
              </Text>
              <View style={styles.postMeta}>
                <Text style={styles.postAuthor}>복싱마스터</Text>
                <Text style={styles.postDate}>2시간 전</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>공지사항</Text>
        <View style={styles.noticeContainer}>
          <TouchableOpacity style={styles.noticeItem}>
            <Text style={styles.noticeTitle}>커뮤니티 이용 규칙 안내</Text>
            <Text style={styles.noticeDate}>2025.06.20</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noticeItem}>
            <Text style={styles.noticeTitle}>6월 복싱 이벤트 안내</Text>
            <Text style={styles.noticeDate}>2025.06.15</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  // header: {
  //   backgroundColor: "#2a2a2a",
  //   padding: 16,
  //   alignItems: "center",
  // },
  // headerTitle: {
  //   fontSize: 22,
  //   fontWeight: "bold",
  //   color: "#ffffff",
  // },
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  welcomeText: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#333",
  },
  popularPosts: {
    marginBottom: 20,
  },
  postCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  postExcerpt: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  postMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postAuthor: {
    fontSize: 12,
    color: "#888",
  },
  postDate: {
    fontSize: 12,
    color: "#888",
  },
  noticeContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noticeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  noticeTitle: {
    fontSize: 14,
    color: "#333",
  },
  noticeDate: {
    fontSize: 12,
    color: "#888",
  },
});
