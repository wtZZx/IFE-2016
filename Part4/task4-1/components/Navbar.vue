<template>
    <nav id="nav-header">
        <span class="logo">调查问卷</span>
        <span class="my-table" v-link="{ path: '/QuestionnaireList' }">我的问卷</span>  
    </nav>
</template>

<script>
    export default {
    }
</script>

<style>
    #nav-header {
        height: 60px;
        width: 100%;
        background: #ec7319;
    }
    
    .logo {
        margin-left: 130px;
        line-height: 60px;
        color: #fff;
    }
    
    .my-table {
        margin-left: 30px;
        color: #fff;
    }

</style>