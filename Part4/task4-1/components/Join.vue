<template>
    <article class="join-wrap app-new-transition">
        <header class="question-title">
            <p> {{ data.title }} </p>
        </header>
        <section class="question-list-wrap">
            <ul>
                <li v-for="(index, que) in data.question" class="que-list">
                   <p class="que-title">{{ index + 1 }} : {{ que.title }}</p>
                   <div>
                       <ul v-for="option in que.option">
                           <li class="option-list">
                               <label>
                                   <input type="{{ que.type }}" name="{{ que.title }}">
                                    {{ option.content }}
                               </label>
                           </li>
                       </ul>
                   </div>
                </li>
            </ul>
        </section>
        <footer class="submit-wrap">
            <button class="submit-button">提交问卷</button>
        </footer>
    </article>
</template>

<script>

import store from '../src/store'

export default {
    components: {

    },
    data () {
        return {
        }
    },
    created () {
        this.index = this.$route.params.index;
        this.data = store.fetch().questionnaireList[this.index];
    }
}

</script>

<style>
ul {
    list-style: none;
}


.question-title {
    height: 80px;
    border-bottom: 2px solid #ccc;
}

.question-title > p {
    font-size: 25px;
    text-align: center;
    line-height: 80px;
}

.join-wrap {
    width: 80%;
    margin: 40px auto;
    background: #fff;
    padding: 20px;
}

.question-list-wrap {
    margin: 30px auto;
}

.que-list {
    margin: 10px auto;
    padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
}

.que-title {
    line-height: 18px;
}

.option-list {
    margin: 10px;
    font-size: 14px;
}

.option-list input {
    vertical-align: middle;
}

.option-list input[type='textarea'] {
    width: 450px;
    height: 150px;
    border-radius: 5px;
    resize: none;
    border: 1px solid #ccc;
    padding: 5px;
    vertical-align: top;
}

.submit-button {
    display: block;
    margin: 0 auto;
    width: 150px;
    height: 40px;
    background: rgb(236, 115, 25);
    color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
}
</style>