<template>
    <div class="music-list">
        <div class="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="filter"></div>
        </div>
        <scroll :data="songs"
                class="list"
                ref="list"
        >
            <div class="song-list-wrapper">
                <song-list :songs="songs"></song-list>
            </div>
            <div v-show="!songs.length" class="loading-container">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import "music-list.less";
</style>
<script type="text/ecmascript-6">
    import scroll from '../../base/scroll/scroll.vue';
    import songList from '../../base/song-list/song-list.vue';
    import loading from '../../base/loading/loading.vue';
    export default{
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            title: {
                type: String,
                default: ''
            }
        },
        data(){
            return {}
        },
        computed: {
            bgStyle() {
                return `background-image:url(${this.bgImage})`
            }
        },
        mounted() {
            this.imageHeight = this.$refs.bgImage.clientHeight;
            //this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
            this.$refs.list.$el.style.top = `${this.imageHeight}px`;
        },
        components: {scroll, songList, loading}
    }
</script>
