/* 
 * 过滤特殊字符
 */
export function  stripscript(s)  {
    var  pattern  =  new  RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【 】‘；：”“'。，、？]")
    var  rs  =  "";  
    for  (var  i  =  0;  i  <  s.length;  i++)  {
        rs  =  rs  +  s.substr(i,  1).replace(pattern,  '');
    }
    return  rs;
}

/* 
 *  验证邮箱格式
 */
export function validateEmail(value) {
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-z0-9A-Z]+\.([a-zA-Z]{2,4})$/; // 邮箱的正则
    return !reg.test(value) ? false : true;
}

/* 
 *  验证密码，6-20位数字加字母
 */
export function validatePass(value) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/; // 密码的正则 6-20数字加字母
    return !reg.test(value) ? false : true;
}

/* 
 *  验证码校验
 */
export function validateCode(value) {
    let reg = /^[a-z0-9]{6}$/; // 验证码的正则  6位数字或字母
    return !reg.test(value) ? false : true;
}
