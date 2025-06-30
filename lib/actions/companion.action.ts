"use server"

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";

export const createCompanion = async(formData:CreateCompanion)=>{
  const { userId :author} = await auth();
  const supabase = createSupabaseClient();

  if (!author) {
    throw new Error("User not authenticated.");
  }

  const { data , error } = await supabase
      .from("companion")
      .insert({ ...formData,author})
      .select();

      if (error) {
          console.error("Supabase error during companion creation:", error); // For debugging: will show in your terminal
          throw new Error(error.message || "Failed to create a companion due to a database error.");
      }

      // This block only runs if 'error' is null/undefined.
      // We then check if 'data' is unexpectedly empty.
      if (!data || data.length === 0) {
          throw new Error("No data returned after successful companion creation.");
      }

  return data[0];
}