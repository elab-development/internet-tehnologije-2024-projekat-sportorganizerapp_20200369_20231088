import { useEffect, useState } from "react";
import axios from "axios";

export function useImages(sport) {
  const [imageUrl, setImageUrl] = useState(null);

  // Mapa za prevod sportova sa srpskog na engleski
  const srToEnSport = {
    hokej: "hockey",
    kosarka: "basketball",
    vaterpolo: "water polo",
    fudbal: "soccer",
    ragbi: "rugby",
    "americki fudbal": "american football",
    "stoni tenis": "table tennis",
    badminton: "badminton",
    golf: "golf",
    kuglanje: "bowling",
    bilijar: "billiards",
    streljastvo: "shooting",
    atletika: "athletics",
    odbojka: "volleyball",
    rukomet: "handball",
    plivanje: "swimming",
    "skakanje u vodu": "diving",
    karate: "karate",
    dzudo: "judo",
    boks: "boxing",
    mma: "mma",
    rvanje: "wrestling",
  };

  useEffect(() => {
    async function fetchImage() {
      try {
        // Prevedi sport na engleski ako postoji u mapi, inače koristi originalni naziv
        const searchTerm = srToEnSport[sport.toLowerCase()] || sport;
        const res = await axios.get("https://api.pexels.com/v1/search", {
          headers: {
            Authorization: process.env.REACT_APP_PEXELS_API_KEY,
          },
          params: {
            query: searchTerm,
            per_page: 10,
          },
        });
        if (res.data.photos && res.data.photos.length > 0) {
          // Nasumično biramo jednu fotografiju
          const randomIndex = Math.floor(Math.random() * res.data.photos.length);
          setImageUrl(res.data.photos[randomIndex].src.medium);
        }
      } catch (error) {
        console.error("Greška pri učitavanju slike sa Pexels-a:", error);
      }
    }
    if (sport) {
      fetchImage();
    }
  }, [sport]);

  return imageUrl;
}
