import React, {useState, useEffect} from "react";
import ExCard from "./ExCard";
import ExSearch from "./ExSearch";
import axios from "axios";

const Ex = () => {
  const [exercises, setExercises] = useState([]);
  const [cards, setCards] = useState(9);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://exercisedb.p.rapidapi.com/exercises';
      const headers = {
        'X-RapidAPI-Key': 'cd5ab49dabmshfbc2b89df8be970p1029cejsn9ac539a73f76',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      };

      try {
        const response = await axios.get(url, { headers });
        setExercises(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

const loadMoreCards = () => {
  setCards(cards + 9); 
};

const handleSearch = (query) => {
  setSearchQuery(query);
};


useEffect(() => {
  const filteredResults = exercises.filter((exercise) =>
    exercise.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.bodyPart.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  setSearchResults(filteredResults);
}, [exercises, searchQuery]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 text-center">Exercise List</h1>
      
      <ExSearch onSearch={handleSearch} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.length > 0
          ? searchResults.slice(0, cards).map((exercise) => (
              <ExCard key={exercise.id} exercise={exercise} />
            ))
          : exercises.slice(0, cards).map((exercise) => (
              <ExCard key={exercise.id} exercise={exercise} />
            ))}
      </div>
      {cards < (searchResults.length > 0 ? searchResults : exercises).length && (
        <div className="mt-4">
          <button
            onClick={loadMoreCards}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
export default Ex