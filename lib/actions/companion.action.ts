"use server"

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  if (!author) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("companion")
    .insert({ ...formData, author })
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


export const getAllCompanion = async ({ limit = 10, page = 1, subject, topic }: GetAllCompanions) => {
  const supabase = createSupabaseClient()
  let query = supabase.from("companion").select();

  if (subject && query) {
    query = query.ilike('subject', `%${subject}%`).or(`topic.ilike.%${topic}%,name.ilike.name.%${topic}%`)
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`)
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.name.%${topic}%`)
  }

  query = query.range((page - 1) * limit, page * limit - 1)

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  return companions;
}

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from('companion').select().eq("id", id)
  if (error) return console.log(error)

  return data[0];
}

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const {data,error} = await supabase.from("session_history").insert({
    companion_id:companionId,
    user_id:userId
  })

  if(error){
    throw new Error(error.message)
  }
  
  return data;
}

export const getRecentsSession = async (limit:10) =>{
  const supabase = createSupabaseClient();
  const {data , error } = await supabase.from("session_history").select(`companions:companion_id (*)`).order("created_at",{ascending:false}).limit(limit)

  if(error){
    throw new Error(error.message);
  }

  return data.map(({companions})=> companions)
}


export const getUserSession = async (userId:string,limit:number = 10) =>{
  const supabase = createSupabaseClient();
  const {data , error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq('user_id',userId)
    .order("created_at",{ascending:false})
    .limit(limit)

  if(error){
    throw new Error(error.message);
  }

  return data.map(({companions})=> companions)
}

export const getUserCompanion = async (userId:string) =>{
  const supabase = createSupabaseClient();
  const {data , error } = await supabase
    .from("companion")
    .select()
    .eq('author',userId)

  if(error){
    throw new Error(error.message);
  }

  return data;
}

export const newCompanionPermissions = async() =>{
  const { userId , has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;
  if(has({plan:"pro"})){
    return true;
  }else if(has({feature:"3_companion_limit"})){
    limit=3;
  }else if(has({feature:"10_companion_limit"})){
    limit=10;
  }

  const { data , error } = await supabase.from('companion').select("id",{count:"exact"}).eq("author",userId)

  if(error) throw new Error(error.message)

  const companionCount = data?.length;

  if(companionCount >= limit){
    return false;
  }else{
    return true;
  }
}