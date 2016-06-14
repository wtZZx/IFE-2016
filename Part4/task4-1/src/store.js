const key = 'Questionnaire'

if (!localStorage.getItem(key)) {
    let data = {
        user: {
            id: 1,
            name: 'admin'
        },
        questionnaireList: [
            {
                id: 1,
                title: '大学生毕业旅游意向调查',
                // 状态： 1:发布中 0:未发布 -1:结束
                state: 1,
                endTime: '2016-6-30',
                question: [
                    {
                        order: 1,
                        title: '您的性别是',
                        type: 'radio',
                        must: true,
                        option: [
                            {
                                id: 1,
                                content: '男'
                            },
                            {
                                id: 2,
                                content: '女'
                            }]
                 },
                {
                    order: 2,
                    title: '作用在校大学生，您对自己的毕业旅游期待吗？',
                    type: 'radio',
                    must: true,
                    option: [{
                        id: 1,
                        content: '非常期待'
                    },
                    {
                        id: 2,
                        content: '一般'
                    },
                    {
                        id: 3,
                        content: '不期待'
                    }]
                },

            {
                order: 3,
                title: '您预计的旅游费用大约为',
                type: 'radio',
                must: true,
                option: [{
                    id: 1,
                    content: '1000以下'
                },
                {
                    id: 2,
                    content: '1000-3000'
                },
                {
                    id: 3,
                    content: '3000-5000'
                },
                {
                    id: 4,
                    content: '5000及以上'
                }]
            },

            {
                order: 4,
                title: '您预计会选择旅游的交通方式为',
                type: 'checkbox',
                must: true,
                option: [{
                    id: 1,
                    content: '火车'
                },
                {
                    id: 2,
                    content: '汽车'
                },
                {
                    id: 3,
                    content: '飞机'
                },
                {
                    id: 4,
                    content: '动车'
                },
                {
                    id: 5,
                    content: '其他'
                }]
            },

            {
                order: 5,
                title: '您觉得在旅游过程中会碰到的难题是什么？',
                type: 'textarea',
                must: true,
                option: [{}]
            }]
        },
        {
            id: 2,
            title: '学生端午假期去向调查',
            // 状态： 1:发布中 0:未发布 -1:结束
            state: 0,
            releaseTime: '2016-6-6',
            endTime: '2016-6-30',
            question: []
        },
        {
            id: 3,
            title: '学生环保意识调查',
            // 状态： 1:发布中 0:未发布 -1:结束
            state: -1,
            releaseTime: '2016-6-6',
            endTime: '2016-6-30',
            question: []
        }]
    }
    localStorage.setItem(key, JSON.stringify(data));
}

export default {
    fetch() {
        return JSON.parse(localStorage.getItem(key));
    },
    
    save(store) {
        localStorage.setItem(key, JSON.stringify(store));
    }
};