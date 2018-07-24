<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
        </div>
    </div>
</template>
<style lang="less" scoped rel="stylesheet/less">
    @import "slider.less";
</style>
<script type="text/ecmascript-6">
    import  BScroll from 'better-scroll';
    import {addClass} from '../../common/js/dom';
    export default{
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        mounted(){
            this.$nextTick(()=> {
                this._setSliderWidth();
                this._initDots();
                this._initSlider();
                if (this.autoPlay) {
                    this._play()
                }
                window.addEventListener('resize', () => {
                    if (!this.slider) {
                        return
                    }
                    this._setSliderWidth(true);
                    this.slider.refresh()
                })
            })
        },
        deactivated() {
            clearTimeout(this.timer)
        },
        beforeDestroy() {
            clearTimeout(this.timer)
        },
        methods: {
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children;
                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;
                for (let child of Array.values(this.children)) {
                    addClass(child, 'slider-item');
                    child.style.width = `${sliderWidth }px`;
                    width += sliderWidth;
                }
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = `${width}px`;
            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400
                });
                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    if (this.loop) {
                        pageIndex -= 1
                    }
                    this.currentPageIndex = pageIndex;
                    if (this.autoPlay) {
                        this._play()
                    }
                });
                this.slider.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer)
                    }
                })
            },
            _initDots() {
                this.dots = [...this.children]
            },
            _play() {
                let pageIndex = this.currentPageIndex + 1;
                if (this.loop) {
                    pageIndex += 1
                }
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400)
                }, this.interval)
            }
        }
    }
</script>
