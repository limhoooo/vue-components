import { commonCodeEnumList, commonCodeList } from '../api/common/common';
import { blueStatus, dataCodeName, greenStatus, redStatus } from './enum';

// formData validation
// formData 의 모든 프로퍼티 null check
// 상단 dataCodeName 와 연계해서 alert 메세지

// nullCheck 안할 파라미터만 빼고 체크
export const nullValidation = (formData, noneValidation) => {
    if (!noneValidation) {
        noneValidation = [];
    }
    for (let data in formData) {
        if (!formData[data] && !noneValidation.includes(data)) {
            // 값이
            console.log(data);
            alert(dataCodeName[data] + ' 을(를) 입력해주세요.');
            return false;
        }
    }
    return true;
};
// nullCheck 할 파라미터만 체크
export const nullValidation2 = (formData, validation) => {
    for (let i = 0; i < validation.length; i++) {
        if (!formData[validation[i]]) {
            alert(dataCodeName[validation[i]] + ' 을(를) 입력해주세요.');
            /* TODO test log확인용 */
            console.log([validation[i]]);
            return false;
        }
    }
    return true;
};
// email 정규식
export const validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
        alert('이메일형식이 맞지않습니다. \n(ex: abc@naver.com)');
    }
    return re.test(String(email).toLowerCase());
};

// GET call 시 queryString 변환
export const jsonToQueryString = json => {
    return (
        '?' +
        Object.keys(json)
            .map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
            })
            .join('&')
    );
};


// 날짜 버튼
export const setDate = criteria => {
    let now = new Date(); // 현재 날짜 및 시간
    let week7 = new Date(new Date().setDate(new Date().getDate() - 7)); // 일주일전
    let week15 = new Date(new Date().setDate(new Date().getDate() - 15)); // 보름 전
    let month = new Date(new Date().setMonth(new Date().getMonth() - 1)); // 한달 전
    let start_dt;
    let end_dt;
    if (criteria === 'day') {
        start_dt = getFormatDate(now);
        end_dt = getFormatDate(now);
    } else if (criteria === 'week7') {
        start_dt = getFormatDate(week7);
        end_dt = getFormatDate(now);
    } else if (criteria === 'week15') {
        start_dt = getFormatDate(week15);
        end_dt = getFormatDate(now);
    } else if (criteria === 'month') {
        start_dt = getFormatDate(month);
        end_dt = getFormatDate(now);
    } else if (criteria === 'all') {
        start_dt = '';
        end_dt = '';
    }
    let result = {
        start_dt: start_dt,
        end_dt: end_dt,
    };
    return result;
};
// 날짜 변환
export const getFormatDate = date => {
    let year = date.getFullYear(); //yyyy
    let month = 1 + date.getMonth(); //M
    month = month >= 10 ? month : '0' + month; //month 두자리로 저장
    let day = date.getDate(); //d
    day = day >= 10 ? day : '0' + day; //day 두자리로 저장
    return year + '-' + month + '-' + day;
};

export const isNumber = value => {
    // value에는 문자로된 숫자, 음수도 true
    // 실수(소수점) 체크 안됨 false
    let reg = /^[-|+]?\d+$/;
    return reg.test(value);
};

// 객체 복사
export const objectClone = data => {
    let output = [];
    for (let i in data) {
        output[i] = data[i];
    }
    return output;
};
// 객체 복사
// 객체안의 객체까지 복사
// 값이 0 일시 0으로 ( 조건 안걸어줄시 undefined )
export const copyObj = obj => {
    const result = {};
    for (let key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            result[key] = copyObj(obj[key]);
        } else {
            if (!obj[key] && obj[key] !== 0) {
                result[key] = '';
            } else if (!obj[key] && obj[key] === 0) {
                result[key] = 0;
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
};

// 객체 비교
// 배열
export const objectCompare = (modifyObj, copyObj) => {
    let result = [];
    for (let data in modifyObj) {
        //객체 안의 객체
        if (typeof modifyObj[data] == 'object') {
            let depsObj = objectCompare(modifyObj[data], copyObj[data]); // 재귀
            // 객체안의 key 가 0개가 아닐때
            if (depsObj.length !== 0) {
                result.push(depsObj);
            }
        } else if (modifyObj[data] !== copyObj[data]) {
            let obj = {
                title: dataCodeName[data],
                value: data,
                data: copyObj[data],
                changeData: modifyObj[data],
            };
            result.push(obj);
        }
    }
    return result;
};

// 옵션리스트 직렬화
export const optionListJson = optionList => {
    let jsonData = {};
    for (let key in optionList) {
        for (let item in optionList[key]) {
            jsonData[optionList[key][item].value] = optionList[key][item].name;
            jsonData['charge_' + optionList[key][item].chargeId] =
                optionList[key][item].chargeName;
            jsonData['courier_' + optionList[key][item].codeSeq] =
                optionList[key][item].codeNm;
            jsonData['goods_' + optionList[key][item].goodsId] =
                optionList[key][item].goodsName;
            jsonData['openingStore_' + optionList[key][item].openStoreId] =
                optionList[key][item].openStoreName;
            jsonData['saleStore_' + optionList[key][item].storeId] =
                optionList[key][item].storeName;
        }
    }
    console.log(jsonData);
    return jsonData;
};
// html String parse
export const htmlParse = changeDataTextList => {
    let html = '';
    for (let i = 0; i < changeDataTextList.length; i++) {
        if (changeDataTextList[i].changeData) {
            html += `<span style="font-weight: bold">${changeDataTextList[i].title} : </span>
                <span>${changeDataTextList[i].data}</span> >
                   <span>${changeDataTextList[i].changeData}</span><br/>`;
        } else {
            html += `<span style="font-weight: bold">${changeDataTextList[i].title} : </span>
                <span>${changeDataTextList[i].data}</span><br/>`;
        }
    }
    return html;
};
export const setNewDataFnc = (obj, key, value) => {
    if (Object.keys(obj).includes(key)) {
        obj[key] = value;
    } else {
        for (let key1 in obj) {
            if (
                typeof obj[key1] === 'object' &&
                Object.keys(obj[key1]).includes(key)
            ) {
                obj[key1] = setNewDataFnc(obj[key1], key, value);
            }
        }
    }
    return obj;
};

export const formatToNumber = value => {
    return Number(value.replace(/,/gi, ''));
};

export const confirmFor = state => {
    let text = '';
    switch (state) {
        case 'modify':
            text = '수정하시겠습니까?';
            break;
        case 'save':
            text = '저장하시겠습니까?';
            break;
        case 'return':
            // text = '변경사항을 취소하시겠습니까?';
            text = '변경사항을 취소하시겠습니까?';
            break;
    }
    return confirm(text);
};

export const alertFor = state => {
    let text = '';
    switch (state) {
        case 'noChange':
            text = '변경된 내용이 없습니다.';
            break;
        case 'successToSave':
            text = '등록되었습니다.';
            break;
        case 'error':
            text = '등록에 실패하였습니다.';
            break;
    }
    alert(text);
};
export const compareTime = Time => {
    const today = new Date();
    const timeValue = new Date(Time);

    const betweenTime = Math.floor(
        (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }
    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }
    return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const statusColor = status => {
    // eslint-disable-next-line no-prototype-builtins
    if (redStatus.hasOwnProperty(status)) {
        return 'font-hotpink';
    }
    // eslint-disable-next-line no-prototype-builtins
    if (blueStatus.hasOwnProperty(status)) {
        return 'font-royalblue';
    }
    // eslint-disable-next-line no-prototype-builtins
    if (greenStatus.hasOwnProperty(status)) {
        return 'font-green';
    }
};
export const unescapeHtml = str => {
    if (str == null) {
        return '';
    }
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&#39;/g, "'");
};
