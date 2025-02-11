import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubCategoryList from "../components/subCategory/subCategoryList";
import Search from "../components/forms/Search";

const Home = () => {
  return (
    <>
      <div className="p-5 text-center shadow-5 rounded mb-5 text-danger font-weight-bold display-1" style={{"backgroundColor" : "#cecfd6"}}>
        <Jumbotron text={["Latest Products","New Arrivals", "Best Sellers"]} />
      </div>

      <h4 className="p-3 text-center shadow-5 rounded mb-5 mt-5 display-5" style={{"backgroundColor" : "#cecfd6"}}>
          New Arrivals
      </h4>
      <NewArrivals/>

      <h4 className="p-3 text-center shadow-5 rounded mb-5 mt-5 display-5" style={{"backgroundColor" : "#cecfd6"}}>
          Best Sellers
      </h4>
      <BestSellers/>

      <h4 className="p-3 text-center shadow-5 rounded mb-5 mt-5 display-5" style={{"backgroundColor" : "#cecfd6"}}>
          Categories
      </h4>
      <CategoryList/>

      <h4 className="p-3 text-center shadow-5 rounded mb-5 mt-5 display-5" style={{"backgroundColor" : "#cecfd6"}}>
          SubCategories
      </h4>
      <SubCategoryList/>
      <br/> <br/>
    </>
  );
};

export default Home;
