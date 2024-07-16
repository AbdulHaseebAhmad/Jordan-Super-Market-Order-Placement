import React, { useEffect, useState } from "react";
import ResponsiveGrid from "../Components/ResponsiveGrid";
import { useLoaderData, useLocation } from "react-router-dom";
import WelcomeModal from "../Components/WelcomeModal";

export default function Home() {
  const location = useLocation();
  const categoryNamesArray = location.pathname.split("/");
  const categoryName = categoryNamesArray[2];
  const productsList = useLoaderData();
  const [productstorage, setproductstorage] = useState("all");

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const filteredProductsByCategory = productsList.filter(
      (eachProduct) => eachProduct.category === categoryName
    );
    setProducts(filteredProductsByCategory);
  }, []);

  const freshfrozenhandle = (e) => {
    const { name, value } = e.target;
    const filteredProductsByFreshFrozen = productsList.filter((eachproduct) => {
      return name !== "all"
        ? eachproduct.category === categoryName && eachproduct[name] === true
        : eachproduct.category === categoryName;
    });
    setproductstorage(name);
    setProducts(filteredProductsByFreshFrozen);
  };

  return (
    <>

        <div className="mt-6">
          <div className="pl-6 ">
            <h2 className="text-3xl font-semibold">{categoryName} Products</h2>
          </div>
          {categoryName === "Poultery" ? (
            <div className="w-8/12 mx-auto flex justify-center items-center gap-4 mt-6 mb-6">
              <button
                name="fresh"
                onClick={freshfrozenhandle}
                className="border border-gray-900 py-1 px-6 rounded-lg font-semibold text-md hover:bg-gray-900 hover:text-white"
                style={{
                  background: productstorage === "fresh" && "rgb(17, 24, 39)",
                  color: productstorage === "fresh" && "white",
                }}
              >
                Fresh Poultery
              </button>
              <button
                name="frozen"
                onClick={freshfrozenhandle}
                className="border border-gray-900 py-1 px-6 rounded-lg font-semibold text-md hover:bg-gray-900 hover:text-white"
                style={{
                  background: productstorage === "frozen" && "rgb(17, 24, 39)",
                  color: productstorage === "frozen" && "white",
                }}
              >
                Frozen Poultery
              </button>
              <button
                name="all"
                onClick={freshfrozenhandle}
                className="border border-gray-900 py-1 px-6 rounded-lg font-semibold text-md hover:bg-gray-900 hover:text-white"
                style={{
                  background: productstorage === "all" && "rgb(17, 24, 39)",
                  color: productstorage === "all" && "white",
                }}
              >
                All Poultery
              </button>
            </div>
          ) : (
            <div></div>
          )}
          {products.length > 0 ? (
            <>
              <ResponsiveGrid products={products} />
            </>
          ) : (
            <p className="px-4 text-xl mb-[240px] text-red-500">
              No Products To Show in the selection{" "}
            </p>
          )}
        </div>
    </>
  );
}

export const productsLoader = async ({ request, response }) => {
  const products = [
    {
      id: 1,
      name: "منتج 1",
      price: 10.0,
      quantity: 1,
      category: "Poultery",
      fresh: true,
      image:
        "https://hips.hearstapps.com/hmg-prod/images/template-oj-1537554592.png?crop=1xw:1xh;center,top&resize=640:*",
      fixedPrice: false,
      varyingweight: [900, 1000, 1100, 1200, 1300, 1400, 1500],
    },
    {
      id: 2,
      name: "منتج 2",
      price: 20.0,
      quantity: 1,
      category: "Dairy",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/template-tomatosoup-1538173601.png?crop=1xw:1xh;center,top&resize=640:*",
      fixedPrice: true,
    },
    {
      id: 3,
      name: "منتج 3",
      price: 30.0,
      quantity: 1,
      category: "Grocery",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIJSRAWC91Jik9pQFU8Li94njAKx3GJbNcBZnveZIRSSfbK9NJCxti2ryJxDJmJRqpJPs&usqp=CAU",
      fixedPrice: false,
    },
    {
      id: 4,
      name: "منتج 4",
      price: 40.0,
      quantity: 1,
      category: "Poultery",
      frozen: true,
      image:
        "https://hips.hearstapps.com/hmg-prod/images/template-ketchup-1538171003.png?crop=1xw:1xh;center,top&resize=640:*",
      fixedPrice: true,
    },
    {
      id: 5,
      name: "منتج 5",
      price: 50.0,
      quantity: 1,
      category: "Dairy",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX1VgZE84ZL2Lo9xGXMZfr47yTCqTssRj9yg&s",
      fixedPrice: false,
    },
    {
      id: 6,
      name: "منتج 6",
      price: 60.0,
      quantity: 1,
      category: "Grocery",
      image:
        "https://i.pinimg.com/564x/24/f3/f9/24f3f9239e0323451471a7b3d3e27607.jpg",
      fixedPrice: true,
    },
    {
      id: 7,
      name: "منتج 7",
      price: 70.0,
      quantity: 1,
      category: "Poultery",
      fresh: true,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_f_5Z2LPTOi5w3eJNsNfUOe1HX5NLJuQDNw&s",
      fixedPrice: false,
      varyingweight: [900, 1000, 1100, 1200, 1300, 1400, 1500],
    },
    {
      id: 8,
      name: "منتج 8",
      price: 80.0,
      quantity: 1,
      category: "Grocery",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/template-pastaalfredo-1538169576.png?crop=1xw:1xh;center,top&resize=640:*",
      fixedPrice: true,
    },
    {
      id: 9,
      name: "منتج 9",
      price: 90.0,
      quantity: 1,
      category: "Dairy",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7pZrO6u_JK8aLQPh6ECYufHWOyheHtd6ZyfOsUXBc8JdYLX_2DUR9SPDqcCkFlhLOlZU&usqp=CAU",
      fixedPrice: false,
    },
    {
      id: 10,
      name: "منتج 10",
      price: 55.0,
      quantity: 1,
      category: "Poultery",
      frozen: true,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_f_5Z2LPTOi5w3eJNsNfUOe1HX5NLJuQDNw&s",
      fixedPrice: false,
      soldByPieces:true,
      perPiecePrice:5
    },
    
  ];

  return products;
};
