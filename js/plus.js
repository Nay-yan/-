// Tootle Amount
$(document).ready(function() {
    $('table thead th').each(function(i) {
        calculateColumn(i);
    });
});

function calculateColumn(index) {
    var total = 0;
    $('table tr').each(function() {
        var value = parseInt($('td', this).eq(index).text());
        if (!isNaN(value)) {
            total += value;
        }
    });
    $('table tfoot td').eq(index).text(total + " Ks");
}
// function sum() {
//     let SUM = document.getElementById("sum");
//     let rows = document.querySelectorAll("table tr td:last-child");
//     let sum = 0;
//     for (let i = 0; i < rows.length - 1; i++) {
//         sum += Number(rows[i].textContent);
//     }

//     SUM.textContent = sum.toFixed(2) + " Ks";
// 
// };

// Date 
let datetoday = document.getElementById("date");
let today = new Date();
let day = `${today.getDate() <10 ? "0": ""}${today.getDate()}`;

let month = `${today.getMonth()+1 <10 ? "0": ""}${today.getMonth()+1}`;
let year = today.getFullYear();
datetoday.innerHTML = `${day}/${month}/${year}`;

// Calculate 

let Cashin = document.getElementById("validationTooltip01");
let Cashout = document.getElementById("validationTooltip02");
let plus = document.getElementById("validationTooltip03");
let BankName = document.getElementById("validationTooltip04");
let minus = document.getElementById("validationTooltip05");


let HistoryList = document.getElementById("historyList");
// function parcen(value) {
//     let x = Cash.value;
//     let first = (x / 100) * value;
//     Ponly.value = first.toFixed(2);
//     let second = +x + first;
//     Total.value = second.toFixed(2);
// };

document.getElementById("calc").addEventListener("submit", function(e) {
    e.preventDefault();
    let BankText = BankName.value;
    let CashIn = Cashin.value;
    let CashOut = Cashout.value;
    let Plus = plus.value;
    let Minus = minus.value;
    let arr = [BankText, CashIn, CashOut, Plus, Minus];
    createTr(arr);
    store();
    BankName.value = "";
    Cashin.value = "";
    Cashout.value = "";
    plus.value = "";
    minus.value = "";
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