// 토큰에서 추출된 유저 정보 타입
export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}
