"use strict";

// 기존의 존재하는 것 위에 좀 더 간편하게 사용할 수 있게 하는것을
// syntactic sugar 라고 한다.

// 1. async 써보기

function fetchUser() {
  //do network request in 10secs...
  return "harry";
}

// const user = fetchUser();

console.log(user);

// 비동기적인 처리를 해주지 않으면 10초가 걸리기 때문에 사용자는 10초정도 비어있는 웹페이지를 보고있게 된다.

// 지난시간엔 Promise를 썼다.

function fetchUser() {
  return new Promise((resolve, reject) => {
    //resolve, reject 호출하지않고 그냥 return하면 promise가 pending상태가 된다.
    // return "harry";
    resolve("harry");
  });
}
// 내가 언제 유저의 데이터를 받아올 진 모르겠지만
// promise에 then만 준비해두면 들어오는대로 내가 불러줄게.

// pending, fulfilled, failed 등 상태가 있다.
// promise안에는 꼭 리졸브, 리젝으로 완료를 해줘야한다.
// fulfilled로 바뀌고 result가 harry가 된다.

// const user = fetchUser();는 프로미스를 리턴하기 때문에
// user.then(console.log);로 실행시킬 수 있다.

// 1. async
async function fetchUser() {
  return "harry";
}

const user = fetchUser();
user.then(console.log);
console.log(user);

//async를 이용하면 바로 promise로 만들어진다.

// 2. await

// async가 붙은 함수 안에서만 쓸 수 있는데
// 딜레이라는 함수는 프로미스를 리턴하는데 정해진 ms가 지나면 resolve를 호출하는 프로미스를 리턴.

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(3000); //3초가 지나면 resolve를 호출. 3초동안 기다렸다가 사과를 리턴하는 프로미스가 만들어진다.
  return "사과";
}

async function getBanana() {
  await delay(3000);
  return "바나나";
}

// 굳이 promise로 만들어 보자면,
function getBanana() {
  return delay(3000).then(() => "바나나");
}

//promise도 콜백지옥과 비슷해져버린다.
// function pickFruits() {
//   return getApple().then((apple) => {
//     return getBanana().then((banana) => `${apple} + ${banana}`);
//   });
// }

// pickFruits().then(console.log);

// 6초정도 기다리면 사과와 바나나가 나온다.

// async function pickFruits() {
//   const apple = await getApple();
//   const banana = await getBanana();
//   return `${apple} + ${banana}`;
// }

// pickFruits().then(console.log);

//
//
//에러처리

// async function getApple() {
//     await delay(3000);
//     throw 'error'; //이렇게..
//     return "사과";
//   }

//   async function pickFruits() {
//    try {
//        const apple = await getApple();
//        const banana = await getBanana();
//    } catch() {
//   try, catch문 이용해 에러처리도 가능.
//    }
//    return `${apple} + ${banana}`;
//   }

//   pickFruits().then(console.log);

// 문제점 - 병렬처리.

async function pickFruits() {
  const applePromise = getApple();
  const bananaPromise = getBanana();
  const apple = await applePromise; //3초 걸림
  const banana = await bananaPromise; //3초 걸림
  return `${apple} + ${banana}`;
}
// 바나나와 사과는 연관이 없기 때문에 기다릴 필요가 없다.
// 프로미스 만들면 바로 프로미스 안의 코드블록이 실행되는 것을 이용.
// 병렬적으로 사과, 바나나를 동시에 따서 기다렸다가 바로 출력.

// 그러나,
// 이것도 쓰지 않는다. 훨씬 깔끔한 코드가 있다.

//useful promise APIs
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]) //모든 프로미스를 병렬적으로 다 받을때까지 모아주는 기능.
    .then((fruits) => fruits.join("+"));
}
pickAllFruits().then(console.log);

//다른 방법.

function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log);
//하나만 먼저 수행되는애가 전달되는 기능.
