import React ,{Component} from 'react';

class Snake extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                {
                    this.props.snakeDots.map((dot,i)=>{
                        const style={
                            left:`${dot[0]}%`,
                            top:`${dot[1]}%`
                        }
                        return <div className="snakeBody" style={style} key={i}></div>
                    })
                }
            </div>
         );
    }
}
 
export default Snake;