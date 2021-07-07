const tranactionw = document.querySelector(".mainb_bottom_left1");
const arr = [100, -200, 500, 1000, 10000, -10, 100000, -2000];
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
let sorted = false;

const accounts = [account1, account2, account3, account4];
const dyn = function (a) {
  a.forEach(function (mov, i) {
    const txt = mov > 0 ? "Deposited" : "Withdrawn";
    let col;
    if (mov < 0) {
      col = "rgb(247, 109, 116)";
    } else {
      col = "rgb(139, 250, 139)";
    }
    const htmltxt = `
        <div class="mainb_bottom_left1_2">
              <div class="mainb_bottom_left1_2_1" style="background-color: ${col};">${i} ${txt}</div>     
              <div class="mainb_bottom_left1_2_2">${mov}</div>          
        </div>
        `;
    tranactionw.insertAdjacentHTML("afterbegin", htmltxt);
  });
};
const calusername = function (userarr) {
  userarr.forEach(function (mov) {
    let a = "";
    mov.owner
      .toLowerCase()
      .split(" ")
      .forEach(function (e) {
        a = a + e[0];
      });
    mov.username = a;
  });
};
const calTotalBalance = function (arr) {
  let sum = arr.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  document.querySelector("#curbal").textContent = String(sum) + "$";
};
const calInBalance = function (arr) {
  let inx = arr.movements.reduce(function (acc, mov) {
    if (mov > 0) return acc + mov;
    else return acc + 0;
  }, 0);
  document.querySelector("#inbal").textContent = String(inx) + "$";
};
const calOutBalance = function (arr) {
  let inx = arr.movements.reduce(function (acc, mov) {
    if (mov < 0) return acc + mov;
    else return acc + 0;
  }, 0);
  inx = Math.abs(inx);
  document.querySelector("#outbal").textContent = String(inx) + "$";
};
const loadall = function () {
  tranactionw.innerHTML = "";
  const un = document.querySelector("#username").value;
  const pass = document.querySelector("#password").value;
  const matched = accounts.find(function (mov) {
    if (mov.username === un && mov.pin === Number(pass)) return true;
  });
  if (matched) {
    dyn(matched.movements);
    calTotalBalance(matched);
    currentUser = matched;
    calInBalance(matched);
    calOutBalance(matched);
    document.querySelector("#trans").style.opacity = 1;
  } else {
    alert("Username or password is incorrect");
    currentUser = undefined;
    document.querySelector("#trans").style.opacity = 0;
    document.querySelector("#Transferto").value = "";
    document.querySelector("#Amount").value = "";
  }
};
calusername(accounts);
let currentUser = undefined;
document.querySelector("#login").addEventListener("click", function () {
  loadall();
});
const transmon = function (amountto, touser) {
  const tranto = accounts.find(function (mov) {
    if (mov.username === touser) return true;
  });
  currentUser.movements.push(Number(-1 * Number(amountto)));
  tranto.movements.push(Number(amountto));
  loadall();
};
document.querySelector("#transto").addEventListener("click", function () {
  const touser = document.querySelector("#Transferto").value;
  const amo = document.querySelector("#Amount").value;
  transmon(amo, touser);
});
document.querySelector("#delbtn").addEventListener("click", function () {
  let i;
  //let curname=document.querySelector("#deleteacc").value;
  if (
    currentUser.username === document.querySelector("#deleteacc").value &&
    currentUser.pin === Number(document.querySelector("#pin").value)
  ) {
    i = accounts.findIndex(function (mov) {
      if (mov === currentUser) return true;
    });
    console.log(i);
    accounts.splice(i, 1);
    document.querySelector("#trans").style.opacity = 0;
    console.log(accounts);
  }
});
document.getElementById("sortbtn").addEventListener("click", function () {
  sorted = !sorted;
  tranactionw.innerHTML = "";
  if (!sorted) dyn(currentUser.movements);
  else dyn(currentUser.movements.slice(0).sort((a, b) => a - b));
});
