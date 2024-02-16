<template>
  <!-- 忘记密码 -->
  <el-dialog
    v-model="state.forgetPasswordDialog"
    title="忘记密码"
    width="400px"
  >
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="输入您的注册账号" prop="account">
        <el-input v-model="forgetData.account" placeholder="输入您的注册账号" />
      </el-form-item>
      <el-form-item label="输入您的个人邮箱" prop="email">
        <el-input v-model="forgetData.email" placeholder="输入您的个人邮箱" />
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.forgetPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="verifyAccount"> 下一步 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 修改密码 -->
  <el-dialog
    v-model="state.changePasswordDialog"
    title="修改密码"
    width="400px"
  >
    <el-form class="login-form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="输入您的新密码" prop="password">
        <el-input
          v-model="forgetData.password"
          placeholder="输入您的新密码"
          show-password
        />
      </el-form-item>
      <el-form-item label="再次确认您的新密码" prop="nextPassword">
        <el-input
          v-model="forgetData.nextPassword"
          placeholder="再次确认您的新密码"
          show-password
        />
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.changePasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="resetPassword"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { verify, reset } from "@/api/login.js";
import { ElMessage } from "element-plus";
// 表单对齐方式
const labelPosition = ref("top");
// 表单对象
const forgetData = reactive({
  account: null,
  email: "",
  password: "",
  nextPassword: "",
});
// 表单规则
const rules = reactive({
  account: [{ required: true, message: "请输入您的注册账号", trigger: "blur" }],
  email: [{ required: true, message: "请输入您的注册邮箱", trigger: "blur" }],
  password: [
    { required: true, message: "请输入您想修改的密码", trigger: "blur" },
  ],
  nextPassword: [
    { required: true, message: "请再次确认您的新密码", trigger: "blur" },
  ],
});
// 控制弹窗 默认关闭
const state = reactive({
  forgetPasswordDialog: false,
  changePasswordDialog: false,
});

// 打开验证邮箱和账号的弹窗
const verifyAccount = async () => {
  const res = await verify(forgetData);
  if (res.status == 0) {
    ElMessage({
      message: "验证成功",
      type: "success",
    });
    // localStorage.setItem 存放到浏览器的本地存储空间
    // sessionStorage.setItem 存放到浏览器的会话存储空间
    localStorage.setItem("id", res.id);
    state.forgetPasswordDialog = false;
    state.changePasswordDialog = true;
  } else {
    ElMessage.error("验证失败");
  }
};
// 重置密码
const resetPassword = async () => {
  if (forgetData.password == forgetData.nextPassword) {
    const newPassword = forgetData.nextPassword;
    // localStorage/sessionStorage.getItem获取我们存储在浏览器的数据
    // 调用接口
    await reset(localStorage.getItem("id"), newPassword);
    ElMessage({
      message: "修改成功",
      type: "success",
    });
  } else {
    ElMessage.error("修改失败,请检查密码是否一致");
  }
};
// 打开弹窗
const open = () => {
  state.forgetPasswordDialog = true;
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped></style>
