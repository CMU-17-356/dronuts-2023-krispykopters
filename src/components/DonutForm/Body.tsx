import { Donut } from "../../../types"
import { useStateValue } from "../../context/StateProvider";
import { editFood, addFood } from "../../utils/functions";

const EditDonutBody = ({
  donut,
  newDonut
}: {
  donut: Donut;
  newDonut: boolean;
}) => {

  const [{donutInfo}, dispatch] = useStateValue();

  const updateDonutData = (key:string, val:string) => {
    dispatch({
      type: "UPDATE_DONUT_DATA",
      donutInfo: {
        ...donutInfo,
        [key]:val
      }
    });
  }

  const submitDonutEdit = (donut: Donut) => {
    console.log("Editing donut");
    console.log(donut);
    editFood(donutInfo, dispatch);
  }

  const submitDonut = (donut: Donut) => {
    console.log("Adding donut");
    console.log(donut);
    addFood(donutInfo, dispatch);
  }

  return (
    <div className='w-full h-full bg-cartBg flex flex-col'>
      <div className="w-full p-5 px-5 rounded-lg flex flex-col">
        <div className="w-full flex flex-col mb-2">
          <label
            htmlFor="name"
            className="font-bold text-sm mb-1 text-gray-100"
          >
            Id
          </label>
          {donut.id === -1 ? (
            <input
              type="number"
              id="id"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter a unique donut id"
              autoComplete="off"
              onChange = {(e) => updateDonutData("id", e.target.value)} />
          ) : (
            <input
              type="number"
              id="id"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter a unique donut id"
              autoComplete="off"
              onChange = {(e) => updateDonutData("id", e.target.value)}
              value={donut.id} />
          )}
        </div>
        <div className="w-full flex flex-col mb-2">
          <label
            htmlFor="title"
            className="font-bold text-sm mb-1 text-gray-100"
          >
            Title
          </label>
          {donut.id === -1 ? (
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter the name of the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("title", e.target.value)} />
          ) : (
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter the name of the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("title", e.target.value)}
              value={donut.title} />
          )}
        </div>
        <div className="w-full flex flex-col mb-2">
          <label
            htmlFor="title"
            className="font-bold text-sm mb-1 text-gray-100"
          >
            Description
          </label>
          {donut.id === -1 ? (
            <input
              type="text"
              id="description"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Describe the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("description", e.target.value)}
            />
          ) : (
            <input
              type="text"
              id="description"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Describe the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("description", e.target.value)}
              value={donut.description}
            />
          )}
        </div>
        <div className="w-full flex flex-col mb-2">
          <label
            htmlFor="title"
            className="font-bold text-sm mb-1 text-gray-100"
          >
            Price
          </label>
          {donut.id === -1 ? (
            <input
              type="number"
              id="price"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter price of the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("price", e.target.value)}
            />
          ) : (
            <input
              type="number"
              id="price"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter price of the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("price", e.target.value)}
              value={donut.price}
            />
          )}
        </div>
        <div className="w-full flex flex-col mb-2">
          <label
            htmlFor="title"
            className="font-bold text-sm mb-1 text-gray-100"
          >
            Image URL
          </label>
          {donut.id === -1 ? (
            <input
              type="text"
              id="imageURL"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter the URL to the image of the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("imageURL", e.target.value)}
            />
          ) : (
            <input
              type="text"
              id="imageURL"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter the URL to the image of the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("imageURL", e.target.value)}
              value={donut.imageURL}
            />
          )}
        </div>
        <div className="w-full flex flex-col mb-2">
          <label
            htmlFor="title"
            className="font-bold text-sm mb-1 text-gray-100"
          >
            Calories
          </label>
          {donut.id === -1 ? (
            <input
              type="text"
              id="calories"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter the calories of the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("calories", e.target.value)}
            />
          ) : (
            <input
              type="text"
              id="calories"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter the calories of the donut"
              autoComplete="off"
              onChange = {(e) => updateDonutData("calories", e.target.value)}
              value={donut.calories}
            />
          )}
        </div>
        <div className="w-full flex flex-col mb-2">
          <label
            htmlFor="title"
            className="font-bold text-sm mb-1 text-gray-100"
          >
            Quantity
          </label>
          {donut.id === -1 ? (
            <input
              type="number"
              id="qty"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter the quantity of the donut available for sale"
              autoComplete="off"
              onChange = {(e) => updateDonutData("qty", e.target.value)}
            />
          ) : (
            <input
              type="number"
              id="qty"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="Enter the quantity of the donut available for sale"
              autoComplete="off"
              onChange = {(e) => updateDonutData("qty", e.target.value)}
              value={donut.qty}
            />
          )}
        </div>
        <div className="w-full flex flex-col mb-2">
          <label
            htmlFor="title"
            className="font-bold text-sm mb-1 text-gray-100"
          >
            Category
          </label>
          {donut.id === -1 ? (
            <input
              type="text"
              id="category"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="E.g. featured, normal, etc"
              autoComplete="off"
              onChange = {(e) => updateDonutData("category", e.target.value)}
            />
          ) : (
            <input
              type="text"
              id="category"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              placeholder="E.g. featured, normal, etc"
              autoComplete="off"
              onChange = {(e) => updateDonutData("category", e.target.value)}
              value={donut.category}
            />
          )}
        </div>
        <div className="w-full flex flex-col mb-2">
          {newDonut ? (
            <input
              type="submit"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              value="Submit"
              onClick={() => submitDonut(donutInfo)}
            />
          ) : (
            <input
              type="submit"
              className="w-full px-3 py-2 mb-1 border-2 text-white border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem transition-colors"
              value="Submit"
              onClick={() => submitDonutEdit(donutInfo)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditDonutBody