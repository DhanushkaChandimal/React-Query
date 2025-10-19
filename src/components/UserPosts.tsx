import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUser = async (userId: number) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return response.data
};

const fetchPostsByUser = async (userId: number) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    return response.data;
};

const UserPosts = ({ userId }: { userId: number }) => {
    // Fetch user data
    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError,
        error: userError,
    } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUser(userId),
        enabled: !!userId,
    });
  
    // Fetch posts by user
    const {
        data: posts,
        isLoading: isPostsLoading,
        isError: isPostsError,
        error: postsError,
    } = useQuery({
        queryKey: ['posts', userId],
        queryFn: () => fetchPostsByUser(userId),
        enabled: !!userId && !!user, // Only fetch posts if user exists
    });
  
    // Handle loading states
    if (isUserLoading) return <p>Loading user data...</p>;
    if (isPostsLoading) return <p>Loading posts...</p>;
  
    // Handle error states
    if (isUserError) return <p>Error fetching user: {(userError as Error)?.message}</p>;
    if (isPostsError) return <p>Error fetching posts: {(postsError as Error)?.message}</p>;
  
    return (
      <div>
        <h1>{user?.name}'s Posts</h1>
        <ul>
            {posts?.map((post: { id: number; title: string }) => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
      </div>
    );
  };
  
  export default UserPosts;