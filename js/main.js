// https://autumnfish.cn
var app = new Vue({
    el: "#mymusic",
    data: {
        query: '',
        musiclist: [],
        audioUrl: '',
        musicImg: '',
        activeclass: false,
        hotComments: '',
        mvUrl: '',
        mvdisplay: '',
        goanimation: false,
        mymovemi: false,
        downclass: false
    },
    methods: {
        searchMusic: function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function (res) {
                    that.musiclist = res.data.result.songs
                    that.goanimation = true
                }, function (err) {
                    console.log(err);
                })
            that.goanimation = false
        },
        playMusic: function (musicID) {
            var that = this;

            axios.get("https://autumnfish.cn/song/url?id=" + musicID)
                .then(function (res) {
                    that.audioUrl = res.data.data[0].url;
                }, function (err) {
                    console.log(err);
                })
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicID)
                .then(function (res) {
                    that.musicImg = res.data.songs[0].al.picUrl
                    that.activeclass = true
                    that.downclass = true
                    that.mymovemi = true
                }, function (err) {
                    console.log(err);
                })
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicID)
                .then(function (res) {
                    console.log(res);
                    that.hotComments = res.data.hotComments

                }, function (err) {

                })
            that.mymovemi = false
            console.log(that.mymovemi);
        },
        play: function () {
            this.activeclass = true;
            this.downclass = true
            // console.log(this.activeclass);
        },
        pause: function () {
            this.activeclass = false;
            this.downclass = false
            // console.log(this.activeclass);
        },
        playvideos: function (mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function (res) {
                    // console.log(res);
                    that.$refs.video.src = res.data.data.url
                    that.mvdisplay = true
                    // console.log(that.mvUrl);
                    that.$refs["audio"].pause()
                }, function (err) {

                })
        },
        onmiss: function () {
            this.mvdisplay = false
            this.$refs.video.pause()
        }
    }
})