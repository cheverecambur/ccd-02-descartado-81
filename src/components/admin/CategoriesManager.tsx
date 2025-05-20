
import React, { useState } from "react";
import { Edit, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CategoryInfo } from "@/types/blog";
import { useBlogAdmin } from "@/hooks/useBlogAdmin";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  id: z.string().min(1, "El ID es obligatorio"),
  name: z.string().min(1, "El nombre es obligatorio"),
  count: z.number(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoriesManager = () => {
  const { categories, updateCategory } = useBlogAdmin();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      count: 0,
    },
  });

  // Open the dialog to edit a category
  const handleEditCategory = (category: CategoryInfo) => {
    setSelectedCategory(category);
    form.reset({
      id: category.id,
      name: category.name,
      count: category.count,
    });
    setOpen(true);
  };

  // Open the dialog to create a new category
  const handleNewCategory = () => {
    setSelectedCategory(null);
    form.reset({
      id: "",
      name: "",
      count: 0,
    });
    setOpen(true);
  };

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      await updateCategory(values);
      toast({
        title: selectedCategory ? "Categoría actualizada" : "Categoría creada",
        description: `La categoría ha sido ${selectedCategory ? "actualizada" : "creada"} exitosamente.`,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error saving category", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la categoría.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Categorías</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={handleNewCategory}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Categoría
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedCategory ? "Editar Categoría" : "Nueva Categoría"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="categoria-nombre" 
                          {...field} 
                          disabled={!!selectedCategory}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de la categoría" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedCategory && (
                  <FormField
                    control={form.control}
                    name="count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contador</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={e => field.onChange(parseInt(e.target.value))} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <DialogFooter>
                  <Button type="submit">Guardar</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Artículos</th>
                <th className="w-20 px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {categories.map((category) => (
                <tr 
                  key={category.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-4 py-3 font-mono text-xs">{category.id}</td>
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3">{category.count}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        disabled={category.id === "all"}
                        onClick={() => {
                          toast({
                            title: "Acción no implementada",
                            description: "La eliminación de categorías estará disponible próximamente.",
                          });
                        }}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default CategoriesManager;
