/*
마작 패 검사하는 알고리즘을 만들거임.
마작은 모든 패가 4개씩 존재함.
마작은 게임을 이기기 위해선 14개의 패로 머리1개와 몸통 4개를 만들어여야함
머리는 같은 패 2개가 있으면 되고, 몸통은 같은패 3개나, 연속되는 패 3개가 있으면 충족됨.
*/

/** 
 * TODO
 * [ ] : 그리드법으로 바꿔야함
 */
// 인자로 몸통이나 머리 등을 뗀 손패 배열, 떼어진 몸통과 머리가 들어간 완성패 배열, 이 들어가야함
// 처음 전달받는 건 손패 배열과 빈 배열
const mahjong = (handTileArr, completedTileArr, cntO, cntT) => {
    result = [];
    // 먼저 몸통을 뗌
    // 만약 조건이 맞아서 몸통이 떼어질 때마다 처음부터 다시 검사 < 재귀함수
    // 완성 판단? -> 최종적으로 handTileArr.length = 0이되면 완성
    // 국사무쌍은 따로 제작

    if (handTileArr.length === 0 && (completedTileArr.length === 5 || completedTileArr.length === 7)){
        result.push(completedTileArr, cntT, cntO);
    }

    // 커쯔(3개의 같은 패로 이루어진 몸통) 판별
    if(handTileArr.filter(e => e === handTileArr[0]).length === 3) {
        let newHandTileArr = [...handTileArr];
        let newCompletedTileArr = [...completedTileArr];

        cntT += 1;
        newCompletedTileArr.push(newHandTileArr.splice(0, 3));
        
        mahjong(newHandTileArr, newCompletedTileArr, cntT, cntO);
    }

    // 슌쯔(3개의 연속된 패로 이루어진 몸통) 판별
    // 만약 현재 위치 기준 +1 및 +2의 값이 발견되지 않는 경우, location[1]과 location[2]는 -1이 됨(location[0]은 무조건 현재 숫자)
    let location = [0, handTileArr.findIndex(e => e === (handTileArr[0] + 1)), handTileArr.findIndex(e => e === (handTileArr[0] + 2))];
    if(location[1] !== -1 && location[2] !== -1) {
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
        
        mahjong(newHandTileArr, newCompletedTileArr, cntT, cntO);
    }


    // 머리 판별
    if(handTileArr[0] === handTileArr[0 + 1] && handTileArr.length !== 0) {
        let newHandTileArr = [...handTileArr];
        let newCompletedTileArr = [...completedTileArr];
        newCompletedTileArr.push(newHandTileArr.splice(0, 2));

        mahjong(newHandTileArr, newCompletedTileArr, cntT, cntO);
    }
}



let result = [];
//커쯔 카운트
cntT = 0;
//슌쯔 카운트
cntO = 0;
const arr = [
    [1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 6, 7, 7, 7],
    [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7],
    [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9],
    [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5],
    [1, 1, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 9],
    [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5]
];

arr.forEach(element => {
    console.log(`handTile : ${element}`);
    mahjong(element, [], cntT, cntO);
    console.log(result);
});

