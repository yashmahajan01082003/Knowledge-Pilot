import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => (window.location.href = "./")}
          className="flex items-center text-gray-800 font-medium hover:text-gray-600"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
         
        </button>
      </div>

      {/* Contact Form */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Contact Us</h1>

          {submitted ? (
            <div className="text-center">
              <h2 className="text-xl font-medium text-green-600 mb-2">Thank you for reaching out!</h2>
              <p className="text-gray-700">We'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-gray-700"
                  placeholder="Your Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-gray-700"
                  placeholder="Your Email"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-gray-700"
                  placeholder="Subject"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-gray-700"
                  rows="4"
                  placeholder="Your Message"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 text-white p-3 rounded-lg font-medium hover:bg-gray-700 focus:outline-none transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
