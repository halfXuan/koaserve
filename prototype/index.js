class Util {
    constructor(){
        this.formatDate=this.formatDate.bind(this)
    }
    add0(num){
        return num < 10 ? '0' + num : num
    }
    formatDate(){
        const time = new Date();
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const day = time.getDate()
        const h = time.getHours()
        const minute = time.getMinutes()
        const second = time.getSeconds()
        return year + '-' + this.add0(month) + '-' + this.add0(day) + ' ' + this.add0(h) + ':' + this.add0(minute) + ':' + this.add0(second)
    }
}

export default Util