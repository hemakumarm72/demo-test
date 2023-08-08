const XLSX = require('xlsx');
const { setupConnection } = require('./src/db/db.connect');
const { LockerBooking } = require('./src/db/models');

(async () => {
  await setupConnection(
    'Mongoose connection sentosa db mqtt locker initial... 📦',
  );
})();

async function locker() {
  const bookingcount = await LockerBooking.aggregate([
    {
      $group: {
        _id: '$date',
        counts: {
          $addToSet: '$_id',
        },

      },
    },
    {
      $set: {
        counts: {
          $size: '$counts',
        },
      },
    },
    {
      $sort: {
        date: 1,
      },
    },
  ]);
  console.log(bookingcount);

  // Assuming your data is stored in the "data" variable

  //   // Create a new workbook
  //   const workbook = XLSX.utils.book_new();

  //   // Convert data to a worksheet
  //   const worksheet = XLSX.utils.json_to_sheet(bookingcount);

  //   // Add the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  //   // Write the workbook to a file
  //   const filename = 'data.xlsx';
  //   XLSX.writeFile(workbook, filename);

//   console.log(`Excel file "${filename}" has been created.`);
}

locker();
