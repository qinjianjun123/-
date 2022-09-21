<template>
  <!-- 版芯 -->
  <!-- <div class="text">
    Vue穿梭框想法和思路:
    <span>1.判断选中的就是判断数据重check 的状态,默认为false(不选中),如果check的状态等于true的话那么该input就是被选中的状态。</span>
    <span>2.获取全部值的长度,附个值,然后将这个值双向绑定到html 中 显示的为总数,这里需要用到字符串拼接</span>
    <span>3.穿梭:将获取到的值赋一个变量中，然后将这个变量储存到(左/右)边穿梭框中，如果穿梭前的框中的长度等于false 的话那么就将这个input 和值从该框中删除。实现穿梭功能</span>
  </div> -->
  <div class="box">
    <!-- 左边盒子 -->
    <div class="left-box">
      <div class="left-top">
        <input type="checkbox" class="whole" v-model="leftCheckAll" @change="leftAll()">&nbsp;全选<span
          class="left-span">{{num()}}/{{leftData.length}}</span>
      </div>
      <div class="dataUl">
        <ul v-for="jsonList in leftData">
          <li>
            <input type="checkbox" v-model="jsonList.check" :disabled="jsonList.disabled" @change="curCheckChange()">{{
            jsonList.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 穿梭到左边的按钮 -->
    <button @click="goLeft()" class="btn" id="leftBtn">&lt;</button>
    <!-- 穿梭到右边的按钮 -->
    <button @click="goRight()" class="btn" id="rightBtn">&gt;</button>
    <!-- 右边盒子 -->
    <div class="right-box">
      <div class="right-top">
        <input type="checkbox" class="whole" v-model="rightCheckAll" @change="rightAll()">&nbsp;全选<span
          class="right-span">{{num1()}}/{{rightData.length}}</span>
      </div>
      <div class="dataUl">
        <ul v-for="jsonList in rightData">
          <li>
            <!-- chanfe="" 这里指点击发生改变 -->
            <input type="checkbox" v-model="jsonList.check" @change="curCheckChange2()">{{ jsonList.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
let leftData = ref([
  { name: "Option1", check: false },
  { name: "Option2", check: false },
  { name: "Option3", check: false },
  { name: "Option4", check: false },
  { name: "Option5", check: false },
  { name: "Option6", check: false },
  { name: "Option7", check: false },
  { name: "Option8", check: false },
  { name: "Option9", check: false },
  { name: "Option10", check: false },
  { name: "Option11", check: false },
  { name: "Option12", check: false },
  { name: "Option13", check: false },
  { name: "Option14", check: false },
  { name: "Option15", check: false }
]);

//右边数据 的数组
let rightData = ref([]);
//右按钮的点击事件
function goRight() {
  //左侧选中的数据
  let selectData = this.leftData.filter(jsonList => jsonList.check); //返回的是一个数组 过滤出被选中的元素
  //this.rightData.push(...selectData);//直接push进去
  //this.rightData = selectData; 选中的数据直接给到右边框里
  this.rightData = this.rightData.concat(selectData);//数组合并 concat拼接字符串 ES5中
  //this.rightData = [...this.rightData,...(selectData)]; //ES6 中拼接字符串的方法
  //删除左边选中的数据
  this.leftData = this.leftData.filter(jsonList => jsonList.check == false);
};

//左边按钮点击事件
function goLeft() {
  let selectData = this.rightData.filter(jsonList => jsonList.check);//返回的是选中的数组
  this.leftData.push(...selectData);//转化形式,这里直接push
  //删除右边选中的数据
  this.rightData = this.rightData.filter(jsonList => jsonList.check == false)
};


//选中了多少个
// let num = ref(0);
//左边的单独选中
// function Btn(){
//   let rigBtn = document.getElementById('leftBtn');
//   rigBtn.classList.add(".curr");
// }
function num() {
  // Btn();
  // console.log(this.leftData.filter(jsonList=>jsonList.check).length);
  return this.leftData.filter(jsonList => jsonList.check).length; //选中的元素return 到num 然后把 num 绑定到html 元素中

}
//右边的单独选中
function num1() {
  // console.log(this.leftData.filter(jsonList=>jsonList.check).length);
  return this.rightData.filter(jsonList => jsonList.check).length; //选中的元素return 到num 然后把 num 绑定到html 元素中
}//这两个num 可以使用复用的方式来写

//全选
//左边全选中
// let leftCheckAll = false;//默认左边的不全选 或 全选
let leftCheckAll = ref(false);
function leftAll() {
  this.leftData.forEach(jsonList => jsonList.check = this.leftCheckAll);//check的状态等同于当前全选的状态
}

//右边全选中
let rightCheckAll = ref(false);
function rightAll() {
  this.rightData.forEach(jsonList => jsonList.check = this.rightCheckAll);
}

//如果一个不选中，则全选不选中
function curCheckChange() {
  let SingleChoice = this.leftData.filter(jsonList => jsonList.check).length;
  // console.log(SingleChoice);
  //判断选中的长度 等不等于 总的长度
  // if (SingleChoice == this.leftData.length) {
  //   //如果等于那么全选按钮则选中
  //   this.leftCheckAll = true;
  // } else {
  //   //如果不等于的话那么全选按钮不被选中
  //   this.leftCheckAll = false;
  // }
  //三目运算符的写法
  SingleChoice == this.leftData.length ? this.leftCheckAll = true:this.leftCheckAll = false;
  // console.log(this.leftData.length);
  // console.log(SingleChoice);
  // console.log(this.leftCheckAll);
}
//右边的
function curCheckChange2() {
  let SingleChoice2 = this.rightData.filter(jsonList => jsonList.check).length;
  // console.log(SingleChoice);
  //判断选中的长度 等不等于 总的长度
  if (SingleChoice2 == this.rightData.length) {
    //如果等于那么全选按钮则选中
    this.rightCheckAll = true;
  } else {
    //如果不等于的话那么全选按钮不被选中
    this.rightCheckAll = false;
  }
}
</script>

<style scoped>
.curr {
  background-color: red;
}

.text {
  width: 300px;
  height: 600px;
  border: 5px solid red;
  float: left;
  line-height: 30px;
}

.box {
  margin: 0 auto;
  width: 1000px;
  height: 600px;
}

.left-box {
  width: 300px;
  height: 600px;
  float: left;
}

.left-top {
  width: 100%;
  height: 70px;
  background-color: rgb(252, 252, 252);
  border: 1px solid #1376C9;
  color: darkgray;
  border-bottom: #FFFFFF;
}

.right-top {
  width: 100%;
  height: 70px;
  background-color: rgb(252, 252, 252);
  border: 1px solid #1376C9;
  color: darkgray;
  border-bottom: #FFFFFF;
}

.whole {
  margin: 27px 0 20px 20px;
}

.left-span {
  float: right;
  margin-top: 20px;
  margin-right: 10px;
}

.right-span {
  float: right;
  margin-top: 20px;
  margin-right: 10px;
}

ul li {
  list-style: none;
  cursor: pointer;
}

li:hover {
  color: #1376C9;
}

.dataUl {
  width: 300px;
  border: 1px solid #1376C9;
  height: 530px;
  overflow-x: hidden;
}

.right-box {
  float: right;
  width: 300px;
  height: 600px;
}

.btn {
  margin-left: 82px;
  margin-top: 100px;
  width: 70px;
  height: 40px;
  color: aliceblue;
  background-color: blue;
  border: blue;
  border-radius: 10px;
}

.btn:hover {
  background-color: black;
  color: aliceblue;
}
</style>

