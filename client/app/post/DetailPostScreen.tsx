import { COLORS } from "@/constant/global-colors";
import { RootStackParamList } from "@/types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 임시 게시글 데이터
const DUMMY_POST = {
  id: "1",
  title: "복싱 초보자 질문입니다",
  content:
    "안녕하세요! 복싱을 시작한지 2주 정도 된 초보입니다. 기본기를 연습하고 있는데, 잽을 날릴 때 어깨가 아픈 느낌이 있습니다. 이게 정상인가요? 아니면 자세가 잘못된 건가요? 도움 부탁드립니다.",
  author: "링위의전사",
  date: "2025.06.21 14:32",
  views: 128,
  likes: 15,
  isNotice: false,
  comments: [
    {
      id: "c1",
      author: "복싱코치",
      content:
        "안녕하세요! 초보자분들이 자주 겪는 문제입니다. 잽을 날릴 때 어깨에 힘이 들어가서 그럴 수 있어요. 팔을 뻗을 때 어깨를 최대한 이완시키고, 몸통의 회전을 이용해보세요.",
      date: "2025.06.21 15:01",
      likes: 8,
    },
    {
      id: "c2",
      author: "복싱매니아",
      content:
        "저도 처음에 그랬어요. 연습하다 보면 좋아질 거예요. 무리하지 말고 천천히 연습하세요!",
      date: "2025.06.21 15:30",
      likes: 3,
    },
    {
      id: "c3",
      author: "프로복서",
      content:
        "스트레칭을 충분히 하고 시작하는 것도 중요합니다. 어깨와 팔 스트레칭을 10분 정도 하고 시작해보세요.",
      date: "2025.06.21 16:15",
      likes: 5,
    },
  ],
};

export default function DetailPostScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [commentText, setCommentText] = useState("");
  const [likedComments, setLikedComments] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  // 실제 구현에서는 route.params.id를 사용하여 해당 게시글을 가져옵니다
  const post = DUMMY_POST;

  const handleLikeComment = (commentId: string) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter((id) => id !== commentId));
    } else {
      setLikedComments([...likedComments, commentId]);
    }
  };

  const handleLikePost = () => {
    setIsLiked(!isLiked);
  };

  const handleSubmitComment = () => {
    if (commentText.trim() === "") return;

    // 실제 구현에서는 API를 통해 댓글을 저장합니다
    alert("댓글이 등록되었습니다.");
    setCommentText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>게시글</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.postHeader}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <View style={styles.postInfo}>
            <Text style={styles.postAuthor}>{post.author}</Text>
            <Text style={styles.postDate}>{post.date}</Text>
          </View>
          <View style={styles.postStats}>
            <View style={styles.statItem}>
              <Ionicons name="eye-outline" size={16} color="#888" />
              <Text style={styles.statText}>{post.views}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble-outline" size={16} color="#888" />
              <Text style={styles.statText}>{post.comments.length}</Text>
            </View>
          </View>
        </View>

        <View style={styles.postContent}>
          <Text style={styles.contentText}>{post.content}</Text>
        </View>

        <View style={styles.actionBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLikePost}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? COLORS.primary : COLORS.background}
            />
            <Text style={[styles.actionText, isLiked && styles.likedText]}>
              좋아요 {post.likes + (isLiked ? 1 : 0)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social-outline" size={24} color="#888" />
            <Text style={styles.actionText}>공유하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>
            댓글 {post.comments.length}개
          </Text>

          {post.comments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentDate}>{comment.date}</Text>
              </View>
              <Text style={styles.commentContent}>{comment.content}</Text>
              <View style={styles.commentActions}>
                <TouchableOpacity
                  style={styles.commentAction}
                  onPress={() => handleLikeComment(comment.id)}
                >
                  <Ionicons
                    name={
                      likedComments.includes(comment.id)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={16}
                    color={
                      likedComments.includes(comment.id)
                        ? COLORS.primary
                        : COLORS.background
                    }
                  />
                  <Text
                    style={[
                      styles.commentActionText,
                      likedComments.includes(comment.id) && styles.likedText,
                    ]}
                  >
                    {comment.likes +
                      (likedComments.includes(comment.id) ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.commentAction}>
                  <Ionicons name="chatbubble-outline" size={16} color="#888" />
                  <Text style={styles.commentActionText}>답글</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="댓글을 입력하세요"
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity
          style={[
            styles.commentSubmitButton,
            commentText.trim() === "" && styles.disabledButton,
          ]}
          onPress={handleSubmitComment}
          disabled={commentText.trim() === ""}
        >
          <Text style={styles.commentSubmitText}>등록</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  postHeader: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  postInfo: {
    flexDirection: "row",
    marginBottom: 8,
  },
  postAuthor: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginRight: 12,
  },
  postDate: {
    fontSize: 14,
    color: "#888",
  },
  postStats: {
    flexDirection: "row",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 4,
  },
  postContent: {
    backgroundColor: "#fff",
    padding: 16,
    minHeight: 200,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  actionBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: "#888",
    marginLeft: 6,
  },
  likedText: {
    color: COLORS.primary,
  },
  commentsSection: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  commentItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  commentDate: {
    fontSize: 12,
    color: "#888",
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginBottom: 12,
  },
  commentActions: {
    flexDirection: "row",
  },
  commentAction: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  commentActionText: {
    fontSize: 12,
    color: COLORS.background,
    marginLeft: 4,
  },
  commentInputContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  commentSubmitButton: {
    marginLeft: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  commentSubmitText: {
    color: "#fff",
    fontWeight: "500",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});
