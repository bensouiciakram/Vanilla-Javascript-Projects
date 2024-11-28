function StopWatch() {
    this.count = 0;
    this.start = false;
    this._seconds = 0;
    this._minutes = 0;
    this._hours = 0;

    this.reset = function() {
        this.count = 0;
        this._seconds = 0;
        this._minutes = 0;
        this._hours = 0;
    };

    this.calculate_time = function() {
        this.hours = Math.floor(this.count/3600);
        const rest = this.count % 3600;
        this.minutes = Math.floor(rest/60);
        this.seconds = rest%60;
    };

    this.count_increment = function() {
        if (this.start) this.count += 1 ;
        this.calculate_time();
    };

    this.startCount = function() {
        this.start = true;
        console.log('starting the count',this.count,this.start,this.seconds,this.minutes,this.hours)
    };

    this.stopCount = function() {
        this.start = false ;
    };

    Object.defineProperty(this,'seconds',{
        get:function() {
            return this._seconds
        },
        set: function(seconds) {
            this._seconds = seconds
        }
    });

    Object.defineProperty(this,'minutes',{
        get:function() {
            return this._minutes
        },
        set: function(minutes) {
            this._minutes = minutes
        }
    });

    Object.defineProperty(this,'hours',{
        get:function() {
            return this._hours
        },
        set: function(hours) {
            this._hours = hours
        }
    })
}

const stopWatch = new StopWatch();

setInterval(function() {
    stopWatch.count_increment();
    const startButton = document.querySelector('.stopwatch__start');
    startButton.onclick = (event) => {stopWatch.startCount()};
    
    const resetButton = document.querySelector('.stopwatch__reset');
    resetButton.onclick = (event) => {stopWatch.reset()};
    
    const stopButton = document.querySelector('.stopwatch__stop');
    stopButton.onclick = (event) => {stopWatch.stopCount()};
    
    const hours = document.querySelector('.stopwatch__hours');
    hours.textContent = stopWatch.hours;
    const minutes = document.querySelector('.stopwatch__minutes');
    minutes.textContent = stopWatch.minutes;
    const seconds = document.querySelector('.stopwatch_seconds');
    seconds.textContent = stopWatch.seconds;
},1000)

