<template>
  <div>
    <el-form
      class="detail-form-content"
      ref="ruleForm"
      :model="ruleForm"
      label-width="80px"
    >  
     <el-row>
                    <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'"  label='学号' prop="yonghuUuidNumber">
               <el-input v-model="ruleForm.yonghuUuidNumber"  placeholder='学号' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'"  label='学员姓名' prop="yonghuName">
               <el-input v-model="ruleForm.yonghuName"  placeholder='学员姓名' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'"  label='学员手机号' prop="yonghuPhone">
               <el-input v-model="ruleForm.yonghuPhone"  placeholder='学员手机号' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'"  label='学员身份证号' prop="yonghuIdNumber">
               <el-input v-model="ruleForm.yonghuIdNumber"  placeholder='学员身份证号' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-col :span="12">
             <el-form-item v-if="flag=='yonghu'" label='学员头像' prop="yonghuPhoto">
                 <file-upload
                         tip="点击上传照片"
                         action="file/upload"
                         :limit="3"
                         :multiple="true"
                         :fileUrls="ruleForm.yonghuPhoto?ruleForm.yonghuPhoto:''"
                         @change="yonghuPhotoUploadChange"
                 ></file-upload>
             </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item v-if="flag=='yonghu'"  label='电子邮箱' prop="yonghuEmail">
               <el-input v-model="ruleForm.yonghuEmail"  placeholder='电子邮箱' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-col :span="12">
           <el-form-item v-if="flag=='jiaolian'"  label='教练工号' prop="jiaolianUuidNumber">
               <el-input v-model="ruleForm.jiaolianUuidNumber"  placeholder='教练工号' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-col :span="12">
           <el-form-item v-if="flag=='jiaolian'"  label='教练姓名' prop="jiaolianName">
               <el-input v-model="ruleForm.jiaolianName"  placeholder='教练姓名' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-col :span="12">
           <el-form-item v-if="flag=='jiaolian'"  label='教练手机号' prop="jiaolianPhone">
               <el-input v-model="ruleForm.jiaolianPhone"  placeholder='教练手机号' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-col :span="12">
           <el-form-item v-if="flag=='jiaolian'"  label='教练身份证号' prop="jiaolianIdNumber">
               <el-input v-model="ruleForm.jiaolianIdNumber"  placeholder='教练身份证号' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-col :span="12">
             <el-form-item v-if="flag=='jiaolian'" label='教练头像' prop="jiaolianPhoto">
                 <file-upload
                         tip="点击上传照片"
                         action="file/upload"
                         :limit="3"
                         :multiple="true"
                         :fileUrls="ruleForm.jiaolianPhoto?ruleForm.jiaolianPhoto:''"
                         @change="jiaolianPhotoUploadChange"
                 ></file-upload>
             </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item v-if="flag=='jiaolian'"  label='电子邮箱' prop="jiaolianEmail">
               <el-input v-model="ruleForm.jiaolianEmail"  placeholder='电子邮箱' clearable></el-input>
           </el-form-item>
         </el-col>

         <el-form-item v-if="flag=='users'" label="用户名" prop="username">
             <el-input v-model="ruleForm.username"
                       placeholder="用户名"></el-input>
         </el-form-item>
         <el-col :span="12">
             <el-form-item v-if="flag!='users'"  label="性别" prop="sexTypes">
                 <el-select v-model="ruleForm.sexTypes" placeholder="请选择性别">
                     <el-option
                             v-for="(item,index) in sexTypesOptions"
                             v-bind:key="item.codeIndex"
                             :label="item.indexName"
                             :value="item.codeIndex">
                     </el-option>
                 </el-select>
             </el-form-item>
         </el-col>
         <el-col :span="24">
             <el-form-item>
                 <el-button type="primary" @click="onUpdateHandler">修 改</el-button>
             </el-form-item>
         </el-col>
     </el-row>
    </el-form>
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isMobile,isPhone,isURL,checkIdCard } from "@/utils/validate";

export default {
  data() {
    return {
        ruleForm: {},
        flag: '',
        usersFlag: false,
        // sexTypesOptions : [],
// 注册表 学员
    // 注册的类型字段 学员
        // 性别
        sexTypesOptions : [],
// 注册表 教练
    // 注册的类型字段 教练
        // 性别
        sexTypesOptions : [],
    };
  },
  mounted() {
    //获取当前登录用户的信息
    var table = this.$storage.get("sessionTable");
    this.sessionTable = this.$storage.get("sessionTable");
    this.role = this.$storage.get("role");
    if (this.role != "管理员"){
    }

    this.flag = table;
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.ruleForm = data.data;
// 注册表 学员
// 注册表 教练
      } else {
        this.$message.error(data.msg);
      }
    });

// 注册表 学员 的级联表
// 注册表 教练 的级联表

      this.$http({
          url: `dictionary/page?page=1&limit=100&sort=&order=&dicCode=sex_types`,
          method: "get"
      }).then(({ data }) => {
          if (data && data.code === 0) {
              this.sexTypesOptions = data.data.list;
          } else {
              this.$message.error(data.msg);
          }
      });
  },
  methods: {
    chongzhi() {
      this.$router.replace({ path: "/pay" });
    },
    yonghuPhotoUploadChange(fileUrls) {
        this.ruleForm.yonghuPhoto = fileUrls;
    },
    jiaolianPhotoUploadChange(fileUrls) {
        this.ruleForm.jiaolianPhoto = fileUrls;
    },


    onUpdateHandler() {
                         if((!this.ruleForm.yonghuUuidNumber)&& 'yonghu'==this.flag){
                             this.$message.error('学号不能为空');
                             return
                         }

                         if((!this.ruleForm.yonghuName)&& 'yonghu'==this.flag){
                             this.$message.error('学员姓名不能为空');
                             return
                         }

                             if( 'yonghu' ==this.flag && this.ruleForm.yonghuPhone&&(!isMobile(this.ruleForm.yonghuPhone))){
                                 this.$message.error(`手机应输入手机格式`);
                                 return
                             }
                         if((!this.ruleForm.yonghuIdNumber)&& 'yonghu'==this.flag){
                             this.$message.error('学员身份证号不能为空');
                             return
                         }

                         if((!this.ruleForm.yonghuPhoto)&& 'yonghu'==this.flag){
                             this.$message.error('学员头像不能为空');
                             return
                         }

                             if( 'yonghu' ==this.flag && this.ruleForm.yonghuEmail&&(!isEmail(this.ruleForm.yonghuEmail))){
                                 this.$message.error(`邮箱应输入邮箱格式`);
                                 return
                             }
                         if((!this.ruleForm.jiaolianUuidNumber)&& 'jiaolian'==this.flag){
                             this.$message.error('教练工号不能为空');
                             return
                         }

                         if((!this.ruleForm.jiaolianName)&& 'jiaolian'==this.flag){
                             this.$message.error('教练姓名不能为空');
                             return
                         }

                             if( 'jiaolian' ==this.flag && this.ruleForm.jiaolianPhone&&(!isMobile(this.ruleForm.jiaolianPhone))){
                                 this.$message.error(`手机应输入手机格式`);
                                 return
                             }
                         if((!this.ruleForm.jiaolianIdNumber)&& 'jiaolian'==this.flag){
                             this.$message.error('教练身份证号不能为空');
                             return
                         }

                         if((!this.ruleForm.jiaolianPhoto)&& 'jiaolian'==this.flag){
                             this.$message.error('教练头像不能为空');
                             return
                         }

                             if( 'jiaolian' ==this.flag && this.ruleForm.jiaolianEmail&&(!isEmail(this.ruleForm.jiaolianEmail))){
                                 this.$message.error(`邮箱应输入邮箱格式`);
                                 return
                             }
        if((!this.ruleForm.sexTypes) && this.flag!='users'){
            this.$message.error('性别不能为空');
            return
        }
      if('users'==this.flag && this.ruleForm.username.trim().length<1) {
        this.$message.error(`用户名不能为空`);
        return	
      }
      this.$http({
        url: `${this.$storage.get("sessionTable")}/update`,
        method: "post",
        data: this.ruleForm
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "修改信息成功",
            type: "success",
            duration: 1500,
            onClose: () => {
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
