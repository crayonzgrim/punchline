import { COLORS } from "@/constant/global-colors";
import { RootStackParamList } from "@/types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PostItem {
  id: string;
  title: string;
  author: string;
  date: string;
  views: number;
  comments: number;
  isNotice: boolean;
}

const TABS = {
  ALL: "all",
  GENERAL: "general",
  NOTICE: "notice",
} as const;
type ActiveTabType = (typeof TABS)[keyof typeof TABS];

const DUMMY_POSTS: PostItem[] = [
  {
    id: "1",
    title: "복싱 초보자 질문입니다",
    author: "링위의전사",
    date: "2025.06.21",
    views: 128,
    comments: 15,
    isNotice: false,
  },
  {
    id: "2",
    title: "[공지] 커뮤니티 이용 규칙 안내",
    author: "관리자",
    date: "2025.06.20",
    views: 356,
    comments: 0,
    isNotice: true,
  },
  {
    id: "3",
    title: "오늘 경기 본 사람?",
    author: "복싱매니아",
    date: "2025.06.21",
    views: 89,
    comments: 7,
    isNotice: false,
  },
  {
    id: "4",
    title: "복싱 장갑 추천 부탁드립니다",
    author: "초보복서",
    date: "2025.06.20",
    views: 112,
    comments: 23,
    isNotice: false,
  },
  {
    id: "5",
    title: "[공지] 6월 복싱 이벤트 안내",
    author: "관리자",
    date: "2025.06.15",
    views: 278,
    comments: 5,
    isNotice: true,
  },
  {
    id: "6",
    title: "복싱 다이어트 효과 있나요?",
    author: "다이어터",
    date: "2025.06.19",
    views: 201,
    comments: 18,
    isNotice: false,
  },
  {
    id: "7",
    title: "복싱 체육관 추천해주세요 (서울)",
    author: "서울복서",
    date: "2025.06.18",
    views: 156,
    comments: 12,
    isNotice: false,
  },
  {
    id: "8",
    title: "복싱 기술 연습 팁",
    author: "복싱코치",
    date: "2025.06.17",
    views: 245,
    comments: 9,
    isNotice: false,
  },
];

export default function BoardScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [activeTab, setActiveTab] = useState<ActiveTabType>(TABS.ALL); // 'all', 'general', 'notice'
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = DUMMY_POSTS.filter((post) => {
    if (activeTab === "all") return true;
    if (activeTab === "notice") return post.isNotice;
    if (activeTab === "general") return !post.isNotice;
    return true;
  }).filter((post) => {
    if (searchQuery.trim() === "") return true;
    return post.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderPostItem = ({ item }: { item: PostItem }) => {
    return (
      <TouchableOpacity style={styles.postItem}>
        <View style={styles.postHeader}>
          <Text style={[styles.postTitle, item.isNotice && styles.noticeTitle]}>
            {item.title}
          </Text>
        </View>
        <View style={styles.postFooter}>
          <Text style={styles.postAuthor}>{item.author}</Text>
          <View style={styles.postStats}>
            <Text style={styles.postDate}>{item.date}</Text>
            <View style={styles.statsContainer}>
              <Ionicons name="eye-outline" size={14} color="#888" />
              <Text style={styles.statsText}>{item.views}</Text>
            </View>
            <View style={styles.statsContainer}>
              <Ionicons name="chatbubble-outline" size={14} color="#888" />
              <Text style={styles.statsText}>{item.comments}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>게시판</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="게시글 검색"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === TABS.ALL && styles.activeTab]}
          onPress={() => setActiveTab(TABS.ALL)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === TABS.ALL && styles.activeTabText,
            ]}
          >
            전체글
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === TABS.GENERAL && styles.activeTab]}
          onPress={() => setActiveTab(TABS.GENERAL)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === TABS.GENERAL && styles.activeTabText,
            ]}
          >
            게시글
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === TABS.NOTICE && styles.activeTab]}
          onPress={() => setActiveTab(TABS.NOTICE)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === TABS.NOTICE && styles.activeTabText,
            ]}
          >
            공지글
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderPostItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={styles.writeButton}
        onPress={() => navigation.navigate("WritePost")}
      >
        <Ionicons name="create" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#2a2a2a",
    padding: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  postItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  postHeader: {
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  noticeTitle: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postAuthor: {
    fontSize: 14,
    color: "#555",
  },
  postStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  postDate: {
    fontSize: 12,
    color: "#888",
    marginRight: 12,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  statsText: {
    fontSize: 12,
    color: "#888",
    marginLeft: 4,
  },
  writeButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
