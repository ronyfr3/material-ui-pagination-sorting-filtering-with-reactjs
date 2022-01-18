const objectToCsv = function (data) {
  const csvRows = [];

  //get the headers
  const headers = Object.keys(data[0]);

  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }
  // console.log(csvRows);
  return csvRows.join("\n");
};

const download = (data) => {
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", "download.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const getReport = async function (users) {
  const data = users.map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
  }));
  const csvData = objectToCsv(data);
  // console.log(csvData);
  download(csvData);
};
