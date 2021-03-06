<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" 
        :key="item.id" 
        :class="{'current': item.current}"
        @click="toggleMenu(item)">{{ item.txt }}</li>
      </ul>

      <!-- 表单  start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium"> 
        <el-form-item prop="username" class="form-item">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="form-item"> 
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
         <el-form-item prop="passwordRepeat" class="form-item" v-if="model === 'register'"> 
          <label for="passwordRepeat">重复密码</label>
          <el-input id="passwordRepeat" type="password" v-model="ruleForm.passwordRepeat" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="form-item">
          <label for="code">验证码</label>
          <el-row :gutter="11">
            <el-col :span="15"><el-input id="code" v-model="ruleForm.code"></el-input></el-col>
            <el-col :span="9">
              <el-button type="success" 
              class="btn-block" 
              @click="getCode()" 
              :disabled="codeButton.state">
                {{ codeButton.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" 
          class="btn-block login-btn" 
          @click="model === 'register' ? register() : login()" 
          :disabled = "loginButtonState">
            {{ model === 'register' ? "注册" : "登录" }}
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 表单  end -->
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1';             // 加密
import { getSmsApi, loginApi, registerApi } from '@/api/login.js';  // 获取验证码,登陆注册表单提交
import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from '@vue/composition-api';
import { stripscript, validateEmail, validatePass, validateCode } from '@/utils/validate';  // 验证输入框
export default {
  name: 'Login',
  setup(props, { refs, root }) {
    /*****************************************
     * 校验函数
     */
    // 检验用户名
    let checkUsername = (rule, value, callback) => {  
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else if (! validateEmail(value)) {
        callback(new Error('请输入正确的邮箱'));
      } else {
        callback();
      }
    };
    // 验证密码
    let checkPassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (! validatePass(value)) {
        callback(new Error('请输入6-20位数字+字母'));
      } else {
        callback();
      }
    };
    // 验证重复密码
    let checkPasswordRepeat = (rule, value, callback) => {
      ruleForm.passwordRepeat = stripscript(value);
      value = ruleForm.passwordRepeat;
      if (value === '') {
        callback(new Error('请重复密码'));
      } else if (value !== ruleForm.password) {
        console.log(ruleForm)
        callback(new Error('请重新输入'));
      } else {
        callback();
      }
    };
    // 验证验证码
    var checkCode = (rule, value, callback) => {
      // ruleForm.code = stripscript(value);
      // value = ruleForm.code;                                
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if (! validateCode(value)) {
        callback(new Error('请输入正确的验证码'));
      } else {
        callback();
      }
    };
    /* *************************************************
    *  声明数据
    */
    const menuTab = reactive([
      {txt: '登录', current: true, model: 'login'},
      {txt: '注册', current: false, model: 'register'}
    ]);
    // 模块值
    const model = ref('login');
    // 倒计时定时器
    const timer = ref(null); 
    // 登录按钮禁用状态
    const loginButtonState = ref(true);
    // 获取验证码按钮状态
    const codeButton = reactive({
      state: false,
      text: '获取验证码'
    })
    // 表单绑定数据    
    const ruleForm =  reactive({
      username: '',
      password: '',
      passwordRepeat: '',
      code: ''
    });
    // 表单的验证
    const rules =  reactive({
      username: [
        { validator: checkUsername, trigger: 'blur' }
      ],
      password: [
        { validator: checkPassword, trigger: 'blur' }
      ],
      code: [
        { validator: checkCode, trigger: 'blur' }
      ],
      passwordRepeat: [
        { validator: checkPasswordRepeat, trigger: 'blur' }
      ]
    });
    /* *************************************************
    *  声明函数
    */
    /**
     * 切换登录注册
     */
    const toggleMenu = (item) => {
      menuTab.forEach(x => x.current = false);
      item.current = true;
      model.value = item.model;
      // 清掉表单内容
      refs.loginForm.resetFields();
      // 恢复获取验证码
      clearCountDown();
    };
    /**
     * 获取验证码
     */
    const getCode = () => {
      if (ruleForm.username == '') {
        root.$message.error('邮箱不能为空');
        return false;
      }
      // 给接口传送的数据
      let requestData = model === 'login'? 
      {
        username: ruleForm.username,
      } : {
        username: ruleForm.username,
        module: 'register'
      }
      // 把获取验证码按钮给禁用掉，显示发送中
      codeButton.state = true;
      codeButton.text = '发送中';
      // 过2s后再发送请求并接收响应
      setTimeout(() => {
        getSmsApi(requestData).then(response => {
          let data = response.data;
          // 成功返回的话提示一下
          root.$message({
            message: data.message,
            type: 'success'
          })
          // 启用登录或注册按钮
          loginButtonState.value = false;
          countDown(20);
        }).catch(err => {
          console.log(err);
        })
      }, 2000);
    }
    /**
     * 提交登录表单
     */
    const login = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      }
      root.$store.dispatch('app/login', requestData).then(res => {
        let data = res.data;
        root.$message({
          message: data.message,
          type: 'success'
        })
        root.$router.push({
          name: 'Console',
        })
      }).catch(err => {
        console.log(err);
      });
      // loginApi(requestData).then(res => {
      //   let data = res.data;
      //   root.$message({
      //     message: data.message,
      //     type: 'success'
      //   })
      //   root.$router.push({
      //     name: 'Console',
      //   })
      // }).catch(err => {
      //   console.log(err);
      // })
    };
    /**
     * 提交注册表单
     */
    const register = () => {
      let data = res.data;
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      }
      registerApi(requestData).then(res => {
        root.$message({
          message: data.message,
          type: 'success'
        })
      }).catch(err => {
        console.log(err);
      })
    };
    /**
     * 倒计时
     */
    const countDown = (number) => {
      let time = number;
      timer.value = setInterval(() => {
        time--;
        codeButton.text = `倒计时${time}秒`
        if (time == 0) {
          // 清除定时器
          clearInterval(timer.value);
          // 启用获取验证码
          codeButton.state = false;
          codeButton.text = '重新发送';
        }
      }, 1000)
    }
    /**
     * 清除倒计时，恢复默认状态
     */
    const clearCountDown = () => {
      clearInterval(timer.value);
      codeButton.state = false;
      codeButton.text = '获取验证码';
    }
    return {
      menuTab,
      model,
      loginButtonState,
      codeButton,
      ruleForm,
      rules,
      toggleMenu,
      getCode,
      register,
      login
    }
  },

}
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  #login {
    background-color: #344a5f;
    height: 100vh;
  }
  .login-wrap {
    width: 330px;
    margin: auto;
  }
  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      border-radius: 2px;
      color: #cacdd0;
      cursor: pointer;
    }
    .current {
      background-color: #2f4255;
    }
  }
  .login-form {
    margin-top: 29px;
    label {
      display: block;
      text-align: left;
      color:#cacdd0;
      font-size: 14px;
      margin-bottom: 3px;
    }
    .form-item {
      margin-bottom: 13px;
    }
    .btn-block {
      width: 100%;
      display: block;
      color: #fffbfb;
    }
    .login-btn {
      margin-top: 19px;
    }
  }
</style>