function time(...params) {
    if (!(this instanceof time)) {
        return new time(...params)
    }
    if (arguments.length > 1) {
        params[1] -= 1
    }
    this.date = new Date(...params)

}
time.prototype = {
    constructor: time,
    parts(attrs) {
        if (attrs === undefined) {
            return {
                year: this.date.getFullYear(),
                month: this.date.getMonth() + 1,
                day: this.date.getDate(),
                weekday: this.date.getDay(),
                hour: this.date.getHours(),
                minute: this.date.getMinutes(),
                second: this.date.getSeconds(),
                ms: this.date.getMilliseconds(),
            }
        } else {
            const { year, month, day, hour, minute, second, ms } = attrs
            year !== undefined && this.date.setFullYear(year)
            month !== undefined && this.date.setMonth(month - 1)
            day !== undefined && this.date.setDate(day)
            hour !== undefined && this.date.setHours(hour)
            minute !== undefined && this.date.setMinutes(minute)
            second !== undefined && this.date.setSeconds(second)
            ms !== undefined && this.date.setMilliseconds(ms)
        }

    },
    add(n, unit) {
        const valid = 'year month day hour minute second ms'.split(' ').includes(unit)
        if (!valid) { //防御性编程
            throw new Error('你传了一个什么单位，我不认识' + unit)
        }
        const table = {
            ms: 1,
            second: 1000,
            minute: 1000 * 60,
            hour: 1000 * 60 * 60,
            day: 1000 * 60 * 60 * 24
        }
        if (unit === 'year') {
            //获取到的年加 n
            this.date.setFullYear(this.date.getFullYear() + n)
        } else if (unit === 'month') {
            //获取到的月加 n
            this.date.setMonth(this.date.getMonth() + n)
        } else { //加上对应的毫秒数
            this.date = new Date(this.date - 0 + table[unit] * n)
        }
    },
    isLeapYear() {
        const year = this.date.getFullYear()
        if (!(year % 4)) {
            if (year % 100) {
                return true
            } else {
                if (!(year % 400)) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    },
    lastDayOfMonth() {
        const { year, month, hour, minute, second, ms } = this.parts()
        return new time(year, month + 1, 0, hour, minute, second, ms)
    },
    format(pattern) {
        // 支持的占位符有 yyyy MM dd HH mm ss SSS
        const { year, month, day, hour, minute, second } = this.parts()
        return pattern.replace(/yyyy/g, year)
            .replace(/MM/g, padLeftZero(month))
            .replace(/dd/g, padLeftZero(day))
            .replace(/HH/g, padLeftZero(hour))
            .replace(/mm/g, padLeftZero(minute))
            .replace(/ss/g, padLeftZero(second))
    }
}
function padLeftZero(n) {
    return n > 10 ? '' + n : '0' + n
}
//使用方法
const t = time()
//set
t.parts({
    year: 2002,
    month: 1,
    day: 5,
    hour: 1,
    minute: 50,
    second: 30,
})
//get
const { year, month, day, hour, minute, second } = t.parts()
console.log(t.date.toLocaleString());
//add
t.add(1, 'hour')
console.log(t.date.toLocaleString());
//isLeapYear
console.log(t.isLeapYear());
//lastDayOfMonth
console.log(t.lastDayOfMonth().date.toLocaleString());
//format
console.log(t.format('yyyy年MM月dd日 HH:mm:ss'));