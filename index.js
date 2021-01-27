var app = new Vue({
    el: '#app',
    data: {
        scales: ['major'],
        notes: {
            'A': {value: 440, enabled: false, color: 'red'},
            'A#':{value: 446.16, enabled: false, color: 'darkturquoise', sharp: true},
            'B': {value: 493.88, enabled: false, color: 'forestgreen'},
            'C': {value: 523.25, enabled: false, color: 'blue'},
            'C#':{value: 554.37, enabled: false, color: 'blueviolet', sharp: true},
            'D': {value: 587.33, enabled: false, color: 'chocolate'},
            'D#':{value: 622.25, enabled: false, color: 'coral', sharp: true},
            'E': {value: 659.25, enabled: false, color: 'cornflowerblue'},
            'F': {value: 698.46, enabled: false, color: 'crimson'},
            'F#':{value: 739.99, enabled: false, color: 'darkcyan', sharp: true},
            'G': {value: 783.99, enabled: false, color: 'darkorchid'},
            'G#':{value: 830.61, enabled: false, color: 'deeppink', sharp: true},
            'A2':{value: 880, enabled: false, color: 'darkslateblue'},
        },
        scale: 0.1
    },
    methods: {

    },
    mounted: function() {

    },
})

window.onload= () => {
    var canvas = document.getElementById('vis')
    paper.setup(canvas)

    var top = new paper.Path();
    var bot = new paper.Path();
    var mid = new paper.Path()
    // Give the stroke a color
    top.strokeColor = 'black';
    bot.strokeColor = 'black';
    mid.strokeColor = 'black'
    var start = new paper.Point(0, 1);
    var start_bot = new paper.Point(0, 350);
    var start_mid = new paper.Point(0, 175)
    // Move to start and draw a line from there
    top.moveTo(start);
    bot.moveTo(start_bot);
    mid.moveTo(start_mid);
    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    top.lineTo(start.add([1400, 0 ]));
    bot.lineTo(start_bot.add([1400, 0 ]));
    mid.lineTo(start_mid.add([1400, 0 ]));
    // Draw the view now:
    paper.view.draw();

    var notes = {}

    var times = 400
    for (const key in app.$data.notes) {
    if (Object.hasOwnProperty.call(app.$data.notes, key)) {
        const note = app.$data.notes[key];
        var path = new paper.Path()
            
        for (let index = 0; index < times; index++) {
            
            path.strokeColor = note.color
            path.fillColor = null
            var pi = (index / times) * (2*Math.PI)
            var y = Math.sin((note.value * pi) * 0.02) * 175 + 175
            var x = (index / times) * 1400
            var p = new paper.Point(x, y)

            if(index == 0) {
                path.moveTo(p)
            } else {
                path.add(p)
            }
            

        }
        notes[key] = path
    }
    }

    
    paper.view.onFrame = () => {

        for (const key in app.$data.notes) {
            if (Object.hasOwnProperty.call(app.$data.notes, key)) {
                const note = app.$data.notes[key];
                notes[key].visible = note.enabled
            }
            }

    }
}