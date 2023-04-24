import { DuoSearchPageContextProvider } from '../../contexts/DuoSearchPageContext';
import SearchBar from '../searchBar';
import SearchResults from '../searchResults';

export default function DuoSearchPage() {
  return (
    <section>
      <DuoSearchPageContextProvider>
        <SearchBar />
        <SearchResults />
      </DuoSearchPageContextProvider>
    </section>
  );
}
