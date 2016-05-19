import Vue from './vue'

Vue.component('calendar', {
    template: '#calendar-template',
    props: [],
    data () {
        return {
            selectedYear: new Date().getFullYear(),
            selectedMonth: new Date().getMonth() + 1,
            weeks: ['日', '一', '二', '三', '四', '五', '六'],
            days: []
        }
    },
    // 实例创建之后同步调用  http://vuejs.org.cn/api/#created
    created () {
      this.processDays();  
    },
    computed: {
        yearData () {
            var dateStart = this.$parent.dateStart,
                dateEnd = this.$parent.dateEnd,
                yearData = [];
            for(let i = 0, len = dateEnd.getFullYear() - dateStart.getFullYear(); i <= len; i++) {
                yearData.push(dateStart.getFullYear() + i);
            }
            return yearData;
        },
        
        monthData () {
            var monthData = [];
            for(let i = 1; i <= 12; i++) {
                monthData.push(i);
            }
            return monthData;
        }
    },
    methods: {
        yearChangeMethod () {
            var yearSelected = event.target.options[event.target.selectedIndex].value;
            this.selectedYear = yearSelected;
            this.processDays();
        },
        monthChangeMethod () {
            var monthSelected = event.target.options[event.target.selectedIndex].value;
            this.selectedMonth = monthSelected;
            this.processDays();
        },
        processDays () {
            this.days = [];
            this.days.push(this.weeks);
            var selecteDay = new Date(this.selectedYear, this.selectedMonth-1, 1),
                monthTip = selecteDay.getMonth();
            for(let i = 1; i <= 6; i++) {
                this.days[i] = [];
                for(let j = 0; j < 7; j++) {
                    if(selecteDay.getDay() == j && selecteDay.getMonth() == monthTip) {
                        this.days[i].push(selecteDay.getDate());
                        selecteDay.setDate(selecteDay.getDate() + 1);
                    } else {
                        this.days[i].push('');
                    }
                }
            }
        }
    }
});

new Vue({
    el: '#app',
    data: {
        dateStart: new Date(1970, 1, 1),
        dateEnd: new Date(2020, 1, 1)
    }
})
