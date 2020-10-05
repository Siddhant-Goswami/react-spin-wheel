interface ResultData {
  web_client: string;
  timestamp: Date;
  spin_result_index: number;
}

export const setResults = (data: ResultData) => {
  fetch('https://sheet.best/api/sheets/77de7d82-5df3-41d8-91c3-980bf04b04c4', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(r => r.json())
    .then(data => {
      // The response comes here
      console.log(data);
    })
    .catch(error => {
      // Errors are reported there
      console.log(error);
    });
};
