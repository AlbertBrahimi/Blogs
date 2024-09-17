import { Form, message } from 'antd';
import { useCreatePostMutation, useDeletePostMutation, useUpdatePostMutation, Post  } from '../generated/operations';

interface UsePostModalProps {
  authorId?: string;
  onClose: () => void;
  refetch?: () => void;
}

export const useCreatePost = ({ authorId, onClose, refetch }: UsePostModalProps) => {
  const [form] = Form.useForm();
  const [createPost] = useCreatePostMutation({
    onCompleted: () => {
      message.success('Post created successfully!');
      form.resetFields();
      if (refetch) {
        refetch();
      }
      onClose();
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
      message.error('Failed to create post. Please try again.');
    },
  });

  const handleCreatePost = (values: { title: string; content: string }) => {
    createPost({
      variables: { ...values, authorId: Number(authorId) },
    });
  };

  return { form, handleCreatePost };
};

interface UseDeletePostProps {
  refetch?: () => void;
}

export const useDeletePost = ({ refetch }: UseDeletePostProps) => {
  const [deletePost] = useDeletePostMutation({
    onCompleted: () => {
      refetch?.();
      message.success('Post deleted successfully');
    },
    onError: (error) => {
      console.error('Failed to delete post:', error);
      message.error('Failed to delete post. Please try again.');
    },
  });

  const handleDeletePost = (id: number) => {
    deletePost({ variables: { id } });
  };

  return { handleDeletePost };
};

interface UseUpdatePostProps {
  onClose: () => void;
  post: Post;
  refetch?: () => void;
}

export const useUpdatePost = ({ onClose, post, refetch }: UseUpdatePostProps) => {
  const [form] = Form.useForm();
  const [updatePost] = useUpdatePostMutation({
    onCompleted: () => {
      message.success('Post updated successfully');
      onClose();
      refetch?.();
    },
    onError: (err) => {
      message.error(`Error: ${err.message}`);
    },
  });

  const handleUpdatePost = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      updatePost({
        variables: {
          id: post.id!,
          title: values.title,
          content: values.content,
        },
      });
    } catch (error) {
      message.error('Please fill in all required fields');
    }
  };

  return { form, handleUpdatePost };
};
