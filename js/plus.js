// Tootle Amount
function sum() {
    let SUM = document.getElementById("sum");
    let rows = document.querySelectorAll("table tr td:last-child");
    let sum = 0;
    for (let i = 0; i < rows.length - 1; i++) {
        sum += Number(rows[i].textContent);
    }

    SUM.textContent = sum.toFixed(2) + " Ks";
    Result.textContent = sum.toFixed(2);
};

// Date 
let datetoday = document.getElementById("date");
let today = new Date();
let day = `${today.getDate() <10 ? "0": ""}${today.getDate()}`;

let month = `${today.getMonth()+1 <10 ? "0": ""}${today.getMonth()+1}`;
let year = today.getFullYear();
datetoday.innerHTML = `${day}/${month}/${year}`;


// Calculate 

let Cash = document.getElementById("validationTooltip01");
let Per = document.getElementById("validationTooltip02");
let Total = document.getElementById("validationTooltip03");
let BankName = document.getElementById("validationTooltip04");
let Ponly = document.getElementById("validationTooltip05");
let Result = document.getElementById("Result");


let HistoryList = document.getElementById("historyList");

function parcen(value) {
    let x = Cash.value;
    let first = (x / 100) * value;
    Ponly.value = first.toFixed(2);
    let second = +x + first;
    Total.value = second.toFixed(2);
};


document.getElementById("calc").addEventListener("submit", function(e) {
    e.preventDefault();
    let BankText = BankName.value;
    let CashText = Cash.value;
    let PerText = Per.value;
    let TotalText = Total.value;
    let PText = Ponly.value;
    let arr = [BankText, CashText, PerText, PText, TotalText];
    createTr(arr);
    store();

    BankName.value = "";
    Cash.value = "";
    Per.value = "";
    Total.value = "";
    Ponly.value = "";
});

function createTr(x) {
    let rowSpacer = document.getElementById('rowSpace');
    if (rowSpacer) {
        rowSpacer.remove();
    }
    let tr = document.createElement("tr");

    x.map(function(el) {
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    });
    HistoryList.appendChild(tr);
};

// localStorage 
function store() {
    localStorage.setItem("record", HistoryList.innerHTML);
};
(function() {
    if (localStorage.getItem("record")) {
        HistoryList.innerHTML = localStorage.getItem("record");
    } else {
        HistoryList.innerHTML = `<tr id="rowSpace"><td colspan="5">This is no Record!</td></tr>`;
    }
})();

// clear  & alert
document.getElementById("clear").addEventListener("click", function() {
    swal({
            title: "Are you all Delect?",
            text: "Once deleted, you will not be able to recover this history file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
                // clear 
                localStorage.clear();
                location.reload();
            } else {
                swal("Your imaginary file is safe!");
            }
        });
});