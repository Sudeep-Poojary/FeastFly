const RestaurantCategory = ({ data }) => {
  console.log(data);

  return (
    <div>
      {/* Accordion Header */}
      <div className="w-6/12 m-auto my-4 bg-gray-50 shadow-lg p-4 flex justify-between">
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <span className="font-bold text-lg">∨</span>
      </div>
      {/*Accordion Body */}
    </div>
  );
};

export default RestaurantCategory;
