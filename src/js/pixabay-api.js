import axios from 'axios';

const API_KEY = '21750958-271f4873848cc9d3a2fe2c382';
const BASE_URL = 'https://pixabay.com/api/';
export const PER_PAGE = 15;

export default async function getImagesByQuery(query, page = 1) {
  const { data } = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page,
    },
  });

  return data;
}
