import {SchoolSuppliesItem} from "./school-supplies.ts";

function SchoolSuppliesInfo({item}: {item: SchoolSuppliesItem}) {
  return (
      <div>
          <p><strong>Post Type:</strong> School Supplies</p>
          <p>
              <strong>Item:</strong> {item.type}<br/>
              <strong>Quantity:</strong> {item.quantity}

                {item.type === "Stationary" && <>
                    <br/><strong>Stationary Type:</strong> {item.stationaryType} </>}
                {item.type === "Books" && <>
                    <br/><strong>Book Name:</strong> {item.bookName}<br/>
                    <strong>Book Language:</strong> {item.bookLanguage}<br/>
                    <strong>Book Author:</strong> {item.bookAuthor}<br/>
                    <strong>Edition:</strong> {item.edition}<br/>
                    <strong>Book Summary:</strong> {item.bookSummary}
                </>}
          </p>
      </div>
  );
}

export default SchoolSuppliesInfo;