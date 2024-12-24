import React, { useState, useEffect, useRef, useCallback } from "react";
import Card from "../Card";

interface Pokemon {
  name: string;
  image?: string;
  // Add other properties if needed
}

interface VirtualizationGridProps {
  filteredPokemons: Pokemon[];
}

const VirtualizationGrid: React.FC<VirtualizationGridProps> = ({
  filteredPokemons,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<Pokemon[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20); // Initial range of visible items
  const [itemsPerRow, setItemsPerRow] = useState(2); // Default layout: 2 items per row on mobile

  const itemHeight = 250; // Height of a single card
  const containerHeight = 600; // Height of the visible container

  // Recalculate the number of items per row on resize
  const handleResize = useCallback(() => {
    const screenWidth = window.innerWidth;
    const newItemsPerRow = Math.max(
      2,
      Math.min(Math.floor(screenWidth / 200), 4)
    ); // At least 2, up to 4
    setItemsPerRow(newItemsPerRow);

    // Scroll to top whenever layout changes
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }

    // Re-render items
    setStartIndex(0);
    setEndIndex(newItemsPerRow * Math.ceil(containerHeight / itemHeight));
  }, [containerHeight, itemHeight]);

  // Initialize resize listener
  useEffect(() => {
    handleResize(); // Initial setup
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const visibleStartIndex =
        Math.floor(scrollTop / itemHeight) * itemsPerRow;
      const visibleEndIndex =
        visibleStartIndex +
        itemsPerRow * Math.ceil(containerHeight / itemHeight);

      setStartIndex(visibleStartIndex);
      setEndIndex(Math.min(visibleEndIndex, filteredPokemons.length));
    }
  }, [itemHeight, itemsPerRow, containerHeight, filteredPokemons.length]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize visible items on mount
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    setVisibleItems(filteredPokemons.slice(startIndex, endIndex));
  }, [startIndex, endIndex, filteredPokemons]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${containerHeight}px`, overflowY: "auto" }}
      className="relative border border-gray-300 bg-white rounded-md shadow-md"
    >
      <div
        style={{
          height: `${
            Math.ceil(filteredPokemons.length / itemsPerRow) * itemHeight
          }px`,
          position: "relative",
        }}
      >
        {visibleItems.map((pokemon, index) => (
          <div
            key={pokemon.name}
            style={{
              position: "absolute",
              top: `${
                Math.floor((startIndex + index) / itemsPerRow) * itemHeight
              }px`,
              left: `${
                ((startIndex + index) % itemsPerRow) * (100 / itemsPerRow)
              }%`,
              width: `calc(${100 / itemsPerRow}% - 16px)`, // Adjust width to add spacing
              margin: "8px", // Add spacing between items
            }}
            className="bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Card
              pokemon={{
                ...pokemon,
                image: pokemon.image || "",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizationGrid;
