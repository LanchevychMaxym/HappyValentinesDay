import React, { useEffect, useState } from 'react';
import './App.css';
import useSound from 'use-sound'
import gif from './assets/cats.gif'
import gif2 from './assets/cat-kiss.gif'
import mySound1 from './assets/music6.mp3'
import mySound from './assets/music3.mp3'

function App() {

  // try to load photos from ./assets/us (webpack require.context). If folder absent, photoUrls will be empty.
  let photoUrls: string[] = [];
  try {
    // @ts-ignore: webpack require.context
    const req = (require as any).context('./assets/us', false, /\.(png|jpe?g|gif|webp)$/);
    
    photoUrls = req.keys().map((k: string) => req(k));
  } catch (e) {
    photoUrls = [];
  }
  const [count, setCount] = useState(0);
  const [noVisible, setNoVisible] = useState(true);
  const [yesClicked, setYesClicked] = useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [yesHeight, setYesHeight] = useState(40)
  const [fontSize, setFontSize] = useState(20)
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [playSound, { pause, stop }] = useSound(mySound1, {
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(true),
  });

  const [width, setWidth] = useState<number>(window.innerWidth);

  let noOptions = ["Ні", "Я не поняв😠", "Ти впевнена?😐", "Точно впевнена?😤", "Точно-точно?😑😑", "Добре подумала?😦", "Останній шанс!😬", "Реально ні?😮", "Це остаточна відповідь?😰", "Подумай ще раз!😲", "Ти можеш зробити велику помилку!😤", "Та май Бога в серці!😫", "Чому ти така холодна?😪", "Ти розбиваєш мені серце...😭"]
  const onClickNo = () => {
    if (count == noOptions.length - 1) {
      setCount(0);
      setNoVisible(false)
    }
    else {
      setCount(count + 1);
      if (isMobile) {
        setYesHeight(yesHeight + 20)
        setFontSize(fontSize + 5)
      }
      else {
        setYesHeight(yesHeight + 40)
        setFontSize(fontSize + 10)
      }

    }
  }

  const onClickYes = () => {
    setYesClicked(true)
    playSound()
    photosAnimation()
  }

  const heartsAnimation = () => {
    var love = setInterval(function() {
      var r_num = Math.floor(Math.random() * 40) + 1;
      var r_size = Math.floor(Math.random() * 65) + 10;
      var r_left = Math.floor(Math.random() * 100) + 1;
      var r_bg = Math.floor(Math.random() * 25) + 100;
      var r_time = Math.floor(Math.random() * 5) + 5;
  
      $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'></div>");
  
      $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);-webkit-animation:love " + (r_time + 5) + "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " + (r_time + 5) + "s ease'></div>");
  
      $('.heart').each(function() {
          var top = $(this).css("top").replace(/[^-\d\.]/g, '');
          var width = $(this).css("width").replace(/[^-\d\.]/g, '');
          if (Number(top) <= -100 || Number(width) >= 150) {
              $(this).detach();
          }
      });
  }, 500);
  }

  const photosAnimation = () => {
    console.log(photoUrls)
    if (!photoUrls || photoUrls.length === 0) {
      heartsAnimation();
      return;
    }

    var love = setInterval(function() {
      var r_num = Math.floor(Math.random() * 40) + 1;
      var r_size = Math.floor(Math.random() * 130) + 60; // photos 2x larger
      var r_left = Math.floor(Math.random() * 100) + 1;
      var r_time = Math.floor(Math.random() * 10) + 10; // animation 2x slower
      var photo = photoUrls[Math.floor(Math.random() * photoUrls.length)];

      console.log(photo)
      $('.bg_heart').append("<div class='photo' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'><img src='" + photo + "' style='width:100%;height:100%;object-fit:cover;border-radius:8px;'/></div>");

      $('.photo').each(function() {
          var top = $(this).css("top").replace(/[^-\d\.]/g, '');
          var width = $(this).css("width").replace(/[^-\d\.]/g, '');
          if (Number(top) <= -100 || Number(width) >= 300) {
              $(this).detach();
          }
      });
  }, 600);
  }


  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;
  return (
    <div className="App">
      {
        !yesClicked ?
          <div className='mainblock'>

            <div className='MainText'>
              <img src={gif} className='gif-image'></img>
              <h1>Скучила?</h1>
              <div className='buttons'>
                <button className="mybtn btn btn-success" onClick={onClickYes} style={{ height: `${yesHeight}px`, width: `${yesHeight}px`, fontSize: `${fontSize}px` }}>Так</button>
                {noVisible == true ? <button className="mybtn btn btn-danger" onClick={onClickNo} style={{ maxHeight: `60px` }}>{noOptions[count]}</button> : null}
              </div>
            </div>
          </div> :
          <div className='mainblockYes'>
            <img src={gif2} className='gif-image'></img>
            <h1>Кохаю тебе 😘💖</h1>
            <div className='love-subtitle-wrapper'>
              <div className='love-action'>
                <button className='love-symbol' onClick={() => setTooltipOpen(!tooltipOpen)} aria-label="show-more">💌</button>
                {tooltipOpen && <div className='love-tooltip'>А решта скажу особисто 💘</div>}
              </div>
              <h6 className='love-subtitle'>Дуже дуже сильно!❤️</h6>
            </div>
            <div className="bg_heart"></div>
          </div>}
    </div>
  );
}

export default App;
