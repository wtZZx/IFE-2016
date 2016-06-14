<template>
    <article class="quenar-wrap">
        <div class="title-wrap">
            <span class="title">标题</span>
            <span class="end-time">截止时间</span>
            <span class="state">状态</span>
            <span class="operate">操作</span>
            <button type="button" class="create-new" v-link="{ path: '/Create' }">新建问卷</button>
        </div>
        <ul class="question-list">
            <li v-for="queNar in questionnaireList" class="que-nar">
                <input type="checkbox" name="que-list-input" value="{{ queNar.id }}" v-on:click="checkedList">
                <span class="que-nar-name">{{ queNar.title }}</span>
                <span class="que-nar-endTime">{{ queNar.endTime }}</span>
                <span class="state-in que-nar-state" v-if="queNar.state === 1">发布中</span>
                <span class="state-no que-nar-state" v-if="queNar.state === 0">未发布</span>
                <span class="state-end que-nar-state" v-if="queNar.state === -1">已结束</span>
                <button class="opt-button" v-if="queNar.state === 1" v-link="{ path: 'Join/'+ $index }">参与问卷</button>
                <button class="opt-button" v-if="queNar.state === 0">编辑</button>
                <button class="opt-button" v-on:click="delThisQue" value="{{ queNar.id }}">删除</button>
                <button class="opt-button">查看数据</button>
            </li>
        </ul>
        <div class="del-panel">
            <input type="checkbox" id="select-all" v-on:change="selectAll">
            <label for="select-all">全选</label>
            <button class="opt-button" v-on:click="delQueNar">删除</button>
        </div>
    </article>
    <popup v-bind:show.sync="showPopup">
        <div slot="body">
            <p>确认删除此问卷？</p>
        </div>
        <div slot="footer">
            <button class="opt-button true-del" v-on:click="trueDelQue">确认</button>
            <button class="opt-button" v-on:click="showPopup = false">取消</button>
        </div>
    </popup>
</template>

<script>
import store from '../src/store'
import Popup from './Popup.vue'

export default {
    components: {
        Popup
    },
    data () {
        var data = store.fetch();
        return {
            data: data,
            showPopup: false,
            hopeDel: undefined,
            questionnaireList: data.questionnaireList
        }
    },
    computed: {
        queListInput () {
            return document.querySelectorAll('input[name=que-list-input]');
        }
    },
    methods: {
        selectAll () {
            var queListInput = this.queListInput;
            for(let i = 0, len = queListInput.length; i < len; i++) {
                if(queListInput[i].getAttribute('checked')) {
                    queListInput[i].removeAttribute('checked');
                } else {
                    queListInput[i].setAttribute('checked', true);
                } 
            }
        },
        checkedList () {
            var target = event.target;
            if(!target.getAttribute('checked')) {
                target.setAttribute('checked', true);
            } else {
                target.removeAttribute('checked');
            }
        },
        delQueNar () {
            var queListInput = this.queListInput;
            for(let i = 0; i < queListInput.length; i++) {
                if(queListInput[i].getAttribute('checked')) {
                    let delId = parseInt(queListInput[i].getAttribute('value'));
                    let index = this.questionnaireList.findIndex((element) => {
                        if(element.id === delId) {
                            return true;
                        }
                    })
                    this.questionnaireList.splice(index, 1);
                    store.save(this.questionnaireList);
                }
            }
        },
        delThisQue () {
            this.showPopup = true;
            this.hopeDel = parseInt(event.target.getAttribute('value'));
            console.log(this.hopeDel);
        },
        trueDelQue () {
            var index = this.questionnaireList.findIndex((element) => {
                if(element.id === this.hopeDel) {
                    return true;
                }
            });
            this.questionnaireList.splice(index, 1);
            this.data.questionnaireList = this.questionnaireList;
            store.save(this.data);
            this.showPopup = false;
        }
    }
}
</script>

<style>
    .quenar-wrap {
        width: 80%;
        margin: 50px auto;
        color: rgba(0, 0, 0, .7);
        font-size: 14px;
    }

    .quenar-wrap span {
        display: inline-block;
    }

    .title {
        width: 320px;
    }

    .end-time {
        width: 150px;
    }

    .state {
        width: 130px;
    }

    .operate {
        width: 130px;
    }

    .create-new {
        width: 100px;
        height: 30px;
        border: 1px solid #ccc;
        color: #fff;
        background: #ec7319;
    }

    .question-list {
        list-style: none;
        margin-left: -60px;
        margin-top: 15px;
        background: #fff;
    }
    
    .que-nar {
        display: block;
        height: 60px;
        background: #fff;
        line-height: 60px;
        border-bottom: 1px solid #ccc;
    }

    .que-nar > input {
        margin: 0 20px;
        vertical-align: middle;
    }

    .que-nar-name {
        width: 350px;
    }

    .que-nar-endTime {
        width: 150px;
    }

    .que-nar-state {
        width: 200px;
    }

    .state-in {
        color: rgba(0, 204, 0, 1);
    }

    .state-no {
        color: rgba(0, 0, 0, .5);
    }

    .state-end {
        color: rgba(204, 0, 0, .8);
    }

    .opt-button {
        width: 80px;
        height: 25px;
        border: 1px solid #999;
        background: #fff;
        color: #999;
        border-radius: 5px;
    }

    .del-panel {
        padding-left: 20px;
        padding-top: 15px;
        padding-bottom: 40px;
        margin-left: -60px;
        background: #fff;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .del-panel > input {
        margin-right: 20px;
    }

    .del-panel > label {
        margin-right: 30px;
    }

    .true-del {
        background: #ec7319;
        color: #fff;
        border: 1px solid #fff;
    }
</style>