<template>
    <article class="create-wrap">
        <header>
            <input type="text" placeholder="请在这里输入标题" name="que-nar-title" v-model="queNar.title">
        </header>
        <section class="add-new-wrap">
            <ul>
                <li v-for="(index, item) in question" class="new-question-list" transition="app-new">
                    <div class="choise-queType" v-show="!item.type">
                        <button v-on:click="setType" value="{{ index }}" type="radio">单选题</button>
                        <button v-on:click="setType" value="{{ index }}" type="checkbox">多选题</button>
                        <button v-on:click="setType" value="{{ index }}" type="textarea">文本题</button>
                    </div>

                    <div class="single-selection" v-if="item.type === 'radio'" transition="app-new">
                        <span>Q {{index + 1}} : </span>
                        <input type="text" placeholder="请输入问题" name="que-name" v-model="item.title">
                        <ol class="options-list">
                            <li v-for="options in item.option" transition="app-new">
                                <input type="radio" name="que-radio" disabled>
                                <input type="text" placeholder="请在此处输入选项" name="option-name" v-model="options.content">
                            </li>
                        </ol>
                        <button class="add-other-choise" v-on:click="addNewOption" value="{{ index }}">添加一个选项</button>
                        <button class="remove-choise" v-on:click="removeOption" value="{{ index }}">移除一个选项</button>
                        <button class="remove-question" v-on:click="removeQuestion" value="{{ index }}">删除这个问题</button>
                    </div>
 
                    <div class="multi-select" v-if="item.type === 'checkbox'" transition="app-new">
                        <span>Q {{index + 1}} : </span>
                        <input type="text" placeholder="请输入问题" name="que-name" v-model="item.title">
                        <ol class="options-list">
                            <li v-for="options in item.option" transition="app-new">
                                <input type="checkbox" name="que-checkbox" disabled>
                                <input type="text" placeholder="请在此处输入选项" name="option-name" v-model="options.content">
                            </li>
                        </ol>
                        <button class="add-other-choise" v-on:click="addNewOption" value="{{ index }}">添加一个选项</button>
                        <button class="remove-choise" v-on:click="removeOption" value="{{ index }}">移除一个选项</button>
                        <button class="remove-question" v-on:click="removeQuestion" value="{{ index }}">删除这个问题</button>
                    </div>

                    <div class="obj-question" v-if="item.type === 'textarea'">
                        <span>Q {{index + 1}} : </span>
                        <input type="text" placeholder="请输入问题" name="que-name" v-model="item.title">
                        <textarea class="obj-que-ans" disabled v-model="options.content"></textarea>
                        <button class="remove-question" v-on:click="removeQuestion" value="{{ index }}">删除这个问题</button>
                    </div>

                </li>
            </ul>
            <button class="add-new-que" v-on:click="addQue">添加问题</button>
        </section>
        <footer class="cal-save">
            <div class="set-end-time">
                <span>问卷截止日期:</span>
                <Calendar :end-time.sync="queNar.endTime"></Calendar>
            </div>
            <div>
                <button class="opt-button" v-on:click="savQusNar">保存问卷</button>
                <button class="opt-button" v-on:click="releaseQueNar">发布问卷</button>
            </div>
        </footer>
        <popup v-bind:show.sync="showPopup">
            <div slot="body">
                <p>发布成功</p>
            </div>
            <div slot="footer">
                <button class="opt-button" v-on:click="showPopup = false">确认</button>
            </div>
        </popup>
    </article>
</template>

<script>
import Calendar from './Calendar.vue'
import store from '../src/store'
import Popup from './Popup.vue'

export default {
    components: {
        Calendar,
        Popup
    },
    data () {
        var data = store.fetch();
        return {
            data: data,
            showSingleSelection: false,
            question: [],
            order: 1,
            queNar: {},
            showPopup: false
        }
    },
    methods: {
        addQue () {
            this.question.push({});
        },
        setType () {
            var target = event.target,
                index = parseInt(target.getAttribute('value')),
                type = target.getAttribute('type');
            
            this.question.$set(index, {type: type, title: '', order: this.order++, option: []});
        },
        addNewOption () {
            var target = event.target,
                index = parseInt(target.getAttribute('value'));
            this.question[index].option.push({});
        },
        removeOption () {
            var target = event.target,
                index = parseInt(target.getAttribute('value'));
            this.question[index].option.pop();
        },
        removeQuestion () {
            var target = event.target,
                index = parseInt(target.getAttribute('value'));
            this.question.splice(index, 1);
        },
        savQusNar () {
            this.queNar.question = this.question;
            console.log(this.queNar, this.question);
            this.data.questionnaireList.push(this.queNar);
            store.save(this.data);
        },
        releaseQueNar () {
            this.queNar.state = 1;
            this.savQusNar();
            this.showPopup = true;
        }
    }
}
</script>

<style>
.create-wrap {
    width: 80%;
    margin: 80px auto;
    padding: 15px;
    background: #fff;
    border-radius: 5px;
}

.create-wrap header {
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
}

input[name='que-nar-title'] {
    height: 75px;
    width: 100%;
    border: none;
    text-align: center;
    font-weight: bold;
    font-size: 25px;
}

.single-selection, .multi-select, .obj-question {
    padding: 10px;
    margin: 10px;
    font-family: '微软雅黑';
}

input {
    font-family: '微软雅黑';
}

input[name='que-name'] {
    height: 20px;
    width: 80%;
    padding: 10px;
    border: none;
    text-align: left;
    font-size: 16px;
}

input[name='option-name'] {
    height: 15px;
    width: 80%;
    padding: 5px 10px;
    margin: 5px;
    border: none;
    font-size: 12px;
}

input[name='que-radio'], input[name='que-checkbox'] {
    vertical-align: middle;
}

.add-other-choise {
    width: 110px;
    height: 25px;
    margin: 15px 3px 0px 5px;
    border: 1px solid rgba(0, 0, 0, .5);
    background: #fff;
    color: rgba(0, 0, 0, .5);
    border-radius: 5px;
}

.remove-choise {
    width: 110px;
    height: 25px;
    margin: 15px 3px 0px 5px;
    border: 1px solid rgba(236, 115, 25, .1);
    background: rgba(236, 115, 25, .9);
    color: #fff;
    border-radius: 5px;
}

.remove-question {
    width: 110px;
    height: 25px;
    margin: 15px 3px 0px 5px;
    border: 1px solid rgba(204, 0, 0, .1);
    background: rgba(204, 0, 0, 1);
    color: #fff;
    border-radius: 5px;
}

.set-end-time {
    display: flex;
    justify-content: center;
}

.add-new-wrap {
    margin: 30px 0;
    border-bottom: 2px solid #ccc;
}

.choise-queType {
    display: flex;
    justify-content: center;
}

.choise-queType button {
    width: 150px;
    height: 40px;
    background: rgba(0, 0, 0, .3);
    border: 1px solid #999;
    margin: 0 15px;
    color: #fff;
    line-height: 40px;
    text-align: center;
}

.add-new-que {
    display: block;
    height: 80px;
    width: 90%;
    margin: 30px auto;
    border: 1px solid #ccc;
    background: rgba(0, 0, 0, .1);
    color: rgba(0, 0, 0, .5);
    font-size: 25px;
    text-align: center;
}

.new-question-list {
    list-style: none;
    margin: 20px 0;
    padding: 0 0 25px 0;
    border-bottom: 2px solid #ccc;
}

.options-list {
    list-style: none;
}

.app-new-transition {
  transition: all .5s;
  overflow: hidden;
}

.app-new-enter, .app-new-leave {
  height: 0;
  padding: 0 5px;
  opacity: 0;
}

.obj-que-ans {
    display: block;
    width: 450px;
    height: 150px;
    margin: 5px;
    border-radius: 5px;
    resize: none;
}

.cal-save {
    display: flex;
    justify-content: space-between;
}

.opt-button {
    width: 80px;
    height: 25px;
    border: 1px solid #999;
    background: #fff;
    color: #999;
    border-radius: 5px;
}
</style>