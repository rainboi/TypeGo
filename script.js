// var letter = document.getElementById("letter");

// function writingFocus()
// {
//     letter.style.height = "300px";
//     letter.style.borderRadius = "25px";
// }
const words = `brown fox is so lazy that it sleeps 25 hours a day and it just will not bother itself to at least attemt to do anything therefore the brown fox is useless but the sad part is that it knows how useless it is and still remains a failure brown fox is so lazy that it sleeps 25 hours a day and it just will not bother itself to at least attemt to do anything therefore the brown fox is useless but the sad part is that it knows how useless it is and still remains a failure`

new Vue({
    el: '#app',
    data: {
        words: words,
        wordsArray: words.split(' '),
        wordHistory: [],
        inputText: "",
        correctWords: 0,
        wordCount: 0,
        currentlyAt: 0,
        styledElements: [],
        timer: {
            time: 60,
            id: null,
        }
    },
    methods: {
        updateInputText: function (e) {
            if (this.inputText === ' ') {
                this.inputText = "";
            }
        },
        stopTimer: function () {
            if (this.timer.id !== null) {
                clearInterval(this.timer.id);
                this.timer.id = null;
            }
        },

        startTimer: function () {
            if (this.timer.id === null) {
                this.timer.id = setInterval(() => {
                    this.timer.time--;
                    if (this.timer.time === 0) {
                        this.stopTimer();
                    }
                }, 1000);
            }
        },

        compareKey: function (event, id) {
            if (this.currentlyAt === 0) {
                this.timer.time = 60;
                this.startTimer();
            }
            if (this.timer.id !== null) {
                if (event.key === 'Backspace') {
                    if (this.currentlyAt !== 0 && this.styledElements.length !== 0) {
                        this.currentlyAt--;
                        console.log(this.currentlyAt, this.styledElements)
                        let lastElement = this.styledElements.pop();
                        if (lastElement !== 'space') {
                            console.log('here', lastElement)
                            lastElement.classList.remove('correct');
                            lastElement.classList.remove('incorrect');
                        }
                        if (this.inputText === "" && this.wordCount !== 0) {
                            this.wordCount--;
                            let lastWord = this.wordHistory.pop();
                            console.log(this.wordsArray[this.wordCount], lastWord)
                            if (this.wordsArray[this.wordCount] === lastWord)
                                this.correctWords--;
                            let dif = this.wordsArray[this.wordCount].length - lastWord.length;
                            while (dif > 0) {
                                this.currentlyAt--;
                                let lastElement = this.styledElements.pop();
                                if (lastElement !== 'space') {
                                    console.log('here', lastElement)
                                    lastElement.classList.remove('correct');
                                    lastElement.classList.remove('incorrect');
                                    lastElement.classList.remove('skipped');
                                    dif--;
                                }
                            }
                            this.inputText = lastWord + ' ';
                        }
                    }
                    else if (this.currentlyAt !== 0)
                        this.currentlyAt--;
                    console.log('backspace', this.currentlyAt)
                }
                else if (event.key !== 'Shift') {
                    if (event.key === ' ') {
                        if (this.wordsArray[this.wordCount] === this.inputText) {
                            this.correctWords++;
                        }
                        else {
                            let dif = this.wordsArray[this.wordCount].length - this.inputText.length;
                            console.log(dif, 'DIF');
                            while (dif > 0) {
                                this.styleIt(this.currentlyAt, 'skipped')
                                this.currentlyAt++;
                                dif--;
                            }
                        }
                        this.wordCount++;
                        this.styledElements.push('space')
                        this.wordHistory.push(this.inputText);
                        this.inputText = "";
                    }
                    else if (event.key === this.words[this.currentlyAt]) {
                        console.log('correct')
                        this.styleIt(this.currentlyAt, 'correct');
                    }
                    else {
                        console.log('incorrect')
                        this.styleIt(this.currentlyAt, 'incorrect')
                    }
                    this.currentlyAt++;
                }
            }
        },

        styleIt: function (id, cssClass) {
            var element = document.getElementById(id);
            element.classList.remove('correct');
            element.classList.remove('incorrect');
            element.classList.remove('skipped');
            element.classList.add(cssClass);
            this.styledElements.push(element);
        },
    }
})