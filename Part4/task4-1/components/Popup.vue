<template>
    <div class="popup-mask" v-show="show" transition="popup">
        <div class="popup-wrapper">
            <div class="popup-container">
                <div class="popup-header">
                    <span>提示</span>
                </div>
                
                <div class="popup-body">
                    <slot name="body">
                        
                    </slot>
                </div>
                
                <div class="popup-footer">
                    <slot name="footer">
                        
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        }
    }
}
</script>

<style>
.popup-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  font-family: "微软雅黑";
}

.popup-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.popup-container {
  width: 340px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.popup-header h3 {
  margin-top: 0;
  color: #42b983;
}

.popup-body {
  margin: 20px 0;
}

.popup-enter, .popup-leave {
  opacity: 0;
}

.popup-enter .popup-container,
.popup-leave .popup-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>