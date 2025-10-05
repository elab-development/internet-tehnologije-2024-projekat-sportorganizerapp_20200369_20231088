import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Hook učitava informacije o poznatim sportistima.
 * - sport i slika: TheSportsDB (preko AllOrigins da izbegnemo CORS)
 * - opis: Wikipedia REST Summary API (ima CORS, direktno iz browsera)
 *
 * @param {string[]} names – lista imena sportista
 * @returns {{ data: Array<{name:string, sport:string, image:string|null, description:string}>, loading: boolean, error: string|null }}
 */
const useFamousSportsman = (names = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!names || names.length === 0) {
      setData([]);
      setLoading(false);
      return;
    }

    let isMounted = true;

    const truncate = (txt, n = 220) =>
      typeof txt === "string" && txt.length > n ? txt.slice(0, n - 1) + "…" : txt;

    // SportsDB (preko AllOrigins proxyja zbog CORS-a)
    const fetchSportsDB = async (name) => {
      try {
        const apiUrl = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(
          name
        )}`;
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`;
        const res = await axios.get(proxyUrl);
        const p = res.data?.player?.[0];
        if (!p) return { name, sport: "", image: null };
        return {
          name: p.strPlayer || name,
          sport: p.strSport || "",
          image: p.strThumb || p.strCutout || p.strRender || null,
        };
      } catch {
        return { name, sport: "", image: null };
      }
    };

    // Wikipedia REST Summary (ima CORS: Access-Control-Allow-Origin: *)
    const fetchWikiSummary = async (name) => {
      try {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          name.replace(/\s+/g, "_")
        )}`;
        const { data } = await axios.get(url, { headers: { Accept: "application/json" } });
        // Ako je disambiguation ili nema extract, fallback će se aktivirati
        if (data?.extract && data?.type !== "disambiguation") {
          return truncate(data.extract);
        }
        // Fallback na MediaWiki API (ponekad bolje pogodi naslov)
        const url2 = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&format=json&origin=*&titles=${encodeURIComponent(
          name
        )}`;
        const { data: d2 } = await axios.get(url2);
        const pages = d2?.query?.pages;
        const first = pages ? d2.query.pages[Object.keys(pages)[0]] : null;
        return first?.extract ? truncate(first.extract) : null;
      } catch {
        return null;
      }
    };

    const fetchOne = async (name) => {
      // Povuci paralelno
      const [sports, wikiDesc] = await Promise.all([
        fetchSportsDB(name),
        fetchWikiSummary(name),
      ]);

      return {
        name: sports.name || name,
        sport: sports.sport || "",
        image: sports.image || null,
        description: wikiDesc || "Nema opisa.",
      };
    };

    const run = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(names.map((n) => fetchOne(n)));
        if (isMounted) {
          setData(results);
          setError(null);
        }
      } catch (e) {
        if (isMounted) setError("Greška pri učitavanju podataka.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    run();
    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(names)]); // stabilna zavisnost

  return { data, loading, error };
};

export default useFamousSportsman;
