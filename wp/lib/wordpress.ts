import axios from 'axios';
import { WordPressPost } from '@/types/wordpress';

const WORDPRESS_API_URL = 'http://localhost:8000/wp-json/wp/v2';

export const getPosts = async (): Promise<WordPressPost[]> => {

  const response = await axios.get(`${WORDPRESS_API_URL}/posts`, {
    params: {
      _embed: true,
      per_page: 10,
    },
  });

  return response.data;
};

export const getPost = async (id: number): Promise<WordPressPost> => {
  const response = await axios.get(`${WORDPRESS_API_URL}/blog/${id}`, {
    params: {
      _embed: true,
    },
  });

  return response.data;
};