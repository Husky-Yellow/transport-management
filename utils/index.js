export const getBaseUrl = () => "http://180.76.185.112";

/** 格式化数字
 * @param {date} n 时间是单天的增加0 例: 6-1
 * @return {date} n 时间是单天的增加0 例: 06-01
 */
export const formatNumber = (n) => {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
};

/*
 * 判断昨今明
 * */
export const caleDate = (dayStr) => {
  dayStr = new Date(dayStr).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  const dateObj = {
    "-86400000": "yesterday",
    0: "today",
    86400000: "tomorrow",
  };
  return dateObj[dayStr - today] || "超出昨今明范围";
};

export const isVehicleNumber = (vehicleNumber) => {
  const express =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
  let result = false;
  if (vehicleNumber.length == 7) result = express.test(vehicleNumber);
  return result;
};

// const isMobile = phonenum => /^1[3456789]\d{9}$/.test(phonenum);
export const isMobile = (phonenum) => /^1\d{10}$/.test(phonenum);

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 */
 export const debounce = (fn,wait=1000) => {
  var timerId = null;
  var flag = true;
  return function(){
    clearTimeout(timerId);
    if(flag){
      fn.apply(this,arguments);
      flag = false
      }
    timerId = setTimeout(() => { flag = true},wait)
  }
}
