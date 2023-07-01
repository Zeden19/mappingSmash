import { s as supabase } from "../../chunks/supabaseClient.js";
const GOOGLE_MAPS_API_KEY = "AIzaSyBQTYytps_bFbEmq3Q9eagQt3Biq7tzoYc";
const SMASH_GG_API_KEY = "9e7e72d29beb318d41a8bb1f2c5189cc";
async function load({ cookies }) {
  const { data } = await supabase.from("tournaments").select();
  let geolocated = cookies.get("geolocated");
  const visited = cookies.get("visited");
  if (geolocated === void 0) {
    cookies.set("geolocated", 0, { path: "/" });
  }
  if (visited === void 0) {
    cookies.set("visited", 0, { path: "/" });
  }
  return {
    geolocated,
    visited,
    GOOGLE_MAPS_API_KEY,
    SMASH_GG_API_KEY,
    tournaments: data
  };
}
export {
  load
};
