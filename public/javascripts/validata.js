/**
 * Created by brady on 2019/3/20.
 */

//验证
let validata = (validataArr) => {
  let flag = true
  validataArr.forEach(element => {
    if(!flag) return false
    switch(element.type) {
      //验证数据是否为空
      case 'isnull':
        if(element.val == '' || element.val == null) {
          alert(`${element.name}不能为空`);
          flag = false
        }
      break;
      //验证手机号码
      case 'phone':
        if(!/^1[345678]\d{9}$/.test(element.val)) {
          alert(`请输入正确的${element.name}`);
          flag = false
        }
        break;
    }
  });
  return flag;
}

