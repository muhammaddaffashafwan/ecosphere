import { useEffect } from 'react';
import $ from 'jquery';

export function useInitializeCarousel() {
  useEffect(() => {
    console.log("Carousel initialized");
    // Initialize the carousel when the component is mounted
    $('#partnersCarousel').carousel({
      interval: 3000,
      ride: 'carousel',
    });
  }, []); // Empty dependency array ensures it runs only once on mount
}
