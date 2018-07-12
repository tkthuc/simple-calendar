import React from 'react';

import throttle from 'lodash/throttle';

export default class InfiniteScrolling extends React.Component {

   

    constructor(props) {
        super(props);        

        this.lastScroll  = 0

        this.state = {
            list: props.list,
            start: 0,
            itemPerPage: props.itemPerPage,            
            end: 10,
            itemHeight: props.height,
            scrolling: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.list != state.list) {
            return {
                list: props.list
            }
        }
        return null;
    }

    loadMore() {
        this.props.getNextItems()
        .then(
            () =>   this.setState({
                scrolling: false
            })
        )
      
    }

    handleScroll() {
        
        const { scrolling } = this.state;

        if(scrolling) {
            return;
        }

        if (this.lastScroll >= this.scroller.scrollTop) {
            this.lastScroll = this.scroller.scrollTop;
            return;
        }      

        this.lastScroll = this.scroller.scrollTop;

        // const lastLi = document.querySelector('ul.infinite-list > li:last-child');
        // const lastLiOffset = lastLi.offsetTop +lastLi.clientHeight;
        //const pageOffset = this.scroller.scrollTop + parseInt(window.getComputedStyle(document.querySelector('ul.infinite-list')).getPropertyValue("height").split("px")[0]);

        //if(pageOffset > this.scroller.scrollHeight - 20) {
        if(this.scroller.scrollHeight - this.scroller.scrollTop - this.scroller.offsetHeight > 10){
            this.setState({
                    scrolling:true,
                },
                this.loadMore
            )
        
        }

    }

    componentDidMount() {

        let throttled = throttle(this.handleScroll, 500);
        this.scrollListener = this.scroller.addEventListener('scroll', throttled.bind(this));
    }

    render() {
        return (
            <ul className='infinite-list' style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto"
                }}
                ref = {
                    scroller => this.scroller = scroller
                }
                >
                {
                    this.state.list.map( (item,index) => {
                        return <li key={index} style={{
                                    padding: "5px"
                                }}> 
                                    <input type="checkbox" value={item.status} id={ `item_${index}`} name= {`item_checkbox_${index}`}/> 
                                    &nbsp;
                                    <label htmlFor={`item_${index}`}> { item.text } </label>
                                </li>
                    })
                }
            </ul>
        )
    }
   

}