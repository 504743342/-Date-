# Date库使用方法

## parts(attrs)

- 使用方法

```javascript
// set
//能够设置时间的参数有 {year, month, day, hour, minute, second, ms}
t.parts({
    year: 2002,
    month: 1,
    day: 5,
    hour: 1,
    minute: 50,
    second: 30,
})
//get
//先析构赋值在调用api打印即可
const { year, month, day, hour, minute, second } = t.parts()
```

## add(n, unit)

```javascript
//传入一个number和单位 可传入负值
t.add(1, 'hour')
console.log(t.date.toLocaleString());
```

## isLeapYear()

```javascript
//判断当前日期是否为闰年 直接调用即可
console.log(t.isLeapYear());
```

## lastDayOfMonth()

```javascript
//当月的最后一天 直接调用即可
console.log(t.lastDayOfMonth().date.toLocaleString());
```

## format(pattern)

```javascript
//格式化输出
//支持的占位符有 yyyy MM dd HH mm ss
console.log(t.format('yyyy年MM月dd日 HH:mm:ss'));
```
