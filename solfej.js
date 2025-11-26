Array.prototype.sample = function(){
  return this[Math.floor(Math.random()*this.length)];
}

const CANVAS_HEIGHT = 320;
const CANVAS_WIDTH = 320;

const SOL_KEY_CHAR = "𝄞";
const NOTE_CHAR = "𝅘𝅥"
const NOTE_POS_X = 150;

const LINE_COUNT = 5;
const LINE_SPACING = 20;
const LINE_OFFSET = 120;
const REVERSE_NOTE_OFFSET = 150;
const NOTE_LIST = ["DO", "RE", "MI", "FA", "SOL", "LA", "SI"]
const NOTE_MAP = {
    "DO": [
        {
            y: 140,
        },
    ],
    "RE": [
        {
            y: 200
        },
        {
            y: 130,
        }
    ],
    "MI": [
        {
            y: 120,
        }
    ],
    "FA": [
        {
            y: 110,
        }
    ],
    "SOL": [
        {
            y: 100,
        }
    ],
    "LA": [
        {
            y: 90
        }
    ],
    "SI": [
        {
            y: 80,
        }
    ]
}

const SCALE_MAP = [{
        offset: 90,
     }, {
        offset: 160,
    },{
        offset: 230,
    }, {
        offset: 300
    }
]

const DrawPartition = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white"

    for (let i = 0; i < LINE_COUNT; i++) {
        ctx.fillRect(0, LINE_OFFSET + LINE_SPACING * i, CANVAS_WIDTH, 1)
    }
};

const DrawQuadrants = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 1, 300);
    ctx.fillRect(60, 0, 1, 300);
    ctx.fillRect(120, 0, 1, 300);
    ctx.fillRect(180, 0, 1, 300);
    ctx.fillRect(240, 0, 1, 300);
    ctx.fillRect(299, 0, 1, 300);
}

const DrawSolKey = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "80px serif";

    ctx.fillText(SOL_KEY_CHAR, 0, LINE_OFFSET + 80); 
};


const DrawRandomNote = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = "75px serif";
    
    const note = NOTE_LIST.sample();
    const idx = NOTE_LIST.indexOf(note);
    const scale = SCALE_MAP.sample();

    const y = scale.offset - (idx * (LINE_SPACING / 2));
    if (y <= LINE_OFFSET) {
        for (let i = LINE_OFFSET; i >= y - (LINE_SPACING / 2); i -= LINE_SPACING) {
            ctx.fillRect(145, i, 40, 1);
        }
    } else if (y > LINE_OFFSET + LINE_SPACING * LINE_COUNT) {
        for (let i = LINE_OFFSET + LINE_SPACING * LINE_COUNT; i < y + (LINE_SPACING / 2); i += LINE_SPACING) {
            if (i == y) break;
            ctx.fillRect(NOTE_POS_X - 5, i, 40, 1);
        }
    }
    if (y < REVERSE_NOTE_OFFSET) {
        ctx.save();
        ctx.scale(-1, -1);
        ctx.fillText(NOTE_CHAR, -(NOTE_POS_X + 30), -(y - LINE_SPACING));
        ctx.restore();
    } else {
        ctx.fillText(NOTE_CHAR, NOTE_POS_X, y);    
    }
    return note;
}

const canvas = document.getElementById("solfej");

canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;
DrawPartition(canvas);
// DrawQuadrants(canvas);
DrawSolKey(canvas);

const note = DrawRandomNote(canvas);
