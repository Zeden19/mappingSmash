import {GOOGLE_MAPS_API_KEY} from "$env/static/private";
import {SMASH_GG_API_KEY} from "$env/static/private";
import {SUPABASE_KEY} from "$env/static/private";
import {supabase} from "$lib/supabaseClient";


export async function load({cookies}) {
    const {data} = await supabase.from("tournaments").select();
    // const {data} = await supabase.channel('custom-insert-channel')
    //     .on(
    //         'postgres_changes',
    //         {event: 'INSERT', schema: 'public', table: 'tournaments'},
    //         (payload) => {
    //             console.log('Change received!', payload)
    //         }
    //     ).subscribe()

    // cookie stuff
    let geolocated = cookies.get('geolocated');
    const visited = cookies.get('visited');

    if (geolocated === undefined) {
        cookies.set('geolocated', 0, {path: '/'});
    }

    if (visited === undefined) {
        cookies.set('visited', 0, {path: '/'});
    }

    return {
        geolocated,
        visited,
        GOOGLE_MAPS_API_KEY,
        SMASH_GG_API_KEY,
        SUPABASE_KEY,
        tournaments: data,
    };
}