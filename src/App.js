import {Component, useState, useEffect, useCallback, useMemo, useReducer} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';
// class Slider extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }

//     componentDidMount() {
//         document.title = `Slide ${this.state.slide}`;
//     }

//     componentDidUpdate() {
//         document.title = `Slide ${this.state.slide}`;
//     }

//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }

//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }

//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }

const countTotal = (num) => {
    console.log('counting...');
    return num + 10;
}

function reducer (state, action) {
    switch(action.type) {
        case 'toggle':
            return {autoplay: !state.autoplay};
        case 'slow':
            return {autoplay: 300};
        case 'fast':
            return {autoplay: 700};
        case 'custom':
            return {autoplay: action.payload};
        default:
            throw new Error();
    }
}

function init(initial) {
    return {autoplay: initial};
}

const Slider = ({initial}) => {

    const [slide, setSlide] = useState(0);
    // const [autoplay, setAutoplay] = useState(false);
    const [autoplay, dispatch] = useReducer(reducer, initial, init);

    const getSomeImages = useCallback(() => {
        console.log('fetching')
        return [
            'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg',
            'https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg'
        ]
    }, []);

    function logging() {
        console.log('log!');
    }

    // useEffect(() => {
    //     console.log('effect');
    //     document.title = `Slide ${slide}`;
    // }, []); // Empty array means that the effect will only run once
    
    useEffect(() => {
        console.log('effect update');
        document.title = `Slide ${slide}`;
        
        window.addEventListener('click', logging);

        return () => {
            window.removeEventListener('click', logging);
        }

    }, [slide]); // Only run when slide changes

    useEffect(() => {
        console.log('autoplay');
    }, [autoplay]);

    // const [state, setState] = useState({autoplay: false, slide: 0});

    // function changeSlide(i) {
    //     setState(state => ({...state, slide: state.slide + i}));
    //     // setSlide(slide => slide + i); // Using call-back function 2 times in a row will cause the slide to be updated twice
    // }

    // function toggleAutoplay() {
    //     setState(autoplay => ({...autoplay, autoplay: !state.autoplay}));
    // }

    function changeSlide(i) {
        setSlide(slide => slide + i);
        // setSlide(slide => slide + i); // Using call-back function 2 times in a row will cause the slide to be updated twice
    }

    // function toggleAutoplay() {
    //     setAutoplay(autoplay => !autoplay);
    // }

    const total = useMemo(() => countTotal(slide), [slide]); // Hook useMemo used to cache the result of a function.

    const style = useMemo(() => ({
            color: slide > 4 ? 'red' : 'black'
    }), [slide])

    useEffect(() => {
        console.log('styles!');
    }, [style]);

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <Slide getSomeImages={getSomeImages}/>

                <div className="text-center mt-5">Active slide {slide} <br/>{autoplay.autoplay ? 'auto' : null}</div>
                <div style={style} className="text-center mt-5">Total slides: {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'toggle'})}>toggle autoplay</button>
                        <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'slow'})}>slow autoplay</button>
                        <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'fast'})}>fast autoplay</button>
                        <button 
                        className="btn btn-primary me-2"
                        onClick={(e) => dispatch({type: 'custom', payload: +e.target.textContent})}>1000</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages());
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);



  return (
    <>
        <button onClick={() => setSlider(false)}>Click</button>    
        {slider ? <Slider initial={false}/> : null}
    </>
  );
}

export default App;
