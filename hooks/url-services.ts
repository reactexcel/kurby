import { createClient } from "@supabase/supabase-js";
// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "");

export const fetchingUrl = async (preset: String, place_id: String) => {
  const { data, error } = await supabase.from("urls").select().eq("preset", preset).eq("place_id", place_id);
  if (error) {
    // console.log(error)
    return [];
  }
  if (!data) {
    return [];
  }
  return data;
};

export const fetchingUrlByPlaceId = async (preset: String, place_id: String) => {
  const { data, error } = await supabase.from("urls").select().eq("place_id", place_id);
  if (error) {
    //console.log(error)
    return [];
  }
  if (!data) {
    return [];
  }
  return data;
};

export const upsertDataForUrl = async (preset: string, place_id: string, URL: string, seo_title: any | null, cache: any, city: string | null, country: string | null) => {
  if (!cache) return;
  if (!cache[`${preset}`]) return;
  if (preset === "living" && (!cache.living.explainedLikeAlocal || !cache.living.redFlags || !cache.living.greenFlags)) return;
  if ((city && !city.match(/^[a-zA-Z1-9.?!:,;\- ]+$/g)) || (country && !country.match(/^[a-zA-Z1-9.?!:,;\- ]+$/g))) {
    if (preset === "living") {
      if (cache.living.explainedLikeAlocal.search(city) > -1 || cache.living.explainedLikeAlocal.search(country) > -1) return;
      if (cache.living.redFlags.search(city) > -1 || cache.living.redFlags.search(country) > -1) return;
      if (cache.living.greenFlags.search(city) > -1 || cache.living.greenFlags.search(country) > -1) return;
    } else if (cache[`${preset}`].search(city) > -1 || cache[`${preset}`].search(country) > -1) return;
  }
  const { data, error } = await supabase.from("urls").select().eq("preset", preset).eq("place_id", place_id);
  if (error) {
    console.log(error);
    return [];
  }
  if (data && data.length > 0) return;
  try {
    await supabase.from("urls").insert({ preset: preset, place_id: place_id, url: URL, seo_title: seo_title?.title, cache: cache });
  } catch (err) {
    console.log(err);
    return [];
  }

  if (error) {
    // console.log(error, "error")
  }
  return data;
};

export const deleteDataForUrl = async (preset: String, place_id: String) => {
  const { data, error } = await supabase.from("urls").delete().eq("preset", preset).eq("place_id", place_id);
};
