/**
 * TODO
 * [ ] : 국사무쌍 판정 제작
 */

/**
 * 
 * @param {*} handTileArr 
 * @param {*} completedTileArr 
 * @param {*} cntT 
 * @param {*} cntO 
 * @param {*} cntH 
 */

// 인자로 몸통이나 머리 등을 뗀 손패 배열, 떼어진 몸통과 머리가 들어간 완성패 배열, 이 들어가야함
// 처음 전달받는 건 손패 배열과 빈 배열
const mahjong = (handTileArr, completedTileArr, cntT, cntO, cntH) => {
    // 만약 조건이 맞아서 몸통이 떼어질 때마다 처음부터 다시 검사 < 재귀함수

    if ((cntT + cntO === 4 && cntH === 1) || cntH === 7){
        result.push(completedTileArr, cntT, cntO, cntH);
    }

    // 커쯔(3개의 같은 패로 이루어진 몸통) 판별
    if(handTileArr.filter(e => e === handTileArr[0]).length === 3) {
        let newHandTileArr = [...handTileArr];
        let newCompletedTileArr = [...completedTileArr];

        cntT += 1;
        newCompletedTileArr.push(newHandTileArr.splice(0, 3));
        
        mahjong(newHandTileArr, newCompletedTileArr, cntT, cntO, cntH);
        cntT -= 1;
    }

    // 슌쯔(3개의 연속된 패로 이루어진 몸통) 판별
    // 만약 현재 위치 기준 +1 및 +2의 값이 발견되지 않는 경우, location[1]과 location[2]는 -1이 됨(location[0]은 무조건 현재 숫자)
    // 자패는 슌쯔가 적용되면 안되기 때문에 handTileArr[0]도 체크
    let location = [0, handTileArr.findIndex(e => e === (handTileArr[0] + 1)), handTileArr.findIndex(e => e === (handTileArr[0] + 2))];
    if(location[1] !== -1 && location[2] !== -1 && handTileArr[0] < 30) {
        let newHandTileArr = [...handTileArr];
        let newCompletedTileArr = [...completedTileArr];

        cntO += 1;
        newCompletedTileArr.push([newHandTileArr[0], newHandTileArr[0] + 1, newHandTileArr[0] + 2]);
        // 슌쯔의 뒷 번호부터 지워주기위해 반전
        // 앞 번호부터 지우면 지울 때마다 handTileArr가 변동되어 원래 찾은 index값이 달라짐
        // 예를들어, [0, 2, 3]에 위치한 배열을 순서대로 지울 경우, 0을 지우면 그 다음 원래 2에 있던 값이 1로 당겨지기 때문에 reverse가 필요
        location.reverse();
        location.forEach(e => {
            newHandTileArr.splice(e, 1);
        });
        
        mahjong(newHandTileArr, newCompletedTileArr, cntT, cntO, cntH);
        cntO -= 1;
    }

    // 머리 판별
    if(handTileArr[0] === handTileArr[0 + 1] && handTileArr.length !== 0) {
        let newHandTileArr = [...handTileArr];
        let newCompletedTileArr = [...completedTileArr];

        cntH += 1;
        newCompletedTileArr.push(newHandTileArr.splice(0, 2));

        mahjong(newHandTileArr, newCompletedTileArr, cntT, cntO, cntH);
    }
}

// 점수(역) 계산 함수
// 
const faanCheck = (handCount, cntT, cntO, cntH) => {
    if (cntT === 4) {
        return 32000;
    }
}

let result = [];
const arr = [
    // [1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 7, 7, 7, 8],
    [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
    // [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9],
    // [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5],
    // [1, 1, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 9],
    // [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5],
    // [1, 1, 1, 1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 7],
    // [1, 1, 1, 2, 2, 3, 3, 4, 21, 22, 23, 21, 22, 23],
    // [31, 31, 31, 32, 32, 32, 33, 33, 33, 34, 34, 34, 35, 35]
];

arr.forEach(element => {
    result = [];

    handCount = new Array(38).fill(0);
    element.forEach(e => {
        handCount[e] += 1;
    });

    // console.log(`handTile : ${handCount}`);
    // handCheck(handCount, [], 0, 0, 0);
    // console.log(result);

    console.log(`handTile : ${element}`);
    mahjong(element, [], 0, 0, 0);
    console.log(result);
});

