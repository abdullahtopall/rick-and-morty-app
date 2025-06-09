import React from 'react';
import './App.css';
import CharacterTable from './components/CharacterTable';
import CharacterDetail from './components/CharacterDetail';
import CharacterFilters from './components/CharacterFilters';
import Pagination from './components/Pagination';
import useCharacters from './hooks/useCharacters';

function App() {
  const {
    characters,
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
  } = useCharacters();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Rick and Morty Characters</h1>
      </header>

      <main className="app-main">
        <div className="app-filters">
          <CharacterFilters
            onApplyFilters={updateFilters}
            currentFilters={filters}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="table-section">
          <CharacterTable
            characters={characters}
            loading={loading}
            sortConfig={sortConfig}
            onSort={sortBy}
            onSelectCharacter={selectCharacter}
          />

          {!loading && characters.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
              pageSize={pageSize}
              onPageSizeChange={changePageSize}
              totalItems={totalItems}
            />
          )}
        </div>

        <div className="character-detail-section">
          <CharacterDetail character={selectedCharacter} />
        </div>
      </main>

      <footer className="app-footer">
        <p>Rick and Morty Character Database</p>
      </footer>
    </div>
  );
}

export default App; 