import React from 'react';

const ExCard = ({ exercise }) => {
  return (
    <div className="bg-white p-2 box">
      <img src={exercise.gifUrl} alt={exercise.name} className="w-full" />
      <h2 className="text-xl font-semibold">{exercise.name}</h2>
      <p className="text-black">{exercise.type}</p>
      <p className="text-black">{exercise.target}</p>
      <p className="text-black">{exercise.bodyPart}</p>
    </div>
  );
};

export default ExCard;