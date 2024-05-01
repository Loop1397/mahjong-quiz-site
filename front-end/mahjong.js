/*
마작 패 검사하는 알고리즘을 만들거임.
마작은 모든 패가 4개씩 존재함.
마작은 게임을 이기기 위해선 14개의 패로 머리1개와 몸통 4개를 만들어여야함
머리는 같은 패 2개가 있으면 되고, 몸통은 같은패 3개나, 연속되는 패 3개가 있으면 충족됨.
*/

// 인자로 몸통이나 머리 등을 뗀 손패 배열, 떼어진 몸통과 머리가 들어간 완성패 배열, 이 들어가야함
// 처음 전달받는 건 손패 배열과 빈 배열
const mahjong = (handTileArr, completedTileArr) => {

    // 먼저 몸통을 뗌
    // 만약 조건이 맞아서 몸통이 떼어질 때마다 처음부터 다시 검사 < 재귀함수
    // 완성 판단? -> 최종적으로 handTileArr.length = 0이되면 완성
    // 만약 완성됐다면 True와 함께 머리와 몸통이 들어간 2차원 배열 반환
    // 완성되지 않았다면 False와 빈 배열 반환
    // 치또이쯔(머리가 7개인 역)도 만족하도록 만들기
    // 국사무쌍은 따로 제작

    for(let i = 0; i < handTileArr.length; i++) {
        // 커쯔(3개의 같은 패로 이루어진 몸통) 판별
        // if()
    
        // 슌쯔(3개의 연속된 패로 이루어진 몸통) 판별
    
    
        // 머리 판별
        // 어차피 몸통 다 떼진 뒤에 판별할테니까 머리는 맨 마지막에 판별
        if(handTileArr[i] === handTileArr[i+1]) {
            completedTileArr.push(handTileArr.splice(i, 2));
            mahjong(handTileArr, completedTileArr);
        }
    }

    if( handTileArr.length === 0 ) {
        return [true, completedTileArr];
    } else {
        return [false, completedTileArr];
    }
}








handTileArr = [1, 2, 2, 3, 3, 3, 4, 4, 5, 6, 6, 7, 7, 7]
const [ result, completedTileArr ] = mahjong(handTileArr, []);
console.log(result, completedTileArr);

handTileArr2 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]
const [ result2, completedTileArr2 ] = mahjong(handTileArr2, []);
console.log(result2, completedTileArr2);