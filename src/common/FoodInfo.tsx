import {FoodItem, WeightCategories} from "./food.ts";

function FoodInfo({item}: {item: FoodItem}) {
  return (
      <div>
          <p><strong>Post Type:</strong> Food</p>
          <p>
              <strong>Category:</strong> {item.category}<br/>
              {WeightCategories.includes(item.category) && <><strong>Weight:</strong> {item.weight}Kg</> }
              {!WeightCategories.includes(item.category) && <><strong>Quantity:</strong> {item.quantity}</> }
          </p>
      </div>
  );
}

export default FoodInfo;