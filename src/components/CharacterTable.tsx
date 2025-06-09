import React from 'react';
import { Character, SortConfig } from '../types';
import { FaSortUp, FaSortDown } from 'react-icons/fa';

interface CharacterTableProps {
  characters: Character[];
  loading: boolean;
  sortConfig: SortConfig;
  onSort: (key: keyof Character) => void;
  onSelectCharacter: (character: Character) => void;
}

const CharacterTable: React.FC<CharacterTableProps> = ({
  characters,
  loading,
  sortConfig,
  onSort,
  onSelectCharacter
}) => {
  const getSortIcon = (key: keyof Character) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  if (loading) {
    return <div className="loading">Loading characters...</div>;
  }

  if (characters.length === 0) {
    return <div className="no-results">No characters found matching your criteria.</div>;
  }

  return (
    <div className="table-container">
      <table className="character-table">
        <thead>
          <tr>
            <th onClick={() => onSort('id')}>
              ID {getSortIcon('id')}
            </th>
            <th onClick={() => onSort('name')}>
              Name {getSortIcon('name')}
            </th>
            <th onClick={() => onSort('status')}>
              Status {getSortIcon('status')}
            </th>
            <th onClick={() => onSort('species')}>
              Species {getSortIcon('species')}
            </th>
            <th onClick={() => onSort('gender')}>
              Gender {getSortIcon('gender')}
            </th>
            <th onClick={() => onSort('origin')}>
              Origin {getSortIcon('origin')}
            </th>
            <th onClick={() => onSort('location')}>
              Location {getSortIcon('location')}
            </th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr 
              key={character.id}
              onClick={() => onSelectCharacter(character)}
              className="character-row"
            >
              <td>{character.id}</td>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
              <td>{character.gender}</td>
              <td>{character.origin.name}</td>
              <td>{character.location.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable; 