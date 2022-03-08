// Date 

let datetoday = document.getElementById("date");
let today = new Date();
let day = `${today.getDate() <10 ? "0": ""}${today.getDate()}`;

let month = `${today.getMonth()+1 <10 ? "0": ""}${today.getMonth()+1}`;
let year = today.getFullYear();
datetoday.innerHTML = `${day}/${month}/${year}`;

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
};

$('#total').click(function() {
    location.reload();
});

// Remove 

function deleteRow(row) {
    document.getElementById('sum_table').deleteRow(row);
    store();
}

function tableclick(e) {
    if (!e)
        e = window.event;

    if (e.target.value == "Del")
        deleteRow(e.target.parentNode.parentNode.rowIndex);
}
document.getElementById("sum_table").addEventListener("click", function() {

    if (confirm('Do you really want to Delect List?')) {
        // delect it!
        tableclick();
    } else {
        // undelect it!
        e.preventDefault;
    }

});

// Calculate 

let Cashin = document.getElementById("validationTooltip01");
let Cashout = document.getElementById("validationTooltip02");
let plus = document.getElementById("validationTooltip03");
let BankName = document.getElementById("validationTooltip04");
let minus = document.getElementById("validationTooltip05");

let HistoryList = document.getElementById("historyList");
let i = 1;


document.getElementById("calc").addEventListener("submit", function(e) {
    e.preventDefault();
    let BankText = BankName.value;
    let CashIn = Cashin.value;
    let CashOut = Cashout.value;
    let Plus = plus.value;
    let Minus = minus.value;

    let rowSpacer = document.getElementById("rowSpace");
    if (rowSpacer) {
        rowSpacer.remove();
        $("tfoot").removeClass();
    };

    HistoryList.innerHTML += `  <tr id="list-${i}">
                                    <td> <input type="button" onclick="remove(${i})" value="Del" class="btn btn-danger brn-sm" /></td>
                                    <td>${BankText}</td>
                                    <td>${CashIn}</td>
                                    <td>${CashOut}</td>
                                    <td>${Plus}</td>
                                    <td id="card">${Minus}</td>
                                </tr>`;
    i++;

    BankName.value = "";
    Cashin.value = "";
    Cashout.value = "";
    plus.value = "";
    minus.value = "";
    store();

});

// localStorage 
function store() {
    localStorage.setItem("record", HistoryList.innerHTML);
};

(function() {
    if (localStorage.getItem("record")) {
        HistoryList.innerHTML = localStorage.getItem("record");
    } else {
        HistoryList.innerHTML = `<tr id="rowSpace"><td colspan="6">This is no Record!</td></tr>`;
        $("tfoot").addClass("d-none");
    };
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
                localStorage.clear();
                location.reload();
            } else {
                swal("Your imaginary file is safe!");
            }
        });
});

// *******************