
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $('.cd');
const heading = $('header > h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const nextBtn = $('.btn-next');
const preBtn = $('.btn-prev');         
const repeatBtn = $('.btn-repeat');
const randomBtn = $(".btn-random");
const list = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,           
    isRepeat: false,
    listSongPlayed: [],
    song: [
        {
            name: "CARDIGAN",
            singer: "Taylor swift",
            path: "http://songs6.vlcmusic.com/mp3/org/31274.mp3",
            image: "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/31274.png"
          },
          {
            name: "Somebody",
            singer: "Justin Bieber",
            path: "http://songs6.vlcmusic.com/mp3/org/36745.mp3",
            image:
              "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/36745.png"
          },
          {
            name: "GIRLFRIEND",
            singer: "CHARLIE PUTH",
            path:
              "http://songs6.vlcmusic.com/mp3/org/39387.mp3",
            image: "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/39387.png"
          },
          {
            name: "TIME FLIES",
            singer: "TORI KELLY",
            path: "http://songs6.vlcmusic.com/mp3/org/39203.mp3",
            image:
              "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/39203.png"
          },
          {
            name: "Be Mine",
            singer: "Massari",
            path: "http://songs6.vlcmusic.com/mp3/org/37890.mp3",
            image:
              "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/37890.png"
          },
          {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path:
              "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
            image:
              "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
          },
          {
            name: "Lonely & Holy",
            singer: "Justin Bieber",
            path: "http://songs6.vlcmusic.com/mp3/org/39774.mp3",
            image:
              "https://songs6.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/39774.png"
          },
        
    ],

    start: function(){
        // Render list danh sách bài hát
        this.render();
        // Định nghĩa property cho object
        this.defineProperties();
        // Load bài hát đàu tiên lên ứng dụng
        this.loadCurrentSong();
        // Xử lí sự kiện
        this.handleEvents();
    },
    defineProperties: function(){
        Object.defineProperty(this, "currentSong", {
            get: function(){
                return this.song[this.currentIndex];
            }
        })
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
        audio.src = `${this.currentSong.path}`

    },
   
    render: function(){
        let htmls = this.song.map((item, index) => {
            return `
                <div class="song ${index == this.currentIndex ? 'active' : ''}" data-set="${index}">
                    <div class="thumb" style="background-image: url('${item.image}')">
                    </div>
                    <div class="body">
                    <h3 class="title">${item.name}</h3>
                    <p class="author">${item.singer}</p>
                    </div>
                    <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`
        })
        $('.playlist').innerHTML = htmls.join('');
    },
    // cập nhật trạng thái active
    update(){   
        var temp = Number(_this.currentIndex);
        $(".song.active").classList.remove('active');
        $(`.playlist .song:nth-child(${temp + 1})`).classList.add("active");
    },
    nextSong: function(){
        const countSong = this.song.length;
        this.currentIndex++;
        if(this.currentIndex > countSong - 1){
            this.currentIndex = 0;            
        }
        this.loadCurrentSong(); 
    },
    preSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex = this.song.length - 1;            
        }
        this.loadCurrentSong(); 
    },
    //Random cho hết các bài hát trong danh sách roi lap lai
    randomSong: function(){
        this.listSongPlayed.length === this.song.length - 1 ? this.listSongPlayed.splice(0, this.listSongPlayed.length) : this.listSongPlayed.push(Number(this.currentIndex));
        do{
            var newIndex = Math.round(Math.random() * (this.song.length - 1));
        }while(newIndex == _this.currentIndex || this.listSongPlayed.includes(newIndex));
        _this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
   
    
    repeatSong: function(){
        if(audio.currentTime === audio.duration){
            audio.currentTime = 0;
        }
    },
    scrollToView: function(){
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "end",
            })
        }, 300)
    },
    handleEvents: function (){
        // Đại diện cho list
        _this = this;
        // Xử lí scroll lớn nhỏ cdThumb
        const cdWidth = cd.offsetWidth;
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            let newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0 ;
            cd.style.opacity = newCdWidth / cdWidth;
        }
    

        // Xử lí play music c1
        // playBtn.onclick =  function(){
        //     if(list.isPlaying){
        //         audio.pause();
        //         list.isPlaying = false;
        //     }
        //     else{
        //         audio.play();
        //         list.isPlaying = true;
        //     }
        //     $('.player').classList.toggle('playing');
        // }

        // Xử lí play music c2
        playBtn.onclick =  function(){
            if(_this.isPlaying){
                audio.pause();
            }
            else{
                audio.play();
            }
        }
        // Xử lí khi bấm play
        audio.onplay = function(){
            _this.isPlaying = true;
            $('.player').classList.add('playing');
            animateImg.play();
        }
        // Xử lí khi bấm pause
        audio.onpause = function(){
            _this.isPlaying = false;
            $('.player').classList.remove('playing')
            animateImg.pause();
        }

        //Xử lí CD quay / dừng
        const animateImg = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000, // quay 1 vòng 10s
            iterations: Infinity
        })

        animateImg.pause();

        //Xử lí khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration){
                const progressPercent = audio.currentTime / audio.duration * 100;
                $("#progress").value = progressPercent;
            }
        }
        //Xử lí khi seek bài hát
        $("#progress").onchange = function(e){
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }

        // Xử lí khi bấm next
        // nextBtn.onclick = function(){
        //     if(_this.isRandom){
        //         _this.randomSong();
        //     }
        //     else{
        //         _this.nextSong();
        //     }
        //     audio.play();
        //     _this.render();
        //     _this.scrollToView();
            
        // }

        //c2 active không cần render toàn danh sách
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }
            else{
                _this.nextSong();
            }
            audio.play();
            _this.update();
            _this.scrollToView();
            
        }

        // Xử lí khi bấm pre

        preBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }
            else{
                _this.preSong();
            }
            audio.play();
            // _this.render();
            _this.update();
            _this.scrollToView();
        }

        //Xử lí khi bấm random
        randomBtn.onclick = function(){
            randomBtn.classList.toggle('active');
            _this.isRandom = !_this.isRandom;
        }

        //Xử lí khi kết thúc bài thì tự next
        audio.onended = function(){
            if(_this.isRepeat){
                _this.repeatSong();
                audio.play();
            }
            else{
                nextBtn.click();
            }
        }
        
        //Xử lí khi lặp lại 1 bài hát bấm vào repeat
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active');
        }

        // Xử lí khi click vào 1 bài hát bất kỳ
        $('.playlist').onclick = function(e){
            if(e.target.closest('.song:not(.active)') || e.target.closest('.option')){
                //Khi bấm vào thì chuyển bài
                if(e.target.closest('.song:not(.active)')){
                    _this.currentIndex = e.target.closest('.song:not(.active)').getAttribute('data-set');
                    _this.loadCurrentSong();
                    audio.play();
                    _this.update();
                }
                //Khi bấm vào option thì làm gì
                if(e.target.closest('.option')){

                }
            }
        }
    },
};

list.start();