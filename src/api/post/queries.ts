import {
	getAllPosts,
	getPost,
	type GetAllPostsData,
	type GetPostData,
	type PaginatedResponsePostOut,
	type PostOut,
} from "../gen";
import { POST_QUERY_KEYS } from "./constants";

interface GetAllPostsQueryOptionsInterface {
	mosque_id: string;
	query?: GetAllPostsData["query"];
}

export const getAllPostsQueryOptions = ({
	mosque_id,
	query,
}: GetAllPostsQueryOptionsInterface) => {
	return {
		queryKey: POST_QUERY_KEYS.all(mosque_id, query),
		queryFn: async (): Promise<PaginatedResponsePostOut> => {
			try {
				const response = await getAllPosts({
					path: { mosque_id },
					query,
				});
				if (!response.data) {
					throw new Error("No posts data returned");
				}
				return response.data;
			} catch (error) {
				console.error("Error fetching posts:", error);
				throw error;
			}
		},
		enabled: Boolean(mosque_id),
	};
};

interface GetPostByIdQueryOptionsInterface {
	post_id: string;
	query?: GetPostData["query"];
}

export const getPostByIdQueryOptions = ({
	post_id,
	query,
}: GetPostByIdQueryOptionsInterface) => {
	return {
		queryKey: POST_QUERY_KEYS.byId(post_id, query),
		queryFn: async (): Promise<PostOut> => {
			try {
				const response = await getPost({
					path: { post_id },
					query,
				});
				if (!response.data) {
					throw new Error("No post data returned");
				}
				return response.data;
			} catch (error) {
				console.error(`Error fetching post with id ${post_id}:`, error);
				throw error;
			}
		},
		enabled: Boolean(post_id),
		staleTime: 3600,
	};
};
