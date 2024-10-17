import React from 'react';
import pic1 from '../Assets/1.png';
import pic2 from '../Assets/2.png';
import pic3 from '../Assets/3.png';

const PetKnowledgeCards = () => {
  const articles = [
    {
      image: pic1,
      category: "Dog",
      title: "What is a Pomeranian? How to Identify Pomeranian Dogs",
      description: "The Pomeranian (also known as the Pomeranian [Pom dog]), is always in the top of the cutest pets. Not only that, the small, lovely, smart, friendly, and skillful circu..."
    },
    {
      image: pic2,
      category: "Dog",
      title: "Dog Diet You Need To Know",
      description: "Dividing a dog's diet may seem simple at first, but there are some rules you should know so that your dog can really absorb the nutrients in the diet. For those who are just starting to raise dogs, especially..."
    },
    {
      image: pic3,
      category: "Dog",
      title: "Why Dogs Bite and Destroy Furniture and How to Prevent it Effectively",
      description: "Dog bites are common during development. However, no one wants to see their furniture or important items being bitten by a dog."
    }
  ];

  return (
    <div className="min-h-12 mx-auto px-4 py-8 bg-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-gray-500 text-sm mb-1">You already know?</p>
          <h2 className="text-xl font-bold text-blue-900">Useful Pet Knowledge</h2>
        </div>
        <button className="flex items-center text-sm text-blue-600 bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
          View more
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-52">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                {article.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                {article.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetKnowledgeCards;
