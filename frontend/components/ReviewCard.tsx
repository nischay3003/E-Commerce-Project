import React from "react";

interface ReviewCardProps {
  name: string;
  comment: string;
  rating:number
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, comment,rating }) => {
  return (
    <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200">
  <div className="flex justify-between items-center mb-2">
    <p className="font-bold text-gray-800">{name}</p>
    <p className="text-yellow-500 font-semibold">
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
      <span className="ml-1 text-gray-600 font-normal">({rating})</span>
    </p>
  </div>
  <p className="text-sm text-slate-600">{comment}</p>
</div>
  )
};


export default ReviewCard;
