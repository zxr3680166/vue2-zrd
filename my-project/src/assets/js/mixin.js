import { getStyle } from './mUtils'

export const loadMore = {
	directives: {
		'load-more': {
			bind: (el, binding) => {
				let windowHeight = window.screen.height;
				let height;
				let setTop;
				let paddingBottom;
				let marginBottom;
				let requestFram;
				let oldScrollTop;
				let scrollEl;
				let heightEl;
				let scrollType = el.attributes.type && el.attributes.type.value;
                let scrollReduce = 2;

                scrollEl = el;
                heightEl = el.children[0];

				el.addEventListener('touchstart', () => {
					height = heightEl.clientHeight;
					if (scrollType == 2) {
						height = height
					}
					setTop = el.offsetTop;
					paddingBottom = getStyle(el, 'paddingBottom');
					marginBottom = getStyle(el, 'marginBottom');
				}, false)

				el.addEventListener('touchmove', () => {
					loadMore();
				}, false)

				el.addEventListener('touchend', () => {
					oldScrollTop = scrollEl.scrollTop;
					moveEnd();
				}, false)

				const moveEnd = () => {
					requestFram = requestAnimationFrame(() => {
						if (scrollEl.scrollTop != oldScrollTop) {
							oldScrollTop = scrollEl.scrollTop;
							moveEnd()
						} else {
							cancelAnimationFrame(requestFram);
							height = heightEl.clientHeight;
							loadMore();
						}
					})
				}

				const loadMore = () => {
                    // console.log('loadmore',el.clientHeight,el.children[0].clientHeight)
                    // console.log(scrollEl.scrollTop ,windowHeight ,height ,setTop ,paddingBottom, marginBottom ,scrollReduce)
                    // console.log(scrollEl.scrollTop +windowHeight ,height +setTop +paddingBottom+ marginBottom -scrollReduce)
                    // if (scrollEl.scrollTop > el.clientHeight ) {
                    //     console.log('显示')
                    // } else {
                    //     console.log('不显示')
                    // }
					if (scrollEl.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom - scrollReduce) {
                        binding.value();
					}
				}
			}
		}
	}
};
