"use client";
import AddCategoryButton from "@/app/components/AddCategoryButton";
import Category from "@/app/components/Category";
import StandardPage from "@/app/components/StandardPage";

const CategoriesPage = () => {
  return (
    <StandardPage>
      <h2 className="pt-4 text-4xl text-secondary-500 mb-4">Notas</h2>
      <div className="flex overflow-x-auto p-4 items-center gap-8 mb-4 mx-6">
        <AddCategoryButton onClick={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
      </div>
      <h2 className="pt-4 text-4xl text-secondary-500 mb-4">Tarefas</h2>
      <div className="flex overflow-x-auto p-4 mx-6 items-center gap-8">
        <AddCategoryButton onClick={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
        <Category name="Faculdade" color="#ff9000" onDelete={() => null} />
      </div>
    </StandardPage>
  );
};

export default CategoriesPage;
