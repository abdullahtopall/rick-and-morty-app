import axios from 'axios';
import { ApiResponse, CharacterFilters } from '../types';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (
  page: number = 1,
  filters: CharacterFilters = {},
  pageSize: number = 20
): Promise<ApiResponse> => {
  try {
    // Build the query parameters
    const params = new URLSearchParams();
    params.append('page', page.toString());
    
    // Add filters if they exist
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    
    const response = await axios.get<ApiResponse>(`${BASE_URL}/character/?${params.toString()}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      // Return empty results if no characters found
      return {
        info: {
          count: 0,
          pages: 0,
          next: null,
          prev: null
        },
        results: []
      };
    }
    throw error;
  }
};

export const fetchAllCharacters = async (limit: number = 250): Promise<ApiResponse['results']> => {
  try {
    const firstPage = await fetchCharacters(1);
    const totalPages = Math.min(Math.ceil(limit / 20), firstPage.info.pages);
    
    // We already have the first page results
    let allCharacters = [...firstPage.results];
    
    // Fetch remaining pages in parallel
    if (totalPages > 1) {
      const pagePromises: Promise<ApiResponse>[] = [];
      for (let i = 2; i <= totalPages; i++) {
        pagePromises.push(fetchCharacters(i));
      }
      
      const pages = await Promise.all(pagePromises);
      pages.forEach(page => {
        allCharacters = [...allCharacters, ...page.results];
      });
    }
    
    // Limit to the requested number
    return allCharacters.slice(0, limit);
  } catch (error) {
    console.error('Error fetching all characters:', error);
    throw error;
  }
}; 