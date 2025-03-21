const RestaurantCategory = ({ data }) => {
  console.log(data);

  return (
    <div>
      {/* Accordion Header */}
      <div className="w-6/12 m-auto bg-gray-50 shadow-lg p-4">
        <span>{data.title}</span>
        <span>∨</span>
      </div>
      {/*Accordion Body */}
    </div>
  );
};

export default RestaurantCategory;
