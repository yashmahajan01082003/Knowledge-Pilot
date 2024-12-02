import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const teamMembers = [
  {
    name: "Yash Mahajan",
    role: "Project Lead",
    contribution: "Invented tools to simplify training process",
    image: "./images/yash.jpg",
  },
  {
    name: "Mandar Pandagale",
    role: "ML Engineer",
    contribution: "Training the 1-Bit LLM",
    image: "./images/mandar.jpg",
  },
  {
    name: "Vivek Nikam",
    role: "Full Stack Developer",
    contribution: "Creating UI for the 1-Bit LLM",
    image: "./images/vivek.jpg",
  },
  {
    name: "Komal Potdar",
    role: "MLOps Engineer",
    contribution: "Integration of UI with the model",
    image: "./images/komal.jpg",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => (window.location.href = "./")}
          className="flex items-center text-gray-800 font-medium hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
         
        </button>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Meet Our Team</h1>

       {/* Team Cards */}
      <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mx-auto max-w-6xl">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden p-6 text-center flex flex-col items-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-800">{member.name}</h2>
            <p className="text-gray-500 font-medium mb-2">{member.role}</p>
            <p className="text-gray-700">{member.contribution}</p>
          </div>
        ))}
      </div>

      {/* Team Description */}
      <div className="mt-10 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 text-lg">
            We are Team Dreamer, students of Vishwakarma Institute of Technology, Pune, currently in the third year of the Computer Engineering department. This project is the result of our dedication, collaboration, and countless efforts. Here are the outcomes of our hard work and perseverance.
          </p>
        </div>
      </div>

    </div>
  );
};

export default About;
