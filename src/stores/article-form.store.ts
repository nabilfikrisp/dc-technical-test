import type { PostArticleSchema } from "@/schemas/article.schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ArticleFormState = {
  formState: PostArticleSchema;
  setFormState: (values: PostArticleSchema) => void;
  updateField: <K extends keyof PostArticleSchema>(
    field: K,
    value: PostArticleSchema[K],
  ) => void;
  resetFormState: () => void;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
};

const initialFormState: PostArticleSchema = {
  title: "",
  description: "",
  cover_image_url: "",
  categoryId: undefined,
};

const useArticleFormStore = create<ArticleFormState>()(
  persist(
    (set) => ({
      formState: initialFormState,
      setFormState: (values) => set({ formState: { ...values } }),
      updateField: (field, value) =>
        set((state) => ({ formState: { ...state.formState, [field]: value } })),
      resetFormState: () => set({ formState: initialFormState }),
      isUploading: false,
      setIsUploading: (isUploading) => set({ isUploading }),
    }),
    {
      name: "article-form",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ formState: state.formState }),
    },
  ),
);

export default useArticleFormStore;
