import {SchoolSuppliesItem} from "./school-supplies-categories.ts";

function SchoolSuppliesInfo({item}: {item: SchoolSuppliesItem}) {
  return (
      <div>
          <p><strong>Post Type:</strong> School Supplies</p>
          <p>
              <strong>Item:</strong> {item.type}<br/>
              <strong>Quantity:</strong> {item.quantity}
          </p>
      </div>
  );
}

export default SchoolSuppliesInfo;