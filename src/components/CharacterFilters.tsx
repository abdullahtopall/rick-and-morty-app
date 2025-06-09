import React, { useState } from 'react';
import { CharacterFilters as FilterType } from '../types';

interface CharacterFiltersProps {
  onApplyFilters: (filters: FilterType) => void;
  currentFilters: FilterType;
}

const statusOptions = ['', 'Alive', 'Dead', 'unknown'];
const genderOptions = ['', 'Female', 'Male', 'Genderless', 'unknown'];

const CharacterFilters: React.FC<CharacterFiltersProps> = ({
  onApplyFilters,
  currentFilters
}) => {
  const [filters, setFilters] = useState<FilterType>(currentFilters);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const handleReset = () => {
    const emptyFilters: FilterType = {};
    setFilters(emptyFilters);
    onApplyFilters(emptyFilters);
  };

  return (
    <div className="filters-container">
      <h3>Filter Characters</h3>
      <form onSubmit={handleSubmit} className="filters-form">
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={filters.name || ''}
              onChange={handleInputChange}
              placeholder="Filter by name"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="species">Species:</label>
            <input
              type="text"
              id="species"
              name="species"
              value={filters.species || ''}
              onChange={handleInputChange}
              placeholder="Filter by species"
            />
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={filters.status || ''}
              onChange={handleInputChange}
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>
                  {option || 'Any Status'}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={filters.gender || ''}
              onChange={handleInputChange}
            >
              {genderOptions.map(option => (
                <option key={option} value={option}>
                  {option || 'Any Gender'}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={filters.type || ''}
              onChange={handleInputChange}
              placeholder="Filter by type"
            />
          </div>
        </div>

        <div className="filter-actions">
          <button type="submit" className="filter-button apply">Apply Filters</button>
          <button type="button" className="filter-button reset" onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterFilters; 