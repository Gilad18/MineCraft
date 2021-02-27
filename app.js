const board = document.querySelector('.grid');
const tool = document.querySelectorAll('.tools div');
const matter = document.querySelectorAll('.matter div');
const resetWorld = document.querySelector('.resetWorld');
const SwitchMode = document.querySelector('.switchMode');


for (let i = 0; i < 3; i++) {                           //change to forEach and movedown
    tool[i].setAttribute('data', i + 1);
}

for (let i = 0; i < 5; i++) {
    matter[i].setAttribute('data', i + 1);
}

let grassRow;       
let smallTreeCol;    
let BigTreeCol;      
let BigRockColl;     
let smallCloud;         // apply in random
let bigCloud;       

let toolID;
let matterID;
let isUsingTool = false;
let isUsingMatter = false;
let darkMode = false;

const tools = {
    1: ['wood', 'leaves'],
    2: ['rock'],
    3: ['soil', 'grass']
};

let tiles = {
    inventory:
    [
        {
            id :1,
            name: 'grass',
            amount: 0,
        },
        {
            id: 2,
            name: 'soil',
            amount: 0,
        },
        {
            id: 3,
            name: 'wood',
            amount: 0,
        },
        {
            id: 4,
            name: 'leaves',
            amount: 0,
        },
        {
            id : 5,
            name: 'rock',
            amount: 0,
        }
    ],
    findTile : function (id) {
        let requested =   this.inventory.find(item => {
           return  item.id === id; 
        });
         return requested;
    },
    findTilebyName : function (name) {
        let requested =   this.inventory.find(item => {
           return  item.name === name; 
        });
         return requested;
    },
    cleanInventory : function () {
        return this.inventory.map(item => {
             item.amount = 0; 
        });
    },
};

const toggleMode = () => {
    if (!darkMode) {
        document.body.style.setProperty('--lightGrid', 'rgb(2, 27, 73)');
        document.body.style.setProperty('--lightSide', 'black');
        document.body.style.setProperty('--lightText', 'white');
        SwitchMode.innerHTML = 'Light Mode';
        darkMode = true;
    } else if (darkMode) {
        document.body.style.setProperty('--lightGrid', ' cornflowerblue');
        document.body.style.setProperty('--lightSide', 'rgb(177, 174, 174)');
        document.body.style.setProperty('--lightText', 'black');
        darkMode = false;
        SwitchMode.innerHTML = 'Dark Mode';
    }
};

const harverst = (cell) => {
    if (tools[toolID].includes(cell.getAttribute('class')) && isUsingTool ===true) {
        let tilesObj = tiles.findTilebyName(cell.getAttribute('class'));
        tilesObj.amount++;
        matter[tilesObj.id-1].innerHTML = tilesObj.amount;
        cell.classList.remove(cell.getAttribute('class'));
    };
};

const implant = (cell) => {
        if (!cell.getAttribute('class')) {
            if(isUsingMatter === true && matterID.amount > 0 ) {
                console.log('implant invoked');
                console.log(matterID);
                console.log(cell);
                cell.classList.add(matterID.name);
                matterID.amount--
                matter[matterID.id-1].innerHTML = matterID.amount;
                console.log(tiles);
        } else matter[matterID.id-1].style.border = '2px red solid';
     }  
};

const callToAction = (e) => {
    theBox = e.target;
    if (isUsingTool) {
        harverst(theBox);
    } else if (isUsingMatter) {
        implant(theBox);
    }
};

const disableSelectionVisual = () => {
    tool.forEach(item => item.style.border = 'none');
    tool.forEach(item => item.style.opacity = '0.7');
    matter.forEach(item => item.style.border = 'none');
    matter.forEach(item => item.style.opacity = '0.7');
};

const getTool = (e) => {
    isUsingMatter = false;
    isUsingTool = true;
    disableSelectionVisual();
    toolID = e.target.getAttribute('data');
    e.target.style.border = '4px green solid';
    e.target.style.opacity = '1';
};

const getMatter = (e) => {
    isUsingTool = false;
    isUsingMatter = true;
    disableSelectionVisual();
    matterID = tiles.findTile(parseInt(e.target.getAttribute('data')));
    e.target.style.border = '2px white solid';
    e.target.style.opacity = '1';
};

const giveRandomRange = (x, y) => {
    return Math.floor(Math.random() * (y - x + 1) + x);
};

const smallTreeM = [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1]
];

const bigTreeM = [
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0]
];

const bigRockM = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0]
];

const smallCloudM = [
    [0, 0, 1, 0],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [0, 1, 0.0]
];

const bigClaudM = [
    [0, 1, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1]
]


const createWorld = () => {

    board.innerHTML = '';
    matter.forEach(item => item.innerHTML = '');
    tiles.cleanInventory();
    disableSelectionVisual();
    toolID = '';
    matterID = '';
    isUsingTool = false;
    isUsingMatter = false;

    grassRow = giveRandomRange(15, 18);
    smallTreeCol = giveRandomRange(20, 25);
    BigTreeCol = giveRandomRange(9, 13);
    smallRockCol = giveRandomRange(14, 16);
 

    for (let k = 0; k < 20; k++) {
        for (let i = 0; i < 30; i++) {
            let box = document.createElement('div');
            box.setAttribute('col', i);
            box.setAttribute('row', k);
            if (k > grassRow) {
                box.classList.add('soil');
            }
            else if (k === grassRow) {
                box.classList.add('grass');
            }
            else if ((i === smallTreeCol || i === BigTreeCol || i === BigTreeCol + 1) &&
                k - grassRow <= -1 && k - grassRow >= -4) {
                box.classList.add('wood');
            }
            else if (k < grassRow - 4 && k > grassRow - 8 && i < smallTreeCol + 3 && i > smallTreeCol - 3) {
                if (smallTreeM[k - grassRow + 7][i - smallTreeCol + 2] === 1) {
                    box.classList.add('leaves');
                }
            }
            else if (k < grassRow - 3 && k > grassRow - 10 && i < BigTreeCol + 4 && i > BigTreeCol - 3) {
                if (bigTreeM[k - grassRow + 9][i - BigTreeCol + 2]) {
                    box.classList.add('leaves');
                }
            }
            else if (i > smallRockCol && i < smallRockCol + 4 &&
                k - grassRow <= -1 && k - grassRow >= -3) {
                box.classList.add('rock');
            }
            else if (k > grassRow - 6 && k < grassRow && i >= 0 && i < 6) {
                if (bigRockM[grassRow - k - 1][i] === 1) {
                    box.classList.add('rock');
                }
            }
            else if (k > 2 && k < 7 && i < 7 && i > 2) {
                if (smallCloudM[k - 3][i - 3] === 1) {
                    box.classList.add('cloud');
                }
            }
            else if (k > 1 && k < 7 && i > 21 && i < 27) {
                if (bigClaudM[k - 2][i - 22]) {
                    box.classList.add('cloud');
                }
            }
            box.addEventListener('click', callToAction);
            board.appendChild(box);
        }
    } 
}

tool.forEach(myTool => myTool.addEventListener('click', getTool));



matter.forEach(myMatter => myMatter.addEventListener('click', getMatter));
SwitchMode.addEventListener('click', toggleMode);


createWorld();

resetWorld.addEventListener('click', createWorld);



