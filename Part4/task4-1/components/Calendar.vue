<template id="calendar-template">
  <article id="cal-wrap">
    <div id="calendar-text">
      <input type="text" class="calendar-input"
             v-model = "endTime"
             v-bind:value="userSelecteDate"
             v-on:focus="show = true">
    </div>
    
    <div id="calendar-wrap" v-show.sync="show" transition="calendar">
      <div class="date-select-panel">
        <i class="fa fa-sort-asc top-icon" aria-hidden="true"></i>
        <p class="show-year-month">
          <span>{{ selectedYear }} 年</span>
          <span>{{ selectedMonth }} 月</span>
        </p>
        <i class="fa fa-chevron-up select-icon" aria-hidden="true" v-on:click="dateAddMethod"></i>
        <i class="fa fa-chevron-down select-icon" aria-hidden="true" v-on:click="dateLesMethod"></i>
    </div>
    
    <table class="day-table">
      <tbody class="show-week">
        <td v-for="week in weeks">
          {{ week }}
        </td>
      </tbody>
      
      <tr v-for="item in days" track-by="$index">
        <td v-for="day in item" track-by="$index" 
            v-on:click="clickDay" 
            v-on:mouseover="mouseoverDay"
            v-bind:class="[day.isBelow ? classPassDay: '']"4>
            {{ day.day }}
        </td>
      </tr>
    </table>
    </div>
  </article>
</template>
        
<script>
export default {
  data () {
    return {
      show: false,
      toDay: new Date(),
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      days: [],
      classPassDay: 'pass-day',
      userSelecteDate: ''
    }
  },
  props: {
    endTime: {
      type: String,
      twoWay: true
    }
  },
  // 实例创建之后同步调用  http://vuejs.org.cn/api/#created
  created () {
    this.processDays()
  },

  methods: {
    dateAddMethod () {
      if (this.selectedMonth + 1 !== 13) {
        this.selectedMonth += 1
      } else {
        this.selectedYear += 1
        this.selectedMonth = 1
      }
      this.processDays()
    },
    dateLesMethod () {
      if (this.selectedMonth - 1 !== 0) {
        this.selectedMonth -= 1
      } else {
        this.selectedYear -= 1
        this.selectedMonth = 12
      }
      this.processDays()
    },
    processDays () {
      this.days = []
      var selecteDay = new Date(this.selectedYear, this.selectedMonth - 1, 1)
      var monthTip = selecteDay.getMonth()
      for (let i = 0; i < 6; i++) {
        this.days[i] = []
        for (let j = 0; j < 7; j++) {
          if (selecteDay.getDay() === j && selecteDay.getMonth() === monthTip) {
            if ((selecteDay - this.toDay) < -86400000) {
              this.days[i].push({
                day: selecteDay.getDate(),
                isBelow: true
              })
            } else {
              this.days[i].push({
                day: selecteDay.getDate(),
                isBelow: false
              })
            }
            selecteDay.setDate(selecteDay.getDate() + 1)
          } else {
            this.days[i].push('')
          }
        }
      }
    },
    clickDay (event) {
      var target = event.target
      if (target.textContent.trim()) {
        var day = target.textContent.trim()
        var month = this.selectedMonth
        var year = this.selectedYear
        var date = new Date(year, month - 1, day)
        this.userSelecteDate = date.toLocaleDateString()
        this.show = false
      }
    },
    mouseoverDay (event) {
      var target = event.target
      if (target.textContent.trim()) {
        target.classList.add('day-td')
      }
      target.addEventListener('mouseout', function (event) {
        event.target.classList.remove('day-td')
      })
    }
  }
}
</script>

<style>
#calendar-wrap {
    width: 220px;
    height: 240px;
    margin-top: 7px;
}

.calendar-input {
    width: 220px;
    height: 30px;
    padding: 5px 10px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
    color: rgba(0, 0, 0, .8);
}

.date-input {
    margin: 100px 0 0 100px;
}

#date-select {
    height: 30px;
    width: 180px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.date-select-panel {
    position: relative;
    width: 250px;
    height: 30px;
    background: rgba(204, 0, 0, 1);
    box-sizing: border-box;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.top-icon {
    position: absolute;
    left: 46%;
    top: -7px;
    color: rgba(204, 0, 0, 1);
}

.select-icon {
    margin: 0 3px;
    color: #fff;
}

.select-icon:hover {
    cursor: pointer;
    color: rgba(255, 255, 255, .5);
}

.show-year-month {
    display: inline-block;
    width: 85px;
    margin: 0 10px;
    font-size: 13px;
    line-height: 30px;
    color: #fff;
}


.day-table {
    width: 250px;
    font-size: 12px;
    height: 200px;
    box-sizing: border-box;
    border-color: rgba(0, 0, 0, .5);
    border-collapse: collapse;
}

.show-week {
    background: rgba(204, 0, 0, 1);
    color: #fff;
}

.toDay-select-style {
    background: rgba(204, 0, 0, 1);
    color: #fff;
}

.day-table td {
    width: 30px;
    height: 30px;
    text-align: center;
    box-sizing: border-box;
}

.dayTD-mouseover {
    cursor: pointer;
    border: 1px solid rgba(204, 0, 0, 1);
}

.past-date {
    color: #ccc;
}

.select-day {
    background: rgba(0, 153, 204, 1);
    color: #fff;
}

table tr td.day-td {
    cursor: pointer;
    background: rgba(0, 102, 204, .8);
    color: #fff;
}

table tr td.pass-day {
    color: #ccc;
}

.calendar-transition {
    transition: all .2s ease-out;
    opacity: 10;
}

.calendar-enter {
    transform: scale(1.1);
    opacity: 90;
}

.calendar-leave {
    opacity: 0;
}
</style>