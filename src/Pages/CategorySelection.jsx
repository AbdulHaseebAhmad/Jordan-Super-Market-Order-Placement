import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import WelcomeModal from "../Components/WelcomeModal";

const CategorySelection = () => {
  const cards = [
    {
      id: 1,
      image:
        "https://www.alltech.com/sites/default/files/meat-quality-internal-web.png",
      text: "Poultery",
    },
    {
      id: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCWXfKUtBoPwgULbRdWyvBnzZMl6ryXEMsw&s",
      text: "Grocery",
    },
    {
      id: 3,
      image:
        "https://d1n5l80rwxz6pi.cloudfront.net/general/blog/importance-of-dairy-products.jpg",
      text: "Dairy",
    },
  ];
  const modalvisible = useSelector((state) => state.modal.welcomeModal);

  return (
    <>
      {modalvisible ? (
        <WelcomeModal />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {cards.map((card) => (
              <Link to={`category/${card.text}`}>
                <div
                  key={card.id}
                  className="relative w-[250px] h-[300px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                >
                  <div className="absolute bottom-0 w-full text-center  bg-gray-900 text-white py-2">
                    {card.text}
                  </div>
                </div>{" "}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategorySelection;
