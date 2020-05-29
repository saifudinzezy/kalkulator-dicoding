const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined"
}

const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            //json.parse objek dalam bentuk string kembali pada bentuk objek JavaScript
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        //unshift() digunakan untuk menambahkan nilai baru pada array yang ditempatkan pada awal index.
        historyData.unshift(data);

        if (historyData.length > 5) {
            // pop() fungsi untuk menghapus nilai index terakhir pada array
            historyData.pop();
        }
        //json.stringify digunakan untuk mengubah objek JavaScript ke dalam bentuk String
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");


    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";


    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";


        historyList.appendChild(row);
    }
}

renderHistory();