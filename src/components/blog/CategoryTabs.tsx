
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryInfo } from "@/types/blog";
import { categories as allCategories } from "@/services/posts/categoriesService";

interface CategoryTabsProps {
  categories?: CategoryInfo[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  clearSearch: () => void;
  hasSearchResults: boolean;
}

export const CategoryTabs = ({
  categories = allCategories,
  activeCategory,
  setActiveCategory,
  clearSearch,
  hasSearchResults
}: CategoryTabsProps) => {
  // Use provided categories or fallback to all categories if empty array
  const categoriesToShow = categories.length > 0 ? categories : allCategories;
  
  return (
    <Tabs defaultValue={activeCategory} className="mb-10">
      <TabsList className="mb-4 bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-100 dark:border-gray-700">
        <TabsTrigger 
          key="all" 
          value="all"
          onClick={() => {
            setActiveCategory("all");
            if (hasSearchResults) {
              clearSearch();
            }
          }}
          className="data-[state=active]:bg-mining-100 dark:data-[state=active]:bg-mining-900/30 data-[state=active]:text-mining-700 dark:data-[state=active]:text-mining-400"
        >
          Todos
        </TabsTrigger>
        
        {categoriesToShow.map(category => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            onClick={() => {
              setActiveCategory(category.id);
              // Clear search results when changing category
              if (hasSearchResults) {
                clearSearch();
              }
            }}
            className="data-[state=active]:bg-mining-100 dark:data-[state=active]:bg-mining-900/30 data-[state=active]:text-mining-700 dark:data-[state=active]:text-mining-400"
          >
            {category.name} {category.count ? `(${category.count})` : ''}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        {/* The content will be provided by the parent component */}
      </TabsContent>
      
      {/* These TabsContent components are handled by the filtering logic in the parent */}
      {categoriesToShow.map(category => (
        <TabsContent key={category.id} value={category.id} className="mt-0"></TabsContent>
      ))}
    </Tabs>
  );
};
