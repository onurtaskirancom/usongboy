import CategoryPageClient from './CategoryPageClient'; 
import { generateMetadata } from './metadata'; 

export { generateMetadata }; 

export default function CategoryPage({ params }) {
  return (
    <div>
      <CategoryPageClient category={params.category} />
    </div>
  );
}
