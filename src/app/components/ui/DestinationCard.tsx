/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Star, Clock, MapPin } from "lucide-react";

// ✅ Define props type
interface DestinationCardProps {
  name: string;
  district: string;
  imageUrl: string;
  type: string;
  description: string;
  bestTimeToVisit: string;
}

const DestinationCard: React.FC<DestinationCardProps> = ({
  name,
  district,
  imageUrl,
  type,
  description,
  bestTimeToVisit,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full capitalize">
          {type}
        </span>
        <div className="absolute top-3 right-3 flex items-center bg-green-500 rounded-full px-2 py-1 text-sm font-medium shadow">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-white">4.5</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <span className="text-green-700 font-semibold">{district}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {bestTimeToVisit}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" /> {district}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition">
            View Details
          </button>
          <button className="flex-1 border border-green-700 text-green-700 py-2 rounded-lg hover:bg-green-50 transition">
            Plan Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
