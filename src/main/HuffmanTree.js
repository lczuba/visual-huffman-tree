import React, {Component} from 'react'

class Node {
    constructor(letter){
        this.letter = letter;
        this.count = 1;
        this.leaf = true;
        this.level = 0;
    }
    goLeft;
    goRight;
    xPos=0;
    yPos=0;

    xLeftPos;
    yLeftPos;

    xRightPos;
    yRightPos;
}

function huffmanTreeDrawing(node, lvl, nextAvailablePositionAtLevelArray, leftMargin)
{
    if (nextAvailablePositionAtLevelArray.length <= lvl) {
        nextAvailablePositionAtLevelArray[lvl] = 0;
    }

    node.xPos = Math.max(nextAvailablePositionAtLevelArray[lvl], leftMargin);

    node.yPos = lvl;
    node.level = lvl;

    if (!node.leaf) {
        // Recursively set the left tree, which can be as far left as the nextAvailablePositionAtDepthArray allows
        var leftPos = huffmanTreeDrawing(node.goLeft, lvl+1, nextAvailablePositionAtLevelArray, 0);
        node.xLeftPos = leftPos;
        node.yLeftPos = lvl+1;
        
        // After calculating the positioning of the left nodes, we need to make sure our parent node is to the right of it.
        node.xPos = Math.max(node.xPos, leftPos+1);

        // Recursively set the right tree, which has to be to the right of the parent node
        var rightPos = huffmanTreeDrawing(node.goRight, lvl+1, nextAvailablePositionAtLevelArray, node.xPos+1);
        node.xRightPos = rightPos;
        node.yRightPos = lvl+1;

        // Try and center the middle node if possible. This is a simple adjustment that helps the tree look nice
        var midPos = Math.floor((leftPos + rightPos) / 2);
        if (midPos > node.xPos) {
            node.xPos = midPos;
        }
    }

    // Update the nextAvailablePositionAtDepthArray now that we have decided the X position of the node.
    nextAvailablePositionAtLevelArray[lvl] = node.xPos + 2;
	return node.xPos;
}

class HuffmanTree extends Component{
    constructor(){
        super();
        this.state = {
            lettersList: [],
        }
    }

    componentDidUpdate(prevProps){

        if(prevProps.allText !== this.props.allText) 
        {
            const lettersList = [];
            const allText = this.props.allText;

            for(var i=0; i< allText.length; i++)
            {
                var isExsists = false;

                for(var j=0; j<lettersList.length; j++)
                {
                    if(lettersList[j].letter === allText[i])
                    {
                        isExsists = true;
                        lettersList[j].count++;
                    }
                }

                if(!isExsists)
                {
                    lettersList.push(new Node(allText[i]))
                }
            }

            lettersList.sort((a, b) => (a.count > b.count) ? 1 : -1);

            this.setState( () => ({
                lettersList: lettersList
            }))

            if(lettersList.length > 1) //create huffman tree when its
            {
                const huffmanCodingArr = [...lettersList];

                while(huffmanCodingArr.length > 1)
                {
                    const node = new Node("");
                    lettersList.push(node);
                    node.leaf = false;
                    node.count = huffmanCodingArr[0].count + huffmanCodingArr[1].count;
                    node.goRight = huffmanCodingArr[0];
                    huffmanCodingArr.shift();
                    node.goLeft = huffmanCodingArr[0];
                    huffmanCodingArr.shift();
                    huffmanCodingArr.push(node);
                    huffmanCodingArr.sort((a, b) => (a.count > b.count) ? 1 : -1);
                }
            
                var nextAvailablePositionAtLevelArray = [];
                huffmanTreeDrawing(huffmanCodingArr[0], 0, nextAvailablePositionAtLevelArray, 0);
            }
           

        }
    }

    render(){
        return(
        <div className="huffmanTree">
            <div className="huffmanArea">
                {this.state.lettersList.map( (element, index) => (
                    element.leaf ? 
                    <div className="node" style={{left: element.xPos*40+"px", top: element.yPos*40+"px"}} key={index}>
                        {element.letter} : {element.count}
                    </div>
                    :
                    <div className="node" style={{left: element.xPos*40+"px", top: element.yPos*40+"px"}} key={index}>
                        {element.count}
                    </div>
                ))}
            </div>

            <svg>
                {this.state.lettersList.map( (element, index) => (
                    element.leaf ?
                    null
                    :
                    <polyline points={(element.xPos * 40 + 20) +','+ (element.yPos * 40 + 20) + " " + (element.xLeftPos * 40 + 20) +','+ (element.yLeftPos * 40 + 20)}
                    />
                ))}
                {this.state.lettersList.map( (element, index) => (
                    element.leaf ?
                    null
                    :
                    <polyline points={(element.xPos * 40 + 20) +','+ (element.yPos * 40 + 20) + " " + (element.xRightPos * 40 + 20) +','+ (element.yRightPos * 40 + 20)}
                    />
                ))}
            </svg>
        </div>
        )
    }
}

export default HuffmanTree