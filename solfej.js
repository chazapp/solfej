Array.prototype.sample = function(exclude) {
  if (exclude) {
    const arr = this.filter((item, index) => !exclude.includes(index))
    return arr[Math.floor(Math.random()*arr.length)]
  }
  return this[Math.floor(Math.random()*this.length)];
}

function shuffleArray(arr) {
    let newArr = arr.map(value => ({ value, sort: Math.random() }))
                                  .sort((a, b) => a.sort - b.sort)
                                  .map(({ value }) => value)
    return newArr;
}

const CANVAS_HEIGHT = 320;
const CANVAS_WIDTH = 320;

const SOL_KEY_CHAR = "𝄞";
const FA_KEY_CHAR = "𝄢"
const NOTE_CHAR = "𝅘𝅥"
const NOTE_POS_X = 150;

const LINE_COUNT = 5;
const LINE_SPACING = 20;
const LINE_OFFSET = 120;
const REVERSE_NOTE_OFFSET = 150;
const NOTE_LIST = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"]

const SCALE_MAP = [{
       offset: {
           sol: 90,
           fa: 110,
       },
    }, {
        offset: {
            sol: 160,
            fa: 180,
        },
    }, {
        offset: {
            sol: 230,
            fa: 250,
        },
    }, {
        offset: {
            sol: 300,
            fa: 320,
        }
    }
]

const ANSWER_BUTTONS = 4;

const DrawPartition = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white"

    for (let i = 0; i < LINE_COUNT; i++) {
        ctx.fillRect(0, LINE_OFFSET + LINE_SPACING * i, CANVAS_WIDTH, 1)
    }
};

const ClearCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

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

const DrawKey = (canvas, config) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";

    if (config.key === "sol") {
        ctx.font = "80px NotoMusic";
        ctx.fillText(SOL_KEY_CHAR, 0, LINE_OFFSET + 80);
    }
    else if (config.key === "fa") {
        ctx.font = "75px NotoMusic";
        ctx.fillText(FA_KEY_CHAR, 0, LINE_OFFSET + 70);
    }
};


const DrawRandomNote = (canvas, config) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.font = '75px NotoMusic';

    const note = NOTE_LIST.sample();
    const idx = NOTE_LIST.indexOf(note);
    let scale = null;
    if (config.range === "simple") {
        scale = SCALE_MAP.sample([0, 3]);
    } else {
        scale = SCALE_MAP.sample();
    }

    const y = scale.offset[config.key] - (idx * (LINE_SPACING / 2));
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

const AddResponseButtons = (container, note) => {
    const buttons = []
    const buttonTailwindClasses = "outline-solid text-white rounded p-4"

    const altAnswers = shuffleArray(NOTE_LIST).filter(e => e !== note);
    for (let i = 0; i < ANSWER_BUTTONS; i++) {
        const button = document.createElement("button");
        button.setAttribute("class", buttonTailwindClasses);
        if (i == 0) {
            button.isCorrect = true;
            button.appendChild(document.createTextNode(note));
            button.onclick = () => {
                button.setAttribute("class", `${buttonTailwindClasses} fade-success`)
                setTimeout(Play, 800)
            };
        } else {
            button.appendChild(document.createTextNode(altAnswers[i]));    
            button.onclick = () => {
                buttons.find(e => e.isCorrect == true).setAttribute("class", `${buttonTailwindClasses} fade-success`)
                button.setAttribute("class", `${buttonTailwindClasses} fade-fail`)
                setTimeout(Play, 500)
            };
        }
        buttons.push(button)
    }
    container.append(...shuffleArray(buttons));
}

const GetConfig = () => {
    const gameMode = window.location.hash.replace("#", "");
    const key = document.getElementById("key").value;
    const range = document.getElementById("range").value;

    return {
        gameMode,key,range
    }
};

const Play = () => {
    const config = GetConfig();
    const buttonsContainer = document.getElementById("buttons")
    
    const canvas = document.getElementById("solfej");
    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;

    const font = new FontFace(`NotoMusic`, `url('NotoMusicRegular.ttf')`);
    font.load().then(() => {
        ClearCanvas(canvas);
        DrawPartition(canvas);
        DrawKey(canvas, config);
        const note = DrawRandomNote(canvas, config);
        buttonsContainer.replaceChildren();
        AddResponseButtons(buttonsContainer, note)
    });
}



Play();