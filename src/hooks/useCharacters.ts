import { useState, useEffect, useMemo } from 'react';
import { Character, CharacterFilters, SortConfig } from '../types';
import { fetchCharacters } from '../services/api';

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc'
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Fetch characters when filters, page, or page size changes
  useEffect(() => {
    const getCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchCharacters(currentPage, filters, pageSize);
        setCharacters(response.results);
        setTotalPages(response.info.pages);
        setTotalItems(response.info.count);
      } catch (err) {
        setError('Failed to fetch characters. Please try again.');
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, [currentPage, filters, pageSize]);

  // Apply sorting to the characters
  const sortedCharacters = useMemo(() => {
    if (!sortConfig.key) return characters;

    return [...characters].sort((a, b) => {
      // Handle nested properties
      let aValue: any;
      let bValue: any;

      if (sortConfig.key === 'origin' || sortConfig.key === 'location') {
        aValue = a[sortConfig.key].name;
        bValue = b[sortConfig.key].name;
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [characters, sortConfig]);

  // Update filters
  const updateFilters = (newFilters: CharacterFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Update sort configuration
  const sortBy = (key: keyof Character) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Change page
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  // Change page size
  const changePageSize = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Select a character
  const selectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  return {
    characters: sortedCharacters,
    loading,
    error,
    filters,
    updateFilters,
    sortConfig,
    sortBy,
    currentPage,
    totalPages,
    changePage,
    pageSize,
    changePageSize,
    totalItems,
    selectedCharacter,
    selectCharacter
  };
};

export default useCharacters; 