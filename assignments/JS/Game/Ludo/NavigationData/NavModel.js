const E1 = new GetNavObj($('#E1'));
const E2 = new GetNavObj($('#E2'));
const E3 = new GetNavObj($('#E3'));
const E4 = new GetNavObj($('#E4'));
const E5 = new GetNavObj($('#E5'));
const E6 = new GetNavObj($('#E6'));
const E7 = new GetNavObj($('#E7'));
const E8 = new GetNavObj($('#E8'));
const E9 = new GetNavObj($('#E9'));
const E10 = new GetNavObj($('#E10'));

const E11 = new GetNavObj($('#E11'));
const E12 = new GetNavObj($('#E12'));
const E13 = new GetNavObj($('#E13'));
const E14 = new GetNavObj($('#E14'));
const E15 = new GetNavObj($('#E15'));
const E16 = new GetNavObj($('#E16'));
const E17 = new GetNavObj($('#E17'));
const E18 = new GetNavObj($('#E18'));
const E19 = new GetNavObj($('#E19'));
const E20 = new GetNavObj($('#E20'));

const E21 = new GetNavObj($('#E21'));
const E22 = new GetNavObj($('#E22'));
const E23 = new GetNavObj($('#E23'));
const E24 = new GetNavObj($('#E24'));
const E25 = new GetNavObj($('#E25'));
const E26 = new GetNavObj($('#E26'));
const E27 = new GetNavObj($('#E27'));
const E28 = new GetNavObj($('#E28'));
const E29 = new GetNavObj($('#E29'));
const E30 = new GetNavObj($('#E30'));

const E31 = new GetNavObj($('#E31'));
const E32 = new GetNavObj($('#E32'));
const E33 = new GetNavObj($('#E33'));
const E34 = new GetNavObj($('#E34'));
const E35 = new GetNavObj($('#E35'));
const E36 = new GetNavObj($('#E36'));
const E37 = new GetNavObj($('#E37'));
const E38 = new GetNavObj($('#E38'));
const E39 = new GetNavObj($('#E39'));
const E40 = new GetNavObj($('#E40'));

const E41 = new GetNavObj($('#E41'));
const E42 = new GetNavObj($('#E42'));
const E43 = new GetNavObj($('#E43'));
const E44 = new GetNavObj($('#E44'));
const E45 = new GetNavObj($('#E45'));
const E46 = new GetNavObj($('#E46'));
const E47 = new GetNavObj($('#E47'));
const E48 = new GetNavObj($('#E48'));
const E49 = new GetNavObj($('#E49'));
const E50 = new GetNavObj($('#E50'));

const E51 = new GetNavObj($('#E51'));
const E52 = new GetNavObj($('#E52'));
const E53 = new GetNavObj($('#E53'));
const E54 = new GetNavObj($('#E54'));
const E55 = new GetNavObj($('#E55'));
const E56 = new GetNavObj($('#E56'));
const E57 = new GetNavObj($('#E57'));
const E58 = new GetNavObj($('#E58'));
const E59 = new GetNavObj($('#E59'));
const E60 = new GetNavObj($('#E60'));

const E61 = new GetNavObj($('#E61'));
const E62 = new GetNavObj($('#E62'));
const E63 = new GetNavObj($('#E63'));
const E64 = new GetNavObj($('#E64'));
const E65 = new GetNavObj($('#E65'));
const E66 = new GetNavObj($('#E66'));
const E67 = new GetNavObj($('#E67'));
const E68 = new GetNavObj($('#E68'));
const E69 = new GetNavObj($('#E69'));
const E70 = new GetNavObj($('#E70'));
const E71 = new GetNavObj($('#E71'));
const E72 = new GetNavObj($('#E72'));

const FINAL_GREEN= new GetNavObj($('#finalGreen'));
const FINAL_YELLOW= new GetNavObj($('#finalYellow'));
const FINAL_RED= new GetNavObj($('#finalRed'));
const FINAL_BLUE= new GetNavObj($('#finalBlue'));

function GetNavObj(obj) {

    let block = obj;


    this.getBlock = function () {
        return block;
    }
    this.addCoin = function (color) {
        switch (color) {
            case "red":
                appendCoin("assets/images/redCoin.png", 'red');
                break;
            case "green":
                appendCoin("assets/images/greenCoin.png", 'green');
                break;
            case "yellow":
                appendCoin("assets/images/yellowCoin.png", 'yellow');
                break;
            case "blue":
                appendCoin("assets/images/blueCoin.png", 'blue');
                break;
        }
    }

    function reArrangeCoins() {
        let children = block.children();
        switch (children.length) {

            case 2: {
                children.eq(0).css({
                    'inset': 'initial',
                    'scale': '.8',
                    'left': '0'
                });
                children.eq(1).css({
                    'inset': 'initial',
                    'scale': '.8',
                    'right': '0'
                });
                break;
            }

            case 3: {
                children.eq(0).css({
                    'inset': 'initial',
                    'scale': '.8',
                    'top': '-20%',
                    'left': '0'
                });
                children.eq(1).css({
                    'inset': 'initial',
                    'scale': '.8',
                    'top': '-20%',
                    'right': '0'
                });
                children.eq(2).css({
                    'inset': '0',
                    'scale': '.8'
                });
                break;
            }
            case 4: {
                children.eq(0).css({
                    'inset': 'initial',
                    'scale': '.8',
                    'top': '-20%',
                    'left': '0'
                });
                children.eq(1).css({
                    'inset': 'initial',
                    'scale': '.8',
                    'top': '-20%',
                    'right': '0'
                });
                children.eq(2).css({
                    'inset': 'initial',
                    'scale': '.8',
                    'bottom': '-20%',
                    'left': '0'
                });
                children.eq(3).css({
                    'inset': 'initial',
                    'scale': '.8',
                    'bottom': '-20%',
                    'right': '0'
                });
                break;
            }
        }
    }

    function appendCoin(img, cls) {
        block.append('<img class="' + cls + '" style="transform: scale(0)" src="' + img + '">');
        block.children().css('transform', 'scale(1)');
        reArrangeCoins();
    }

    let count = 0;
    this.removeCoin = function (color) {
        block.children("img").each(function () {
            if (count == 0) {
                if ($(this).attr('class') == color) {
                    $(this).remove();
                    reArrangeCoins();
                    count++;
                }
            }
        });
        count = 0;
    }
}

