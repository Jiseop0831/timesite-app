import './App.css';
import { useState, useEffect } from 'react'; 
import Moment from 'react-moment';

import {useInterval} from "use-interval";
// import { Link } from 'reack-router-dom' // 리액트에서 Link를 사용하게 해줌

function Header(props) {
  function dark (e) {
    e.preventDefault();
    const main = document.querySelector('.main');
    const header = document.querySelector('header');
    const main_menu = document.querySelector('.main_menu');
    const footer = document.querySelector('footer');
    const github = document.querySelector('footer ul li p a');
    const moment_box = document.querySelector('.moment-box');
    for (const main_a of document.querySelectorAll('.main_menu li a')) {
      main_a.style.color = 'white';
    }
    for (const footer_a of document.querySelectorAll('footer ul li p')) {
      footer_a.style.color = 'white';
    }
    for (const h1 of document.querySelectorAll('h1')) {
      h1.style.color = 'white';
    }
    for (const h2 of document.querySelectorAll('h2')) {
      h2.style.color = 'white';
    }
    for (const span of document.querySelectorAll('.numbers span')) {
      span.style.color = 'white';
    }

    main.style.background = 'rgb(29, 29, 29)';
    header.style.background = 'rgb(29, 29, 29)';
    main_menu.style.background = 'rgba(70, 70, 70, 0.842)';
    footer.style.background = 'rgba(70, 70, 70, 0.842)';
    github.style.color = 'white'
    moment_box.style.color = 'white';
  }

  function light (e) {
    e.preventDefault();
    const main = document.querySelector('.main');
    const header = document.querySelector('header');
    const main_menu = document.querySelector('.main_menu');
    const footer = document.querySelector('footer');
    const github = document.querySelector('footer ul li p a');
    const moment_box = document.querySelector('.moment-box');
    for (const main_a of document.querySelectorAll('.main_menu li a')) {
      main_a.style.color = 'black';
    }
    for (const footer_a of document.querySelectorAll('footer ul li p')) {
      footer_a.style.color = 'black';
    }
    for (const h1 of document.querySelectorAll('h1')) {
      h1.style.color = 'black';
    }
    for (const h2 of document.querySelectorAll('h2')) {
      h2.style.color = 'black';
    }
    for (const span of document.querySelectorAll('.numbers span')) {
      span.style.color = 'black';
    }

    main.style.background = 'white';
    header.style.background = 'rgb(218, 57, 137)';
    main_menu.style.background = 'rgba(155, 154, 154, 0.842)';
    footer.style.background = 'rgba(155, 154, 154, 0.842)';
    github.style.color = 'black'
    moment_box.style.color = 'black';
  }

  return <header>
           <h1><a href='/'>온라인 시계</a></h1>
           <div className={'theme'}>
             <button className={'dark'} onClick = {dark}>어둠</button>
             <button className={'light'} onClick = {light}>밝음</button>
           </div>
         </header>
}

function Menusub(props) {
  return <ul className={'main_menu'}>
            <li><a href='#line 1'>⏰ 타이머</a></li>
            <li><a href='#line 2'>⏱ 스톱워치</a></li>
            <li><a href='#line 3'>⌚ 현재시간</a></li>
        </ul>
}

function Timer(props) {

  let [Timer_num, Timer_submit] = useState(0);

  function submits() {
    const timer = document.querySelector('.start_timer')


    const stop = document.querySelector('.stop_timer')
    const restart = document.querySelector('.restart_timer')

    let time = prompt('몇초동안 진행하겠습니까?');

    Timer_submit(time)


    let startTimer = setInterval(function() {
      time--
      Timer_submit(time)
      if(time <= 0) {
        Timer_submit(0)
        clearTimer();
      }
    },1000)

    stop.addEventListener('click', () => {
      clearInterval(startTimer)
    }) 

    restart.addEventListener('click', () => {

      startTimer = setInterval(function() {
        time--
        Timer_submit(time)
        if(time <= 0) {
          Timer_submit(0)
          clearTimer(time);
        }
      },1000)
    })

    function clearTimer() {
      if(Timer_num === 0) {
        clearInterval(startTimer)
        timer.textContent = '숫자 입력'
      }

    }
  }

  return (
    <div className={'Timer_menu'} id='line 1'>
      <h2>타이머</h2>
      <h1>{Timer_num}</h1>

      <button className={'start_timer'} onClick = {submits}>숫자 입력</button>
      <button className={'stop_timer'}>멈추기</button>
      <button className={'restart_timer'}>다시 시작</button>
    </div>
  )
}


const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
 
  return (
    <div className="StopWatch_menu"  id='line 2'>
      <h2>스톱워치</h2>
      <div className="numbers">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
        <button onClick={() => setRunning(true)}>시작</button>
        <button onClick={() => setRunning(false)}>멈추기</button>
        <button onClick={() => {setTime(0); setRunning(false); }}>리셋</button>       
  </div>
  );
}

function Nowdata() {
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  const [saleStartDate, setSaleStartDate] = useState(today);

  const [nowTime,setNowTime]=useState(Date.now())

    useInterval(()=>{
        setNowTime(Date.now())
    },1000)
  

  return (
    <div className={'Now_data'} id='line 3'>
      <h2>현재시간</h2>
      <h1>{saleStartDate} </h1>
      <Moment format={"HH:mm:ss"} className={'moment-box'}>{nowTime}</Moment>
    </div>

  )
}

function Footer() {
  return (
          <footer>
            <ul>
              <li><p>대표자: 정지섭</p></li>
              <li><p><a href='https://github.com/Jiseop0831'>github</a> </p><p>전화:010-4812-6901</p> <p>이메일: jiseop831@gmail.com</p> </li>
            </ul>
          </footer> 
         )
}


function Home() {
  return (
    <div className={'main'}>
      <Header />
      <Menusub />
      <div>
        <Timer />
        <StopWatch />
        <Nowdata />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
