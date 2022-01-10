"use strict";

//promise is a javascript object for asynchronous operation.
// 1. state 상태, pending => fulfilled state가 됨. or rejected 실패.
// 2. producer vs consumer

// 1. producer
//새로운 프로미스가 생길때 executor가 바로 실행됨.

const promise = new Promise((resolve, reject) => {
  //doing some heavy work(network, read files)
  console.log("doing something...");
  setTimeout(() => {
    // resolve("heyho");
    reject(new Error("no network"));
  }, 2000);
});

// 2. consumer: then, catch, finally 이용해 값을 받아올 수 있다.

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("finally"); //성공,실패 상관없이 마지막에
  });

//   3. Promise Chaning
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num));

//   4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("닭"), 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => egg`), 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => fry`), 1000);
  });

getHen()
  .then((hen) => getEgg(hen))
  .then((egg) => cook(egg))
  .then((meal) => console.log(meal));
