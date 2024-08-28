import BeslenmePageClient from './BeslenmePageClient'; 
import { generateMetadata } from './metadata'; 

export { generateMetadata }; 

export default function BeslenmePage() {
  return (
    <div>
      <BeslenmePageClient />
    </div>
  );
}
