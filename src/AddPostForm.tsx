import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

type NewPost = {
    title: string;
    body: string;
};

const createPost = async (newPost: NewPost) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    return response.data;
};

const AddPostForm = () => {
    const queryClient = useQueryClient();
    
    const { mutate, status, isSuccess, isError } = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const handleAddPost = () => {
        mutate({ title: 'New Post', body: 'This is a new post body.' });
    };

    return (
        <div>
            <input type="text" />
            <button onClick={handleAddPost}>Add Post</button>
            {status === 'pending' && <p>Adding post...</p>}
            {isError && <p>Error adding post</p>}
            {isSuccess && <p>Post added!</p>}
        </div>
    );
};

export default AddPostForm;