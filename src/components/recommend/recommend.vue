<template>
    <div class="recommend">
        <Scroll class="recommend-content"
                :data="discList"
                ref="scroll"

        >
            <div>
                <div class="slider-wrapper" v-if="recommend.length">
                    <slider>
                        <div v-for="(item,index) in recommend">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" @load="loadImage" class="needsclick" >
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单排行</h1>
                    <ul>
                        <li v-for="item in discList" class="item">
                            <div class="icon">
                                <img v-lazy="item.imgurl" >
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                        <li class="drop-down" v-show="loadMore">
                            <img src="./loading.gif" >
                            <p>加载更多</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </Scroll>
    </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import "recommend.less";
</style>
<script type="text/ecmascript-6">
    import {getRecommend,getDiscList} from '../../api/recommend';
    import {ERR_OK} from '../../api/config';
    import Slider from '../../base/slider/slider.vue';
    import Scroll from '../../base/scroll/scroll.vue';
    import loading from '../../base/loading/loading.vue';
    export default{
        data(){
            return {
                recommend: [],
                discList: [],
                needList:[],
                loadMore:false
            }
        },
        components: {
            Slider,
            Scroll,
            loading
        },
        created(){
            this._getRecommend();
            this._getDiscList();
        },
        methods: {
            loadImage() {
                if (!this.checkloaded) {
                    this.checkloaded = true;
                    this.$refs.scroll.refresh()
                }
            },
            _getRecommend(){
                getRecommend().then((res)=> {
                    if (res.code === ERR_OK) {
                        this.recommend = [...res.data.slider];
                    }
                }, (err)=> {

                });
            },
            _getDiscList() {
                getDiscList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.discList = [...res.data.list];
                    }
                })
            }
        }
    }
</script>
