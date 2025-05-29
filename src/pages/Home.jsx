import React, { useEffect } from "react";
import { Link } from "react-router";
import { useState } from "react";
import axios from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiFilter } from "react-icons/ci";
import Swal from "sweetalert2";
import { FaRegSadTear } from "react-icons/fa";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [showForm, setShowForm] = useState(false);
  const [searchChar, setSearchChar] = useState("");
  const [allCharacters, setAllcharacters] = useState([]);
  const [newCharacter, setNewCharacter] = useState({
    username: "",
    name: "",
    image: "",
    gender: "",
  });
  // Fetch data
  const getCharacters = async () => {
    try {
      const res = await axios.get(
        "https://68219a10259dad2655afc1c9.mockapi.io/characters"
      );
      setAllcharacters(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const postCharacters = async () => {
    try {
      const res = await axios.post(
        "https://68219a10259dad2655afc1c9.mockapi.io/characters",
        newCharacter
      );
      setAllcharacters((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCharacters = async (id) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "Are you sure?",
        text: "This character will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#7c0d23",
        cancelButtonText: "Cancel",
      });
      if (confirmDelete.isConfirmed) {
        const res = await axios.delete(
          `https://68219a10259dad2655afc1c9.mockapi.io/characters/${id}`
        );
        setAllcharacters((prev) => prev.filter((char) => char.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCharacter((prev) => ({
      ...prev,
      [name]: value,
      username: localStorage.getItem("username"),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCharacters();
    setShowForm(false);
  };

  return (
    <div className="bg-[#1a1a1a] text-[#f5f5f5]">
      <nav className="flex w-screen p-4 lg:px-11 justify-between items-center">
        <div
          className="lg:text-4xl font-bold"
          style={{ fontFamily: "cursive" }}
        >
          GOT Fandom
        </div>
        <div className="flex gap-5 lg:text-2xl">
          <div>
            {!isLoggedIn ? (
              <Link className="cursor-pointer" to="/login">
                Sign in
              </Link>
            ) : (
              <div className="flex gap-5 cursor-pointer">
                <button
                  className="bg-[#7c0d23] hover:bg-[#7c0d23c7] cursor-pointer py-1 px-3 rounded-md"
                  onClick={() => setShowForm(true)}
                >
                  Add Character +
                </button>
                <button
                  onClick={() =>
                    setIsLoggedIn(localStorage.removeItem("loggedIn"))
                  }
                  className="text-red-400 cursor-pointer"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Add new form */}
      <div>
        {showForm && (
          <div className="fixed inset-0 bg-[#181a1c79]  flex items-center justify-center z-50">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-7 rounded shadow space-y-5 lg:w-[40vw]"
            >
              <h2 className="text-xl font-bold text-gray-800">Add Character</h2>
              <input
                name="name"
                value={newCharacter.name}
                onChange={handleChange}
                placeholder="Name"
                className="mt-1 w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm"
                required
              />
              <input
                name="image"
                value={newCharacter.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="mt-1 w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm"
                required
              />
              <select
                name="gender"
                value={newCharacter.gender}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-md shadow-sm"
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowForm(false)}
                  type="button"
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#7c0d23] text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <section className="bg-cover bg-center h-[70vh] flex flex-col items-center justify-center  text-center px-4" style={{ backgroundImage: "url('/imgs/gotBg.png')" }}>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Discover the Characters of Game of Thrones
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl ">
          Meet the legends, heroes, and villains of Westeros in one place.
        </p>
        <button className="bg-[#7c0d23] hover:bg-[#7c0d23c7] cursor-pointer font-semibold py-2 px-4 rounded-md">
          Start Exploring
        </button>
      </section>
      {/* Display characters */}
      <div className="flex gap-2 items-center justify-end my-4 p-7 mt-0 px-4 py-2 bg-[#2d2d2d] rounded-md shadow-sm">
        <div className="text-2xl ">
          <CiFilter />
        </div>
        <input
          type="text"
          value={searchChar}
          onChange={(e) => setSearchChar(e.target.value)}
          placeholder="Search for a character"
          className="p-2 border-1 border-[#1a1a1a] bg-[#1a1a1a60] rounded-md"
        />
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl p-4">
          {allCharacters.filter((character) =>
            character.name.toLowerCase().includes(searchChar.toLowerCase())
          ).length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-2xl font-semibold flex flex-col justify-center gap-4">
                <div className="flex justify-center text-6xl">
                  <FaRegSadTear />
                </div>
                Oops! No characters found.
              </p>
            </div>
          ) : (
            allCharacters
              .filter((character) =>
                character.name.toLowerCase().includes(searchChar.toLowerCase())
              )
              .map((character) => (
                <div
                  key={character.id}
                  className="bg-[#2d2d2d] rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
                >
                  <img
                    src={character.image}
                    alt="character image"
                    className="w-full h-60 object-cover object-top"
                  />

                  <div className="p-4 flex flex-col gap-2">
                    <h2 className="text-xl font-semibold ">
                      {character.name}
                    </h2>
                    <p className="text-sm">{character.gender}</p>

                    {isLoggedIn &&
                      localStorage.username === character.username && (
                        <button
                          onClick={() => deleteCharacters(character.id)}
                          className="mt-auto flex gap-1 cursor-pointer items-center text-red-400 text-sm py-1.5 text-right rounded-md"
                        >
                          Delete
                          <span>
                            <FaRegTrashAlt />
                          </span>
                        </button>
                      )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      <footer className="bg-[#2d2d2d] text-white text-center p-4 mt-8 h-[20vh] flex justify-center items-center">
        <p>&copy; 2025 CharsFandom. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
