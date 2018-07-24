<template>
    <transition name="slide">
        <music-list
                :songs="songs"
                :title="title"
                :bg-image="bgImage"
        ></music-list>
    </transition>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import "singer-detail.less";
</style>
<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex';
    import {getSingerDetail } from '../../api/singer';
    import {ERR_OK} from '../../api/config';
    import {createSong} from '../../common/js/song';
    import musicList from '../music-list/music-list.vue';
    export default{
        data(){
            return {
                songs: []
            }
        },
        computed: {
            title(){
                return this.singer.name;
            },
            bgImage(){
                return this.singer.avatar;
            },
            ...mapGetters([
                'singer'
            ])
        },
        components: {musicList},
        created(){
            this._getDetail();
        },
        methods: {
            _getDetail(){
                if (!this.singer.mid) {
                    this.$router.push('/singer');
                    return;
                }
                getSingerDetail(this.singer.mid).then((res)=> {
                    if (res.code === ERR_OK) {
                        this.songs = [...this._normalizeSongs(res.data.list)];
                        console.log(this.songs);
                    }
                })
            },
            _normalizeSongs(list){
                let ret = [];
                for (let val of Array.values(list)) {
                    let {musicData }= val;
                    if (musicData.songid && musicData.albummid) {
                        ret = [...ret, createSong(musicData)];
                    }
                }
                return ret
            }
        }
    }
</script>
