import api from "@/configs/axios.config";
import type { CommentSchema } from "@/schemas/comment.schema";

type postCommentRequestBody = {
  data: {
    articleId: number;
    content: string;
  };
};
export async function postComment(
  requestBody: postCommentRequestBody,
): Promise<CommentSchema> {
  const formattedRequestBody = {
    data: {
      article: requestBody.data.articleId,
      content: requestBody.data.content,
    },
  };

  console.log(formattedRequestBody, "TEST");
  const response = await api.post(`/api/comments`, formattedRequestBody);
  return response.data;
}
