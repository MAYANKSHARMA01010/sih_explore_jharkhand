"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../../components/common/navbar";
import DestinationCard from "../../components/ui/DestinationCard";  

const SHARED_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";

const destinationsData = [
  {
    id: 1,
    name: "Tagore Hill",
    address: "Morabadi, Ranchi, Jharkhand",
    district: "Ranchi",
    type: "Hill / Historical",
    description:
      "A quiet hill in Morabadi with views across Ranchi; associated with Rabindranath Tagore's family estate and a peaceful park and memorial.",
    keyFeatures:
      "Tagore family memorial; viewpoints & gardens; meditation space; easy walkways",
    bestTimeToVisit: "October–February",
    latitude: 23.4014,
    longitude: 85.338,
    imageUrl: SHARED_IMAGE,
  },
  {
    id: 2,
    name: "Jonha (Gautamdhara) Falls",
    address: "Jonha Village, Ranchi, Jharkhand",
    district: "Ranchi",
    type: "Waterfall",
    description:
      "Scenic waterfall formed on a tributary; calmer than the major falls and good for photography.",
    keyFeatures: "Waterfall viewpoint; steps & trails; photo spots; local picnic area",
    bestTimeToVisit: "September–January (post-monsoon to winter)",
    latitude: 23.34203,
    longitude: 85.60841,
    imageUrl: SHARED_IMAGE,
  },
  {
    id: 3,
    name: "Maa Dewri Temple",
    address: "Diuri / Dewri area, near Ranchi",
    district: "Ranchi/Tamar",
    type: "Temple",
    description:
      "Ancient temple revered locally; the deity is important to tribal and rural communities in the region.",
    keyFeatures: "Historic local shrine; tribal rituals; festival gatherings",
    bestTimeToVisit: "Year-round (peak during local festivals)",
    latitude: 23.0461,
    longitude: 85.043,
    imageUrl: SHARED_IMAGE,
  },
  {
    id: 4,
    name: "Hargaddi / Chokahatu Megaliths",
    address: "Hargaddi area, Ranchi district",
    district: "Ranchi",
    type: "Megalithic / Archaeological",
    description:
      "Cluster of standing stones and dolmens used historically for burial/ritual by Munda tribes.",
    keyFeatures: "Megalithic stone clusters; archaeological interest; cultural heritage",
    bestTimeToVisit: "October–March",
    latitude: 23,
    longitude: 85.5,
    imageUrl: SHARED_IMAGE,
  },
];

export default function Destinations() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredDestinations = destinationsData.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || d.type.toLowerCase().includes(filter.toLowerCase());
    return matchSearch && matchFilter;
  });

  const categories = ["All", "Hill", "Waterfall", "Temple", "Megalithic"];

  return (
    <>
      <Navbar />

      <main className="pt-24">
        <section className="bg-gray-50 py-6 shadow-sm">
          {/* Search bar */}
          <div className="container mx-auto px-6">
            <p className="text-center text-gray-700 mb-4">
              Explore the natural beauty and cultural heritage of Ranchi
            </p>
            <div className="flex justify-center w-full mt-6">
              <div className="relative w-full md:w-1/2">
                <Search className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="🔍 Search destinations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-300 placeholder:text-gray-500 text-gray-700 focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none shadow-sm transition"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full border ${
                    filter === cat
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="destinations" className="py-12 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-6">
            {filteredDestinations.length === 0 ? (
              <p className="text-center text-gray-500"> No destinations found. </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((item) => (
                  <DestinationCard key={item.id} {...item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
