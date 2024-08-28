import SearchResultsClient from './SearchResultsClient';
import { generateMetadata } from './metadata';

export { generateMetadata };

export default function SearchResultsPage({ searchParams }) {
  return <SearchResultsClient searchParams={searchParams} />;
}


