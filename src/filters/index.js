import Vue from 'vue'
import Moment from 'moment'

Vue.filter('dataString', function (value, formatStr = "YYYY-MM-DD HH:mm:ss") {
    return Moment(value).format(formatStr)
})