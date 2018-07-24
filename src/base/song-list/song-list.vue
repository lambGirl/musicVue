<template>
    <div class="song-list">
        <ul>
            <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
                <div class="rank" v-show="rank">
                    <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
                </div>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import "song-list.less";
</style>
<script type="text/ecmascript-6">
    export default{
        props: {
            songs: {
                type: Array,
                default: function () {
                    return []
                }
            },
            rank: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {}
        },
        methods: {
            selectItem(item, index) {
                this.$emit('select', item, index)
            },
            getDesc(song) {
                return `${song.singer}·${song.album}`
            },
            getRankCls(index) {
                if (index <= 2) {
                    return `icon icon${index}`
                } else {
                    return 'text'
                }
            },
            getRankText(index) {
                if (index > 2) {
                    return index + 1
                }
            }
        }
    }
</script>
