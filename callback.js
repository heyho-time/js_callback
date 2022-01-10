//javascript is synchronous. 동기적이다.  하나씩 순서대로.
// hoisting 된 이후부터 코드가 순서대로 작동함.hoisting은 선언들이 제일 위로 올라간 것 처럼 작동하는 것.
// 그와 반대가 asynchronous
"use strict";

console.log("1");
setTimeout(() => {
  console.log("2"); // browser api는 브라우저에 요청 후, 응답을 기다리지않고 바로 다음 코드를 읽는다.
}, 1000);
console.log("3");
//1 3 2 순서로 찍힘.

// 안에 있는 함수가 콜백함수. 비동기가 아닐때도 쓰인다.

//synchronous callback 콜백도 즉각적으로 실행하는33

function printImmediately(print) {
  print();
}
printImmediately(() => console.log("hihi"));

//asynchronous call back 나중에 언제 실행될지 예측할 수 없는.
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log("async callback"), 2000);

//
//
//
//Callback Hell example
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        (id === "heyho" && password === "heyho") ||
        (id === "coder" && password === "academy")
      ) {
        onSuccess(id);
      } else {
        onError(new Error("not found"));
      }
    }, 1000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "heyho") {
        onSuccess({ name: "heyho", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");

userStorage.loginUser(
  id,
  password,
  (user) => {
    userStorage.getRoles(
      user,
      (userWithRole) => {
        alert(
          `hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  (error) => {
    console.log(error);
  }
);
