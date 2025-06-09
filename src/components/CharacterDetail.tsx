import React from 'react';
import { Character } from '../types';

interface CharacterDetailProps {
  character: Character | null;
}

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
  if (!character) {
    return <div className="character-detail-placeholder">Select a character to view details</div>;
  }

  return (
    <div className="character-detail">
      <div className="character-detail-header">
        <img src={character.image} alt={character.name} className="character-image" />
        <div className="character-info">
          <h2>{character.name}</h2>
          <div className="character-status">
            <span className={`status-indicator ${character.status.toLowerCase()}`}></span>
            {character.status} - {character.species}
          </div>
        </div>
      </div>

      <div className="character-detail-body">
        <div className="detail-row">
          <div className="detail-label">Gender:</div>
          <div className="detail-value">{character.gender}</div>
        </div>
        
        {character.type && (
          <div className="detail-row">
            <div className="detail-label">Type:</div>
            <div className="detail-value">{character.type}</div>
          </div>
        )}
        
        <div className="detail-row">
          <div className="detail-label">Origin:</div>
          <div className="detail-value">{character.origin.name}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Location:</div>
          <div className="detail-value">{character.location.name}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Episodes:</div>
          <div className="detail-value">{character.episode.length}</div>
        </div>

        <div className="detail-row">
          <div className="detail-label">Created:</div>
          <div className="detail-value">{new Date(character.created).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail; 