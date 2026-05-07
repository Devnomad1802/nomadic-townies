import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';

const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export function useTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const data = await client.fetch(`*[_type == "trip"] | order(order asc)`);
        setTrips(data);
      } catch (err) {
        console.error('Sanity fetch error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, []);

  return { trips, loading, error };
}
